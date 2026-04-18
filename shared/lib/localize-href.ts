import { routing } from "@/i18n/routing";
import type { Locale } from "@/shared/i18n/translations";

export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const [pathname, suffix = ""] = href.split(/([?#].*)/, 2);

  if (locale === routing.defaultLocale && routing.localePrefix !== "always") {
    return `${pathname}${suffix}`;
  }

  const localizedPath =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return `${localizedPath}${suffix}`;
}
