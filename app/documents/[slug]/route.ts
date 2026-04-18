import { resolveDocumentBySlug } from "@/content/documents";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const driveApiKey = process.env.GOOGLE_DRIVE_API_KEY;
const pdfCacheControl = "public, max-age=3600, stale-while-revalidate=86400";

type DriveFileMetadata = {
  mimeType?: string;
  name?: string;
  resourceKey?: string;
  size?: string;
};

type DocumentRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

function buildBaseHeaders(fileName: string, fileSize: number) {
  return new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": pdfCacheControl,
    "Content-Disposition": `inline; filename="${fileName}"`,
    "Content-Length": String(fileSize),
    "Content-Type": "application/pdf",
    "X-Served-Pdf-Name": fileName,
  });
}

function parseDriveFileReference(
  driveFileUrl?: string,
  configuredDriveFileId?: string,
  configuredDriveResourceKey?: string,
) {
  if (configuredDriveFileId) {
    return {
      fileId: configuredDriveFileId,
      resourceKey: configuredDriveResourceKey ?? null,
    };
  }

  if (!driveFileUrl) {
    return null;
  }

  try {
    const url = new URL(driveFileUrl);
    const pathMatch = /^\/file\/d\/([^/]+)/.exec(url.pathname);
    const fileId = pathMatch?.[1] ?? url.searchParams.get("id");
    const resourceKey =
      url.searchParams.get("resourcekey") ?? configuredDriveResourceKey;

    if (!fileId) {
      return null;
    }

    return {
      fileId,
      resourceKey,
    };
  } catch {
    return null;
  }
}

function buildDriveResourceHeaders(
  fileId: string,
  resourceKey?: string | null,
) {
  if (!resourceKey) {
    return undefined;
  }

  return {
    "X-Goog-Drive-Resource-Keys": `${fileId}/${resourceKey}`,
  };
}

function buildDriveApiUrl(fileId: string, altMedia: boolean) {
  if (!driveApiKey) {
    return null;
  }

  const params = new URLSearchParams({
    key: driveApiKey,
    supportsAllDrives: "true",
  });

  if (altMedia) {
    params.set("alt", "media");
  } else {
    params.set("fields", "name,mimeType,size,resourceKey");
  }

  return `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?${params.toString()}`;
}

async function fetchDriveFileMetadata(
  fileId: string,
  resourceKey?: string | null,
) {
  const metadataUrl = buildDriveApiUrl(fileId, false);

  if (!metadataUrl) {
    return null;
  }

  const response = await fetch(metadataUrl, {
    headers: buildDriveResourceHeaders(fileId, resourceKey),
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    return {
      errorStatus: response.status,
      metadata: null,
    } as const;
  }

  return {
    errorStatus: null,
    metadata: (await response.json()) as DriveFileMetadata,
  } as const;
}

function parseByteRange(rangeHeader: string, fileSize: number) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader.trim());

  if (!match) {
    return null;
  }

  const [, rawStart, rawEnd] = match;
  let start = rawStart === "" ? null : Number(rawStart);
  let end = rawEnd === "" ? null : Number(rawEnd);

  if (
    (start !== null && Number.isNaN(start)) ||
    (end !== null && Number.isNaN(end))
  ) {
    return null;
  }

  if (start === null && end === null) {
    return null;
  }

  if (start === null && end !== null) {
    const suffixLength = end;

    if (suffixLength <= 0) {
      return null;
    }

    start = Math.max(fileSize - suffixLength, 0);
    end = fileSize - 1;
  } else if (start !== null && end === null) {
    end = fileSize - 1;
  }

  if (start === null || end === null) {
    return null;
  }

  if (start < 0 || end < start || start >= fileSize) {
    return null;
  }

  return {
    end: Math.min(end, fileSize - 1),
    start,
  };
}

function createMissingConfigResponse() {
  return new Response("GOOGLE_DRIVE_API_KEY is not configured.", {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function createUpstreamErrorResponse(status: number) {
  return new Response("Google Drive file could not be fetched.", {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

async function createPdfResponse(
  request: Request,
  context: DocumentRouteContext,
  headOnly: boolean,
) {
  const { slug } = await context.params;
  const document = resolveDocumentBySlug(slug);

  if (!document) {
    return new Response("Document was not found.", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (!driveApiKey) {
    return createMissingConfigResponse();
  }

  const driveFileReference = parseDriveFileReference(
    document.driveFileUrl,
    document.driveFileId,
    document.resourceKey,
  );

  if (!driveFileReference) {
    return new Response("Document Drive configuration is incomplete.", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const metadataResult = await fetchDriveFileMetadata(
    driveFileReference.fileId,
    driveFileReference.resourceKey,
  );

  if (!metadataResult) {
    return createMissingConfigResponse();
  }

  if (metadataResult.errorStatus !== null) {
    return createUpstreamErrorResponse(metadataResult.errorStatus);
  }

  const metadata = metadataResult.metadata;
  const fileName = document.downloadFileName ?? metadata?.name ?? slug;
  const mimeType = metadata?.mimeType;
  const fileSize = Number(metadata?.size);
  const rangeHeader = request.headers.get("range");

  if (mimeType !== "application/pdf" || !Number.isFinite(fileSize)) {
    return new Response("Google Drive file must be a stored PDF blob.", {
      status: 502,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (headOnly) {
    if (!rangeHeader) {
      return new Response(null, {
        headers: buildBaseHeaders(fileName, fileSize),
        status: 200,
      });
    }

    const byteRange = parseByteRange(rangeHeader, fileSize);

    if (!byteRange) {
      return new Response(null, {
        status: 416,
        headers: {
          "Accept-Ranges": "bytes",
          "Cache-Control": pdfCacheControl,
          "Content-Range": `bytes */${fileSize}`,
        },
      });
    }

    const contentLength = byteRange.end - byteRange.start + 1;
    const headers = buildBaseHeaders(fileName, contentLength);

    headers.set(
      "Content-Range",
      `bytes ${byteRange.start}-${byteRange.end}/${fileSize}`,
    );

    return new Response(null, {
      headers,
      status: 206,
    });
  }

  const mediaUrl = buildDriveApiUrl(driveFileReference.fileId, true);

  if (!mediaUrl) {
    return createMissingConfigResponse();
  }

  const upstreamRequestHeaders = new Headers(
    buildDriveResourceHeaders(
      driveFileReference.fileId,
      metadata.resourceKey ?? driveFileReference.resourceKey,
    ),
  );

  if (rangeHeader) {
    upstreamRequestHeaders.set("Range", rangeHeader);
  }

  const upstreamResponse = await fetch(mediaUrl, {
    cache: "no-store",
    headers: upstreamRequestHeaders,
  });

  if (!upstreamResponse.ok) {
    return createUpstreamErrorResponse(upstreamResponse.status);
  }

  const headers = buildBaseHeaders(
    fileName,
    Number(upstreamResponse.headers.get("content-length") ?? fileSize),
  );
  const upstreamContentRange = upstreamResponse.headers.get("content-range");

  if (upstreamContentRange) {
    headers.set("Content-Range", upstreamContentRange);
  }

  return new Response(upstreamResponse.body, {
    headers,
    status: upstreamResponse.status,
  });
}

export async function GET(request: Request, context: DocumentRouteContext) {
  return createPdfResponse(request, context, false);
}

export async function HEAD(request: Request, context: DocumentRouteContext) {
  return createPdfResponse(request, context, true);
}
