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
  slugs: string[][];
};

export const sitePages: SitePageDefinition[] = [
  {
    id: "collections",
    slugs: [["collections"]],
  },
  {
    id: "collectionsWomen",
    slugs: [["collections", "women"]],
  },
  {
    id: "collectionsMen",
    slugs: [["collections", "men"]],
  },
  {
    id: "businesses",
    slugs: [["businesses"], ["pages", "fayz-m-businesses"]],
  },
  {
    id: "knitting",
    slugs: [
      ["businesses", "knitting"],
      ["pages", "knitting"],
    ],
  },
  {
    id: "yarnProduction",
    slugs: [
      ["businesses", "yarn-production"],
      ["pages", "fayz-m-yarn-production"],
    ],
  },
  {
    id: "garmentProduction",
    slugs: [
      ["businesses", "garment-production"],
      ["pages", "fayz-m-garment-production"],
    ],
  },
  {
    id: "petrol",
    slugs: [
      ["businesses", "petrol"],
      ["pages", "fayz-m-petrol"],
    ],
  },
  {
    id: "flour",
    slugs: [
      ["businesses", "flour"],
      ["pages", "fayz-m-flour"],
    ],
  },
  {
    id: "farm",
    slugs: [
      ["businesses", "farm"],
      ["pages", "fayz-m-farm"],
    ],
  },
  {
    id: "cottonseedOilProduction",
    slugs: [
      ["businesses", "cottonseed-oil-production"],
      ["pages", "fayz-m-cottonseed-oil-production"],
    ],
  },
  {
    id: "about",
    slugs: [["about"], ["pages", "about"]],
  },
  {
    id: "contact",
    slugs: [["contact"], ["pages", "contact"]],
  },
  {
    id: "faq",
    slugs: [["faq"], ["pages", "faq"]],
  },
];

export function getLocaleHomePath(locale: AppLocale) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

export function resolveSitePage(slug: string[]) {
  return sitePages.find((page) =>
    page.slugs.some((candidate) => candidate.join("/") === slug.join("/")),
  );
}

export function getAllSitePageParams() {
  return routing.locales.flatMap((locale) =>
    sitePages.flatMap((page) =>
      page.slugs.map((slug) => ({
        locale,
        slug,
      })),
    ),
  );
}
