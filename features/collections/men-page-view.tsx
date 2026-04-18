import { PageShell } from "@/components/layout/page-shell";
import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";

type MenPageViewProps = Readonly<{ locale: Locale }>;

export function MenPageView({ locale }: MenPageViewProps) {
  return <PageShell title={pageMetadata.collectionsMen.heading[locale]} />;
}
