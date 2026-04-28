import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/translations";

const locales = ["en", "uz", "ru"] as const satisfies readonly Locale[];
const defaultLocale: Locale = "en";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fayzm.uz";

const ogLocale: Record<Locale, string> = {
  en: "en_US",
  uz: "uz_UZ",
  ru: "ru_RU",
};

function normalizePath(path: string) {
  if (path === "") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function localizedPath(locale: Locale, path: string) {
  const normalizedPath = normalizePath(path);
  if (locale === defaultLocale) return normalizedPath;
  if (normalizedPath === "/") return `/${locale}`;
  return `/${locale}${normalizedPath}`;
}

export function absoluteLocalizedUrl(locale: Locale, path: string) {
  return new URL(localizedPath(locale, path), siteUrl).toString();
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = "/images/about-hero.png",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = absoluteLocalizedUrl(locale, path);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((item) => [item, absoluteLocalizedUrl(item, path)]),
        ),
        "x-default": absoluteLocalizedUrl(defaultLocale, path),
      },
    },
    openGraph: {
      type: "website",
      siteName: "FAYZ-M",
      title,
      description,
      url,
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => ogLocale[item]),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
