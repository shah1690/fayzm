export type DocumentDefinition = {
  slug: string;
  objectName: string;
  bucket?: string;
  downloadFileName?: string;
};

// Add every MinIO PDF object you want to expose here.
export const documents: DocumentDefinition[] = [
  {
    slug: "eng-man.pdf",
    objectName: "documents/eng-man.pdf",
    downloadFileName: "eng-man.pdf",
  },
  {
    slug: "eng-man-stream.pdf",
    objectName: "documents/eng-man-stream.pdf",
    downloadFileName: "eng-man-stream.pdf",
  },
];

export function resolveDocumentBySlug(slug: string) {
  return documents.find((document) => document.slug === slug);
}
