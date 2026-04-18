import { headers } from "next/headers";
import { type Locale, locales } from "@/shared/i18n/translations";

export async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") ?? "";
  const primary = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  return (locales as readonly string[]).includes(primary ?? "")
    ? (primary as Locale)
    : "en";
}
