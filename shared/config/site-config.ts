export const siteConfig = {
  name: "Fayzm",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Service", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Articles", href: "/articles" },
  ],
  footer: {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Reviews", href: "/reviews" },
    ],
    address: "123 Innovation Drive, Tech City, CA 94016, USA",
    phones: [
      { label: "Phone Number", value: "+998942600000", href: "tel:+998942600000" },
      { label: "Office Number", value: "+998940871111", href: "tel:+998940871111" },
    ],
    social: [
      { label: "Facebook", href: "https://www.facebook.com/fayzm.textile.uz/", icon: "facebook" },
      { label: "Instagram", href: "https://www.instagram.com/fayztextile.uz/", icon: "instagram" },
      { label: "YouTube", href: "https://www.youtube.com/@tpma_uz", icon: "youtube" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  pages: {
    home: {
      title: "Home",
    },
  },
} as const;
