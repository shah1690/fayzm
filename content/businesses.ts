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
    label: { en: "Knitting", uz: "Trikotaj", ru: "Трикотаж" },
    heading: { en: "Quality Knitting For Every Need", uz: "Har qanday ehtiyoj uchun sifatli trikotaj", ru: "Качественный трикотаж для любых нужд" },
    description: {
      en: "A key link in the production chain, ensuring deep cotton processing and high-quality textile materials. USD 3 million invested in equipment from TAYFAN, HonKnit, and Boosan.",
      uz: "Ishlab chiqarish zanjirining asosiy bo'g'ini. TAYFAN, HonKnit va Boosan jihozlari bilan 3 mln USD investitsiya.",
      ru: "Ключевое звено цепочки производства. Инвестиции 3 млн USD с оборудованием TAYFAN, HonKnit и Boosan.",
    },
    cardHeading: { en: "4,000 Tons Annual Fabric Production", uz: "Yiliga 4 000 tonna mato", ru: "4 000 тонн тканей в год" },
    cardText: {
      en: "50 skilled employees producing fabrics to international standards for the cluster's garment division and global markets.",
      uz: "50 malakali xodim xalqaro standartlarga mos mato ishlab chiqaradi.",
      ru: "50 сотрудников производят ткани по международным стандартам.",
    },
    bodyText: {
      en: "Fabrics supply the cluster's garment division and serve as raw material for manufacturing. Internal training programs develop local workforce skills, ensuring consistent quality across every production run.",
      uz: "Matolar klasterning tikuvchilik bo'limiga yetkaziladi. Ichki o'quv dasturlari mahalliy ishchi kuchining malakasini oshiradi.",
      ru: "Ткани поставляются в швейное подразделение. Программы обучения развивают навыки местных сотрудников.",
    },
    strategyHeading: { en: "Production Capabilities & Investment", uz: "Ishlab chiqarish imkoniyatlari va investitsiya", ru: "Производственные возможности и инвестиции" },
    strategyDesc: {
      en: "Built over 2012–2017 with a USD 3 million investment, the knitting division uses state-of-the-art equipment to deliver consistent, high-quality fabric at scale.",
      uz: "2012–2017 yillarda 3 mln USD investitsiya bilan qurilgan trikotaj bo'limi zamonaviy jihozlar yordamida izchil, yuqori sifatli mato ishlab chiqaradi.",
      ru: "Построенное в 2012–2017 годах с инвестициями 3 млн USD, трикотажное подразделение использует современное оборудование.",
    },
    features: [
      { en: "USD 3 million invested in modern equipment (2012–2017)", uz: "2012–2017 yillarda zamonaviy jihozlarga 3 mln USD investitsiya", ru: "Инвестиции 3 млн USD в современное оборудование (2012–2017)" },
      { en: "Partnered with TAYFAN, HonKnit & Boosan", uz: "TAYFAN, HonKnit va Boosan bilan hamkorlik", ru: "Партнёрство с TAYFAN, HonKnit и Boosan" },
      { en: "4,000 tons of quality fabric produced annually", uz: "Yiliga 4 000 tonna sifatli mato ishlab chiqariladi", ru: "4 000 тонн качественных тканей в год" },
      { en: "50 employees with internal skills training program", uz: "50 xodim, ichki malaka oshirish dasturi mavjud", ru: "50 сотрудников с внутренней программой обучения" },
    ],
    image1: img.k1, image2: img.k2, image3: img.k3, ctaImage: img.kCta,
  },
  {
    slug: "yarn-production",
    label: { en: "Yarn Production", uz: "Ip ishlab chiqarish", ru: "Производство пряжи" },
    heading: { en: "5,400 Tons of Combed Yarn Per Year", uz: "Yiliga 5 400 tonna taralgan ip", ru: "5 400 тонн гребенной пряжи в год" },
    description: {
      en: "Commissioned in 2023 via a presidential initiative with Swiss partner RIETER. USD 15 million invested, with 300 employees on fully automated production lines.",
      uz: "2023 yilda Shveytsariyalik RIETER hamkori bilan prezidentlik tashabbusi doirasida ishga tushirildi. 15 mln USD investitsiya, 300 xodim, to'liq avtomatlashtirilgan ishlab chiqarish.",
      ru: "Введено в 2023 году по президентской инициативе с швейцарским партнёром RIETER. Инвестиции 15 млн USD, 300 сотрудников, полностью автоматизированные линии.",
    },
    cardHeading: { en: "5,400 Tons of Combed Yarn Annually", uz: "Yiliga 5 400 tonna taralgan ip", ru: "5 400 тонн гребенной пряжи в год" },
    cardText: {
      en: "Fully automated RIETER equipment produces combed yarn to international standards, supplying the cluster's weaving and knitting divisions.",
      uz: "To'liq avtomatlashtirilgan RIETER uskunalari xalqaro standartlarga mos taralgan ip ishlab chiqaradi.",
      ru: "Полностью автоматизированное оборудование RIETER производит гребенную пряжу по международным стандартам.",
    },
    bodyText: {
      en: "The spinning mill creates a self-sustaining internal supply chain, providing consistent yarn quality for the cluster's knitting and garment production, reducing import dependency.",
      uz: "Egrish zavodi klasterning trikotaj va tikuvchilik ishlab chiqarishi uchun izchil ip sifatini ta'minlab, import qaramligini kamaytiradi.",
      ru: "Прядильная фабрика создаёт самодостаточную внутреннюю цепочку поставок для трикотажного и швейного производства.",
    },
    strategyHeading: { en: "World-Class Spinning Technology", uz: "Jahon darajasidagi egrish texnologiyasi", ru: "Мировые технологии прядения" },
    strategyDesc: {
      en: "Partnered with RIETER — Switzerland's leading spinning technology company — FAYZ-M operates one of Central Asia's most modern yarn production facilities, commissioned through a presidential initiative.",
      uz: "Shveytsariyaning yetakchi egrish texnologiyasi kompaniyasi RIETER bilan hamkorlikda FAYZ-M Markaziy Osiyodagi eng zamonaviy ip ishlab chiqarish zavodlaridan birini boshqaradi.",
      ru: "В партнёрстве с RIETER — ведущей швейцарской компанией прядильных технологий — FAYZ-M управляет одним из самых современных производств пряжи в Центральной Азии.",
    },
    features: [
      { en: "USD 15 million investment (USD 12M bank + USD 3M own funds)", uz: "15 mln USD investitsiya (12 mln bank + 3 mln o'z mablag'lari)", ru: "Инвестиции 15 млн USD (12 млн банк + 3 млн собственные)" },
      { en: "Commissioned 2023 under presidential initiative with RIETER", uz: "2023 yilda RIETER bilan prezidentlik tashabbusi doirasida ishga tushirildi", ru: "Введено в 2023 году по президентской инициативе с RIETER" },
      { en: "300 employees on fully automated production lines", uz: "To'liq avtomatlashtirilgan liniyalarda 300 xodim", ru: "300 сотрудников на полностью автоматизированных линиях" },
      { en: "Supplies yarn to internal knitting and weaving divisions", uz: "Ichki trikotaj va to'quv bo'limlariga ip yetkazadi", ru: "Поставляет пряжу во внутренние трикотажные и ткацкие подразделения" },
    ],
    image1: img.y1, image2: img.y2, image3: img.y3, ctaImage: img.yCta,
  },
  {
    slug: "garment-production",
    label: { en: "Garment Production", uz: "Tikuvchilik", ru: "Швейное производство" },
    heading: { en: "7 Million Garments Produced Annually", uz: "Yiliga 7 million dona kiyim", ru: "7 миллионов изделий в год" },
    description: {
      en: "The final and most critical stage in FAYZ-M's fully integrated chain. Over 700 workers produce everyday and seasonal clothing for men, women, and children.",
      uz: "FAYZ-M ning to'liq integratsiyalashgan zanjirining yakuniy va eng muhim bosqichi. 700 dan ortiq ishchi erkaklar, ayollar va bolalar uchun kiyim tikadi.",
      ru: "Завершающий и важнейший этап интегрированной цепочки FAYZ-M. Более 700 рабочих производят одежду для мужчин, женщин и детей.",
    },
    cardHeading: { en: "From Fiber to Finished Garment", uz: "Toladan tayyor kiyimgacha", ru: "От волокна до готового изделия" },
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
    strategyHeading: { en: "Vertically Integrated Garment Manufacturing", uz: "Vertikal integratsiyalashgan tikuvchilik", ru: "Вертикально интегрированное швейное производство" },
    strategyDesc: {
      en: "Using yarn and fabric sourced entirely from FAYZ-M's own knitting and yarn divisions, every garment is produced with full supply chain traceability and environmentally compliant materials.",
      uz: "FAYZ-M ning o'z trikotaj va ip bo'limlaridan olingan ip va matodan foydalanib, har bir kiyim to'liq ta'minot zanjiri kuzatuvchanligi bilan ishlab chiqariladi.",
      ru: "Используя пряжу и ткани собственных подразделений, каждое изделие производится с полной прослеживаемостью и экологичными материалами.",
    },
    features: [
      { en: "~7 million finished knitwear units produced annually", uz: "Yiliga taxminan 7 million dona tayyor trikotaj mahsulot", ru: "~7 миллионов готовых трикотажных изделий в год" },
      { en: "Over 700 workers, majority women from local communities", uz: "700 dan ortiq xodim, asosan mahalliy ayollar", ru: "Более 700 работников, большинство — местные женщины" },
      { en: "Exports to Russia, Turkey, Italy, Poland, Kazakhstan", uz: "Rossiya, Turkiya, Italiya, Polsha, Qozog'istonga eksport", ru: "Экспорт в Россию, Турцию, Италию, Польшу, Казахстан" },
      { en: "Customizable styling, design, and color for B2B orders", uz: "B2B buyurtmalar uchun moslashuvchan uslub, dizayn va rang", ru: "Индивидуальный стиль, дизайн и цвет для B2B заказов" },
    ],
    image1: img.g1, image2: img.g2, image3: img.g3, ctaImage: img.gCta,
  },
  {
    slug: "flour",
    label: { en: "Flour Production", uz: "Un ishlab chiqarish", ru: "Производство муки" },
    heading: { en: "Up to 50 Tons of Wheat Milled Daily", uz: "Kuniga 50 tonnagacha bug'doy tortiladi", ru: "До 50 тонн пшеницы в сутки" },
    description: {
      en: "Launched in 2022 with a USD 370,000 investment. Processes up to 50 tons of wheat per day — producing 37.5 tons of flour and 12.5 tons of bran daily.",
      uz: "2022 yilda 370 000 USD investitsiya bilan ishga tushirildi. Kuniga 50 tonnagacha bug'doy qayta ishlaydi — 37,5 tonna un va 12,5 tonna kepak.",
      ru: "Запущено в 2022 году с инвестициями 370 000 USD. Перерабатывает до 50 тонн пшеницы в сутки — 37,5 т муки и 12,5 т отрубей.",
    },
    cardHeading: { en: "1,125 Tons of Flour Per Month", uz: "Oyiga 1 125 tonna un", ru: "1 125 тонн муки в месяц" },
    cardText: {
      en: "Wheat sourced from the cluster's own fields. Laboratory testing and strict hygiene controls ensure consistent premium flour quality.",
      uz: "Bug'doy klasterning o'z dalalaridan olinadi. Laboratoriya sinovlari va qat'iy gigiyena nazorati izchil sifatni ta'minlaydi.",
      ru: "Пшеница с собственных полей кластера. Лабораторный контроль обеспечивает стабильное качество муки.",
    },
    bodyText: {
      en: "50 full-time employees operate the mill year-round. Raw materials come from the cluster's own grain fields, ensuring full traceability from field to bag, with primary output serving domestic consumption.",
      uz: "50 doimiy xodim tegirmonni yil davomida boshqaradi. Xom ashyo klasterning o'z don dalalaridan olinadi, asosiy mahsulot ichki iste'molga yo'naltiriladi.",
      ru: "50 постоянных сотрудников работают круглый год. Сырьё с собственных полей кластера, основная продукция — для внутреннего потребления.",
    },
    strategyHeading: { en: "Farm-to-Mill Integration", uz: "Daladam tegirmongacha integratsiya", ru: "Интеграция от поля до мельницы" },
    strategyDesc: {
      en: "With wheat grown on-site at the FAYZ-M farm and milled locally, the flour division demonstrates the cluster's commitment to full vertical integration — controlling quality from cultivation to final product.",
      uz: "Bug'doy FAYZ-M fermasida yetishtiriladi va mahalliy tegirmonda tortiladi — sifatni yetishtiruvchidan tayyor mahsulotgacha nazorat qiladi.",
      ru: "Пшеница выращивается на ферме FAYZ-M и перемалывается на месте — полный контроль качества от выращивания до готового продукта.",
    },
    features: [
      { en: "USD 370,000 invested (launched 2022)", uz: "370 000 USD investitsiya (2022 yilda ishga tushirildi)", ru: "Инвестиции 370 000 USD (запущено в 2022)" },
      { en: "50 tons of wheat processed daily, 1,125 tons of flour monthly", uz: "Kuniga 50 tonna bug'doy, oyiga 1 125 tonna un", ru: "50 тонн пшеницы в сутки, 1 125 тонн муки в месяц" },
      { en: "50 employees, wheat sourced from cluster's own farm", uz: "50 xodim, bug'doy klasterning o'z fermasidan", ru: "50 сотрудников, пшеница с собственной фермы кластера" },
      { en: "Laboratory quality testing and strict hygiene standards", uz: "Laboratoriya sifat sinovlari va qat'iy gigiyena standartlari", ru: "Лабораторный контроль качества и строгие стандарты гигиены" },
    ],
    image1: img.f1, image2: img.f2, image3: img.f3, ctaImage: img.fCta,
  },
  {
    slug: "petrol",
    label: { en: "Petrol Station", uz: "Yoqilg'i stantsiyasi", ru: "АЗС" },
    heading: { en: "100,000 Litre Fuel Storage Capacity", uz: "100 000 litr yoqilg'i saqlash quvvati", ru: "Хранилище топлива на 100 000 литров" },
    description: {
      en: "Built in the Nabib area of Khodjaabad district at a cost of 4 billion UZS. Serves the cluster's production fleet and distributes up to 35,000 litres to the local community.",
      uz: "Xo'jaobod tumanining Nabib mahallasida 4 milliard so'm sarflanib qurilgan. Klaster ishlab chiqarish transportiga xizmat qiladi va mahalliy jamoaga 35 000 litrgacha tarqatadi.",
      ru: "Построена в районе Набиб Ходжаабадского района за 4 млрд сум. Обслуживает производственный парк и распределяет до 35 000 л местному сообществу.",
    },
    cardHeading: { en: "Strategic Fuel Infrastructure", uz: "Strategik yoqilg'i infratuzilmasi", ru: "Стратегическая топливная инфраструктура" },
    cardText: {
      en: "4 billion UZS self-financed investment. Modern storage tanks with 100,000-litre capacity ensure uninterrupted supply for all cluster operations.",
      uz: "4 milliard so'm o'z mablag'lari bilan moliyalashtirilgan. 100 000 litr quvvatli zamonaviy saqlash tanklari uzluksiz ta'minotni ta'minlaydi.",
      ru: "Инвестиции 4 млрд сум из собственных средств. Современные резервуары на 100 000 л обеспечивают бесперебойные поставки.",
    },
    bodyText: {
      en: "The petrol station is a strategic priority for FAYZ-M, ensuring stable and high-quality fuel supply for production machinery and service transport across all divisions, while also serving the surrounding community.",
      uz: "Benzin stantsiyasi FAYZ-M uchun strategik ustuvorlik bo'lib, barcha bo'limlar bo'ylab ishlab chiqarish mashinalari va xizmat transporti uchun barqaror yoqilg'i ta'minotini ta'minlaydi.",
      ru: "АЗС является стратегическим приоритетом FAYZ-M, обеспечивая стабильные поставки топлива для производственной техники и транспорта всех подразделений.",
    },
    strategyHeading: { en: "Self-Financed Cluster Infrastructure", uz: "O'z mablag'lari bilan moliyalashtirilgan klaster infratuzilmasi", ru: "Инфраструктура кластера за счёт собственных средств" },
    strategyDesc: {
      en: "Fully self-financed at 4 billion UZS, the petrol station reflects FAYZ-M's commitment to building independent, resilient infrastructure — reducing reliance on external logistics and ensuring operational continuity.",
      uz: "To'liq o'z mablag'lari bilan (4 milliard so'm) qurilgan benzin stantsiyasi FAYZ-M ning mustaqil, barqaror infratuzilma qurish majburiyatini aks ettiradi.",
      ru: "Полностью за счёт собственных средств (4 млрд сум) АЗС отражает стремление FAYZ-M к независимой инфраструктуре.",
    },
    features: [
      { en: "4 billion UZS invested, fully self-financed", uz: "4 milliard so'm investitsiya, to'liq o'z mablag'lari", ru: "Инвестиции 4 млрд сум из собственных средств" },
      { en: "100,000-litre modern storage capacity", uz: "100 000 litr zamonaviy saqlash quvvati", ru: "Современное хранилище на 100 000 литров" },
      { en: "Up to 35,000 litres distributed to local community", uz: "Mahalliy jamoaga 35 000 litrgacha tarqatiladi", ru: "До 35 000 л распределяется местному сообществу" },
      { en: "7 employees, 24-hour operations", uz: "7 xodim, 24 soatlik ish", ru: "7 сотрудников, круглосуточная работа" },
    ],
    image1: img.p1, image2: img.p2, image3: img.p3, ctaImage: img.pCta,
  },
  {
    slug: "farm",
    label: { en: "Farm", uz: "Fermer xo'jaligi", ru: "Фермерское хозяйство" },
    heading: { en: "Zokirjon Ota — Livestock & Agriculture", uz: "Zokirjon Ota — Chorvachilik va Dehqonchilik", ru: "Зокиржон Ота — Животноводство и сельское хозяйство" },
    description: {
      en: "Established in 2018 as part of FAYZ-M cluster. 200 pedigree cows and 100 bulls imported from Switzerland and Netherlands; 600 fine-wool sheep; 10 mares and 10 stallions from Poland.",
      uz: "2018 yilda FAYZ-M klasteri tarkibida tashkil etilgan. Shveytsariya va Niderlandiyadan 200 zotli sigir va 100 buqa; 600 ingichka junli qo'y; Polshadan 10 baytal va 10 ot.",
      ru: "Основано в 2018 году. 200 племенных коров и 100 быков из Швейцарии и Нидерландов; 600 тонкорунных овец; 10 кобыл и 10 жеребцов из Польши.",
    },
    cardHeading: { en: "Premium Livestock From Europe", uz: "Yevropadan premium chorva", ru: "Племенной скот из Европы" },
    cardText: {
      en: "Pedigree cattle imported from Switzerland and Netherlands (2021–2022). Maize and barley rotation ensures self-sustained fodder production year-round.",
      uz: "2021–2022 yillarda Shveytsariya va Niderlandiyadan zotli qoramol import qilingan. Makkajo'xori va arpa almashlab ekish yil davomida o'z ozuqa ishlab chiqarishini ta'minlaydi.",
      ru: "Племенной скот из Швейцарии и Нидерландов (2021–2022). Чередование кукурузы и ячменя обеспечивает круглогодичное производство кормов.",
    },
    bodyText: {
      en: "The farm supports 13 permanent jobs and aims to provide the local population with affordable, high-quality, and consistent meat and dairy products — contributing to regional food security alongside the cluster's cotton and grain operations.",
      uz: "Ferma 13 doimiy ish o'rni yaratadi va mahalliy aholiga sifatli va barqaror go'sht hamda sut mahsulotlari yetkazib berishni maqsad qiladi.",
      ru: "Ферма создаёт 13 постоянных рабочих мест и обеспечивает местное население качественными мясными и молочными продуктами.",
    },
    strategyHeading: { en: "Integrated Agricultural Operations", uz: "Integratsiyalashgan qishloq xo'jaligi operatsiyalari", ru: "Интегрированные сельскохозяйственные операции" },
    strategyDesc: {
      en: "Started with 30 cattle and expanded to over 900 livestock across multiple species. Self-sustained fodder production via maize-barley rotation, with cotton grown on-site feeding directly into the cluster's textile chain.",
      uz: "30 ta moldan boshlangan va bir nechta tur bo'yicha 900 dan ortiq chorva boshiga kengaytirilgan. Makkajo'xori-arpa almashlab ekish orqali o'z ozuqa ishlab chiqarishi.",
      ru: "Начав с 30 голов скота, ферма расширилась до 900+ животных. Собственное производство кормов через чередование культур.",
    },
    features: [
      { en: "200 pedigree cows + 100 bulls from Switzerland & Netherlands", uz: "Shveytsariya va Niderlandiyadan 200 zotli sigir + 100 buqa", ru: "200 племенных коров + 100 быков из Швейцарии и Нидерландов" },
      { en: "600 fine-wool sheep + 10 mares & stallions from Poland", uz: "600 ingichka junli qo'y + Polshadan 10 baytal va ot", ru: "600 тонкорунных овец + 10 кобыл и жеребцов из Польши" },
      { en: "Self-sustained fodder via maize-barley crop rotation", uz: "Makkajo'xori-arpa almashlab ekish orqali o'z ozuqa ishlab chiqarishi", ru: "Собственное производство кормов через севооборот" },
      { en: "13 permanent jobs, food security for local community", uz: "13 doimiy ish o'rni, mahalliy jamoa uchun oziq-ovqat xavfsizligi", ru: "13 постоянных рабочих мест, продовольственная безопасность" },
    ],
    image1: img.farm1, image2: img.farm2, image3: img.farm3, ctaImage: img.farmCta,
  },
  {
    slug: "cottonseed-oil",
    label: { en: "Cottonseed Oil", uz: "G'o'za yog'i", ru: "Хлопковое масло" },
    heading: { en: "7,300 Tons of Cottonseed Oil Per Year", uz: "Yiliga 7 300 tonna g'o'za moyi", ru: "7 300 тонн хлопкового масла в год" },
    description: {
      en: "A vital part of FAYZ-M's vertically integrated value chain. Raw cotton from the cluster's own fields is processed into refined cottonseed oil, meal, hulls, and technical components — zero waste.",
      uz: "FAYZ-M ning vertikal integratsiyalashgan qiymat zanjirining muhim qismi. Klasterning o'z dalalaridan olingan xom paxta tozalangan g'o'za yog'i, un, qobiq va texnik komponentlarga qayta ishlanadi.",
      ru: "Важная часть вертикально интегрированной цепочки FAYZ-M. Хлопок с собственных полей перерабатывается в рафинированное масло, шрот, шелуху и технические компоненты.",
    },
    cardHeading: { en: "Zero-Waste Cotton Processing", uz: "Chiqindisiz paxta qayta ishlash", ru: "Безотходная переработка хлопка" },
    cardText: {
      en: "7,300 tons of cottonseed oil annually. By-products — meal and hulls — used as animal feed. Full circular economy from field to finished product.",
      uz: "Yiliga 7 300 tonna g'o'za moyi. Qo'shimcha mahsulotlar — un va qobiqlar — chorva ozuqasi sifatida ishlatiladi.",
      ru: "7 300 тонн масла в год. Побочные продукты — шрот и шелуха — идут на корм скоту. Полная циклическая экономика.",
    },
    bodyText: {
      en: "The cottonseed oil division supports national food industry resilience through resource control and environmental efficiency. Output is primarily sold on domestic markets, with growing export potential as production scales.",
      uz: "G'o'za yog'i bo'limi resurs nazorati va ekologik samaradorlik orqali milliy oziq-ovqat sanoatining barqarorligini qo'llab-quvvatlaydi.",
      ru: "Подразделение поддерживает устойчивость национальной пищевой промышленности через контроль ресурсов и экологическую эффективность.",
    },
    strategyHeading: { en: "Full Vertical Integration From Field to Bottle", uz: "Daladan idishgacha to'liq vertikal integratsiya", ru: "Полная вертикальная интеграция от поля до бутылки" },
    strategyDesc: {
      en: "Cotton cultivated on FAYZ-M's own farm is processed through the oil production facility with zero waste — oil for food, meal and hulls for animal feed at the cluster's farm. Every kilogram of cotton generates maximum value.",
      uz: "FAYZ-M ning o'z fermasida etishtirilib, moy ishlab chiqarish zavodida chiqindisiz qayta ishlangan paxta maksimal qiymat yaratadi.",
      ru: "Хлопок с фермы FAYZ-M перерабатывается без отходов — масло для питания, шрот и шелуха на корм скоту фермы кластера.",
    },
    features: [
      { en: "7,300 tons of refined cottonseed oil produced annually", uz: "Yiliga 7 300 tonna tozalangan g'o'za moyi", ru: "7 300 тонн рафинированного хлопкового масла в год" },
      { en: "Raw cotton sourced from FAYZ-M's own farm fields", uz: "Xom paxta FAYZ-M ning o'z ferma dalalaridan olinadi", ru: "Хлопок-сырец с собственных полей фермы FAYZ-M" },
      { en: "By-products (meal, hulls) used as animal feed — zero waste", uz: "Qo'shimcha mahsulotlar (un, qobiq) hayvon ozuqasi — chiqindisiz", ru: "Побочные продукты (шрот, шелуха) — корм для скота, ноль отходов" },
      { en: "Primarily domestic supply with growing export potential", uz: "Asosan ichki ta'minot, o'sib boruvchi eksport salohiyati", ru: "Преимущественно внутренние поставки с растущим экспортным потенциалом" },
    ],
    image1: img.oil1, image2: img.f1, image3: img.f2, ctaImage: img.oilCta,
  },
];

export function getBusinessBySlug(slug: string): BusinessData | undefined {
  return businesses.find((b) => b.slug === slug);
}
