import type { Metadata } from "next";
import { ContactPageView } from "@/features/contact/contact-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { getPageMetadata } from "@/shared/lib/cms";
import { buildPageMetadata } from "@/shared/lib/seo";

type LocalizedContactPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocalizedContactPage({
  params,
}: LocalizedContactPageProps) {
  const { locale } = await params;

  return <ContactPageView locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: LocalizedContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageMetadata = await getPageMetadata();

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: pageMetadata.contact.title[locale as Locale],
    description: pageMetadata.contact.description[locale as Locale],
  });
}
