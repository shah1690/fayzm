import type { Locale } from "@/shared/i18n/translations";

export type BusinessData = {
  slug: string;
  label: { en: string; uz: string; ru: string };
  heading: { en: string; uz: string; ru: string };
  description: { en: string; uz: string; ru: string };
  cardHeading: { en: string; uz: string; ru: string };
  cardText: { en: string; uz: string; ru: string };
  bodyText: { en: string; uz: string; ru: string };
  strategyHeading: { en: string; uz: string; ru: string };
  strategyDesc: { en: string; uz: string; ru: string };
  features: { en: string; uz: string; ru: string }[];
  image1: string;
  image2: string;
  image3: string;
  ctaImage: string;
};

const img = {
  k1: "/images/k1.jpg",
  k2: "/images/k2.jpg",
  k3: "/images/k3.jpg",
  k4: "/images/k4.jpg",
  k5: "/images/k5.jpg",
  k6: "/images/k6.jpg",
  eco: "/images/eco.jpg",
  portrait: "/images/portrait.png",
  // yarn
  y1: "/images/y1.jpg",
  y2: "/images/y2.jpg",
  y3: "/images/y3.jpg",
  // garment
  g1: "/images/g1.jpg",
  g2: "/images/g2.jpg",
  g3: "/images/g3.jpg",
  // flour & oil
  f1: "/images/f1.jpg",
  f2: "/images/f2.jpg",
  f3: "/images/f3.jpg",
  oil1: "/images/oil1.jpg",
  // petrol
  p1: "/images/p1.jpg",
  p2: "/images/p2.jpg",
  p3: "/images/p3.jpg",
  // farm
  farm1: "/images/farm1.jpg",
  farm2: "/images/farm2.jpg",
  farm3: "/images/farm3.jpg",
  // cta images
  kCta: "/images/k-cta.jpg",
  yCta: "/images/y-cta.jpg",
  gCta: "/images/g-cta.jpg",
  fCta: "/images/f-cta.jpg",
  pCta: "/images/p-cta.jpg",
  farmCta: "/images/farm-cta.jpg",
  oilCta: "/images/oil-cta.jpg",
};

