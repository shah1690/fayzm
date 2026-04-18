export const siteConfig = {
  name: "Fayzm",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    {
      label: "Businesses",
      href: "/businesses",
      children: [
        { label: "Knitting", href: "/businesses/knitting" },
        { label: "Yarn Production", href: "/businesses/yarn-production" },
        { label: "Garment Production", href: "/businesses/garment-production" },
        { label: "Petrol", href: "/businesses/petrol" },
        { label: "Flour", href: "/businesses/flour" },
        { label: "Farm", href: "/businesses/farm" },
        { label: "Cottonseed Oil", href: "/businesses/cottonseed-oil" },
      ],
    },
    { label: "About Us", href: "/about" },
  ],
  footer: {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Collections", href: "/collections" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/#faq" },
    ],
    businesses: [
      { label: "Knitting", href: "/businesses/knitting" },
      { label: "Yarn Production", href: "/businesses/yarn-production" },
      { label: "Garment Production", href: "/businesses/garment-production" },
      { label: "Petrol", href: "/businesses/petrol" },
      { label: "Flour", href: "/businesses/flour" },
      { label: "Farm", href: "/businesses/farm" },
      { label: "Cottonseed Oil", href: "/businesses/cottonseed-oil" },
    ],
    phones: [
      {
        label: "Phone Number",
        value: "+998942600000",
        href: "tel:+998942600000",
      },
      {
        label: "Office Number",
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
