import type { Metadata } from "next";
import { FaqPageView } from "@/features/faq/faq-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { getPageMetadata } from "@/shared/lib/cms";
import { buildPageMetadata } from "@/shared/lib/seo";

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
  const pageMetadata = await getPageMetadata();

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/faq",
    title: pageMetadata.faq.title[locale as Locale],
    description: pageMetadata.faq.description[locale as Locale],
  });
}
