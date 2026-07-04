// Client-safe deterministic business pickers (no fetch, no server-only).
// Shared by the server data layer and the client nav components so SSR and
// client render the same choice (no Math.random).

import type { BusinessData } from "@/content/businesses";
import type { Locale } from "@/shared/i18n/translations";

const LOCALE_INDEX: Record<Locale, number> = { en: 0, uz: 1, ru: 2, zh: 3 };

export function pickBusinessForLocale(
  businesses: BusinessData[],
  locale: Locale,
  offset = 0,
): BusinessData {
  const i = LOCALE_INDEX[locale] + offset;
  return businesses[i % businesses.length];
}
