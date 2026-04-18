import Image from "next/image";
import { ContactForm } from "@/features/contact/contact-form";
import { CtaBanner } from "@/features/cta/cta-banner";
import { FaqSection } from "@/features/faq/faq-section";
import { BrandVideoSection } from "@/features/home/brand-video-section";
import { BusinessesSection } from "@/features/home/businesses-section";
import { CollectionsMarqueeSection } from "@/features/home/collections-marquee-section";
import { HeroSection } from "@/features/home/hero-section";
import { HomeCTABanner } from "@/features/home/home-cta-banner";
import { WorldReachSection } from "@/features/home/world-reach-section";
import { PartnersSection } from "@/features/partners/partners-section";
import { StatsSection } from "@/features/stats/stats-section";
import { siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";

type HomePageViewProps = Readonly<{ locale: Locale }>;

export function HomePageView({ locale }: HomePageViewProps) {
  return (
    <main>
      <HeroSection locale={locale} />
      <StatsSection locale={locale} />
      <CollectionsMarqueeSection locale={locale} />
      <BrandVideoSection />
      <WorldReachSection locale={locale} />
      <BusinessesSection locale={locale} />
      <HomeCTABanner locale={locale} />
      <PartnersSection locale={locale} />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#84CC16]" />
                <span className="text-sm text-gray-400">Contact Us</span>
              </div>
              <h2 className="text-4xl leading-tight md:text-5xl">
                Get In touch with us
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                Helping businesses overcome complexity, achieve growth, and
                build sustainable partnerships.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <div
              className="relative min-h-[480px] overflow-hidden md:min-h-[580px]"
              style={{ borderRadius: 40, background: "#FAFAFA" }}
            >
              <Image
                src="/images/portrait.png"
                alt="FAYZ-M team"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(45deg, #84CC16 0%, rgba(132,204,22,0) 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  Prefer to Talk to Us Directly?
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Get instant support from our team for urgent inquiries or
                  quick questions.
                </p>
                <a
                  href={siteConfig.footer.phones[0].href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:bg-gray-100"
                >
                  Call Us Now →
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
