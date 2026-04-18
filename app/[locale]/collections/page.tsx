import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { CollectionsPageView } from "@/features/collections/collections-page-view";
import type { Locale } from "@/shared/i18n/translations";

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

  return {
    title: pageMetadata.collections.title[locale as Locale],
  };
}
