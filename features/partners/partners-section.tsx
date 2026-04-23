import Image from "next/image";
import { partners } from "@/content/partners";
import type { Locale } from "@/shared/i18n/translations";
import { translations } from "@/shared/i18n/translations";

type PartnersSectionProps = Readonly<{ locale: Locale }>;

export function PartnersSection({ locale }: PartnersSectionProps) {
  const t = translations.partners;
  const doubled = [0, 1].flatMap((copyIndex) =>
    partners.map((partner) => ({
      ...partner,
      marqueeKey: `${copyIndex}-${partner.name}`,
    })),
  );

  return (
    <section className="relative overflow-hidden bg-[#F5F5F5] py-16 md:py-20 lg:py-24">
      <Image
        src="/images/pattern.svg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        unoptimized
        className="pointer-events-none absolute inset-0 object-cover"
        style={{ filter: "brightness(0)", opacity: 0.05 }}
      />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-20">
          {/* Left: label + text */}
          <div className="flex-shrink-0 md:w-72 lg:w-80">
            <h2 className="text-2xl font-bold tracking-tight text-[#070A0F] md:text-3xl">
              {t.title[locale]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500 md:mt-5 md:text-lg">
              {t.subtitle[locale]}
            </p>
          </div>

          {/* Right: marquee */}
          <div className="relative min-w-0 flex-1 overflow-hidden py-2 md:py-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F5F5] to-transparent md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F5F5] to-transparent md:w-20" />

            <div className="flex animate-marquee gap-20 py-3 md:gap-24 md:py-5">
              {doubled.map((partner) => (
                <div
                  key={partner.marqueeKey}
                  className="flex flex-shrink-0 items-center opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={60}
                    className="h-28 w-auto object-contain md:h-32"
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
