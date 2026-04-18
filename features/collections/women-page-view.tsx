import { PageShell } from "@/components/layout/page-shell";
import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";

type WomenPageViewProps = Readonly<{ locale: Locale }>;

export function WomenPageView({ locale }: WomenPageViewProps) {
  return <PageShell title={pageMetadata.collectionsWomen.heading[locale]} />;
}
