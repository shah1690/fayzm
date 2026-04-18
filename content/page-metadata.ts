import type { Locale } from "@/shared/i18n/translations";

type LocalizedPageMeta = {
  heading: Record<Locale, string>;
  title: Record<Locale, string>;
};

export const pageMetadata = {
  about: {
    heading: {
      en: "About Us",
      uz: "Biz haqimizda",
      ru: "О нас",
    },
    title: {
      en: "About Us | FAYZ-M",
      uz: "Biz haqimizda | FAYZ-M",
      ru: "О нас | FAYZ-M",
    },
  },
  businesses: {
    heading: {
      en: "Businesses",
      uz: "Faoliyat yo'nalishlari",
      ru: "Направления бизнеса",
    },
    title: {
      en: "Businesses | FAYZ-M",
      uz: "Faoliyat yo'nalishlari | FAYZ-M",
      ru: "Направления бизнеса | FAYZ-M",
    },
  },
  collections: {
    heading: {
      en: "Collections",
      uz: "Kolleksiyalar",
      ru: "Коллекции",
    },
    title: {
      en: "Collections | FAYZ-M",
      uz: "Kolleksiyalar | FAYZ-M",
      ru: "Коллекции | FAYZ-M",
    },
  },
  collectionsMen: {
    heading: {
      en: "Men",
      uz: "Erkaklar kolleksiyasi",
      ru: "Мужская коллекция",
    },
    title: {
      en: "Men Collection | FAYZ-M",
      uz: "Erkaklar kolleksiyasi | FAYZ-M",
      ru: "Мужская коллекция | FAYZ-M",
    },
  },
  collectionsWomen: {
    heading: {
      en: "Women",
      uz: "Ayollar kolleksiyasi",
      ru: "Женская коллекция",
    },
    title: {
      en: "Women Collection | FAYZ-M",
      uz: "Ayollar kolleksiyasi | FAYZ-M",
      ru: "Женская коллекция | FAYZ-M",
    },
  },
  contact: {
    heading: {
      en: "Contact",
      uz: "Aloqa",
      ru: "Контакты",
    },
    title: {
      en: "Contact | FAYZ-M",
      uz: "Aloqa | FAYZ-M",
      ru: "Контакты | FAYZ-M",
    },
  },
  faq: {
    heading: {
      en: "FAQ",
      uz: "Ko'p so'raladigan savollar",
      ru: "FAQ",
    },
    title: {
      en: "FAQ | FAYZ-M",
      uz: "Ko'p so'raladigan savollar | FAYZ-M",
      ru: "FAQ | FAYZ-M",
    },
  },
} satisfies Record<string, LocalizedPageMeta>;
