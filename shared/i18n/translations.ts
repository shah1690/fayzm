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
  partners: {
    title: {
      en: "Successful Partner",
      uz: "Muvaffaqiyatli hamkorlar",
      ru: "Успешное партнёрство",
    },
    subtitle: {
      en: "We guarantee to provide affordable business consulting.",
      uz: "Biz arzon biznes-konsalting xizmatlarini taqdim etishni kafolatlaymiz.",
      ru: "Мы гарантируем доступное бизнес-консультирование.",
    },
  },
} as const;
