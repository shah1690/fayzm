"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AboutStory } from "@/features/about/about-story";
import { CtaBanner } from "@/features/cta/cta-banner";
import { FaqSection } from "@/features/faq/faq-section";
import { PartnersSection } from "@/features/partners/partners-section";
import { StatsSection } from "@/features/stats/stats-section";
import type { Locale } from "@/shared/i18n/translations";

const galleryImages = {
  en: [
    { src: "/images/about-hero.png", alt: "FAYZ-M production complex" },
    { src: "/images/g1.jpg", alt: "Garment production at FAYZ-M" },
    { src: "/images/k1.jpg", alt: "Textile production at FAYZ-M" },
    { src: "/images/eco.jpg", alt: "FAYZ-M green energy facility" },
    { src: "/images/g2.jpg", alt: "FAYZ-M garment workshop" },
    { src: "/images/g3.jpg", alt: "FAYZ-M sewing line" },
    { src: "/images/k2.jpg", alt: "FAYZ-M knitting workshop" },
    { src: "/images/k3.jpg", alt: "FAYZ-M textile machinery" },
    { src: "/images/y1.jpg", alt: "FAYZ-M yarn production" },
    { src: "/images/y2.jpg", alt: "FAYZ-M spinning facility" },
  ],
  uz: [
    { src: "/images/about-hero.png", alt: "FAYZ-M ishlab chiqarish majmuasi" },
    { src: "/images/g1.jpg", alt: "FAYZ-M tikuvchilik ishlab chiqarishi" },
    { src: "/images/k1.jpg", alt: "FAYZ-M to'qimachilik ishlab chiqarishi" },
    { src: "/images/eco.jpg", alt: "FAYZ-M yashil energiya majmuasi" },
    { src: "/images/g2.jpg", alt: "FAYZ-M tikuv sexi" },
    { src: "/images/g3.jpg", alt: "FAYZ-M tikuv liniyasi" },
    { src: "/images/k2.jpg", alt: "FAYZ-M trikotaj sexi" },
    { src: "/images/k3.jpg", alt: "FAYZ-M to'qimachilik uskunalari" },
    { src: "/images/y1.jpg", alt: "FAYZ-M ip ishlab chiqarishi" },
    { src: "/images/y2.jpg", alt: "FAYZ-M yigiruv majmuasi" },
  ],
  ru: [
    { src: "/images/about-hero.png", alt: "Производственный комплекс FAYZ-M" },
    { src: "/images/g1.jpg", alt: "Швейное производство FAYZ-M" },
    { src: "/images/k1.jpg", alt: "Текстильное производство FAYZ-M" },
    { src: "/images/eco.jpg", alt: "Объект зелёной энергии FAYZ-M" },
    { src: "/images/g2.jpg", alt: "Швейный цех FAYZ-M" },
    { src: "/images/g3.jpg", alt: "Швейная линия FAYZ-M" },
    { src: "/images/k2.jpg", alt: "Трикотажный цех FAYZ-M" },
    { src: "/images/k3.jpg", alt: "Текстильное оборудование FAYZ-M" },
    { src: "/images/y1.jpg", alt: "Производство пряжи FAYZ-M" },
    { src: "/images/y2.jpg", alt: "Прядильный комплекс FAYZ-M" },
  ],
} as const;

type AboutPageViewProps = Readonly<{ locale: Locale }>;

export function AboutPageView({ locale }: AboutPageViewProps) {
  const t = useTranslations("About");

  return (
    <main>
      {/* Hero */}
      <section className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          {/* Top: label + heading + quote */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary-500" />
                <span className="text-body-sm text-grey-400">{t("label")}</span>
              </div>
              <h1 className="text-5xl md:text-6xl">{t("heading")}</h1>
            </div>

            <div className="flex flex-col justify-end gap-4">
              <svg
                width="48"
                height="40"
                viewBox="0 0 48 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M0 40V24C0 17.333 1.667 11.833 5 7.5C8.333 3.167 13.333 0.667 20 0V6.5C16.667 7.167 14.083 8.75 12.25 11.25C10.417 13.75 9.5 16.667 9.5 20H20V40H0ZM28 40V24C28 17.333 29.667 11.833 33 7.5C36.333 3.167 41.333 0.667 48 0V6.5C44.667 7.167 42.083 8.75 40.25 11.25C38.417 13.75 37.5 16.667 37.5 20H48V40H28Z"
                  fill="#E9E9E9"
                />
              </svg>
              <p className="text-body-lg leading-relaxed text-grey-500">
                <strong className="font-semibold text-grey-800">
                  {t("quote")}
                </strong>{" "}
                <span className="text-primary-400">{t("quoteContinued")}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image gallery — full width, touches edges */}
      <div className="mt-12 flex gap-4 overflow-x-auto pb-4 md:mt-16">
        {galleryImages[locale].map((img) => (
          <div
            key={img.src}
            className="h-[320px] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl first:ml-5 last:mr-5 md:h-[420px] md:w-[340px] md:first:ml-10 md:last:mr-10"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={500}
              sizes="(min-width: 768px) 340px, 280px"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <StatsSection locale={locale} />
      <AboutStory locale={locale} />
      <CtaBanner locale={locale} />
      <PartnersSection locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
