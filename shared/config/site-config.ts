export const siteConfig = {
  name: "Fayzm",
  logo: {
    light: "https://fayzm.uz/cdn/shop/files/logo-blue-full.svg?v=1755497372&width=100",
    dark: "https://fayzm.uz/cdn/shop/files/logo-milk-full.svg?v=1755497442&width=100",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Service", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Articles", href: "/articles" },
  ],
  pages: {
    home: {
      title: "Home",
    },
  },
} as const;
