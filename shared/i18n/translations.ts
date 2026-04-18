export const locales = ["en", "uz", "ru"] as const;
export type Locale = (typeof locales)[number];

export const translations = {
  footer: {
    tagline: {
      en: "Multi-Sector Textile Cluster",
      uz: "Ko'p tarmoqli to'qimachilik klasteri",
      ru: "Многоотраслевой текстильный кластер",
    },
  },
} as const;
