import { notFound } from "next/navigation";
import { ImageCatalogViewer } from "@/features/catalog/image-catalog-viewer";

type CatalogConfig = {
  downloadPath: string;
  imagePath: string;
  pageCount: number;
  title: string;
};

const catalogs: Record<string, CatalogConfig> = {
  "eng-man": {
    downloadPath: "documents/eng man.pdf",
    imagePath: "catalogs/eng-man",
    pageCount: 163,
    title: "Fayzm Men Catalog",
  },
  "eng-woman": {
    downloadPath: "documents/eng woman.pdf",
    imagePath: "catalogs/eng-woman",
    pageCount: 221,
    title: "Fayzm Women Catalog",
  },
  "rus-man": {
    downloadPath: "documents/rus man.pdf",
    imagePath: "catalogs/rus-man",
    pageCount: 163,
    title: "Fayzm Мужской каталог",
  },
  "rus-woman": {
    downloadPath: "documents/rus woman.pdf",
    imagePath: "catalogs/rus-woman",
    pageCount: 213,
    title: "Fayzm Женский каталог",
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
    <ImageCatalogViewer
      downloadUrl={`${mediaBaseUrl}/${encodeObjectPath(catalog.downloadPath)}`}
      imageBaseUrl={`${mediaBaseUrl}/${encodeObjectPath(catalog.imagePath)}`}
      pageCount={catalog.pageCount}
      title={catalog.title}
    />
  );
}
