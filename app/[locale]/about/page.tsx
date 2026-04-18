import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { AboutPageView } from "@/features/about/about-page-view";
import type { Locale } from "@/shared/i18n/translations";

type LocalizedAboutPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedAboutPage({
  params,
}: LocalizedAboutPageProps) {
  const { locale } = await params;

  return <AboutPageView locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedAboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: pageMetadata.about.title[locale as Locale],
  };
}
