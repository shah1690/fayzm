import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { FaqPageView } from "@/features/faq/faq-page-view";
import type { Locale } from "@/shared/i18n/translations";

type LocalizedFaqPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedFaqPage({
  params,
}: LocalizedFaqPageProps) {
  const { locale } = await params;

  return <FaqPageView locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedFaqPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: pageMetadata.faq.title[locale as Locale],
  };
}
