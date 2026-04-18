import Link from "next/link";
import { getProductsByGender } from "@/content/products";
import type { Locale } from "@/shared/i18n/translations";

const t = {
  eyebrow: {
    en: "Knitwear Collections",
    uz: "Trikotaj Kolleksiyalar",
    ru: "Трикотажные Коллекции",
  },
  heading: {
    en: "Crafted for every body.",
    uz: "Har kimga mo'ljallangan.",
    ru: "Создано для каждого.",
  },
  sub: {
    en: "Premium cotton knitwear — made in Uzbekistan, worn worldwide.",
    uz: "Premium paxta trikotaji — O'zbekistonda ishlab chiqarilgan, butun dunyoda kiyiladi.",
    ru: "Премиум хлопковый трикотаж — сделано в Узбекистане, носят по всему миру.",
  },
  women: {
    en: "Women's Collection",
    uz: "Ayollar kolleksiyasi",
    ru: "Женская коллекция",
  },
  men: {
    en: "Men's Collection",
    uz: "Erkaklar kolleksiyasi",
    ru: "Мужская коллекция",
  },
};

type Props = Readonly<{ locale: Locale }>;

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CollectionsMarqueeSection({ locale }: Props) {
  const womenImages = getProductsByGender("women").map((p) => ({
    src: p.image,
    alt: p.name,
    href: `/collections/women/${p.slug}`,
  }));
  const menImages = getProductsByGender("men").map((p) => ({
    src: p.image,
    alt: p.name,
    href: `/collections/men/${p.slug}`,
  }));

  // Duplicate for seamless loop — key includes copy index for uniqueness
  const row1 = ["a", "b", "c"].flatMap((copy) =>
    womenImages.map((img) => ({ ...img, key: `${copy}-${img.src}` })),
  );
  const row2 = ["a", "b", "c"].flatMap((copy) =>
    menImages.map((img) => ({ ...img, key: `${copy}-${img.src}` })),
  );

  return (
    <section className="relative overflow-hidden bg-[#070A0F] py-16">
      {/* Marquee rows */}
      <div className="flex flex-col gap-3 opacity-60">
        {/* Row 1 — left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex gap-3">
            {row1.map((img) => (
              <div
                key={img.key}
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 160, height: 210, borderRadius: 16 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex gap-3">
            {row2.map((img) => (
              <div
                key={img.key}
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 160, height: 210, borderRadius: 16 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left-to-right fade mask */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10"
        style={{
          background:
            "linear-gradient(to right, #070A0F 30%, transparent 100%)",
        }}
      />
      {/* Right-to-left fade mask */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/4 z-10"
        style={{
          background: "linear-gradient(to left, #070A0F 20%, transparent 100%)",
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center px-10 md:px-16">
        <div className="max-w-md">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#84CC16]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#84CC16]">
              {t.eyebrow[locale]}
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
            {t.heading[locale]}
          </h2>

          {/* Sub */}
          <p className="mb-8 text-sm leading-relaxed text-white/50">
            {t.sub[locale]}
          </p>

          {/* CTA links */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/collections/women"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] transition-all duration-200 hover:bg-[#84CC16]"
            >
              {t.women[locale]}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href="/collections/men"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
            >
              {t.men[locale]}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
