import { PageShell } from "@/components/layout/page-shell";
import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";

type BusinessesPageViewProps = Readonly<{ locale: Locale }>;

export function BusinessesPageView({ locale }: BusinessesPageViewProps) {
  return <PageShell title={pageMetadata.businesses.heading[locale]} />;
}
