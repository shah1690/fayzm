import type { Metadata } from "next";
import { WomenPageView } from "@/features/collections/women-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { getPageMetadata } from "@/shared/lib/cms";
import { buildPageMetadata } from "@/shared/lib/seo";

type LocalizedWomenPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedWomenPage({
  params,
}: LocalizedWomenPageProps) {
  const { locale } = await params;

  return <WomenPageView locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedWomenPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageMetadata = await getPageMetadata();

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/collections/women",
    title: pageMetadata.collectionsWomen.title[locale as Locale],
    description: pageMetadata.collectionsWomen.description[locale as Locale],
  });
}
