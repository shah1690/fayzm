import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/content/businesses";
import { BusinessPageView } from "@/features/businesses/business-page-view";
import type { Locale } from "@/shared/i18n/translations";

type LocalizedBusinessPageProps = Readonly<{
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}>;

export default async function LocalizedBusinessPage({
  params,
}: LocalizedBusinessPageProps) {
  const { locale, slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return <BusinessPageView slug={slug} locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedBusinessPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    return {
      title: "FAYZ-M",
    };
  }

  return {
    title: `${business.label[locale as Locale]} | FAYZ-M`,
  };
}
