import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { CollectionsPageView } from "@/features/collections/collections-page-view";
import type { Locale } from "@/shared/i18n/translations";
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

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/collections",
    title: pageMetadata.collections.title[locale as Locale],
    description: pageMetadata.collections.description[locale as Locale],
  });
}
