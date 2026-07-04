export type DocumentDefinition = {
  slug: string;
  objectName: string;
  downloadFileName?: string;
};

// Add every PDF stored in the media volume here.
export const documents: DocumentDefinition[] = [
  {
    slug: "eng-man.pdf",
    objectName: "documents/eng man.pdf",
    downloadFileName: "eng man.pdf",
  },
  {
    slug: "eng-woman.pdf",
    objectName: "documents/eng woman.pdf",
    downloadFileName: "eng woman.pdf",
  },
  {
    slug: "rus-man.pdf",
    objectName: "documents/rus man.pdf",
    downloadFileName: "rus man.pdf",
  },
  {
    slug: "rus-woman.pdf",
    objectName: "documents/rus woman.pdf",
    downloadFileName: "rus woman.pdf",
  },
];

export function resolveDocumentBySlug(slug: string) {
  return documents.find(
    (document) => document.slug === slug || document.downloadFileName === slug,
  );
}
