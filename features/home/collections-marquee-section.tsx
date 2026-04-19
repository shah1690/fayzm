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

type Props = Readonly<{ locale: Locale }>;

const NUM_COLS = 12;
const IMG_W = 230;
const IMG_H = 300;
const GAP = 12;

export function CollectionsMarqueeSection({ locale }: Props) {
  const all = [...getProductsByGender("women"), ...getProductsByGender("men")];

  // Fisher-Yates shuffle with per-column LCG seed
  const shuffle = (arr: typeof all, seed: number) => {
    const out = [...arr];
    let s = seed >>> 0;
    for (let i = out.length - 1; i > 0; i--) {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      const j = s % (i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const columns = Array.from({ length: NUM_COLS }, (_, ci) =>
    shuffle(all, (ci + 1) * 2654435761),
  );

  return (
    <section
      className="relative overflow-hidden bg-[#070A0F]"
      style={{ height: 520 }}
    >
      {/* Columns grid — rotated 30° clockwise, oversized to fill section */}
      <div
        className="absolute flex opacity-60"
        style={{
          gap: GAP,
          top: "-120%",
          bottom: "-120%",
          left: "-50%",
          right: "-50%",
          transform: "rotate(30deg)",
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      >
        {columns.map((col) => {
          const colKey = col.map((p) => p.id).join("-");
          const items = [0, 1].flatMap((copy) =>
            col.map((p) => ({ ...p, _key: `${p.id}-c${copy}` })),
          );
          const ci = columns.indexOf(col);
          const seed = (ci * 2654435761) >>> 0;
          const cls =
            seed % 2 === 0 ? "animate-marquee-up" : "animate-marquee-down";
          return (
            <div
              key={colKey}
              className="flex-shrink-0 overflow-hidden"
              style={{ width: IMG_W }}
            >
              <div className={`flex flex-col ${cls}`} style={{ gap: GAP }}>
                {items.map((p) => (
                  <div
                    key={p._key}
                    className="flex-shrink-0 overflow-hidden"
                    style={{ width: IMG_W, height: IMG_H, borderRadius: 16 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top & bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
        style={{
          background: "linear-gradient(to bottom, #070A0F, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
        style={{ background: "linear-gradient(to top, #070A0F, transparent)" }}
      />

      {/* Left fade + content */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[45%]"
        style={{
          background: "linear-gradient(to right, #070A0F 60%, transparent)",
        }}
      />

      {/* Text */}
      <div className="absolute inset-y-0 left-0 z-30 flex max-w-[calc(100vw-2.5rem)] items-center px-10 md:max-w-none md:px-16">
        <div className="min-w-0">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#84CC16]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#84CC16]">
                {t.eyebrow[locale]}
              </span>
            </div>
            <h2 className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
              {t.heading[locale]}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-white/50">
              {t.sub[locale]}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/collections/women"
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] transition-all duration-200 hover:bg-[#84CC16] sm:w-auto"
            >
              {t.women[locale]}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href="/collections/men"
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 sm:w-auto"
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
