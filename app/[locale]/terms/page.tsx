import type { Metadata } from "next";
import { LegalPageView } from "@/features/legal/legal-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { buildPageMetadata } from "@/shared/lib/seo";

type Props = Readonly<{ params: Promise<{ locale: string }> }>;

const title = {
  en: "Terms | FAYZ-M",
  uz: "Foydalanish shartlari | FAYZ-M",
  ru: "Условия использования | FAYZ-M",
} as const;

const description = {
  en: "Review general website terms for FAYZ-M content, product information, and cooperation inquiries.",
  uz: "FAYZ-M sayt kontenti, mahsulot ma'lumotlari va hamkorlik murojaatlari bo'yicha umumiy shartlar.",
  ru: "Общие условия использования сайта FAYZ-M, информации о продукции и запросов на сотрудничество.",
} as const;

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  return <LegalPageView locale={locale as Locale} type="terms" />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/terms",
    title: title[locale as Locale],
    description: description[locale as Locale],
  });
}
