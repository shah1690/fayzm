import type { AppLocale } from "@/i18n/messages";
import { routing } from "@/i18n/routing";

type SitePageId =
  | "about"
  | "businesses"
  | "collections"
  | "collectionsMen"
  | "collectionsWomen"
  | "contact"
  | "cottonseedOilProduction"
  | "faq"
  | "farm"
  | "flour"
  | "garmentProduction"
  | "knitting"
  | "petrol"
  | "yarnProduction";

type SitePageDefinition = {
  id: SitePageId;
  // Public page routing is defined entirely by this list.
  slug: string[];
};

export const sitePages: SitePageDefinition[] = [
  {
    id: "collections",
    slug: ["collections"],
  },
  {
    id: "collectionsWomen",
    slug: ["collections", "women"],
  },
  {
    id: "collectionsMen",
    slug: ["collections", "men"],
  },
  {
    id: "businesses",
    slug: ["businesses"],
  },
  {
    id: "knitting",
    slug: ["businesses", "knitting"],
  },
  {
    id: "yarnProduction",
    slug: ["businesses", "yarn-production"],
  },
  {
    id: "garmentProduction",
    slug: ["businesses", "garment-production"],
  },
  {
    id: "petrol",
    slug: ["businesses", "petrol"],
  },
  {
    id: "flour",
    slug: ["businesses", "flour"],
  },
  {
    id: "farm",
    slug: ["businesses", "farm"],
  },
  {
    id: "cottonseedOilProduction",
    slug: ["businesses", "cottonseed-oil-production"],
  },
  {
    id: "about",
    slug: ["about"],
  },
  {
    id: "contact",
    slug: ["contact"],
  },
  {
    id: "faq",
    slug: ["faq"],
  },
];

export function getLocaleHomePath(locale: AppLocale) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

export function getLocalePagePath(locale: AppLocale, slug: string[]) {
  const pathname = `/${slug.join("/")}`;
  return locale === routing.defaultLocale ? pathname : `/${locale}${pathname}`;
}

export function resolveSitePage(slug: string[]) {
  return sitePages.find((page) => page.slug.join("/") === slug.join("/"));
}

export function getAllSitePageParams() {
  return routing.locales.flatMap((locale) =>
    sitePages.map((page) => ({
      locale,
      slug: page.slug,
    })),
  );
}
