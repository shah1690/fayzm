import { notFound } from "next/navigation";
import { PdfRangeViewer } from "@/features/catalog/pdf-range-viewer";

type CatalogConfig = {
  pdfPath: string;
  title: string;
};

const catalogs: Record<string, CatalogConfig> = {
  "eng-woman": {
    pdfPath: "documents/eng woman.pdf",
    title: "Fayzm Women Catalog",
  },
};

type Props = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

function encodeObjectPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export default async function CatalogViewerPage({ params }: Props) {
  const { slug } = await params;
  const catalog = catalogs[slug];

  if (!catalog) {
    notFound();
  }

  const mediaBaseUrl = (
    process.env.MEDIA_PUBLIC_URL ?? "https://media.fayzm.uz"
  ).replace(/\/+$/, "");

  return (
    <PdfRangeViewer
      pdfUrl={`${mediaBaseUrl}/${encodeObjectPath(catalog.pdfPath)}`}
      title={catalog.title}
    />
  );
}
