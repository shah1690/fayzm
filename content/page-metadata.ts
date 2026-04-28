import type { Locale } from "@/shared/i18n/translations";

type LocalizedPageMeta = {
  heading: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
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
    description: {
      en: "Learn about FAYZ-M, a vertically integrated textile cluster in Uzbekistan with production, green energy, and export capabilities.",
      uz: "FAYZ-M — O'zbekistondagi vertikal integratsiyalashgan tekstil klasteri: ishlab chiqarish, yashil energiya va eksport imkoniyatlari.",
      ru: "Узнайте о FAYZ-M — вертикально интегрированном текстильном кластере Узбекистана с производством, зелёной энергией и экспортом.",
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
    description: {
      en: "Explore FAYZ-M business divisions: knitting, yarn, garments, flour, cottonseed oil, petrol station, and livestock farming.",
      uz: "FAYZ-M faoliyat yo'nalishlari: trikotaj mato, ip, tikuvchilik, un, paxta yog'i, yoqilg'i shoxobchasi va chorvachilik.",
      ru: "Направления FAYZ-M: трикотаж, пряжа, швейное производство, мука, хлопковое масло, АЗС и животноводство.",
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
    description: {
      en: "Discover FAYZ-M knitwear and garment collections for men and women, produced in Uzbekistan for global markets.",
      uz: "FAYZ-M erkaklar va ayollar trikotaj hamda kiyim kolleksiyalari: O'zbekistonda ishlab chiqariladi va eksport qilinadi.",
      ru: "Коллекции трикотажа и одежды FAYZ-M для мужчин и женщин, произведённые в Узбекистане для мировых рынков.",
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
    description: {
      en: "Browse FAYZ-M men's knitwear and garment models made with reliable fabrics and export-ready production quality.",
      uz: "FAYZ-M erkaklar kolleksiyasi: sifatli matolar va eksportga tayyor ishlab chiqarish asosidagi trikotaj kiyimlar.",
      ru: "Мужская коллекция FAYZ-M: трикотаж и одежда из качественных материалов с экспортным уровнем производства.",
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
    description: {
      en: "Browse FAYZ-M women's knitwear and garment models designed for comfort, quality, and international orders.",
      uz: "FAYZ-M ayollar kolleksiyasi: qulaylik, sifat va xalqaro buyurtmalar uchun ishlab chiqarilgan trikotaj kiyimlar.",
      ru: "Женская коллекция FAYZ-M: удобный и качественный трикотаж для международных заказов.",
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
    description: {
      en: "Contact FAYZ-M for production inquiries, export orders, partnerships, and business cooperation.",
      uz: "Ishlab chiqarish, eksport buyurtmalari, hamkorlik va biznes aloqalar uchun FAYZ-M bilan bog'laning.",
      ru: "Свяжитесь с FAYZ-M по вопросам производства, экспортных заказов, партнёрства и сотрудничества.",
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
    description: {
      en: "Answers to common questions about FAYZ-M orders, private label production, samples, design, and cooperation terms.",
      uz: "FAYZ-M buyurtmalari, private label ishlab chiqarish, namunalar, dizayn va hamkorlik shartlari bo'yicha javoblar.",
      ru: "Ответы на вопросы о заказах FAYZ-M, private label производстве, образцах, дизайне и условиях сотрудничества.",
    },
  },
} satisfies Record<string, LocalizedPageMeta>;
