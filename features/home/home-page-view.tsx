"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/features/contact/contact-form";
import { CtaBanner } from "@/features/cta/cta-banner";
import { FaqSection } from "@/features/faq/faq-section";
import { BrandVideoSection } from "@/features/home/brand-video-section";
import { BusinessesSection } from "@/features/home/businesses-section";
import { CollectionsMarqueeSection } from "@/features/home/collections-marquee-section";
import { HeroIntroSection } from "@/features/home/hero-intro-section";
import { HeroSection } from "@/features/home/hero-section";
import { HomeCTABanner } from "@/features/home/home-cta-banner";
import { WorldMapSection } from "@/features/home/world-map-section";
import { PartnersSection } from "@/features/partners/partners-section";
import { StatsSection } from "@/features/stats/stats-section";
import { siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";

type HomePageViewProps = Readonly<{ locale: Locale }>;

const text = {
  imageAlt: {
    en: "FAYZ-M team",
    uz: "FAYZ-M jamoasi",
    ru: "Команда FAYZ-M",
    zh: "FAYZ-M 团队",
  },
} as const;

export function HomePageView({ locale }: HomePageViewProps) {
  const t = useTranslations("HomePage");

  return (
    <main>
      <HeroSection locale={locale} />
      <HeroIntroSection locale={locale} />
      <StatsSection locale={locale} />
      <CollectionsMarqueeSection locale={locale} />
      <BusinessesSection locale={locale} />
      <BrandVideoSection />
      <HomeCTABanner locale={locale} />
      <WorldMapSection locale={locale} />
      <PartnersSection locale={locale} />
      <section className="bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 md:grid-cols-12 md:items-end md:gap-12">
            <div className="flex flex-col gap-5 md:col-span-7">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#003566]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-400">
                  {t("contactLabel")}
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] text-[#070A0F] md:text-5xl">
                {t("contactHeading")}
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                {t("contactDescription")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div
              className="relative min-h-[480px] overflow-hidden md:min-h-[580px]"
              style={{ borderRadius: 40, background: "#0A0A0A" }}
            >
              <Image
                src="/images/portrait.png"
                alt={text.imageAlt[locale]}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                {...shimmerImageProps(1200, 1400)}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,10,15,0.9) 0%, rgba(7,10,15,0.45) 40%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(circle, #003566 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-8 md:p-10">
                <h3 className="max-w-sm text-2xl font-bold leading-tight text-white md:text-3xl">
                  {t("preferTalk")}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/70">
                  {t("instantSupport")}
                </p>
                <a
                  href={siteConfig.footer.phones[0].href}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:bg-[#003566] hover:text-white"
                >
                  {t("callUsNow")}
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
