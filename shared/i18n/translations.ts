export const locales = ["en", "uz", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];

export const translations = {
  partners: {
    title: {
      en: "Our partners",
      uz: "Hamkorlarimiz",
      ru: "Наши партнёры",
      zh: "我们的合作伙伴",
    },
    subtitle: {
      en: "Global apparel and textile brands work with FAYZ-M for reliable quality, scale, and long-term supply.",
      uz: "Butun dunyo bo‘ylab brendlar FAYZ-M bilan sifat, hajm va uzoq muddatli hamkorlik uchun ishlaydi.",
      ru: "Мировые бренды одежды и текстиля сотрудничают с FAYZ-M ради стабильного качества, масштаба и долгосрочных поставок.",
      zh: "全球服装和纺织品牌与 FAYZ-M 合作，追求稳定的品质、规模与长期供应。",
    },
  },
} as const;
