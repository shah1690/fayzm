import type { Metadata } from "next";
import { pageMetadata } from "@/content/page-metadata";
import { ContactPageView } from "@/features/contact/contact-page-view";
import type { Locale } from "@/shared/i18n/translations";

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

  return {
    title: pageMetadata.contact.title[locale as Locale],
  };
}
