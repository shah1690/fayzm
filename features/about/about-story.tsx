import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "@/content/about";
import type { Locale } from "@/shared/i18n/translations";

type Props = Readonly<{ locale: Locale }>;

export function AboutStory({ locale }: Props) {
  const s1 = aboutContent.section1;
  const s2 = aboutContent.section2;

  return (
    <>
      {/* Section 1: heading | photo | pillars */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">

            {/* Col 1: heading + desc + cta */}
            <div className="flex flex-col justify-center gap-6">
              <h2 className="whitespace-pre-line text-4xl leading-tight text-[#070A0F] md:text-5xl">
                {s1.heading[locale]}
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">{s1.description[locale]}</p>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
              >
                {s1.cta[locale]}
              </Link>
            </div>

            {/* Col 2: photo */}
            <div className="relative h-[420px] overflow-hidden rounded-2xl md:h-auto">
              <Image
                src={s1.image}
                alt="FAYZ-M production"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Col 3: vision / mission / commitment */}
            <div className="flex flex-col divide-y divide-gray-100">
              {s1.pillars.map((pillar) => (
                <div key={pillar.title.en} className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0">
                  <h3 className="text-base font-semibold text-[#070A0F]">{pillar.title[locale]}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{pillar.text[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: heading + desc / card + photo */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">

          {/* Top: heading left + desc right */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <h2 className="whitespace-pre-line text-4xl leading-tight text-[#070A0F] md:text-5xl">
              {s2.heading[locale]}
            </h2>
            <p className="flex items-end text-sm leading-relaxed text-gray-500 md:pb-2">
              {s2.description[locale]}
            </p>
          </div>

          {/* Bottom: card left + photo right */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">

            {/* Card */}
            <div className="flex flex-col justify-between gap-8 rounded-2xl border border-gray-100 bg-[#FAFAFA] p-8">
              <div className="flex flex-col gap-6">
                <span className="text-2xl">{s2.card.icon}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl leading-snug text-[#070A0F] md:text-3xl">
                    {s2.card.title[locale]}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">{s2.card.text[locale]}</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
              >
                {s2.card.cta[locale]}
              </Link>
            </div>

            {/* Photo */}
            <div className="relative h-[360px] overflow-hidden rounded-2xl md:h-auto">
              <Image
                src={s2.image}
                alt="FAYZ-M facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
