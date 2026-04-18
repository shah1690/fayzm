import Image from "next/image";
import { partners } from "@/content/partners";
import { translations } from "@/shared/i18n/translations";
import type { Locale } from "@/shared/i18n/translations";

type PartnersSectionProps = Readonly<{ locale: Locale }>;

export function PartnersSection({ locale }: PartnersSectionProps) {
  const t = translations.partners;
  const doubled = [...partners, ...partners];

  return (
    <section className="bg-[#F5F5F5] py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
          {/* Left: label + text */}
          <div className="flex-shrink-0 md:w-56">
            <h2 className="text-lg font-semibold text-[#070A0F]">{t.title[locale]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{t.subtitle[locale]}</p>
          </div>

          {/* Right: marquee */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#F5F5F5] to-transparent" />

            <div className="flex animate-marquee gap-16 py-2">
              {doubled.map((partner, i) => (
                <div key={i} className="flex flex-shrink-0 items-center opacity-60 transition-opacity duration-300 hover:opacity-100">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={60}
                    className="h-24 w-auto object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
