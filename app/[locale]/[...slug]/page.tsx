import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasLocale } from "next-intl";
import { PageShell } from "@/components/layout/page-shell";
import {
  getAllSitePageParams,
  getLocaleHomePath,
  getLocalePagePath,
  resolveSitePage,
} from "@/content/site-pages";
import type { AppLocale } from "@/i18n/messages";
import { messages } from "@/i18n/messages";
import { routing } from "@/i18n/routing";

type LocalizedPageProps = Readonly<{
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}>;

export function generateStaticParams() {
  return getAllSitePageParams();
}

export async function generateMetadata({
  params,
}: LocalizedPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = (
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  ) as AppLocale;
  const page = resolveSitePage(slug);

  if (!page) {
    return messages[resolvedLocale].Metadata;
  }

  return {
    title: messages[resolvedLocale].SitePages[page.id].metaTitle,
    alternates: {
      canonical: getLocalePagePath(resolvedLocale, page.slug),
    },
  };
}

export default async function LocalizedContentPage({
  params,
}: LocalizedPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = (
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  ) as AppLocale;
  const page = resolveSitePage(slug);

  if (!page) {
    redirect(getLocaleHomePath(resolvedLocale));
  }

  return (
    <PageShell title={messages[resolvedLocale].SitePages[page.id].title} />
  );
}
