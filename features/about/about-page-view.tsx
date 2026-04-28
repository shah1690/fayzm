import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { AboutStory } from "@/features/about/about-story";
import { CtaBanner } from "@/features/cta/cta-banner";
import { FaqSection } from "@/features/faq/faq-section";
import { PartnersSection } from "@/features/partners/partners-section";
import { StatsSection } from "@/features/stats/stats-section";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";

const galleryMotion = [
  { rotate: "-2.5deg", float: "-18px", activeRotate: "-0.5deg" },
  { rotate: "1.5deg", float: "14px", activeRotate: "0.25deg" },
  { rotate: "-0.8deg", float: "-12px", activeRotate: "1deg" },
  { rotate: "2.4deg", float: "16px", activeRotate: "0.4deg" },
  { rotate: "-1.6deg", float: "-16px", activeRotate: "-0.2deg" },
] as const;

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

      <StatsSection locale={locale} />

      {/* Kinetic image gallery */}
      <section className="about-gallery relative overflow-hidden py-7 md:py-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />
        <div className="about-gallery-track flex w-max gap-5 px-5 md:gap-6 md:px-10">
          {(["primary", "secondary"] as const).flatMap((loopId) =>
            galleryImages[locale].map((img, imageIndex) => {
              const motion = galleryMotion[imageIndex % galleryMotion.length];
              const style = {
                "--about-rotate": motion.rotate,
                "--about-float": motion.float,
                "--about-active-rotate": motion.activeRotate,
                "--about-delay": `${(imageIndex % galleryMotion.length) * 0.28}s`,
              } as CSSProperties;

              return (
                <figure
                  key={`${loopId}-${img.src}`}
                  className="about-gallery-card group relative h-[260px] w-[220px] flex-shrink-0 overflow-hidden rounded-[28px] bg-[#F4EFE8] shadow-[0_24px_70px_rgba(7,10,15,0.12)] ring-1 ring-black/5 sm:h-[320px] sm:w-[280px] md:h-[420px] md:w-[340px]"
                  style={style}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={500}
                    sizes="(min-width: 768px) 340px, (min-width: 640px) 280px, 220px"
                    quality={60}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    {...shimmerImageProps(400, 500)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003566]/28 via-transparent to-white/10 opacity-70" />
                  <figcaption className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-2 rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.alt}
                  </figcaption>
                </figure>
              );
            }),
          )}
        </div>
      </section>
      <AboutStory locale={locale} />
      <CtaBanner locale={locale} />
      <PartnersSection locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
