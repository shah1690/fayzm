import type { Locale } from "@/shared/i18n/translations";

export const siteConfig = {
  name: "FAYZ-M",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  nav: [
    { key: "home", href: "/" },
    { key: "collections", href: "/collections" },
    {
      key: "businesses",
      href: "/businesses",
      children: [
        { key: "knitting", href: "/businesses/knitting" },
        { key: "yarnProduction", href: "/businesses/yarn-production" },
        { key: "garmentProduction", href: "/businesses/garment-production" },
        { key: "petrol", href: "/businesses/petrol" },
        { key: "flour", href: "/businesses/flour" },
        { key: "farm", href: "/businesses/farm" },
        { key: "cottonseedOil", href: "/businesses/cottonseed-oil" },
      ],
    },
    { key: "aboutUs", href: "/about" },
  ],
  footer: {
    quickLinks: [
      { key: "home", href: "/" },
      { key: "collections", href: "/collections" },
      { key: "aboutUs", href: "/about" },
      { key: "faq", href: "/#faq" },
    ],
    businesses: [
      { key: "knitting", href: "/businesses/knitting" },
      { key: "yarnProduction", href: "/businesses/yarn-production" },
      { key: "garmentProduction", href: "/businesses/garment-production" },
      { key: "petrol", href: "/businesses/petrol" },
      { key: "flour", href: "/businesses/flour" },
      { key: "farm", href: "/businesses/farm" },
      { key: "cottonseedOil", href: "/businesses/cottonseed-oil" },
    ],
    phones: [
      {
        key: "phoneNumber",
        value: "+998942600000",
        href: "tel:+998942600000",
      },
      {
        key: "officeNumber",
        value: "+998940871111",
        href: "tel:+998940871111",
      },
    ],
    social: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/fayzm.textile.uz/",
        icon: "facebook",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/fayztextile.uz/",
        icon: "instagram",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/@tpma_uz",
        icon: "youtube",
      },
    ],
    legal: [
      { key: "privacy", href: "/privacy-policy" },
      { key: "terms", href: "/terms" },
    ],
  },
} as const;

const navLabels: Record<string, Record<Locale, string>> = {
  home: {
    en: "Home",
    uz: "Bosh sahifa",
    ru: "Главная",
    zh: "首页",
  },
  collections: {
    en: "Collections",
    uz: "Kolleksiyalar",
    ru: "Коллекции",
    zh: "产品系列",
  },
  businesses: {
    en: "Businesses",
    uz: "Faoliyat yo'nalishlari",
    ru: "Направления бизнеса",
    zh: "业务板块",
  },
  aboutUs: {
    en: "About Us",
    uz: "Biz haqimizda",
    ru: "О нас",
    zh: "关于我们",
  },
  contactUs: {
    en: "Contact Us",
    uz: "Aloqa",
    ru: "Контакты",
    zh: "联系我们",
  },
  knitting: {
    en: "Knitting",
    uz: "Trikotaj mato",
    ru: "Трикотаж",
    zh: "针织布料",
  },
  yarnProduction: {
    en: "Yarn Production",
    uz: "Ip ishlab chiqarish",
    ru: "Производство пряжи",
    zh: "纱线生产",
  },
  garmentProduction: {
    en: "Garment Production",
    uz: "Tikuvchilik",
    ru: "Швейное производство",
    zh: "服装制造",
  },
  petrol: {
    en: "Petrol Station",
    uz: "Yoqilg'i quyish shoxobchasi",
    ru: "АЗС",
    zh: "加油站",
  },
  flour: {
    en: "Flour Production",
    uz: "Un ishlab chiqarish",
    ru: "Производство муки",
    zh: "面粉生产",
  },
  farm: {
    en: "Farm",
    uz: "Chorvachilik",
    ru: "Фермерское хозяйство",
    zh: "畜牧业",
  },
  cottonseedOil: {
    en: "Cottonseed Oil",
    uz: "Paxta yog'i",
    ru: "Хлопковое масло",
    zh: "棉籽油",
  },
  faq: {
    en: "FAQ",
    uz: "FAQ",
    ru: "FAQ",
    zh: "常见问题",
  },
  privacy: {
    en: "Privacy Policy",
    uz: "Maxfiylik siyosati",
    ru: "Политика конфиденциальности",
    zh: "隐私政策",
  },
  terms: {
    en: "Terms",
    uz: "Foydalanish shartlari",
    ru: "Условия использования",
    zh: "使用条款",
  },
};

export function getNavLabels(locale: Locale) {
  return Object.fromEntries(
    Object.entries(navLabels).map(([key, values]) => [key, values[locale]]),
  ) as Record<keyof typeof navLabels, string>;
}
