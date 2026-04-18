import Link from "next/link";
import { ctaContent } from "@/content/stats";
import type { Locale } from "@/shared/i18n/translations";

function StatValue({ value, className }: { value: string; className: string }) {
  const [base, ...rest] = value.split("+");
  const hasPlus = rest.length > 0;
  return (
    <p className={className}>
      {base}
      {hasPlus && <span style={{ opacity: 0.35 }}>+</span>}
    </p>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L10.5 7.5L17 9L10.5 10.5L9 17L7.5 10.5L1 9L7.5 7.5L9 1Z" fill="#84CC16" />
    </svg>
  );
}

function MiniChart() {
  const gridCols = [0, 50, 100, 150, 200];
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
    >
      {/* vertical grid lines */}
      {gridCols.map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}

      {/* fill under curve */}
      <path
        d="M0 70 C20 70 30 45 55 38 C75 32 85 58 110 48 C135 38 150 18 175 12 C185 9 195 6 200 4 L200 80 L0 80 Z"
        fill="url(#chartFill)"
      />

      {/* line */}
      <path
        d="M0 70 C20 70 30 45 55 38 C75 32 85 58 110 48 C135 38 150 18 175 12 C185 9 195 6 200 4"
        stroke="#84CC16"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#84CC16" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type CtaBannerProps = Readonly<{ locale: Locale }>;

export function CtaBanner({ locale }: CtaBannerProps) {
  const t = ctaContent;

  return (
    <section className="px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="relative overflow-hidden p-8 md:p-12"
          style={{ background: "#1A2E1A", borderRadius: 40 }}
        >
          {/* radial glow */}
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #84CC16 0%, transparent 70%)" }}
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            {/* Left: text + CTA */}
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <SparkleIcon />
                  <span className="text-sm text-gray-400">{t.label[locale]}</span>
                </div>
                <h2
                  className="whitespace-pre-line text-4xl leading-tight text-white md:text-5xl"
                >
                  {t.heading[locale]}
                </h2>
                <p className="text-sm leading-relaxed text-gray-400">{t.description[locale]}</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:bg-gray-100"
              >
                {t.cta[locale]}
              </Link>
            </div>

            {/* Right: stat cards grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4">

              {/* Card 1: big left — energy + edge-to-edge chart */}
              <div
                className="row-span-2 flex flex-col overflow-hidden rounded-[24px]"
                style={{ background: "#243824" }}
              >
                {/* text top */}
                <div className="p-5 pb-3">
                  <StatValue value={t.card1.value} className="text-3xl font-bold text-white" />
                  <p className="mt-1 text-sm text-gray-400">{t.card1.label[locale]}</p>
                </div>
                {/* chart flush to bottom + sides */}
                <div className="mt-auto flex items-end" style={{ marginBottom: -1 }}>
                  <MiniChart />
                </div>
              </div>

              {/* Card 2: employees with avatars */}
              <div
                className="flex flex-col justify-between rounded-[24px] p-5"
                style={{ background: "#243824" }}
              >
                {/* stacked avatars */}
                <div className="flex">
                  {["#8BB8C8", "#C49A9A", "#8B9E8B", "#84CC16"].map((c, i) => (
                    <div
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold text-white"
                      style={{
                        background: c,
                        borderColor: "#243824",
                        marginLeft: i === 0 ? 0 : -10,
                        zIndex: 10 - i,
                      }}
                    >
                      {i === 3 ? "+" : ""}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <StatValue value={t.card2.value} className="text-2xl font-bold text-white" />
                  <p className="mt-0.5 text-xs leading-snug text-gray-400">{t.card2.label[locale]}</p>
                </div>
              </div>

              {/* Card 3: partners */}
              <div
                className="flex flex-col justify-end rounded-[24px] p-5"
                style={{ background: "#243824" }}
              >
                <StatValue value={t.card3.value} className="text-2xl font-bold text-white" />
                <p className="mt-0.5 text-xs text-gray-400">{t.card3.label[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
