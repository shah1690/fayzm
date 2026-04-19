import Link from "next/link";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

const content = {
  eyebrow: {
    en: "Multi-Sector Textile Cluster",
    uz: "Ko'p tarmoqli to'qimachilik klasteri",
    ru: "Многоотраслевой текстильный кластер",
  },
  heading: {
    en: "Quality Textiles.\nSustainable Future.",
    uz: "Sifatli To'qimachilik.\nBarqaror Kelajak.",
    ru: "Качественный Текстиль.\nУстойчивое Будущее.",
  },
  description: {
    en: "FAYZ-M produces premium yarn, fabric, and garments — supplying global partners with consistent quality and sustainable practices.",
    uz: "FAYZ-M premium ip, mato va kiyim ishlab chiqaradi — global hamkorlarga doimiy sifat va barqaror amaliyot bilan ta'minlaydi.",
    ru: "FAYZ-M производит premium пряжу, ткань и одежду — обеспечивая глобальных партнёров стабильным качеством.",
  },
  cta: {
    en: "Get in Touch →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
  },
} as const;

const headingSizeClass: Record<Locale, string> = {
  en: "text-4xl md:text-6xl lg:text-7xl",
  uz: "text-4xl md:text-6xl lg:text-7xl",
  ru: "text-3xl md:text-5xl lg:text-6xl",
};

type Props = Readonly<{ locale: Locale }>;

export function HeroIntroSection({ locale }: Props) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-16">
          <div className="flex flex-col gap-5 md:col-span-7">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#84CC16]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                {content.eyebrow[locale]}
              </span>
            </div>
            <h1
              className={`whitespace-pre-line font-bold leading-[1.05] text-[#070A0F] ${headingSizeClass[locale]}`}
            >
              {content.heading[locale]}
            </h1>
          </div>
          <div className="flex flex-col gap-6 md:col-span-5">
            <p className="text-base leading-relaxed text-gray-500 md:text-lg">
              {content.description[locale]}
            </p>
            <Link
              href={localizeHref(locale, "/contact")}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#070A0F] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#84CC16] hover:text-[#070A0F]"
            >
              {content.cta[locale]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
