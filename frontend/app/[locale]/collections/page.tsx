import type { Metadata } from "next";
import { CollectionsPageView } from "@/features/collections/collections-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { getPageMetadata } from "@/shared/lib/cms";
import { buildPageMetadata } from "@/shared/lib/seo";

type LocalizedCollectionsPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedCollectionsPage() {
  return <CollectionsPageView />;
}

export async function generateMetadata({
  params,
}: LocalizedCollectionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageMetadata = await getPageMetadata();

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/collections",
    title: pageMetadata.collections.title[locale as Locale],
    description: pageMetadata.collections.description[locale as Locale],
  });
}
