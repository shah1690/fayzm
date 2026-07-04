// Client-safe types + helper for CMS-editable home sections. The server data
// layer (cms.ts) fetches the content; sections receive their slice as a prop
// and fall back to built-in copy when a field is empty.

import type { Locale } from "@/shared/i18n/translations";

export type LocalizedText = Partial<Record<Locale, string>>;
export type SectionContent = Record<string, LocalizedText>;

export type HomeContent = {
  hero: SectionContent;
  intro: SectionContent;
  collections: SectionContent;
  cta: SectionContent;
  partnerCta: SectionContent;
  worldMap: SectionContent;
  contact: SectionContent;
};

export const EMPTY_HOME_CONTENT: HomeContent = {
  hero: {},
  intro: {},
  collections: {},
  cta: {},
  partnerCta: {},
  worldMap: {},
  contact: {},
};

/** CMS value for `locale` if non-empty, else the built-in fallback. */
export function loc(
  field: LocalizedText | undefined,
  fallback: string,
  locale: Locale,
): string {
  return (field?.[locale] ?? "").trim() || fallback;
}
