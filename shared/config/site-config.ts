import type { Locale } from "@/shared/i18n/translations";

export const siteConfig = {
  name: "Fayzm",
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
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
} as const;

export function getNavLabels(locale: Locale) {
  return {
    home:
      locale === "en" ? "Home" : locale === "uz" ? "Bosh sahifa" : "Главная",
    collections:
      locale === "en"
        ? "Collections"
        : locale === "uz"
          ? "Kolleksiyalar"
          : "Коллекции",
    businesses:
      locale === "en"
        ? "Businesses"
        : locale === "uz"
          ? "Faoliyat yo'nalishlari"
          : "Направления бизнеса",
    aboutUs:
      locale === "en"
        ? "About Us"
        : locale === "uz"
          ? "Biz haqimizda"
          : "О нас",
    contactUs:
      locale === "en" ? "Contact Us" : locale === "uz" ? "Aloqa" : "Контакты",
    knitting:
      locale === "en" ? "Knitting" : locale === "uz" ? "Trikotaj" : "Вязание",
    yarnProduction:
      locale === "en"
        ? "Yarn Production"
        : locale === "uz"
          ? "Ip ishlab chiqarish"
          : "Производство пряжи",
    garmentProduction:
      locale === "en"
        ? "Garment Production"
        : locale === "uz"
          ? "Kiyim ishlab chiqarish"
          : "Производство одежды",
    petrol: locale === "en" ? "Petrol" : locale === "uz" ? "Neft" : "Нефть",
    flour: locale === "en" ? "Flour" : locale === "uz" ? "Un" : "Мука",
    farm: locale === "en" ? "Farm" : locale === "uz" ? "Ferm" : "Ферма",
    cottonseedOil:
      locale === "en"
        ? "Cottonseed Oil"
        : locale === "uz"
          ? "Paxta yog'i"
          : "Хлопковое масло",
    faq: "FAQ",
  };
}
