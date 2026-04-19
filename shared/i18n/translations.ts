export const locales = ["en", "uz", "ru"] as const;
export type Locale = (typeof locales)[number];

export const translations = {
  partners: {
    title: {
      en: "Our partners",
      uz: "Hamkorlarimiz",
      ru: "Наши партнёры",
    },
    subtitle: {
      en: "Global apparel and textile brands work with FAYZ-M for reliable quality, scale, and long-term supply.",
      uz: "Butun dunyo bo‘ylab brendlar FAYZ-M bilan sifat, hajm va uzoq muddatli hamkorlik uchun ishlaydi.",
      ru: "Мировые бренды одежды и текстиля сотрудничают с FAYZ-M ради стабильного качества, масштаба и долгосрочных поставок.",
    },
  },
} as const;
