export type DocumentDefinition = {
  slug: string;
  driveFileUrl?: string;
  driveFileId?: string;
  resourceKey?: string;
  downloadFileName?: string;
};

// Add every public Google Drive PDF you want to expose here.
export const documents: DocumentDefinition[] = [
  {
    slug: "eng-man.pdf",
    driveFileUrl:
      "https://drive.google.com/file/d/1-2sNpVQqI6P3ID01yl9p50xfaBdk2PHd/view?usp=drivesdk",
    downloadFileName: "eng-man.pdf",
  },
  {
    slug: "eng-man-stream.pdf",
    driveFileUrl:
      "https://drive.google.com/file/d/1nnpo232Ye4WnHTmn1_Mx-9A_zyrSyW2r/view?usp=drivesdk",
    downloadFileName: "eng-man-stream.pdf",
  },
];

export function resolveDocumentBySlug(slug: string) {
  return documents.find((document) => document.slug === slug);
}
