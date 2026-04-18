import { PageShell } from "@/components/layout/page-shell";
import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";

type CollectionsPageViewProps = Readonly<{ locale: Locale }>;

export function CollectionsPageView({ locale }: CollectionsPageViewProps) {
  return <PageShell title={pageMetadata.collections.heading[locale]} />;
}
