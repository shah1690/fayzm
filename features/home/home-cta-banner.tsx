import Image from "next/image";
import Link from "next/link";
import { businesses } from "@/content/businesses";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

const text = {
  heading: {
    en: "Interested in Partnership?",
    uz: "Hamkorlik qilishni xohlaysizmi?",
    ru: "Заинтересованы в партнёрстве?",
  },
  desc: {
    en: "Partner with FAYZ-M for quality, reliability, and sustainable long-term growth.",
    uz: "FAYZ-M bilan hamkorlik qiling — sifat, ishonchlilik va barqaror o'sish.",
    ru: "Сотрудничайте с FAYZ-M — качество, надёжность и устойчивый рост.",
  },
  cta: {
    en: "Request a Consultation →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
  },
};

type Props = Readonly<{ locale: Locale }>;

export function HomeCTABanner({ locale }: Props) {
  const business = businesses[Math.floor(Math.random() * businesses.length)];

  return (
    <section className="px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: 40, minHeight: 460 }}
        >
          <Image
            src={business.ctaImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(45deg, #84CC16 0%, rgba(132,204,22,0.7) 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />

          <div
            className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14"
            style={{ minHeight: 460 }}
          >
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
                  fill="white"
                />
              </svg>
              <span className="text-sm text-white/80">
                {business.label[locale]}
              </span>
            </div>

            <div className="flex max-w-xl flex-col gap-4">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {text.heading[locale]}
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                {text.desc[locale]}
              </p>
              <Link
                href={localizeHref(locale, "/contact")}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all hover:bg-gray-100"
              >
                {text.cta[locale]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
