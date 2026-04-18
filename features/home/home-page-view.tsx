import { CtaBanner } from "@/features/cta/cta-banner";
import { FaqSection } from "@/features/faq/faq-section";
import { BusinessesSection } from "@/features/home/businesses-section";
import { HeroSection } from "@/features/home/hero-section";
import { PartnersSection } from "@/features/partners/partners-section";
import { StatsSection } from "@/features/stats/stats-section";
import type { Locale } from "@/shared/i18n/translations";

type HomePageViewProps = Readonly<{ locale: Locale }>;

export function HomePageView({ locale }: HomePageViewProps) {
  return (
    <main>
      <HeroSection locale={locale} />
      <StatsSection locale={locale} />
      <BusinessesSection locale={locale} />
      <CtaBanner locale={locale} />
      <PartnersSection locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
