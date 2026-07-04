import { PageShell } from "@/components/layout/page-shell";
import type { Locale } from "@/shared/i18n/translations";
import { getPageMetadata } from "@/shared/lib/cms";

type BusinessesPageViewProps = Readonly<{ locale: Locale }>;

export async function BusinessesPageView({ locale }: BusinessesPageViewProps) {
  const pageMetadata = await getPageMetadata();
  return <PageShell title={pageMetadata.businesses.heading[locale]} />;
}
