"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/features/contact/contact-form";
import { FaqSection } from "@/features/faq/faq-section";
import { siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";

type ContactPageViewProps = Readonly<{ locale: Locale }>;

const text = {
  imageAlt: {
    en: "FAYZ-M team",
    uz: "FAYZ-M jamoasi",
    ru: "Команда FAYZ-M",
    zh: "FAYZ-M 团队",
  },
  address: {
    en: "Uzbekistan, Andijan,\nKhojaobod, Mustahkam 17",
    uz: "O'zbekiston, Andijon,\nXo'jaobod, Mustahkam 17",
    ru: "Узбекистан, Андижан,\nХоджаабад, Мустаҳкам 17",
    zh: "乌兹别克斯坦，安集延，\n霍贾阿巴德，Mustahkam 街 17 号",
  },
  mapTitle: {
    en: "FAYZ-M location",
    uz: "FAYZ-M manzili",
    ru: "Локация FAYZ-M",
    zh: "FAYZ-M 位置",
  },
} as const;

export function ContactPageView({ locale }: ContactPageViewProps) {
  const t = useTranslations("Contact");

  return (
    <main>
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          {/* Top: label + heading + description */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#003566]" />
                <span className="text-sm text-gray-400">{t("label")}</span>
              </div>
              <h1 className="text-4xl leading-tight md:text-5xl">
                {t("heading")}
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Main: image card + form */}
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            {/* Left: image with overlay */}
            <div
              className="relative min-h-[480px] overflow-hidden md:min-h-[580px]"
              style={{ borderRadius: 40, background: "#FAFAFA" }}
            >
              <Image
                src="/images/portrait.png"
                alt={text.imageAlt[locale]}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                {...shimmerImageProps(1200, 1400)}
              />
              {/* gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(45deg, #003566 0%, rgba(0,53,102,0) 60%)",
                }}
              />

              {/* bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {t("preferTalk")}
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  {t("instantSupport")}
                </p>
                <a
                  href={siteConfig.footer.phones[0].href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:bg-gray-100"
                >
                  {t("callUsNow")}
                </a>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>

          {/* Contact info cards */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Address */}
            <div className="flex flex-col gap-3 rounded-3xl bg-[#F5F5F5] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#070A0F]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                    fill="#003566"
                  />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {t("address")}
              </p>
              <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-[#070A0F]">
                {text.address[locale]}
              </p>
              <a
                href="https://maps.google.com/?q=Andijan,Khojaobod,Mustahkam+17,Uzbekistan"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-xs font-semibold text-[#003566] hover:underline"
              >
                {t("openInMaps")}
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-3 rounded-3xl bg-[#070A0F] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {t("phone")}
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+998942600000"
                  className="text-sm font-medium text-white hover:opacity-70 transition-opacity"
                >
                  +998 94 260 00 00
                </a>
                <a
                  href="tel:+998930871111"
                  className="text-sm font-medium text-white hover:opacity-70 transition-opacity"
                >
                  +998 93 087 11 11
                </a>
              </div>
              <p className="mt-auto text-xs text-white/30">
                {t("workingHours")}
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3 rounded-3xl bg-[#F5F5F5] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#070A0F]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    fill="#003566"
                  />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {t("email")}
              </p>
              <a
                href="mailto:fayz-mtex@mail.ru"
                className="text-sm font-medium text-[#070A0F] hover:text-[#003566] transition-colors break-all"
              >
                fayz-mtex@mail.ru
              </a>
              <p className="mt-auto text-xs text-gray-400">{t("replyTime")}</p>
            </div>
          </div>

          {/* Map */}
          <div
            className="mt-4 overflow-hidden rounded-3xl"
            style={{ height: 400 }}
          >
            <iframe
              title={text.mapTitle[locale]}
              src="https://yandex.uz/map-widget/v1/?um=constructor%3Adea30e4e662d40a9d40482d29fb86890300ab3083ad6f03bd6e666381c081b3d&amp;source=constructor"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <FaqSection locale={locale} />
    </main>
  );
}
