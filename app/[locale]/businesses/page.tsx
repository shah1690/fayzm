import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { BusinessesPageView } from "@/features/businesses/businesses-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { buildPageMetadata } from "@/shared/lib/seo";

type LocalizedBusinessesPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedBusinessesPage({
  params,
}: LocalizedBusinessesPageProps) {
  const { locale } = await params;

  return <BusinessesPageView locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedBusinessesPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/businesses",
    title: pageMetadata.businesses.title[locale as Locale],
    description: pageMetadata.businesses.description[locale as Locale],
  });
}
