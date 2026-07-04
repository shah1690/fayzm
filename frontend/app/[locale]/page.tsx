import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomePageView } from "@/features/home/home-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { buildPageMetadata } from "@/shared/lib/seo";

type LocalizedHomePageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: LocalizedHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageT = await getTranslations({
    locale,
    namespace: "HomePage",
  });
  const metaT = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/",
    title: pageT("metaTitle"),
    description: metaT("description"),
  });
}

export default async function LocalizedHomePage({
  params,
}: LocalizedHomePageProps) {
  const { locale } = await params;

  return <HomePageView locale={locale as Locale} />;
}
