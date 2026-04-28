import Image from "next/image";
import Link from "next/link";
import { getBusinessBySlug } from "@/content/businesses";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";
import { localizeHref } from "@/shared/lib/localize-href";

function FactoryIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <path
        d="M7 19V13L11 16V13L15 16V10H21V19H7Z"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type BusinessPageViewProps = Readonly<{
  slug: string;
  locale: Locale;
}>;

type BusinessDesign = {
  heroMediaFirst: boolean;
  insightImageFirst: boolean;
  strategyImageFirst: boolean;
  featureMode: "cards" | "list";
  quoteDark: boolean;
  ctaAlign: "left" | "right";
  heroPanelBackground: string;
  heroPanelText: string;
  heroPanelMuted: string;
  heroPanelBorder: string;
  insightBackground: string;
  quoteBackground: string;
  quoteText: string;
  quoteMuted: string;
  heroOverlay: string;
  insightOverlay: string;
  strategyOverlay: string;
  ctaOverlay: string;
  highlightIndex: number;
};

const text = {
  contactUs: {
    en: "Contact Us →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
  },
  overview: {
    en: "Overview",
    uz: "Faoliyat sharhi",
    ru: "Обзор направления",
  },
  capabilityFrame: {
    en: "Production capabilities",
    uz: "Ishlab chiqarish imkoniyatlari",
    ru: "Производственные возможности",
  },
  whatWeBuilt: {
    en: "Key strengths",
    uz: "Asosiy imkoniyatlar",
    ru: "Ключевые возможности",
  },
  clusterScale: {
    en: "Cluster scale",
    uz: "Klaster ko'lami",
    ru: "Масштаб кластера",
  },
  employees: {
    en: "Employees",
    uz: "Xodimlar",
    ru: "Сотрудники",
  },
  energy: {
    en: "Energy",
    uz: "Energiya",
    ru: "Энергия",
  },
  fitHeading: {
    en: "How this division works in the cluster",
    uz: "Bu yo'nalish klasterda qanday ishlaydi",
    ru: "Как это направление работает в кластере",
  },
  quote: {
    en: "Product quality begins with carefully selected raw materials. Every production stage is managed under one system.",
    uz: "Mahsulot sifati xom ashyoni to'g'ri tanlashdan boshlanadi. Ishlab chiqarishning har bir bosqichi yagona tizimda nazorat qilinadi.",
    ru: "Качество продукции начинается с правильного выбора сырья. Каждый этап производства контролируется в единой системе.",
  },
  employeesStat: {
    en: "Employees across all business divisions, making FAYZ-M one of largest employers in Khojaobod district.",
    uz: "Barcha yo'nalishlar bo'ylab xodimlar soni FAYZ-M ni Xo'jaobod tumanidagi yirik ish beruvchilardan biriga aylantiradi.",
    ru: "Численность сотрудников по всем направлениям делает FAYZ-M одним из крупнейших работодателей Ходжаабадского района.",
  },
  energyStat: {
    en: "2,000 kW of solar capacity has been operating since 2023, supporting a greener production chain.",
    uz: "2023 yildan beri 2 000 kW quyosh quvvati ishlamoqda; maqsad — yashil ishlab chiqarish ulushini oshirish.",
    ru: "С 2023 года работает 2 000 кВт солнечной мощности; цель — увеличить долю зелёного производства.",
  },
  partnershipHeading: {
    en: "Interested in partnership?",
    uz: "Hamkorlik qiziqtiradimi?",
    ru: "Интересует партнёрство?",
  },
  partnershipDesc: {
    en: "Partner with FAYZ-M for quality, reliable delivery, and long-term growth across integrated operations.",
    uz: "FAYZ-M bilan sifat, ishonchli yetkazib berish va integratsiyalashgan yo'nalishlar bo'ylab uzoq muddatli o'sish uchun hamkorlik qiling.",
    ru: "Сотрудничайте с FAYZ-M ради качества, надёжных поставок и долгосрочного роста во всей интегрированной системе.",
  },
  partnershipCta: {
    en: "Request a consultation →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
  },
} as const;

