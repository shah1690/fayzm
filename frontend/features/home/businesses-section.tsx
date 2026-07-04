import Link from "next/link";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

const sectionContent = {
  heading: {
    en: "Our Business Divisions",
    uz: "Biznes bo'limlarimiz",
    ru: "Наши бизнес-подразделения",
    zh: "我们的业务板块",
  },
  subtitle: {
    en: "A vertically integrated cluster producing textiles, food products, and energy — built for quality and scale.",
    uz: "Tekstil, oziq-ovqat mahsulotlari va energiya ishlab chiqaruvchi vertikal integratsiyalashgan klaster.",
    ru: "Вертикально интегрированный кластер, производящий текстиль, продукты питания и энергию.",
    zh: "一个垂直一体化的产业集群，生产纺织品、食品与能源——以品质和规模为核心。",
  },
};

const divisions = [
  {
    slug: "knitting",
    label: {
      en: "Knitting",
      uz: "Trikotaj mato",
      ru: "Трикотаж",
      zh: "针织布料",
    },
    title: {
      en: "Knit Fabric Production",
      uz: "Trikotaj mato ishlab chiqarish",
      ru: "Производство трикотажной ткани",
      zh: "针织面料生产",
    },
    desc: {
      en: "Annual capacity 4,015 tons. Equipped with advanced machinery such as Taifan, Honknit, Boosan and Jacquard.",
      uz: "Yillik quvvati 4 015 tonna. Taifan, Honknit, Boosan va Jacquard kabi ilg'or uskunalar bilan jihozlangan.",
      ru: "Годовая мощность 4 015 тонн. Оснащено передовым оборудованием Taifan, Honknit, Boosan и Jacquard.",
      zh: "年产能 4,015 吨。配备 Taifan、Honknit、Boosan 与 Jacquard 等先进设备。",
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
      zh: "纱线生产",
    },
    title: {
      en: "Yarn Production",
      uz: "Ip ishlab chiqarish",
      ru: "Производство пряжи",
      zh: "纱线生产",
    },
    desc: {
      en: "Annual production capacity 9,417 tons. Fully automated RIETER (Switzerland) lines installed.",
      uz: "Yillik ishlab chiqarish quvvati 9 417 tonna. To'liq avtomatlashtirilgan RIETER (Shveysariya) liniyalari o'rnatilgan.",
      ru: "Годовая производственная мощность 9 417 тонн. Установлены полностью автоматизированные линии RIETER (Швейцария).",
      zh: "年产能 9,417 吨。配备瑞士 RIETER 全自动生产线。",
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
      zh: "服装制造",
    },
    title: {
      en: "Garment Factory",
      uz: "Tikuvchilik fabrikasi",
      ru: "Швейная фабрика",
      zh: "服装工厂",
    },
    desc: {
      en: "10 million finished garments per year. Products are exported to Poland, Turkey, Russia, Italy and Kazakhstan.",
      uz: "Yiliga 10 million dona tayyor kiyim-kechak. Mahsulotlar Polsha, Turkiya, Rossiya, Italiya va Qozog'istonga eksport qilinadi.",
      ru: "10 миллионов готовых изделий в год. Продукция экспортируется в Польшу, Турцию, Россию, Италию и Казахстан.",
      zh: "年产 1,000 万件成品服装。产品出口至波兰、土耳其、俄罗斯、意大利和哈萨克斯坦。",
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
      zh: "面粉生产",
    },
    title: {
      en: "Flour Production",
      uz: "Un ishlab chiqarish",
      ru: "Производство муки",
      zh: "面粉生产",
    },
    desc: {
      en: "Annual production capacity 29,200 tons. Supplying high-quality flour products since 2022.",
      uz: "Yillik ishlab chiqarish quvvati 29 200 tonna. 2022-yildan buyon yuqori sifatli un mahsulotlarini yetkazib bermoqda.",
      ru: "Годовая производственная мощность 29 200 тонн. С 2022 года поставляет высококачественную мучную продукцию.",
      zh: "年产能 29,200 吨。自 2022 年起持续提供高品质面粉产品。",
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
      uz: "Yoqilg'i quyish shoxobchasi",
      ru: "АЗС",
      zh: "加油站",
    },
    title: {
      en: "Petrol Station",
      uz: "Yoqilg'i quyish shoxobchasi",
      ru: "АЗС",
      zh: "加油站",
    },
    desc: {
      en: "Quality fuel supply for FAYZ-M machinery and the local community. Storage capacity: 100,000 litres.",
      uz: "FAYZ-M texnikalari va mahalliy aholi uchun sifatli yoqilg'i ta'minoti. Saqlash quvvati: 100 000 litr.",
      ru: "Качественное топливное обеспечение техники FAYZ-M и местного населения. Объём хранения: 100 000 литров.",
      zh: "为 FAYZ-M 机械与本地居民提供优质燃油供应。储油容量：10 万升。",
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
    label: {
      en: "Farm",
      uz: "Chorvachilik",
      ru: "Фермерское хозяйство",
      zh: "畜牧业",
    },
    title: {
      en: "Livestock Complex",
      uz: "Chorvachilik kompleksi",
      ru: "Животноводческий комплекс",
      zh: "畜牧综合体",
    },
    desc: {
      en: "Established in 2018. The complex raises pedigree cattle, more than 1,000 sheep, and over 20 horses.",
      uz: "2018-yilda tashkil etilgan. Majmuada zotli qoramollar, 1000 dan ortiq qo'y va 20 dan ziyod otlar parvarishlanadi.",
      ru: "Основан в 2018 году. В комплексе содержатся племенной крупный рогатый скот, более 1 000 овец и свыше 20 лошадей.",
      zh: "成立于 2018 年。综合体饲养纯种牛、超过 1,000 只羊及 20 多匹马。",
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
    label: {
      en: "Cottonseed Oil",
      uz: "Paxta yog'i",
      ru: "Хлопковое масло",
      zh: "棉籽油",
    },
    title: {
      en: "Cottonseed Oil Production",
      uz: "Paxta yog'i ishlab chiqarish",
      ru: "Производство хлопкового масла",
      zh: "棉籽油生产",
    },
    desc: {
      en: "Refined cottonseed oil from cottonseed grown in the cluster's fields. Zero-waste processing technology.",
      uz: "Klaster dalalarida yetishtirilgan chigitdan tozalangan paxta yog'i. Chiqindisiz qayta ishlash texnologiyasi.",
      ru: "Рафинированное хлопковое масло из семян, выращенных на полях кластера. Безотходная технология переработки.",
      zh: "采用集群田间种植的棉籽精炼而成的棉籽油。零废弃加工工艺。",
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
