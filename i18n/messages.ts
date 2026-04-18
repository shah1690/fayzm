export const messages = {
  en: {
    Metadata: {
      title: "FAYZ-M",
      description: "FAYZ-M",
    },
    HomePage: {
      metaTitle: "Home | FAYZ-M",
      title: "Home",
    },
  },
  uz: {
    Metadata: {
      title: "FAYZ-M",
      description: "FAYZ-M",
    },
    HomePage: {
      metaTitle: "Bosh sahifa | FAYZ-M",
      title: "Bosh sahifa",
    },
  },
  ru: {
    Metadata: {
      title: "FAYZ-M",
      description: "FAYZ-M",
    },
    HomePage: {
      metaTitle: "Главная | FAYZ-M",
      title: "Главная",
    },
  },
} as const;

export type AppLocale = keyof typeof messages;