const designs: Record<string, BusinessDesign> = {
  knitting: {
    heroMediaFirst: true,
    insightImageFirst: false,
    strategyImageFirst: false,
    featureMode: "cards",
    quoteDark: true,
    ctaAlign: "left",
    heroPanelBackground: "#F6F1EA",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#F8FAFC",
    quoteBackground: "#070A0F",
    quoteText: "#FFFFFF",
    quoteMuted: "rgba(255,255,255,0.68)",
    heroOverlay:
      "linear-gradient(155deg, rgba(0,53,102,0.65) 0%, rgba(0,53,102,0.2) 44%, rgba(0,0,0,0.18) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.08) 0%, rgba(7,10,15,0.28) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.18) 0%, rgba(0,0,0,0.3) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(7,10,15,0.86) 0%, rgba(7,10,15,0.5) 42%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 0,
  },
  "yarn-production": {
    heroMediaFirst: false,
    insightImageFirst: true,
    strategyImageFirst: true,
    featureMode: "list",
    quoteDark: false,
    ctaAlign: "right",
    heroPanelBackground: "#070A0F",
    heroPanelText: "#FFFFFF",
    heroPanelMuted: "rgba(255,255,255,0.7)",
    heroPanelBorder: "rgba(255,255,255,0.08)",
    insightBackground: "#F4F7FB",
    quoteBackground: "#FFFFFF",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.6)",
    heroOverlay:
      "linear-gradient(140deg, rgba(7,10,15,0.18) 0%, rgba(0,53,102,0.5) 55%, rgba(7,10,15,0.76) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(0,53,102,0.08) 0%, rgba(7,10,15,0.34) 100%)",
    strategyOverlay:
      "linear-gradient(180deg, rgba(0,53,102,0.08) 0%, rgba(7,10,15,0.38) 100%)",
    ctaOverlay:
      "linear-gradient(270deg, rgba(7,10,15,0.9) 0%, rgba(7,10,15,0.52) 35%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 1,
  },
  "garment-production": {
    heroMediaFirst: true,
    insightImageFirst: true,
    strategyImageFirst: false,
    featureMode: "cards",
    quoteDark: false,
    ctaAlign: "left",
    heroPanelBackground: "#FFFFFF",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(7,10,15,0.08)",
    insightBackground: "#F5F5F5",
    quoteBackground: "#EDE6DE",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.62)",
    heroOverlay:
      "linear-gradient(145deg, rgba(0,53,102,0.28) 0%, rgba(0,0,0,0.14) 42%, rgba(7,10,15,0.72) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.06) 0%, rgba(7,10,15,0.32) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.12) 0%, rgba(7,10,15,0.42) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(0,53,102,0.84) 0%, rgba(7,10,15,0.46) 45%, rgba(7,10,15,0.06) 100%)",
    highlightIndex: 2,
  },
  flour: {
    heroMediaFirst: false,
    insightImageFirst: false,
    strategyImageFirst: true,
    featureMode: "list",
    quoteDark: true,
    ctaAlign: "right",
    heroPanelBackground: "#F3ECE3",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.64)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#FBF8F3",
    quoteBackground: "#070A0F",
    quoteText: "#FFFFFF",
    quoteMuted: "rgba(255,255,255,0.68)",
    heroOverlay:
      "linear-gradient(150deg, rgba(0,53,102,0.42) 0%, rgba(255,255,255,0.02) 35%, rgba(7,10,15,0.72) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.08) 0%, rgba(7,10,15,0.3) 100%)",
    strategyOverlay:
      "linear-gradient(170deg, rgba(0,53,102,0.1) 0%, rgba(7,10,15,0.38) 100%)",
    ctaOverlay:
      "linear-gradient(270deg, rgba(7,10,15,0.88) 0%, rgba(7,10,15,0.45) 38%, rgba(7,10,15,0.06) 100%)",
    highlightIndex: 1,
  },
  petrol: {
    heroMediaFirst: true,
    insightImageFirst: true,
    strategyImageFirst: true,
    featureMode: "cards",
    quoteDark: true,
    ctaAlign: "left",
    heroPanelBackground: "#0B1220",
    heroPanelText: "#FFFFFF",
    heroPanelMuted: "rgba(255,255,255,0.72)",
    heroPanelBorder: "rgba(255,255,255,0.08)",
    insightBackground: "#F4F6F8",
    quoteBackground: "#0B1220",
    quoteText: "#FFFFFF",
    quoteMuted: "rgba(255,255,255,0.68)",
    heroOverlay:
      "linear-gradient(140deg, rgba(7,10,15,0.08) 0%, rgba(0,53,102,0.44) 38%, rgba(7,10,15,0.84) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.06) 0%, rgba(7,10,15,0.34) 100%)",
    strategyOverlay:
      "linear-gradient(155deg, rgba(0,53,102,0.18) 0%, rgba(7,10,15,0.42) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(7,10,15,0.9) 0%, rgba(0,53,102,0.52) 45%, rgba(7,10,15,0.1) 100%)",
    highlightIndex: 3,
  },
  farm: {
    heroMediaFirst: false,
    insightImageFirst: true,
    strategyImageFirst: false,
    featureMode: "cards",
    quoteDark: false,
    ctaAlign: "right",
    heroPanelBackground: "#F6F5F1",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#F7FAFC",
    quoteBackground: "#FFFFFF",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.62)",
    heroOverlay:
      "linear-gradient(150deg, rgba(0,53,102,0.34) 0%, rgba(255,255,255,0.06) 42%, rgba(7,10,15,0.7) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.05) 0%, rgba(7,10,15,0.28) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.1) 0%, rgba(7,10,15,0.34) 100%)",
    ctaOverlay:
      "linear-gradient(270deg, rgba(7,10,15,0.88) 0%, rgba(7,10,15,0.44) 40%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 0,
  },
  "cottonseed-oil": {
    heroMediaFirst: true,
    insightImageFirst: false,
    strategyImageFirst: true,
    featureMode: "list",
    quoteDark: false,
    ctaAlign: "left",
    heroPanelBackground: "#EEE7DF",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#F6F7F8",
    quoteBackground: "#F0EBE4",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.62)",
    heroOverlay:
      "linear-gradient(145deg, rgba(0,53,102,0.28) 0%, rgba(255,255,255,0.04) 35%, rgba(7,10,15,0.78) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.06) 0%, rgba(7,10,15,0.28) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.12) 0%, rgba(7,10,15,0.36) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(7,10,15,0.86) 0%, rgba(0,53,102,0.44) 40%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 2,
  },
};

