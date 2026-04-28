import type { MetadataRoute } from "next";
import { businesses } from "@/content/businesses";
import { getProductsByGender } from "@/content/products";
import type { Locale } from "@/shared/i18n/translations";
import { absoluteLocalizedUrl } from "@/shared/lib/seo";

const locales = ["en", "uz", "ru"] as const satisfies readonly Locale[];
const staticPaths = [
  "/",
  "/about",
  "/businesses",
  "/collections",
  "/collections/men",
  "/collections/women",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const businessPaths = businesses.map(
    (business) => `/businesses/${business.slug}`,
  );
  const menProductPaths = getProductsByGender("men").map(
    (product) => `/collections/men/${product.slug}`,
  );
  const womenProductPaths = getProductsByGender("women").map(
    (product) => `/collections/women/${product.slug}`,
  );
  const paths = [
    ...staticPaths,
    ...businessPaths,
    ...menProductPaths,
    ...womenProductPaths,
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteLocalizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, absoluteLocalizedUrl(item, path)]),
        ),
      },
    })),
  );
}
