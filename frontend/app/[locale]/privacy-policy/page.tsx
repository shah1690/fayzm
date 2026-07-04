import type { Metadata } from "next";
import { LegalPageView } from "@/features/legal/legal-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { buildPageMetadata } from "@/shared/lib/seo";

type Props = Readonly<{ params: Promise<{ locale: string }> }>;

const title = {
  en: "Privacy Policy | FAYZ-M",
  uz: "Maxfiylik siyosati | FAYZ-M",
  ru: "Политика конфиденциальности | FAYZ-M",
  zh: "隐私政策 | FAYZ-M",
} as const;

const description = {
  en: "Learn how FAYZ-M handles contact form data and business inquiry information.",
  uz: "FAYZ-M aloqa formasi va biznes murojaat ma'lumotlari bilan qanday ishlashini bilib oling.",
  ru: "Узнайте, как FAYZ-M обрабатывает данные контактных форм и деловых обращений.",
  zh: "了解 FAYZ-M 如何处理联系表单数据与商业咨询信息。",
} as const;

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;

  return <LegalPageView locale={locale as Locale} type="privacy" />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/privacy-policy",
    title: title[locale as Locale],
    description: description[locale as Locale],
  });
}
