import Link from "next/link";
import { ctaContent } from "@/content/stats";
import type { Locale } from "@/shared/i18n/translations";
import { loc, type SectionContent } from "@/shared/lib/home-content";
import { localizeHref } from "@/shared/lib/localize-href";

const avatarSwatches = [
  { color: "#8BB8C8", label: "" },
  { color: "#C49A9A", label: "" },
  { color: "#8B9E8B", label: "" },
  { color: "#003566", label: "+" },
] as const;

const CARD_BG = "#121218";

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

function MiniChart() {
  const gridCols = [0, 50, 100, 150, 200];
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {gridCols.map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="80"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      <path
        d="M0 70 C20 70 30 45 55 38 C75 32 85 58 110 48 C135 38 150 18 175 12 C185 9 195 6 200 4 L200 80 L0 80 Z"
        fill="url(#chartFill)"
      />

      <path
        d="M0 70 C20 70 30 45 55 38 C75 32 85 58 110 48 C135 38 150 18 175 12 C185 9 195 6 200 4"
        stroke="#003566"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <linearGradient
          id="chartFill"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#003566" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#003566" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type CtaBannerProps = Readonly<{ locale: Locale; cms?: SectionContent }>;

export function CtaBanner({ locale, cms }: CtaBannerProps) {
  const t = ctaContent;

  return (
    <section className="px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="relative overflow-hidden p-8 md:p-12"
          style={{ background: "#070A0F", borderRadius: 40 }}
        >
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #003566 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5D6C9]" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                    {loc(cms?.label, t.label[locale], locale)}
                  </span>
                </div>
                <h2 className="whitespace-pre-line text-3xl font-bold leading-[1.1] text-white md:text-5xl">
                  {loc(cms?.heading, t.heading[locale], locale)}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                  {loc(cms?.description, t.description[locale], locale)}
                </p>
              </div>
              <Link
                href={localizeHref(locale, "/contact")}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:bg-[#003566] hover:text-white"
              >
                {loc(cms?.cta, t.cta[locale], locale)}
              </Link>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div
                className="row-span-2 flex flex-col overflow-hidden rounded-[24px] border border-white/5"
                style={{ background: CARD_BG }}
              >
                <div className="p-5 pb-3">
                  <StatValue
                    value={t.card1.value}
                    className="text-3xl font-bold text-white"
                  />
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                    {t.card1.label[locale]}
                  </p>
                </div>
                <div
                  className="mt-auto flex items-end"
                  style={{ marginBottom: -1 }}
                >
                  <MiniChart />
                </div>
              </div>

              <div
                className="flex flex-col justify-between rounded-[24px] border border-white/5 p-5"
                style={{ background: CARD_BG }}
              >
                <div className="flex">
                  {avatarSwatches.map((avatar, index) => (
                    <div
                      key={avatar.color}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold text-white"
                      style={{
                        background: avatar.color,
                        borderColor: CARD_BG,
                        marginLeft: index === 0 ? 0 : -10,
                        zIndex: 10 - index,
                      }}
                    >
                      {avatar.label}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <StatValue
                    value={t.card2.value}
                    className="text-2xl font-bold text-white"
                  />
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-white/40">
                    {t.card2.label[locale]}
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col justify-end rounded-[24px] border border-white/5 p-5"
                style={{ background: CARD_BG }}
              >
                <StatValue
                  value={t.card3.value}
                  className="text-2xl font-bold text-white"
                />
                <p className="mt-0.5 text-xs uppercase tracking-wider text-white/40">
                  {t.card3.label[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
