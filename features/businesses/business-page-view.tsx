import Link from "next/link";
import { getBusinessBySlug } from "@/content/businesses";
import { getLocale } from "@/shared/lib/get-locale";

function FactoryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M7 19V13L11 16V13L15 16V10H21V19H7Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type BusinessPageViewProps = Readonly<{ slug: string }>;

export async function BusinessPageView({ slug }: BusinessPageViewProps) {
  const locale = await getLocale();
  const business = getBusinessBySlug(slug);

  if (!business) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Business not found.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">

          {/* Top: label + heading / description */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#84CC16]" />
                <span className="text-sm text-gray-400">{business.label[locale]}</span>
              </div>
              <h1 className="whitespace-pre-line text-4xl leading-tight md:text-5xl">
                {business.heading[locale]}
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                {business.description[locale]}
              </p>
            </div>
          </div>

          {/* Main: 2 columns */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Left: image card with gradient overlay */}
            <div
              className="relative min-h-[500px] overflow-hidden md:min-h-[600px]"
              style={{ borderRadius: 40 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={business.image1}
                alt={business.label[locale]}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(45deg, #84CC16 0%, rgba(132,204,22,0) 55%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute left-6 top-6">
                <FactoryIcon />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="whitespace-pre-line text-2xl font-bold text-white md:text-3xl">
                  {business.cardHeading[locale]}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {business.cardText[locale]}
                </p>
              </div>
            </div>

            {/* Right: image + text + CTA */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[320px] overflow-hidden rounded-[32px] md:h-[380px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={business.image2}
                  alt={business.label[locale]}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-5 px-1">
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6B7280" }}>
                  {business.bodyText[locale]}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
                >
                  Contact Us →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quote + Stats section */}
      <section className="bg-[#F5F5F5] py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">

            {/* Quote + author */}
            <div className="flex flex-col justify-between gap-8">
              <p className="text-2xl font-semibold leading-snug text-[#070A0F] md:text-3xl">
                &ldquo;Quality starts at the source — from cotton field to finished product, every step is controlled.&rdquo;
              </p>
            </div>

            {/* Stat 1 */}
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
              <p className="text-5xl font-bold text-[#070A0F]">
                1500<span style={{ opacity: 0.35 }}>+</span>
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                Employees across all business divisions, making FAYZ-M one of the largest employers in the Khodjaabad district.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
              <p className="text-5xl font-bold text-[#070A0F]">
                900<span className="text-3xl" style={{ opacity: 0.35 }}>kw+</span>
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                Solar energy capacity operational since 2023, with a target of 2 megawatts and 100% green energy production.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Strategy + Features section */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            {/* Left: heading + desc + checklist */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl leading-tight md:text-4xl">{business.strategyHeading[locale]}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{business.strategyDesc[locale]}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[#070A0F]">
                  {locale === "uz" ? "Nima qildik" : locale === "ru" ? "Что мы сделали" : "What We Did"}
                </p>
                <ul className="flex flex-col gap-3">
                  {business.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#6B7280" }}>
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#84CC16] text-white text-xs">✓</span>
                      {f[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Right: image */}
            <div className="relative h-[400px] overflow-hidden rounded-[32px] md:h-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={business.image3} alt={business.label[locale]} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner section */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden" style={{ borderRadius: 40, minHeight: 320 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/k4.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(45deg, #84CC16 0%, rgba(132,204,22,0.7) 40%, rgba(0,0,0,0.3) 100%)" }} />
            <div className="relative z-10 flex flex-col gap-4 p-10 md:max-w-xl md:p-14">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="white"/></svg>
                <span className="text-sm text-white/80">{business.label[locale]}</span>
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {locale === "uz" ? "O'xshash imkoniyatlar kerakmi?" : locale === "ru" ? "Нужны похожие возможности?" : "Interested in Partnership?"}
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                {locale === "uz" ? "FAYZ-M bilan hamkorlik qiling — sifat, ishonchlilik va barqarorlik." : locale === "ru" ? "Сотрудничайте с FAYZ-M — качество, надёжность и устойчивость." : "Partner with FAYZ-M for quality, reliability, and sustainable long-term growth."}
              </p>
              <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all hover:bg-gray-100">
                {locale === "uz" ? "Bog'lanish →" : locale === "ru" ? "Связаться →" : "Request a Consultation →"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