function StatCard({
  value,
  suffix,
  title,
  description,
}: Readonly<{
  value: string;
  suffix?: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[28px] border border-[#E5E7EB] bg-white p-6">
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold tracking-tight text-[#070A0F] md:text-5xl">
          {value}
        </span>
        {suffix ? (
          <span className="pb-1 text-lg font-semibold text-[#003566]/70 md:text-xl">
            {suffix}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#003566]/55">
          {title}
        </p>
        <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
    </div>
  );
}

function FeatureCards({
  features,
  locale,
  highlightIndex,
}: Readonly<{
  features: { en: string; uz: string; ru: string }[];
  locale: Locale;
  highlightIndex: number;
}>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {features.map((feature, index) => {
        const highlighted = index === highlightIndex % features.length;
        return (
          <div
            key={feature.en}
            className="flex min-h-[132px] flex-col gap-4 rounded-[28px] border p-5 transition-transform duration-300 hover:-translate-y-1"
            style={{
              background: highlighted ? "#070A0F" : "#FFFFFF",
              borderColor: highlighted ? "#070A0F" : "#E5E7EB",
            }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
              style={{
                background: highlighted ? "rgba(255,255,255,0.12)" : "#EEF3FA",
                color: highlighted ? "#FFFFFF" : "#003566",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: highlighted ? "rgba(255,255,255,0.82)" : "#6B7280",
              }}
            >
              {feature[locale]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function FeatureList({
  features,
  locale,
}: Readonly<{
  features: { en: string; uz: string; ru: string }[];
  locale: Locale;
}>) {
  return (
    <div className="rounded-[32px] border border-[#E5E7EB] bg-[#FAFAFA] p-6 md:p-7">
      <ul className="flex flex-col divide-y divide-[#E5E7EB]">
        {features.map((feature) => (
          <li key={feature.en} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#003566] text-xs font-bold text-white">
              ✓
            </span>
            <span className="text-sm leading-relaxed text-[#6B7280]">
              {feature[locale]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BusinessPageView({ slug, locale }: BusinessPageViewProps) {
  const business = getBusinessBySlug(slug);

  if (!business) {
    throw new Error(`Unknown business slug: ${slug}`);
  }

  const design = designs[business.slug] ?? designs.knitting;
  const ctaAlignClass =
    design.ctaAlign === "right"
      ? "items-start md:items-end md:text-right"
      : "items-start text-left";
  const ctaButtonClass =
    design.ctaAlign === "right" ? "md:self-end" : "self-start";

  return (
    <main>
      <section className="bg-white px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div
              className={`relative min-h-[520px] overflow-hidden rounded-[40px] md:col-span-7 md:min-h-[680px] ${design.heroMediaFirst ? "md:order-1" : "md:order-2"}`}
            >
              <Image
                src={business.image1}
                alt={business.label[locale]}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
                {...shimmerImageProps(1400, 1600)}
              />
              <div
                className="absolute inset-0"
                style={{ background: design.heroOverlay }}
              />
              <div className="absolute left-6 top-6 md:left-8 md:top-8">
                <FactoryIcon />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="max-w-xl rounded-[28px] border border-white/15 bg-black/18 p-5 backdrop-blur-md md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58">
                    {business.label[locale]}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">
                    {business.cardHeading[locale]}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/72">
                    {business.cardText[locale]}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex rounded-[40px] border p-6 md:col-span-5 md:p-8 ${design.heroMediaFirst ? "md:order-2" : "md:order-1"}`}
              style={{
                background: design.heroPanelBackground,
                borderColor: design.heroPanelBorder,
                color: design.heroPanelText,
              }}
            >
              <div className="flex w-full flex-col justify-between gap-8">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#003566]" />
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.22em]"
                      style={{ color: design.heroPanelMuted }}
                    >
                      {business.label[locale]}
                    </span>
                  </div>
                  <h1 className="max-w-[12ch] text-4xl leading-[1.02] tracking-tight md:text-6xl">
                    {business.heading[locale]}
                  </h1>
                  <p
                    className="max-w-[56ch] text-sm leading-relaxed md:text-base"
                    style={{ color: design.heroPanelMuted }}
                  >
                    {business.description[locale]}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {business.features.slice(0, 2).map((feature, index) => (
                      <div
                        key={feature.en}
                        className="rounded-[24px] border px-4 py-4"
                        style={{
                          borderColor:
                            design.heroPanelText === "#FFFFFF"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(7,10,15,0.08)",
                          background:
                            design.heroPanelText === "#FFFFFF"
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(255,255,255,0.55)",
                        }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#003566]/65">
                          0{index + 1}
                        </p>
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: design.heroPanelMuted }}
                        >
                          {feature[locale]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <p
                      className="max-w-[58ch] text-sm leading-relaxed md:text-base"
                      style={{ color: design.heroPanelMuted }}
                    >
                      {business.bodyText[locale]}
                    </p>
                    <Link
                      href={localizeHref(locale, "/contact")}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-[#003566] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#002B52]"
                    >
                      {text.contactUs[locale]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-5 py-10 md:px-10 md:py-16"
        style={{ background: design.insightBackground }}
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div
              className={`flex flex-col gap-6 md:col-span-5 ${design.insightImageFirst ? "md:order-2" : "md:order-1"}`}
            >
              <div
                className="rounded-[36px] p-6 md:p-8"
                style={{
                  background: design.quoteBackground,
                  color: design.quoteText,
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: design.quoteMuted }}
                >
                  {text.overview[locale]}
                </p>
                <p className="mt-5 text-2xl font-semibold leading-snug md:text-3xl">
                  &ldquo;{text.quote[locale]}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StatCard
                  value="1800"
                  suffix="+"
                  title={text.employees[locale]}
                  description={text.employeesStat[locale]}
                />
                <StatCard
                  value="2000"
                  suffix="kW+"
                  title={text.energy[locale]}
                  description={text.energyStat[locale]}
                />
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 md:col-span-7 ${design.insightImageFirst ? "md:order-1" : "md:order-2"}`}
            >
              <div className="relative min-h-[420px] overflow-hidden rounded-[36px] md:min-h-[520px]">
                <Image
                  src={business.image2}
                  alt={business.label[locale]}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                  {...shimmerImageProps(1400, 1000)}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: design.insightOverlay }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="max-w-[540px] rounded-[28px] bg-white/88 p-5 backdrop-blur-md md:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                      {text.clusterScale[locale]}
                    </p>
                    <h3 className="mt-3 text-2xl leading-tight text-[#070A0F] md:text-3xl">
                      {business.cardHeading[locale]}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      {business.cardText[locale]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                  {text.fitHeading[locale]}
                </p>
                <p
                  className="mt-4 max-w-[62ch] text-sm leading-relaxed md:text-base"
                  style={{ color: "#6B7280" }}
                >
                  {business.bodyText[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div
              className={`relative min-h-[420px] overflow-hidden rounded-[40px] md:col-span-5 md:min-h-[620px] ${design.strategyImageFirst ? "md:order-1" : "md:order-2"}`}
            >
              <Image
                src={business.image3}
                alt={business.label[locale]}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                {...shimmerImageProps(1200, 1500)}
              />
              <div
                className="absolute inset-0"
                style={{ background: design.strategyOverlay }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="rounded-[28px] border border-white/12 bg-black/18 p-5 backdrop-blur-md md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                    {text.capabilityFrame[locale]}
                  </p>
                  <h3 className="mt-3 text-2xl leading-tight text-white md:text-3xl">
                    {business.strategyHeading[locale]}
                  </h3>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-6 md:col-span-7 ${design.strategyImageFirst ? "md:order-2" : "md:order-1"}`}
            >
              <div className="rounded-[36px] bg-[#F8FAFC] p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                  {text.capabilityFrame[locale]}
                </p>
                <h2 className="mt-4 max-w-[14ch] text-3xl leading-[1.05] tracking-tight text-[#070A0F] md:text-5xl">
                  {business.strategyHeading[locale]}
                </h2>
                <p
                  className="mt-4 max-w-[62ch] text-sm leading-relaxed md:text-base"
                  style={{ color: "#6B7280" }}
                >
                  {business.strategyDesc[locale]}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#003566]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                    {text.whatWeBuilt[locale]}
                  </span>
                </div>
                {design.featureMode === "cards" ? (
                  <FeatureCards
                    features={business.features}
                    locale={locale}
                    highlightIndex={design.highlightIndex}
                  />
                ) : (
                  <FeatureList features={business.features} locale={locale} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative min-h-[460px] overflow-hidden rounded-[40px]">
            <Image
              src={business.ctaImage}
              alt={business.label[locale]}
              fill
              sizes="100vw"
              className="object-cover"
              {...shimmerImageProps(1600, 900)}
            />
            <div
              className="absolute inset-0"
              style={{ background: design.ctaOverlay }}
            />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div
              className={`relative z-10 flex h-full min-h-[460px] flex-col justify-between gap-8 p-8 md:p-14 ${ctaAlignClass}`}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5D6C9]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  {business.label[locale]}
                </span>
              </div>
              <div className="flex max-w-xl flex-col gap-4">
                <h2 className="text-3xl font-bold leading-[1.05] text-white md:text-5xl">
                  {text.partnershipHeading[locale]}
                </h2>
                <p className="text-sm leading-relaxed text-white/75 md:text-base">
                  {text.partnershipDesc[locale]}
                </p>
                <Link
                  href={localizeHref(locale, "/contact")}
                  className={`inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#003566] hover:text-white ${ctaButtonClass}`}
                >
                  {text.partnershipCta[locale]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
