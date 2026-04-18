export type Stat = {
  value: string;
  label: { en: string; uz: string; ru: string };
  icon: "tshirt" | "briefcase" | "handshake" | "bolt";
};

export const stats: Stat[] = [
  {
    value: "7mln+",
    icon: "tshirt",
    label: { en: "Products", uz: "Mahsulotlar", ru: "Продуктов" },
  },
  {
    value: "1500+",
    icon: "briefcase",
    label: { en: "Jobs", uz: "Ish o'rinlari", ru: "Рабочих мест" },
  },
  {
    value: "20+",
    icon: "handshake",
    label: { en: "Partners", uz: "Hamkorlar", ru: "Партнёров" },
  },
  {
    value: "900kw+",
    icon: "bolt",
    label: { en: "Green Energy", uz: "Yashil energiya", ru: "Зелёная энергия" },
  },
];

export const ctaContent = {
  label: {
    en: "Multi-Sector Cluster",
    uz: "Ko'p tarmoqli klaster",
    ru: "Многоотраслевой кластер",
  },
  heading: {
    en: "Ready To Grow\nWith FAYZ-M?",
    uz: "FAYZ-M bilan\no'sishga tayyormisiz?",
    ru: "Готовы расти\nвместе с FAYZ-M?",
  },
  description: {
    en: "Quality production, disciplined execution, and sustainable growth — everything you need to move from complexity to confident results.",
    uz: "Sifatli ishlab chiqarish, intizomli bajarish va barqaror o'sish — murakkablikdan ishonchli natijalarga o'tish uchun kerak bo'lgan hamma narsa.",
    ru: "Качественное производство, дисциплинированное исполнение и устойчивый рост — всё, что нужно для уверенного развития.",
  },
  cta: { en: "Contact Us →", uz: "Bog'lanish →", ru: "Связаться →" },
  card1: {
    value: "900kw+",
    label: { en: "green energy", uz: "yashil energiya", ru: "зелёная энергия" },
  },
  card2: {
    value: "1500+",
    label: { en: "Employees worldwide.", uz: "Xodimlar.", ru: "Сотрудников." },
  },
  card3: {
    value: "20+",
    label: {
      en: "Partners already with us!",
      uz: "Hamkor kompaniyalar!",
      ru: "Партнёров с нами!",
    },
  },
} as const;
