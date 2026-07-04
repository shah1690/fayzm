import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { manrope, onest } from "@/app/fonts";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { messages } from "@/i18n/messages";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/shared/i18n/translations";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fayzm.uz";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003566",
  colorScheme: "light",
};

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const metadata = messages[resolvedLocale].Metadata;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "FAYZ-M",
    title: {
      default: metadata.title,
      template: "%s",
    },
    description: metadata.description,
    manifest: "/manifest.webmanifest",
    // Icons come from the file-based convention: app/favicon.ico,
    // app/icon.svg and app/apple-icon.png (generated from the navbar logo
    // mark via scripts/generate-favicon.mjs).
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${manrope.variable} ${onest.variable}`}>
      <body className="bg-white font-secondary">
        <NextIntlClientProvider>
          <Navbar locale={locale as Locale} />
          {children}
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
