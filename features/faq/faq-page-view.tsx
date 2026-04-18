import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { faqContent } from "@/content/faq";
import type { Locale } from "@/shared/i18n/translations";

type FaqPageViewProps = Readonly<{ locale: Locale }>;

export function FaqPageView({ locale }: FaqPageViewProps) {
  const t = faqContent[locale];

  return (
    <main className="min-h-screen bg-white px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* Left */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-4">
              <h1 className="whitespace-pre-line text-4xl font-semibold leading-tight text-[#070A0F] md:text-5xl">
                {t.title}
              </h1>
              <p className="text-sm text-gray-500">{t.subtitle}</p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[#070A0F]">{t.stillHaveQuestions}</h2>
              <p className="text-sm leading-relaxed text-gray-500">{t.stillHaveDesc}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#070A0F] transition-opacity hover:opacity-60"
              >
                {t.scheduleCall}
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <Accordion items={t.items} />
          </div>
        </div>
      </div>
    </main>
  );
}
