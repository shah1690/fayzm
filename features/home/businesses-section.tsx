import Link from "next/link";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

const sectionContent = {
  heading: {
    en: "Our Business Divisions",
    uz: "Biznes bo'limlarimiz",
    ru: "Наши бизнес-подразделения",
  },
  subtitle: {
    en: "A vertically integrated cluster producing textiles, food products, and energy — built for quality and scale.",
    uz: "Tekstil, oziq-ovqat mahsulotlari va energiya ishlab chiqaruvchi vertikal integratsiyalashgan klaster.",
    ru: "Вертикально интегрированный кластер, производящий текстиль, продукты питания и энергию.",
  },
};

const divisions = [
  {
    slug: "knitting",
    label: { en: "Knitting", uz: "Trikotaj", ru: "Трикотаж" },
    title: { en: "Knitting", uz: "Trikotaj", ru: "Трикотаж" },
    desc: {
      en: "4,000 tons of quality fabric annually. Equipment from TAYFAN, HonKnit & Boosan.",
      uz: "Yiliga 4 000 tonna sifatli mato. TAYFAN, HonKnit va Boosan jihozlari.",
      ru: "4 000 тонн тканей в год. Оборудование от TAYFAN, HonKnit и Boosan.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3 3h18v4l-6 5v9H9v-9L3 7V3z" />
      </svg>
    ),
  },
  {
    slug: "yarn-production",
    label: {
      en: "Yarn Production",
      uz: "Ip ishlab chiqarish",
      ru: "Производство пряжи",
    },
    title: {
      en: "Yarn Production",
      uz: "Ip ishlab chiqarish",
      ru: "Производство пряжи",
    },
    desc: {
      en: "9,417 tons of yarn per year. 24-ton daily capacity spinning mill launched in 2022.",
      uz: "Yiliga 9 417 tonna ip. 2022 yilda ishga tushirilgan 24 tonna/kunlik zavod.",
      ru: "9 417 тонн пряжи в год. Прядильная фабрика мощностью 24 т/сут запущена в 2022 году.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c0 0 4 4 4 9s-4 9-4 9" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    slug: "garment-production",
    label: {
      en: "Garment Production",
      uz: "Tikuvchilik",
      ru: "Швейное производство",
    },
    title: {
      en: "Garment Production",
      uz: "Tikuvchilik",
      ru: "Швейное производство",
    },
    desc: {
      en: "7 million garments per year. Exported to Poland, Turkey, Russia, Italy & Kazakhstan.",
      uz: "Yiliga 7 million kiyim. Polsha, Turkiya, Rossiya, Italiya va Qozog'istonga eksport.",
      ru: "7 миллионов изделий в год. Экспорт в Польшу, Турцию, Россию, Италию и Казахстан.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
  },
  {
    slug: "flour",
    label: {
      en: "Flour Production",
      uz: "Un ishlab chiqarish",
      ru: "Производство муки",
    },
    title: {
      en: "Flour Production",
      uz: "Un ishlab chiqarish",
      ru: "Производство муки",
    },
    desc: {
      en: "14,600 tons of flour per year. Modern milling with strict quality and hygiene standards.",
      uz: "Yiliga 14 600 tonna un. Qat'iy sifat va gigiyena standartlariga mos zamonaviy tegirmon.",
      ru: "14 600 тонн муки в год. Современный помол со строгим контролем качества.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 2a4 4 0 014 4v2H8V6a4 4 0 014-4z" />
        <path d="M8 8v12a2 2 0 002 2h4a2 2 0 002-2V8" />
        <path d="M6 8h12" />
      </svg>
    ),
  },
  {
    slug: "petrol",
    label: {
      en: "Petrol Station",
      uz: "Yoqilg'i stansiyasi",
      ru: "Автозаправка",
    },
    title: {
      en: "Petrol Station",
      uz: "Yoqilg'i stansiyasi",
      ru: "Автозаправка",
    },
    desc: {
      en: "Fuel supply for the cluster's fleet and surrounding community. Reliable energy infrastructure.",
      uz: "Klaster transporti va atrofdagi jamiyat uchun yoqilg'i ta'minoti.",
      ru: "Топливное обеспечение автопарка кластера и окружающего сообщества.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16" />
        <path d="M3 22h12" />
        <path d="M15 8h2a2 2 0 012 2v3a2 2 0 002 2h0v5a2 2 0 01-2 2h0a2 2 0 01-2-2v-5" />
        <path d="M7 6v4h4V6" />
      </svg>
    ),
  },
  {
    slug: "farm",
    label: { en: "Farm", uz: "Dehqonchilik", ru: "Сельское хозяйство" },
    title: {
      en: "Farm & Agriculture",
      uz: "Dehqonchilik",
      ru: "Сельское хозяйство",
    },
    desc: {
      en: "Cultivating cotton and crops to feed the cluster's raw material supply chain sustainably.",
      uz: "Klasterning xom ashyo ta'minot zanjirini barqaror ta'minlash uchun paxta va ekinlar yetishtiriladi.",
      ru: "Выращивание хлопка и культур для устойчивого снабжения сырьём кластера.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 22V12" />
        <path d="M12 12C12 12 7 10 5 6c4 0 7 2 7 6z" />
        <path d="M12 12c0 0 5-2 7-6-4 0-7 2-7 6z" />
        <path d="M5 22h14" />
      </svg>
    ),
  },
  {
    slug: "cottonseed-oil",
    label: { en: "Cottonseed Oil", uz: "Paxta moyi", ru: "Хлопковое масло" },
    title: { en: "Cottonseed Oil", uz: "Paxta moyi", ru: "Хлопковое масло" },
    desc: {
      en: "Refined cottonseed oil production from cluster-grown cotton. Zero-waste processing approach.",
      uz: "Klasterda yetishtirilgan paxtadan tozalangan paxta moyi. Chiqindisiz qayta ishlash.",
      ru: "Рафинированное хлопковое масло из хлопка кластера. Безотходная переработка.",
    },
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 2l3.5 7h-7L12 2z" />
        <path d="M8.5 9C8.5 9 6 11 6 14a6 6 0 0012 0c0-3-2.5-5-2.5-5" />
      </svg>
    ),
  },
];

type Props = Readonly<{ locale: Locale }>;

export function BusinessesSection({ locale }: Props) {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl md:text-4xl">
            {sectionContent.heading[locale]}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
            {sectionContent.subtitle[locale]}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {divisions.map((div) => (
            <Link
              key={div.slug}
              href={localizeHref(locale, `/businesses/${div.slug}`)}
              className="group flex flex-col justify-between gap-8 rounded-[24px] bg-[#F5F5F5] p-6 transition-all duration-200 hover:bg-[#EAEAEA]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#070A0F]">
                {div.icon}
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#070A0F]">
                  {div.title[locale]}
                </p>
                <p className="text-sm leading-relaxed text-gray-500">
                  {div.desc[locale]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
