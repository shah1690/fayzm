import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { MenPageView } from "@/features/collections/men-page-view";
import type { Locale } from "@/shared/i18n/translations";

type LocalizedMenPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedMenPage({
  params,
}: LocalizedMenPageProps) {
  const { locale } = await params;

  return <MenPageView locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedMenPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: pageMetadata.collectionsMen.title[locale as Locale],
  };
}
