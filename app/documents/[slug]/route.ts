import { resolveDocumentBySlug } from "@/content/documents";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const minioInternalEndpoint = process.env.MINIO_INTERNAL_ENDPOINT;
const defaultMinioBucket = process.env.MINIO_BUCKET ?? "fayzm-media";
const pdfCacheControl = "public, max-age=3600, stale-while-revalidate=86400";

type DocumentRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

function buildBaseHeaders(fileName: string, contentLength?: number) {
  const headers = new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": pdfCacheControl,
    "Content-Disposition": `inline; filename="${fileName}"`,
    "Content-Type": "application/pdf",
    "X-Served-Pdf-Name": fileName,
  });

  if (Number.isFinite(contentLength)) {
    headers.set("Content-Length", String(contentLength));
  }

  return headers;
}

function encodeObjectPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildMinioObjectUrl(bucket: string, objectName: string) {
  if (!minioInternalEndpoint) {
    return null;
  }

  const endpoint = minioInternalEndpoint.replace(/\/+$/, "");
  return `${endpoint}/${encodeURIComponent(bucket)}/${encodeObjectPath(objectName)}`;
}

function createMissingConfigResponse() {
  return new Response("MINIO_INTERNAL_ENDPOINT is not configured.", {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function createUpstreamErrorResponse(status: number) {
  return new Response("MinIO PDF could not be fetched.", {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function getFileName(
  objectName: string,
  slug: string,
  downloadFileName?: string,
) {
  if (downloadFileName) {
    return downloadFileName;
  }

  return objectName.split("/").filter(Boolean).at(-1) ?? slug;
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

  const bucket = document.bucket ?? defaultMinioBucket;
  const objectUrl = buildMinioObjectUrl(bucket, document.objectName);

  if (!objectUrl) {
    return createMissingConfigResponse();
  }

  const rangeHeader = request.headers.get("range");
  const upstreamHeaders = new Headers();

  if (rangeHeader) {
    upstreamHeaders.set("Range", rangeHeader);
  }

  const upstreamResponse = await fetch(objectUrl, {
    cache: "no-store",
    headers: upstreamHeaders,
    method: headOnly && !rangeHeader ? "HEAD" : "GET",
  });

  if (upstreamResponse.status === 404) {
    return new Response("Document object was not found in MinIO.", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (upstreamResponse.status === 416) {
    const headers = new Headers({
      "Accept-Ranges": "bytes",
      "Cache-Control": pdfCacheControl,
    });
    const upstreamContentRange = upstreamResponse.headers.get("content-range");

    if (upstreamContentRange) {
      headers.set("Content-Range", upstreamContentRange);
    }

    return new Response(null, {
      headers,
      status: 416,
    });
  }

  if (!upstreamResponse.ok) {
    return createUpstreamErrorResponse(upstreamResponse.status);
  }

  const contentLengthHeader = upstreamResponse.headers.get("content-length");
  const contentLength = contentLengthHeader
    ? Number(contentLengthHeader)
    : undefined;
  const fileName = getFileName(
    document.objectName,
    slug,
    document.downloadFileName,
  );
  const headers = buildBaseHeaders(fileName, contentLength);
  const upstreamContentRange = upstreamResponse.headers.get("content-range");

  if (upstreamContentRange) {
    headers.set("Content-Range", upstreamContentRange);
  }

  if (headOnly) {
    await upstreamResponse.body?.cancel();

    return new Response(null, {
      headers,
      status: upstreamResponse.status,
    });
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
