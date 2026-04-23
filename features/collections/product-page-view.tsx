"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProductData } from "@/content/products";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";
import { localizeHref } from "@/shared/lib/localize-href";

const t = {
  backToCollection: { en: "Collection", uz: "Kolleksiya", ru: "Коллекция" },
  fabric: { en: "Fabric", uz: "Mato", ru: "Ткань" },
  composition: { en: "Composition", uz: "Tarkib", ru: "Состав" },
  weight: { en: "Weight", uz: "Og'irlik", ru: "Вес" },
  sizes: {
    en: "Available Sizes",
    uz: "Mavjud o'lchamlar",
    ru: "Доступные размеры",
  },
  cta: { en: "Request Order", uz: "Buyurtma berish", ru: "Оставить заявку" },
  ctaSub: {
    en: "We'll get back to you within 24 hours",
    uz: "24 soat ichida javob beramiz",
    ru: "Ответим в течение 24 часов",
  },
  collections: { en: "Collections", uz: "Kolleksiyalar", ru: "Коллекции" },
  women: { en: "Women", uz: "Ayollar", ru: "Женщины" },
  men: { en: "Men", uz: "Erkaklar", ru: "Мужчины" },
  madeIn: {
    en: "Made in Uzbekistan",
    uz: "O'zbekistonda ishlab chiqarilgan",
    ru: "Сделано в Узбекистане",
  },
};

const specTranslations = {
  "French terry": {
    en: "French terry",
    uz: "Fransuz terri",
    ru: "Френч терри",
  },
  "Rib knit": { en: "Rib knit", uz: "Rib trikotaj", ru: "Рибана" },
  Interlock: { en: "Interlock", uz: "Interlok", ru: "Интерлок" },
  "Single jersey": {
    en: "Single jersey",
    uz: "Single jersey",
    ru: "Кулирная гладь",
  },
  "Purl knit": { en: "Purl knit", uz: "Purl trikotaj", ru: "Изнаночная вязка" },
  "Fine knit": { en: "Fine knit", uz: "Nozik trikotaj", ru: "Тонкий трикотаж" },
  "Tricot knit": { en: "Tricot knit", uz: "Triko trikotaj", ru: "Трико" },
  Fleece: { en: "Fleece", uz: "Flis", ru: "Флис" },
  "100% cotton": { en: "100% cotton", uz: "100% paxta", ru: "100% хлопок" },
  "95% cotton / 5% elastane": {
    en: "95% cotton / 5% elastane",
    uz: "95% paxta / 5% elastan",
    ru: "95% хлопок / 5% эластан",
  },
  "80% cotton / 20% polyester": {
    en: "80% cotton / 20% polyester",
    uz: "80% paxta / 20% poliester",
    ru: "80% хлопок / 20% полиэстер",
  },
  "90% polyester / 10% elastane": {
    en: "90% polyester / 10% elastane",
    uz: "90% poliester / 10% elastan",
    ru: "90% полиэстер / 10% эластан",
  },
} as const;

function localizeSpec(value: string, locale: Locale): string {
  const entry = specTranslations[value as keyof typeof specTranslations];
  return entry ? entry[locale] : value;
}

type Props = Readonly<{ product: ProductData; locale: Locale }>;

export function ProductPageView({ product, locale }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const collectionHref = localizeHref(locale, `/collections/${product.gender}`);
  const collectionLabel =
    product.gender === "women" ? t.women[locale] : t.men[locale];

  return (
    <main className="min-h-[calc(100vh-76px)] px-5 py-6 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-400">
          <Link
            href={localizeHref(locale, "/collections")}
            className="hover:text-[#070A0F] transition-colors"
          >
            {t.collections[locale]}
          </Link>
          <span>/</span>
          <Link
            href={collectionHref}
            className="hover:text-[#070A0F] transition-colors"
          >
            {collectionLabel}
          </Link>
          <span>/</span>
          <span className="text-[#070A0F] font-medium">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div
          className="flex flex-col gap-6 md:flex-row md:gap-8"
          style={{ minHeight: "calc(100vh - 160px)" }}
        >
          {/* Left: image */}
          <div
            className="relative w-full overflow-hidden md:w-[55%]"
            style={{ borderRadius: 32, minHeight: 480 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="55vw"
              className="absolute inset-0 object-cover"
              {...shimmerImageProps(1200, 1400)}
            />

            {/* Made in Uzbekistan tag */}
            <div className="absolute left-5 top-5">
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#003566]" />
                <span className="text-xs font-medium text-white">
                  {t.madeIn[locale]}
                </span>
              </div>
            </div>

            {/* Product name watermark */}
            <div className="absolute bottom-5 right-5">
              <p
                className="text-6xl font-black leading-none opacity-10 select-none"
                style={{ color: "white" }}
              >
                {product.name}
              </p>
            </div>
          </div>

          {/* Right: details */}
          <div className="flex w-full flex-col md:w-[45%]">
            {/* Top section */}
            <div className="flex-1">
              {/* Collection tag */}
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {collectionLabel}
                </span>
              </div>

              {/* Name */}
              <h1 className="mb-4 text-4xl font-black tracking-tight text-[#070A0F] md:text-5xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="mb-8 text-base leading-relaxed text-gray-500">
                {product.description[locale]}
              </p>

              {/* Specs */}
              <div className="mb-8 grid grid-cols-3 gap-3">
                {[
                  {
                    label: t.fabric[locale],
                    value: localizeSpec(product.specs.fabric, locale),
                  },
                  {
                    label: t.composition[locale],
                    value: localizeSpec(product.specs.composition, locale),
                  },
                  { label: t.weight[locale], value: product.specs.weight },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-2xl bg-[#F5F5F5] p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {spec.label}
                    </p>
                    <p className="text-sm font-semibold text-[#070A0F]">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sizes */}
              <div className="mb-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {t.sizes[locale]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(size === selectedSize ? null : size)
                      }
                      className="flex h-11 min-w-[44px] items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all duration-200"
                      style={
                        selectedSize === size
                          ? {
                              background: "#070A0F",
                              color: "white",
                              border: "2px solid #070A0F",
                            }
                          : {
                              background: "#F5F5F5",
                              color: "#070A0F",
                              border: "2px solid transparent",
                            }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-[28px] bg-[#070A0F] p-6">
              {/* Decorative lime dot */}
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
                style={{ background: "#003566" }}
              />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-white">
                    {t.cta[locale]}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    {t.ctaSub[locale]}
                  </p>
                </div>
                <Link
                  href={`${localizeHref(locale, "/contact")}?product=${encodeURIComponent(product.name)}`}
                  className="flex-shrink-0 rounded-full bg-[#003566] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#070A0F]"
                >
                  {t.cta[locale]} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
