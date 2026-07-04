import { resolveDocumentBySlug } from "@/content/documents";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const mediaPublicUrl = process.env.MEDIA_PUBLIC_URL ?? "https://media.fayzm.uz";

type DocumentRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

function encodeObjectPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildMediaUrl(objectName: string) {
  const baseUrl = mediaPublicUrl.replace(/\/+$/, "");
  return `${baseUrl}/${encodeObjectPath(objectName)}`;
}

async function redirectToMedia(context: DocumentRouteContext) {
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

  return Response.redirect(buildMediaUrl(document.objectName), 307);
}

export async function GET(_request: Request, context: DocumentRouteContext) {
  return redirectToMedia(context);
}

export async function HEAD(_request: Request, context: DocumentRouteContext) {
  return redirectToMedia(context);
}