export const businesses: BusinessData[] = [
  {
    slug: "knitting",
    label: { en: "Knitting", uz: "Trikotaj mato", ru: "Трикотаж" },
    heading: {
      en: "Quality Knitting For Every Need",
      uz: "Trikotaj mato",
      ru: "Качественный трикотаж для любых нужд",
    },
    description: {
      en: "A key link in the production chain, ensuring deep cotton processing and high-quality textile materials. USD 3 million invested in equipment from TAYFAN, HonKnit, and Boosan.",
      uz: "Bu yo'nalish ishlab chiqarish zanjirining muhim bo'g'ini bo'lib, Taifan, Honknit, Boosan va Jacquard uskunalari bilan jihozlangan. Yillik ishlab chiqarish quvvati 4 015 tonna.",
      ru: "Ключевое звено цепочки производства. Инвестиции 3 млн USD с оборудованием TAYFAN, HonKnit и Boosan.",
    },
    cardHeading: {
      en: "4,015 Tons Annual Fabric Production",
      uz: "Yiliga 4 015 tonna mato",
      ru: "4 015 тонн тканей в год",
    },
    cardText: {
      en: "50 skilled employees producing fabrics to international standards for the cluster's garment division and global markets.",
      uz: "Taifan, Honknit, Boosan va Jacquard uskunalari bilan jihozlangan bo'lim yiliga 4 015 tonna mato ishlab chiqaradi.",
      ru: "50 сотрудников производят ткани по международным стандартам.",
    },
    bodyText: {
      en: "This division produces fabric for FAYZ-M garments. It helps the cluster keep production stable, fast, and fully controlled from material to finished product.",
      uz: "Bu bo'lim FAYZ-M kiyimlari uchun mato ishlab chiqaradi. Shu orqali klasterda jarayon barqaror, tez va xom ashyodan tayyor mahsulotgacha nazoratda bo'ladi.",
      ru: "Это направление производит ткани для изделий FAYZ-M. Благодаря этому производство в кластере остаётся стабильным, быстрым и контролируемым от сырья до готового продукта.",
    },
    strategyHeading: {
      en: "Production Capabilities & Investment",
      uz: "Ishlab chiqarish imkoniyatlari",
      ru: "Производственные возможности и инвестиции",
    },
    strategyDesc: {
      en: "Built over 2012–2017 with a USD 3 million investment, the knitting division uses state-of-the-art equipment to deliver consistent, high-quality fabric at scale.",
      uz: "Trikotaj mato bo'limi zamonaviy uskunalar yordamida barqaror va sifatli mato ishlab chiqaradi.",
      ru: "Построенное в 2012–2017 годах с инвестициями 3 млн USD, трикотажное подразделение использует современное оборудование.",
    },
    features: [
      {
        en: "Equipped with modern knitting machinery",
        uz: "Zamonaviy trikotaj mato uskunalari bilan jihozlangan",
        ru: "Оснащено современным трикотажным оборудованием",
      },
      {
        en: "Partnered with TAYFAN, HonKnit & Boosan",
        uz: "Taifan, Honknit, Boosan va Jacquard uskunalari bilan jihozlangan",
        ru: "Партнёрство с TAYFAN, HonKnit и Boosan",
      },
      {
        en: "4,015 tons of quality fabric produced annually",
        uz: "Yillik ishlab chiqarish quvvati 4 015 tonna",
        ru: "4 015 тонн качественных тканей в год",
      },
      {
        en: "50 employees with internal skills training program",
        uz: "50 xodim, ichki malaka oshirish dasturi mavjud",
        ru: "50 сотрудников с внутренней программой обучения",
      },
    ],
    image1: img.k1,
    image2: img.k2,
    image3: img.k3,
    ctaImage: img.kCta,
  },
  {
    slug: "yarn-production",
    label: {
      en: "Yarn Production",
      uz: "Ip ishlab chiqarish",
      ru: "Производство пряжи",
    },
    heading: {
      en: "9,417 Tons Production Capacity",
      uz: "Ishlab chiqarish quvvati 9417 tonna",
      ru: "Производственная мощность 9 417 тонн",
    },
    description: {
      en: "Commissioned in 2023 via a presidential initiative with Swiss partner RIETER. USD 15 million invested, with 300 employees on fully automated production lines.",
      uz: "2023 yilda Shveytsariyaning RIETER kompaniyasi bilan hamkorlikda ishga tushirilgan. 300 xodim to'liq avtomatlashtirilgan liniyalarda ishlaydi.",
      ru: "Введено в 2023 году по президентской инициативе с швейцарским партнёром RIETER. Инвестиции 15 млн USD, 300 сотрудников, полностью автоматизированные линии.",
    },
    cardHeading: {
      en: "9,417 Tons Production Capacity",
      uz: "Ishlab chiqarish quvvati 9417 tonna",
      ru: "Производственная мощность 9 417 тонн",
    },
    cardText: {
      en: "Fully automated RIETER equipment produces yarn to international standards for the cluster's knitting and garment production.",
      uz: "To'liq avtomatlashtirilgan RIETER uskunalari bilan yillik ishlab chiqarish quvvati 9 417 tonnani tashkil etadi.",
      ru: "Автоматизированное оборудование RIETER производит пряжу по международным стандартам для трикотажного и швейного направлений кластера.",
    },
    bodyText: {
      en: "The spinning mill creates a self-sustaining internal supply chain, providing consistent yarn quality for the cluster's knitting and garment production, reducing import dependency.",
      uz: "Egrish zavodi klasterning trikotaj va tikuvchilik ishlab chiqarishi uchun izchil ip sifatini ta'minlab, import qaramligini kamaytiradi.",
      ru: "Прядильная фабрика создаёт самодостаточную внутреннюю цепочку поставок для трикотажного и швейного производства.",
    },
    strategyHeading: {
      en: "World-Class Spinning Technology",
      uz: "Jahon darajasidagi egrish texnologiyasi",
      ru: "Мировые технологии прядения",
    },
    strategyDesc: {
      en: "Partnered with RIETER — Switzerland's leading spinning technology company — FAYZ-M operates one of Central Asia's most modern yarn production facilities, commissioned through a presidential initiative.",
      uz: "Shveytsariyaning yetakchi egrish texnologiyasi kompaniyasi RIETER bilan hamkorlikda FAYZ-M Markaziy Osiyodagi eng zamonaviy ip ishlab chiqarish zavodlaridan birini boshqaradi.",
      ru: "В партнёрстве с RIETER — ведущей швейцарской компанией прядильных технологий — FAYZ-M управляет одним из самых современных производств пряжи в Центральной Азии.",
    },
    features: [
      {
        en: "Annual production capacity is 9,417 tons",
        uz: "Yillik ishlab chiqarish quvvati 9 417 tonna",
        ru: "Годовая производственная мощность — 9 417 тонн",
      },
      {
        en: "Commissioned 2023 under presidential initiative with RIETER",
        uz: "2023 yilda RIETER bilan prezidentlik tashabbusi doirasida ishga tushirildi",
        ru: "Введено в 2023 году по президентской инициативе с RIETER",
      },
      {
        en: "300 employees on fully automated production lines",
        uz: "To'liq avtomatlashtirilgan liniyalarda 300 xodim",
        ru: "300 сотрудников на полностью автоматизированных линиях",
      },
      {
        en: "Supplies yarn to internal knitting and garment production",
        uz: "Ichki trikotaj va tikuvchilik yo'nalishlariga ip yetkazadi",
        ru: "Поставляет пряжу во внутренние трикотажное и швейное направления",
      },
    ],
    image1: img.y1,
    image2: img.y2,
    image3: img.y3,
    ctaImage: img.yCta,
  },
  {
    slug: "garment-production",
    label: {
      en: "Garment Production",
      uz: "Tikuvchilik",
      ru: "Швейное производство",
    },
    heading: {
      en: "10 Million Garments Produced Annually",
      uz: "Yiliga 10 million dona kiyim",
      ru: "10 миллионов изделий в год",
    },
    description: {
      en: "The final and most critical stage in FAYZ-M's fully integrated chain. Over 700 workers produce everyday and seasonal clothing for men, women, and children.",
      uz: "FAYZ-M ning to'liq integratsiyalashgan zanjirining yakuniy va eng muhim bosqichi. 700 dan ortiq ishchi erkaklar, ayollar va bolalar uchun kiyim tikadi.",
      ru: "Завершающий и важнейший этап интегрированной цепочки FAYZ-M. Более 700 рабочих производят одежду для мужчин, женщин и детей.",
    },
    cardHeading: {
      en: "From Fiber to Finished Garment",
      uz: "Toladan tayyor kiyimgacha",
      ru: "От волокна до готового изделия",
    },
    cardText: {
      en: "European and Asian machinery, automated cutting systems, in-house design centers, and multi-level quality inspection at every production stage.",
      uz: "Yevropa va Osiyo mashinalari, avtomatlashtirilgan kesish tizimlari, ichki dizayn markazlari va ko'p bosqichli sifat nazorati.",
      ru: "Европейское и азиатское оборудование, автоматизированные системы кройки, собственные дизайн-центры и многоуровневый контроль качества.",
    },
    bodyText: {
      en: "Garments are exported to Russia, Turkey, Italy, Poland, Kazakhstan, and other countries. The majority of workers are women from local communities who receive professional training within the division.",
      uz: "Kiyimlar Rossiya, Turkiya, Italiya, Polsha, Qozog'iston va boshqa mamlakatlarga eksport qilinadi. Ishchilarning aksariyati kasb tayyorgarligini olgan mahalliy ayollar.",
      ru: "Изделия экспортируются в Россию, Турцию, Италию, Польшу, Казахстан. Большинство работников — женщины из местных сообществ, получившие профессиональную подготовку.",
    },
    strategyHeading: {
      en: "Vertically Integrated Garment Manufacturing",
      uz: "Vertikal integratsiyalashgan tikuvchilik",
      ru: "Вертикально интегрированное швейное производство",
    },
    strategyDesc: {
      en: "Using yarn and fabric sourced entirely from FAYZ-M's own knitting and yarn divisions, every garment is produced with full supply chain traceability and environmentally compliant materials.",
      uz: "FAYZ-M ning o'z trikotaj mato va ip bo'limlaridan olingan materiallar asosida har bir kiyim to'liq kuzatiladigan ta'minot zanjiri orqali ishlab chiqariladi.",
      ru: "Используя пряжу и ткани собственных подразделений, каждое изделие производится с полной прослеживаемостью и экологичными материалами.",
    },
    features: [
      {
        en: "10 million finished knitwear units produced annually",
        uz: "Yiliga 10 million dona tayyor trikotaj mahsulot",
        ru: "10 миллионов готовых трикотажных изделий в год",
      },
      {
        en: "Over 700 workers, majority women from local communities",
        uz: "700 dan ortiq xodim, asosan mahalliy ayollar",
        ru: "Более 700 работников, большинство — местные женщины",
      },
      {
        en: "Exports to Russia, Turkey, Italy, Poland, Kazakhstan",
        uz: "Rossiya, Turkiya, Italiya, Polsha, Qozog'istonga eksport",
        ru: "Экспорт в Россию, Турцию, Италию, Польшу, Казахстан",
      },
      {
        en: "Customizable styling, design, and color for B2B orders",
        uz: "B2B buyurtmalar uchun moslashuvchan uslub, dizayn va rang",
        ru: "Индивидуальный стиль, дизайн и цвет для B2B заказов",
      },
    ],
    image1: img.g1,
    image2: img.g2,
    image3: img.g3,
    ctaImage: img.gCta,
  },
  {
    slug: "flour",
    label: {
      en: "Flour Production",
      uz: "Un ishlab chiqarish",
      ru: "Производство муки",
    },
    heading: {
      en: "29,200 Tons Annual Flour Production",
      uz: "Yillik ishlab chiqarish 29 200 tonna",
      ru: "29 200 тонн муки в год",
    },
    description: {
      en: "Started operations in 2022. Total project value is USD 1.2 million, with annual production capacity of 29,200 tons.",
      uz: "2022 yilda o'z faoliyatini boshlagan. Umumiy qiymati 1 mln 200 ming dollar. Yillik ishlab chiqarish quvvati 29 200 tonna.",
      ru: "Начало работу в 2022 году. Общая стоимость проекта — 1,2 млн долларов США, годовая мощность — 29 200 тонн.",
    },
    cardHeading: {
      en: "29,200 Tons Per Year",
      uz: "Yiliga 29 200 tonna",
      ru: "29 200 тонн в год",
    },
    cardText: {
      en: "The flour division turns wheat into stable, high-quality flour for local supply and cluster needs.",
      uz: "Un ishlab chiqarish bo'limi bug'doyni sifatli unga aylantirib, mahalliy ta'minot va klaster ehtiyojlariga xizmat qiladi.",
      ru: "Мельничное направление перерабатывает пшеницу в качественную муку для местного снабжения и нужд кластера.",
    },
    bodyText: {
      en: "50 full-time employees operate the mill year-round. Raw materials come from the cluster's own grain fields, ensuring full traceability from field to bag, with primary output serving domestic consumption.",
      uz: "50 doimiy xodim tegirmonni yil davomida boshqaradi. Xom ashyo klasterning o'z don dalalaridan olinadi, asosiy mahsulot ichki iste'molga yo'naltiriladi.",
      ru: "50 постоянных сотрудников работают круглый год. Сырьё с собственных полей кластера, основная продукция — для внутреннего потребления.",
    },
    strategyHeading: {
      en: "Farm-to-Mill Integration",
      uz: "Daladan tegirmongacha integratsiya",
      ru: "Интеграция от поля до мельницы",
    },
    strategyDesc: {
      en: "With wheat grown on-site at the FAYZ-M farm and milled locally, the flour division demonstrates the cluster's commitment to full vertical integration — controlling quality from cultivation to final product.",
      uz: "Bug'doy FAYZ-M xo'jaligida yetishtiriladi va mahalliy tegirmonda tortiladi — sifat daladan tayyor mahsulotgacha nazorat qilinadi.",
      ru: "Пшеница выращивается на ферме FAYZ-M и перемалывается на месте — полный контроль качества от выращивания до готового продукта.",
    },
    features: [
      {
        en: "Started operations in 2022",
        uz: "2022 yilda o'z faoliyatini boshlagan",
        ru: "Начало работу в 2022 году",
      },
      {
        en: "Annual production capacity is 29,200 tons",
        uz: "Yillik ishlab chiqarish quvvati 29 200 tonna",
        ru: "Годовая производственная мощность — 29 200 тонн",
      },
      {
        en: "50 employees, wheat sourced from cluster's own farm",
        uz: "50 xodim, bug'doy klasterning o'z xo'jaligidan",
        ru: "50 сотрудников, пшеница с собственной фермы кластера",
      },
      {
        en: "Laboratory quality testing and strict hygiene standards",
        uz: "Laboratoriya sifat sinovlari va qat'iy gigiyena standartlari",
        ru: "Лабораторный контроль качества и строгие стандарты гигиены",
      },
    ],
    image1: img.f1,
    image2: img.f2,
    image3: img.f3,
    ctaImage: img.fCta,
  },
  {
    slug: "petrol",
    label: {
      en: "Petrol Station",
      uz: "Yoqilg'i quyish shoxobchasi",
      ru: "АЗС",
    },
    heading: {
      en: "100,000 Litre Fuel Storage Capacity",
      uz: "100 000 litr yoqilg'i saqlash quvvati",
      ru: "Хранилище топлива на 100 000 литров",
    },
    description: {
      en: "Serves the cluster's machinery and helps cover local community fuel needs. Storage capacity is 100,000 litres.",
      uz: "Klasterning texnikalari va mahalliy aholi ehtiyojlari uchun yoqilg'i ta'minotini yo'lga qo'yadi. Saqlash quvvati — 100 000 litr.",
      ru: "Обслуживает технику кластера и помогает закрывать потребности местного населения в топливе. Вместимость хранения — 100 000 литров.",
    },
    cardHeading: {
      en: "Strategic Fuel Infrastructure",
      uz: "Ishonchli yoqilg'i ta'minoti",
      ru: "Стратегическая топливная инфраструктура",
    },
    cardText: {
      en: "100,000-litre fuel storage helps keep production transport and local service needs supplied without interruption.",
      uz: "100 000 litr yoqilg'i saqlash quvvati ishlab chiqarish texnikalari va mahalliy ehtiyojlarni uzluksiz ta'minlashga yordam beradi.",
      ru: "Хранилище на 100 000 литров помогает бесперебойно обеспечивать производственный транспорт и местные потребности.",
    },
    bodyText: {
      en: "The station supports daily operations by serving FAYZ-M equipment and nearby residents from one reliable fuel point.",
      uz: "Shoxobcha FAYZ-M texnikalari va yaqin atrofdagi aholiga bir joydan ishonchli yoqilg'i xizmati ko'rsatadi.",
      ru: "Станция поддерживает ежедневную работу, обслуживая технику FAYZ-M и жителей рядом из одной надёжной точки.",
    },
    strategyHeading: {
      en: "Reliable Fuel Supply",
      uz: "Ishonchli yoqilg'i ta'minoti",
      ru: "Надёжное топливное обеспечение",
    },
    strategyDesc: {
      en: "With 100,000 litres of storage capacity, the station keeps cluster machinery and local community fuel needs covered.",
      uz: "100 000 litr saqlash quvvati klaster texnikalari va mahalliy aholi ehtiyojlarini qondirishga xizmat qiladi.",
      ru: "Вместимость 100 000 литров помогает закрывать потребности техники кластера и местного населения.",
    },
    features: [
      {
        en: "Serves FAYZ-M production machinery",
        uz: "FAYZ-M ishlab chiqarish texnikalariga xizmat qiladi",
        ru: "Обслуживает производственную технику FAYZ-M",
      },
      {
        en: "100,000-litre modern storage capacity",
        uz: "100 000 litr zamonaviy saqlash quvvati",
        ru: "Современное хранилище на 100 000 литров",
      },
      {
        en: "Up to 35,000 litres distributed to local community",
        uz: "Mahalliy jamoaga 35 000 litrgacha tarqatiladi",
        ru: "До 35 000 л распределяется местному сообществу",
      },
      {
        en: "7 employees, 24-hour operations",
        uz: "7 xodim, 24 soatlik ish",
        ru: "7 сотрудников, круглосуточная работа",
      },
    ],
    image1: img.p1,
    image2: img.p2,
    image3: img.p3,
    ctaImage: img.pCta,
  },
  {
    slug: "farm",
    label: { en: "Farm", uz: "Chorvachilik", ru: "Фермерское хозяйство" },
    heading: {
      en: "Zokirjon Ota — Livestock & Agriculture",
      uz: "Zokirjon Ota — Chorvachilik",
      ru: "Зокиржон Ота — Животноводство и сельское хозяйство",
    },
    description: {
      en: "Established in 2018. Includes 200 pedigree cows and 100 bulls from Switzerland and the Netherlands, more than 1,000 pedigree sheep, and over 20 horses from Poland.",
      uz: "2018 yilda tashkil etilgan. Shveytsariya va Niderlandiyadan keltirilgan 200 ta zotli sigir, 100 ta buqa, 1000 dan ortiq zotli qo'y hamda Polshadan keltirilgan 20 dan ortiq ot mavjud.",
      ru: "Основано в 2018 году. Включает 200 племенных коров и 100 быков из Швейцарии и Нидерландов, более 1 000 племенных овец и более 20 лошадей из Польши.",
    },
    cardHeading: {
      en: "Premium Livestock From Europe",
      uz: "Yevropadan premium chorva",
      ru: "Племенной скот из Европы",
    },
    cardText: {
      en: "The livestock operation brings together cattle, sheep, and horses imported from Europe for stable meat and dairy production.",
      uz: "Chorvachilik xo'jaligi Yevropadan keltirilgan qoramol, qo'y va otlarni birlashtirib, go'sht va sut mahsulotlari yetishtirishga xizmat qiladi.",
      ru: "Животноводческое хозяйство объединяет крупный рогатый скот, овец и лошадей из Европы для стабильного производства мяса и молока.",
    },
    bodyText: {
      en: "The farm supports 13 permanent jobs and aims to provide the local population with affordable, high-quality, and consistent meat and dairy products — contributing to regional food security alongside the cluster's cotton and grain operations.",
      uz: "Chorvachilik xo'jaligi 13 doimiy ish o'rni yaratadi va mahalliy aholiga sifatli va barqaror go'sht hamda sut mahsulotlari yetkazib berishni maqsad qiladi.",
      ru: "Ферма создаёт 13 постоянных рабочих мест и обеспечивает местное население качественными мясными и молочными продуктами.",
    },
    strategyHeading: {
      en: "Integrated Agricultural Operations",
      uz: "Integratsiyalashgan qishloq xo'jaligi operatsiyalari",
      ru: "Интегрированные сельскохозяйственные операции",
    },
    strategyDesc: {
      en: "Started with 30 cattle and expanded to 1,300+ livestock across multiple species. The farm produces its own fodder through maize-barley crop rotation.",
      uz: "30 ta qoramoldan boshlangan xo'jalik bir nechta tur bo'yicha 1 300 dan ortiq chorva boshiga kengaydi. Ozuqa makkajo'xori-arpa almashlab ekish orqali yetishtiriladi.",
      ru: "Начав с 30 голов скота, ферма расширилась до 1 300+ животных разных видов. Корма выращиваются через чередование кукурузы и ячменя.",
    },
    features: [
      {
        en: "200 pedigree cows + 100 bulls from Switzerland & Netherlands",
        uz: "Shveytsariya va Niderlandiyadan 200 ta zotli sigir + 100 ta buqa",
        ru: "200 племенных коров + 100 быков из Швейцарии и Нидерландов",
      },
      {
        en: "1,000+ pedigree sheep + 20+ horses from Poland",
        uz: "1000 dan ortiq zotli qo'y + Polshadan 20 dan ortiq ot",
        ru: "1 000+ племенных овец + 20+ лошадей из Польши",
      },
      {
        en: "Self-sustained fodder via maize-barley crop rotation",
        uz: "Makkajo'xori-arpa almashlab ekish orqali o'z ozuqa ishlab chiqarishi",
        ru: "Собственное производство кормов через севооборот",
      },
      {
        en: "13 permanent jobs, food security for local community",
        uz: "13 doimiy ish o'rni, mahalliy jamoa uchun oziq-ovqat xavfsizligi",
        ru: "13 постоянных рабочих мест, продовольственная безопасность",
      },
    ],
    image1: img.farm1,
    image2: img.farm2,
    image3: img.farm3,
    ctaImage: img.farmCta,
  },
  {
    slug: "cottonseed-oil",
    label: { en: "Cottonseed Oil", uz: "Paxta yog'i", ru: "Хлопковое масло" },
    heading: {
      en: "7,300 Tons of Cottonseed Oil Per Year",
      uz: "Yiliga 7 300 tonna paxta yog'i",
      ru: "7 300 тонн хлопкового масла в год",
    },
    description: {
      en: "A vital part of FAYZ-M's vertically integrated value chain. Cottonseed from the cluster's own fields is processed into refined cottonseed oil, meal, hulls, and technical components — zero waste.",
      uz: "FAYZ-M ning vertikal integratsiyalashgan qiymat zanjirining muhim qismi. Klasterning o'z dalalaridan olingan chigit tozalangan paxta yog'i, kunjara, qobiq va texnik komponentlarga chiqindisiz qayta ishlanadi.",
      ru: "Важная часть вертикально интегрированной цепочки FAYZ-M. Хлопковые семена с собственных полей перерабатываются в рафинированное масло, шрот, шелуху и технические компоненты без отходов.",
    },
    cardHeading: {
      en: "Zero-Waste Cotton Processing",
      uz: "Chiqindisiz paxta qayta ishlash",
      ru: "Безотходная переработка хлопка",
    },
    cardText: {
      en: "7,300 tons of cottonseed oil annually. By-products — meal and hulls — used as animal feed. Full circular economy from field to finished product.",
      uz: "Yiliga 7 300 tonna paxta yog'i. Qo'shimcha mahsulotlar — kunjara va qobiq — chorva ozuqasi sifatida ishlatiladi.",
      ru: "7 300 тонн масла в год. Побочные продукты — шрот и шелуха — идут на корм скоту. Полная циклическая экономика.",
    },
    bodyText: {
      en: "The cottonseed oil division supports national food industry resilience through resource control and environmental efficiency. Output is primarily sold on domestic markets, with growing export potential as production scales.",
      uz: "Paxta yog'i bo'limi resurs nazorati va ekologik samaradorlik orqali milliy oziq-ovqat sanoatining barqarorligini qo'llab-quvvatlaydi.",
      ru: "Подразделение поддерживает устойчивость национальной пищевой промышленности через контроль ресурсов и экологическую эффективность.",
    },
    strategyHeading: {
      en: "Full Vertical Integration From Field to Bottle",
      uz: "Daladan idishgacha to'liq vertikal integratsiya",
      ru: "Полная вертикальная интеграция от поля до бутылки",
    },
    strategyDesc: {
      en: "Cottonseed from FAYZ-M's own farm is processed with zero waste — oil for food, meal and hulls for animal feed at the cluster's farm.",
      uz: "FAYZ-M ning o'z xo'jaligidan olingan chigit moy ishlab chiqarish zavodida chiqindisiz qayta ishlanadi — yog' oziq-ovqat uchun, kunjara va qobiq esa chorva ozuqasi uchun ishlatiladi.",
      ru: "Хлопковые семена с фермы FAYZ-M перерабатываются без отходов — масло для питания, шрот и шелуха на корм скоту фермы кластера.",
    },
    features: [
      {
        en: "7,300 tons of refined cottonseed oil produced annually",
        uz: "Yiliga 7 300 tonna tozalangan paxta yog'i",
        ru: "7 300 тонн рафинированного хлопкового масла в год",
      },
      {
        en: "Cottonseed sourced from FAYZ-M's own farm fields",
        uz: "Chigit FAYZ-M ning o'z xo'jalik dalalaridan olinadi",
        ru: "Хлопковые семена с собственных полей фермы FAYZ-M",
      },
      {
        en: "By-products (meal, hulls) used as animal feed — zero waste",
        uz: "Qo'shimcha mahsulotlar (kunjara, qobiq) hayvon ozuqasi sifatida ishlatiladi — chiqindisiz",
        ru: "Побочные продукты (шрот, шелуха) — корм для скота, ноль отходов",
      },
      {
        en: "Primarily domestic supply with growing export potential",
        uz: "Asosan ichki ta'minot, o'sib boruvchi eksport salohiyati",
        ru: "Преимущественно внутренние поставки с растущим экспортным потенциалом",
      },
    ],
    image1: img.oil1,
    image2: img.f1,
    image3: img.f2,
    ctaImage: img.oilCta,
  },
];

export function getBusinessBySlug(slug: string): BusinessData | undefined {
  return businesses.find((b) => b.slug === slug);
}

const LOCALE_INDEX: Record<Locale, number> = { en: 0, uz: 1, ru: 2 };

/** Deterministic pick so SSR and client match (no Math.random). */
export function getHomeCtaBusiness(locale: Locale): BusinessData {
  const i = LOCALE_INDEX[locale];
  return businesses[i % businesses.length];
}

/** Featured card in mega menu: stable per locale, distinct from home CTA. */
export function getMegaMenuFeaturedBusiness(locale: Locale): BusinessData {
  const i = LOCALE_INDEX[locale];
  return businesses[(i + 3) % businesses.length];
}
