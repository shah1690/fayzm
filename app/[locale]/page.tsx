import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomePageView } from "@/features/home/home-page-view";
import type { Locale } from "@/shared/i18n/translations";

type LocalizedHomePageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: LocalizedHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  });

  return {
    title: t("metaTitle"),
  };
}

export default async function LocalizedHomePage({
  params,
}: LocalizedHomePageProps) {
  const { locale } = await params;

  return <HomePageView locale={locale as Locale} />;
}
