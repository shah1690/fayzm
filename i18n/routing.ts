import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "uz", "ru", "zh"],
  defaultLocale: "en",
  /** English at `/`, `/uz`, `/ru`, `/zh` prefixed; `/en/...` redirects to unprefixed (next-intl). */
  localePrefix: "as-needed",
  localeDetection: false,
});
