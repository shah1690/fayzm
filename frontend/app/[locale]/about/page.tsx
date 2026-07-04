import type { Metadata } from "next";
import { AboutPageView } from "@/features/about/about-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { getPageMetadata } from "@/shared/lib/cms";
import { buildPageMetadata } from "@/shared/lib/seo";

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
  const pageMetadata = await getPageMetadata();

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: pageMetadata.about.title[locale as Locale],
    description: pageMetadata.about.description[locale as Locale],
  });
}
