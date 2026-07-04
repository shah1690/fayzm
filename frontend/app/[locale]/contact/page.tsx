import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { ContactPageView } from "@/features/contact/contact-page-view";
import type { Locale } from "@/shared/i18n/translations";
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

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: pageMetadata.contact.title[locale as Locale],
    description: pageMetadata.contact.description[locale as Locale],
  });
}
