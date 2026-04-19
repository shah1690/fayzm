import { routing } from "@/i18n/routing";
import type { Locale } from "@/shared/i18n/translations";

export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const [pathname, suffix = ""] = href.split(/([?#].*)/, 2);

  const prefixMode = routing.localePrefix as
    | "always"
    | "as-needed"
    | "never"
    | { mode?: string };
  const isAlwaysPrefix =
    prefixMode === "always" ||
    (typeof prefixMode === "object" &&
      prefixMode !== null &&
      prefixMode.mode === "always");

  if (locale === routing.defaultLocale && !isAlwaysPrefix) {
    return `${pathname}${suffix}`;
  }

  const localizedPath =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return `${localizedPath}${suffix}`;
}
