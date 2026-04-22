import Image from "next/image";
import Link from "next/link";
import { getHomeCtaBusiness } from "@/content/businesses";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

const text = {
  heading: {
    en: "Interested in Partnership?",
    uz: "Hamkorlik qilishni xohlaysizmi?",
    ru: "Заинтересованы в партнёрстве?",
  },
  desc: {
    en: "Partner with FAYZ-M for consistent quality, reliable delivery, and long-term growth across every division.",
    uz: "FAYZ-M bilan hamkorlik qiling — doimiy sifat, ishonchli yetkazib berish va barcha yo'nalishlarda uzoq muddatli o'sish.",
    ru: "Сотрудничайте с FAYZ-M — стабильное качество, надёжные поставки и долгосрочный рост во всех направлениях.",
  },
  cta: {
    en: "Request a Consultation",
    uz: "Bog'lanish",
    ru: "Связаться",
  },
};

type Props = Readonly<{ locale: Locale }>;

export function HomeCTABanner({ locale }: Props) {
  const business = getHomeCtaBusiness(locale);

  return (
    <section className="px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: 40, minHeight: 480 }}
        >
          <Image
            src={business.ctaImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(7,10,15,0.85) 0%, rgba(7,10,15,0.55) 40%, rgba(7,10,15,0.15) 70%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #003566 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div
            className="relative z-10 flex h-full flex-col justify-end gap-6 p-8 md:p-14"
            style={{ minHeight: 480 }}
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5D6C9]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
                {business.label[locale]}
              </span>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-[1.1] text-white md:text-5xl">
              {text.heading[locale]}
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              {text.desc[locale]}
            </p>

            <Link
              href={localizeHref(locale, "/contact")}
              className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:bg-[#003566] hover:text-white"
            >
              {text.cta[locale]}
              <span
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
