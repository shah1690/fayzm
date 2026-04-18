import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { WomenPageView } from "@/features/collections/women-page-view";
import type { Locale } from "@/shared/i18n/translations";

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

  return {
    title: pageMetadata.collectionsWomen.title[locale as Locale],
  };
}
