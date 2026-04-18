export const messages = {
  en: {
    Metadata: {
      title: "FAYZ-M",
      description: "FAYZ-M",
    },
    HomePage: {
      metaTitle: "Home | FAYZ-M",
    },
  },
  uz: {
    Metadata: {
      title: "FAYZ-M",
      description: "FAYZ-M",
    },
    HomePage: {
      metaTitle: "Bosh sahifa | FAYZ-M",
    },
  },
  ru: {
    Metadata: {
      title: "FAYZ-M",
      description: "FAYZ-M",
    },
    HomePage: {
      metaTitle: "Главная | FAYZ-M",
    },
  },
} as const;

export type AppLocale = keyof typeof messages;
