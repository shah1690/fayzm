export type Stat = {
  /** Numeric part shown with count-up animation (e.g. 7 for “7mln+”). */
  target: number;
  /** Suffix immediately after the number (e.g. `mln`, `kw`, or empty). */
  unit: string;
  showPlus: boolean;
  label: { en: string; uz: string; ru: string; zh: string };
  icon: "tshirt" | "briefcase" | "handshake" | "bolt";
};

export const stats: Stat[] = [
  {
    target: 10,
    unit: "mln",
    showPlus: false,
    icon: "tshirt",
    label: {
      en: "Products",
      uz: "Mahsulotlar",
      ru: "Продуктов",
      zh: "产品数量",
    },
  },
  {
    target: 1800,
    unit: "",
    showPlus: true,
    icon: "briefcase",
    label: {
      en: "Jobs",
      uz: "Ish o'rinlari",
      ru: "Рабочих мест",
      zh: "工作岗位",
    },
  },
  {
    target: 20,
    unit: "",
    showPlus: true,
    icon: "handshake",
    label: {
      en: "Partners",
      uz: "Hamkorlar",
      ru: "Партнёров",
      zh: "合作伙伴",
    },
  },
  {
    target: 2000,
    unit: "kW",
    showPlus: true,
    icon: "bolt",
    label: {
      en: "Green Energy",
      uz: "Yashil energiya",
      ru: "Зелёная энергия",
      zh: "绿色能源",
    },
  },
];

export const ctaContent = {
  label: {
    en: "Multi-Sector Cluster",
    uz: "Ko'p tarmoqli klaster",
    ru: "Многоотраслевой кластер",
    zh: "多元化产业集群",
  },
  heading: {
    en: "Take your business\nto the next level\nwith FAYZ-M",
    uz: "FAYZ-M bilan biznesingizni\nyangi bosqichga olib chiqing",
    ru: "Выведите свой бизнес\nна новый уровень\nвместе с FAYZ-M",
    zh: "携手 FAYZ-M\n让您的事业\n迈上新台阶",
  },
  description: {
    en: "Quality, discipline, and sustainability — the standard of our work. From complex ideas to perfect results, we combine every opportunity for success.",
    uz: "Sifat, intizom va barqarorlik — bizning faoliyat mezoni. Murakkab g'oyalardan mukammal natijalarga qadar — muvaffaqiyat uchun barcha imkoniyatlarni birlashtiramiz.",
    ru: "Качество, дисциплина и устойчивость — стандарт нашей работы. От сложных идей до безупречных результатов — объединяем все возможности для успеха.",
    zh: "品质、纪律与可持续——是我们工作的标准。从复杂构想到完美成果，我们将每一个成功机会汇聚于一身。",
  },
  cta: {
    en: "Start Partnership →",
    uz: "Hamkorlikni boshlash →",
    ru: "Начать сотрудничество →",
    zh: "开启合作 →",
  },
  card1: {
    value: "2 000 kW+",
    label: {
      en: "green energy",
      uz: "yashil energiya",
      ru: "зелёная энергия",
      zh: "绿色能源",
    },
  },
  card2: {
    value: "1800+",
    label: {
      en: "employees",
      uz: "xodimlar",
      ru: "сотрудников",
      zh: "员工",
    },
  },
  card3: {
    value: "20+",
    label: {
      en: "Partners already with us!",
      uz: "Hamkor kompaniyalar!",
      ru: "Партнёров с нами!",
      zh: "已携手的合作伙伴！",
    },
  },
} as const;
