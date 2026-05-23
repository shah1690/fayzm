import type { Locale } from "@/shared/i18n/translations";

export type BusinessData = {
  slug: string;
  label: { en: string; uz: string; ru: string; zh: string };
  heading: { en: string; uz: string; ru: string; zh: string };
  description: { en: string; uz: string; ru: string; zh: string };
  cardHeading: { en: string; uz: string; ru: string; zh: string };
  cardText: { en: string; uz: string; ru: string; zh: string };
  bodyText: { en: string; uz: string; ru: string; zh: string };
  strategyHeading: { en: string; uz: string; ru: string; zh: string };
  strategyDesc: { en: string; uz: string; ru: string; zh: string };
  features: { en: string; uz: string; ru: string; zh: string }[];
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
    label: {
      en: "Knitting",
      uz: "Trikotaj mato",
      ru: "Трикотаж",
      zh: "针织布料",
    },
    heading: {
      en: "Quality Knitting For Every Need",
      uz: "Trikotaj mato",
      ru: "Качественный трикотаж для любых нужд",
      zh: "满足多样需求的优质针织",
    },
    description: {
      en: "Knit fabric production is one of the key links of our cluster. The factory is equipped with world-leading technologies such as Taifan, Honknit, Boosan and Jacquard. Annual production capacity: 4,015 tons.",
      uz: "Trikotaj mato ishlab chiqarish — klasterimizning asosiy bo'g'inlaridan biridir. Fabrikamiz Taifan, Honknit, Boosan va Jacquard kabi jahonning yetakchi texnologiyalari bilan jihozlangan. Yillik ishlab chiqarish quvvati: 4 015 tonna.",
      ru: "Производство трикотажной ткани — одно из ключевых звеньев нашего кластера. Фабрика оснащена ведущими мировыми технологиями, такими как Taifan, Honknit, Boosan и Jacquard. Годовая производственная мощность: 4 015 тонн.",
      zh: "针织面料生产是我们产业集群的关键环节之一。工厂配备 Taifan、Honknit、Boosan 与 Jacquard 等世界领先技术设备。年产能：4,015 吨。",
    },
    cardHeading: {
      en: "4,015 Tons Annual Fabric Production",
      uz: "Yiliga 4 015 tonna mato",
      ru: "4 015 тонн тканей в год",
      zh: "年产 4,015 吨面料",
    },
    cardText: {
      en: "50 skilled employees producing fabrics to international standards for the cluster's garment division and global markets.",
      uz: "Taifan, Honknit, Boosan va Jacquard uskunalari bilan jihozlangan bo'lim yiliga 4 015 tonna mato ishlab chiqaradi.",
      ru: "50 сотрудников производят ткани по международным стандартам.",
      zh: "配备 Taifan、Honknit、Boosan 与 Jacquard 设备的车间年产 4,015 吨面料。",
    },
    bodyText: {
      en: "This division creates a high-quality foundation for FAYZ-M garments. We strictly control every stage from cotton fiber to finished product, ensuring consistent quality.",
      uz: "Ushbu bo'lim FAYZ-M kiyimlari uchun yuqori sifatli asos yaratadi. Biz paxta tolasidan tayyor mahsulotgacha bo'lgan barcha jarayonlarni qat'iy nazorat qilib, barqaror sifatni ta'minlaymiz.",
      ru: "Это подразделение создаёт качественную основу для изделий FAYZ-M. Мы строго контролируем все процессы от хлопкового волокна до готового продукта, обеспечивая стабильное качество.",
      zh: "该部门为 FAYZ-M 服装打造高品质基础。我们严格管控从棉纤维到成品的每一个环节，确保品质始终如一。",
    },
    strategyHeading: {
      en: "Production Capabilities & Investment",
      uz: "Ishlab chiqarish imkoniyatlari",
      ru: "Производственные возможности и инвестиции",
      zh: "生产能力与投资",
    },
    strategyDesc: {
      en: "Built over 2012–2017 with a USD 3 million investment, the knitting division uses state-of-the-art equipment to deliver consistent, high-quality fabric at scale.",
      uz: "Trikotaj mato bo'limi zamonaviy uskunalar yordamida barqaror va sifatli mato ishlab chiqaradi.",
      ru: "Построенное в 2012–2017 годах с инвестициями 3 млн USD, трикотажное подразделение использует современное оборудование.",
      zh: "针织部门凭借现代化设备，稳定大规模生产高品质面料。",
    },
    features: [
      {
        en: "Modern and automated knitting machines.",
        uz: "Zamonaviy va avtomatlashtirilgan to'quv dastgohlari.",
        ru: "Современные и автоматизированные вязальные станки.",
        zh: "现代化自动化针织机。",
      },
      {
        en: "High-quality Taifan and Jacquard technologies.",
        uz: "Yuqori sifatli Taifan va Jacquard texnologiyalari.",
        ru: "Высококачественные технологии Taifan и Jacquard.",
        zh: "高品质的 Taifan 与 Jacquard 技术。",
      },
      {
        en: "Over 4,015 tons of finished knit fabric per year.",
        uz: "Yiliga 4 015 tonnadan ortiq tayyor trikotaj mato.",
        ru: "Более 4 015 тонн готовой трикотажной ткани в год.",
        zh: "每年生产超过 4,015 吨成品针织面料。",
      },
      {
        en: "50 professional operators with continuous upskilling.",
        uz: "Doimiy malaka oshirib boruvchi 50 nafar professional operator.",
        ru: "50 профессиональных операторов с постоянным повышением квалификации.",
        zh: "50 名持续接受技能培训的专业操作员。",
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
      zh: "纱线生产",
    },
    heading: {
      en: "9,417 Tons Production Capacity",
      uz: "Ishlab chiqarish quvvati 9417 tonna",
      ru: "Производственная мощность 9 417 тонн",
      zh: "9,417 吨产能",
    },
    description: {
      en: "Commissioned in 2023 in partnership with the world-renowned Swiss company RIETER, our plant runs fully automated lines staffed by 300 specialists. We have united innovation with quality.",
      uz: "2023-yilda Shveytsariyaning dunyoga mashhur RIETER kompaniyasi bilan hamkorlikda ishga tushirilgan zavodimizda 300 nafar mutaxassis to'liq avtomatlashtirilgan liniyalarda faoliyat yuritadi. Biz innovatsiyalarni sifat bilan birlashtirdik.",
      ru: "Введённый в 2023 году в партнёрстве с всемирно известной швейцарской компанией RIETER, наш завод управляется 300 специалистами на полностью автоматизированных линиях. Мы объединили инновации с качеством.",
      zh: "我们的工厂于 2023 年与全球知名瑞士企业 RIETER 合作投产，由 300 名专业人员在全自动生产线上工作。我们将创新与品质融为一体。",
    },
    cardHeading: {
      en: "9,417 Tons Production Capacity",
      uz: "Ishlab chiqarish quvvati 9417 tonna",
      ru: "Производственная мощность 9 417 тонн",
      zh: "9,417 吨产能",
    },
    cardText: {
      en: "Fully automated RIETER equipment produces yarn to international standards for the cluster's knitting and garment production.",
      uz: "To'liq avtomatlashtirilgan RIETER uskunalari bilan yillik ishlab chiqarish quvvati 9 417 tonnani tashkil etadi.",
      ru: "Автоматизированное оборудование RIETER производит пряжу по международным стандартам для трикотажного и швейного направлений кластера.",
      zh: "全自动 RIETER 设备按国际标准为集群的针织与服装生产提供纱线。",
    },
    bodyText: {
      en: "The spinning mill creates a self-sustaining internal supply chain, providing consistent yarn quality for the cluster's knitting and garment production, reducing import dependency.",
      uz: "Egrish zavodi klasterning trikotaj va tikuvchilik ishlab chiqarishi uchun izchil ip sifatini ta'minlab, import qaramligini kamaytiradi.",
      ru: "Прядильная фабрика создаёт самодостаточную внутреннюю цепочку поставок для трикотажного и швейного производства.",
      zh: "纺纱厂构建起自给自足的内部供应链，为集群的针织与服装生产提供稳定的纱线品质，降低对进口的依赖。",
    },
    strategyHeading: {
      en: "World-Class Spinning Technology",
      uz: "Jahon darajasidagi egrish texnologiyasi",
      ru: "Мировые технологии прядения",
      zh: "世界级纺纱技术",
    },
    strategyDesc: {
      en: "RIETER technology lets us produce yarn that meets international standards — highly durable and with a consistent texture. This is the key to the competitiveness of our finished products.",
      uz: "RIETER texnologiyasi bizga xalqaro standartlarga javob beradigan, chidamliligi yuqori va bir tekis fakturaga ega iplar ishlab chiqarish imkonini beradi. Bu bizning tayyor mahsulotlarimiz raqobatbardoshligining asosiy siri.",
      ru: "Технология RIETER позволяет нам производить пряжу, соответствующую международным стандартам, — высокопрочную и с однородной фактурой. Это главный секрет конкурентоспособности нашей готовой продукции.",
      zh: "RIETER 技术让我们能够生产符合国际标准、坚固耐用、纹理均匀一致的纱线，这是我们成品具备竞争力的关键所在。",
    },
    features: [
      {
        en: "Annual production capacity is 9,417 tons",
        uz: "Yillik ishlab chiqarish quvvati 9 417 tonna",
        ru: "Годовая производственная мощность — 9 417 тонн",
        zh: "年产能为 9,417 吨",
      },
      {
        en: "Commissioned 2023 under presidential initiative with RIETER",
        uz: "2023 yilda RIETER bilan prezidentlik tashabbusi doirasida ishga tushirildi",
        ru: "Введено в 2023 году по президентской инициативе с RIETER",
        zh: "2023 年由总统倡议推动，与 RIETER 合作投产",
      },
      {
        en: "300 employees on fully automated production lines",
        uz: "To'liq avtomatlashtirilgan liniyalarda 300 xodim",
        ru: "300 сотрудников на полностью автоматизированных линиях",
        zh: "全自动生产线上配备 300 名员工",
      },
      {
        en: "Supplies yarn to internal knitting and garment production",
        uz: "Ichki trikotaj va tikuvchilik yo'nalishlariga ip yetkazadi",
        ru: "Поставляет пряжу во внутренние трикотажное и швейное направления",
        zh: "为内部针织与服装生产提供纱线",
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
      zh: "服装制造",
    },
    heading: {
      en: "10 Million Finished Products Per Year",
      uz: "Yiliga 10 million dona tayyor mahsulot",
      ru: "10 миллионов готовых изделий в год",
      zh: "年产成品 1,000 万件",
    },
    description: {
      en: "Garment production is the final and most responsible stage of FAYZ-M's vertically integrated production chain. Here, more than 700 specialists sew high-quality clothing for men, women, and children.",
      uz: "Tikuvchilik — FAYZ-M vertikal integratsiyalashgan ishlab chiqarish zanjirining yakuniy va eng mas'uliyatli bosqichidir. Bu yerda 700 dan ortiq mutaxassislarimiz erkaklar, ayollar va bolalar uchun yuqori sifatli kiyim-kechaklar tikishadi.",
      ru: "Швейное производство — завершающий и самый ответственный этап вертикально интегрированной производственной цепочки FAYZ-M. Здесь более 700 наших специалистов шьют качественную одежду для мужчин, женщин и детей.",
      zh: "服装制造是 FAYZ-M 垂直一体化生产链中最终且最关键的环节。700 多名专业人员在此为男士、女士和儿童缝制高品质的服装。",
    },
    cardHeading: {
      en: "From Fiber to Finished Garment",
      uz: "Toladan tayyor kiyimgacha",
      ru: "От волокна до готового изделия",
      zh: "从纤维到成衣",
    },
    cardText: {
      en: "European and Asian machinery, automated cutting systems, in-house design centers, and multi-level quality inspection at every production stage.",
      uz: "Yevropa va Osiyo mashinalari, avtomatlashtirilgan kesish tizimlari, ichki dizayn markazlari va ko'p bosqichli sifat nazorati.",
      ru: "Европейское и азиатское оборудование, автоматизированные системы кройки, собственные дизайн-центры и многоуровневый контроль качества.",
      zh: "欧亚高端设备、自动化裁剪系统、自有设计中心，每道工序均设有多级质量检验。",
    },
    bodyText: {
      en: "Garments are exported to Russia, Turkey, Italy, Poland, Kazakhstan, and other countries. The majority of workers are women from local communities who receive professional training within the division.",
      uz: "Kiyimlar Rossiya, Turkiya, Italiya, Polsha, Qozog'iston va boshqa mamlakatlarga eksport qilinadi. Ishchilarning aksariyati kasb tayyorgarligini olgan mahalliy ayollar.",
      ru: "Изделия экспортируются в Россию, Турцию, Италию, Польшу, Казахстан. Большинство работников — женщины из местных сообществ, получившие профессиональную подготовку.",
      zh: "成品出口至俄罗斯、土耳其、意大利、波兰、哈萨克斯坦等国。绝大多数员工是来自本地的女性，并在部门内接受专业培训。",
    },
    strategyHeading: {
      en: "Vertically Integrated Garment Manufacturing",
      uz: "Vertikal integratsiyalashgan tikuvchilik",
      ru: "Вертикально интегрированное швейное производство",
      zh: "垂直一体化的服装制造",
    },
    strategyDesc: {
      en: "Using yarn and fabric produced in-house, we maintain full control of every process from raw material to finished garment. This lets us optimize both product cost and quality.",
      uz: "Biz o'zimiz ishlab chiqargan ip va matolardan foydalangan holda, xomashyodan tayyor kiyimgacha bo'lgan barcha jarayonni to'liq nazorat qilamiz. Bu esa mahsulot tannarxi va sifatini optimallashtirish imkonini beradi.",
      ru: "Используя пряжу и ткани собственного производства, мы полностью контролируем весь процесс от сырья до готового изделия. Это позволяет оптимизировать себестоимость и качество продукции.",
      zh: "我们使用自产纱线与面料，完整掌控从原料到成衣的整个流程，从而优化产品成本与品质。",
    },
    features: [
      {
        en: "10 million finished knitwear units produced annually",
        uz: "Yiliga 10 million dona tayyor trikotaj mahsulot",
        ru: "10 миллионов готовых трикотажных изделий в год",
        zh: "每年生产 1,000 万件成品针织品",
      },
      {
        en: "Over 700 workers, majority women from local communities",
        uz: "700 dan ortiq xodim, asosan mahalliy ayollar",
        ru: "Более 700 работников, большинство — местные женщины",
        zh: "员工超过 700 人，大多数为本地女性",
      },
      {
        en: "Exports to Russia, Turkey, Italy, Poland, Kazakhstan",
        uz: "Rossiya, Turkiya, Italiya, Polsha, Qozog'istonga eksport",
        ru: "Экспорт в Россию, Турцию, Италию, Польшу, Казахстан",
        zh: "出口至俄罗斯、土耳其、意大利、波兰、哈萨克斯坦",
      },
      {
        en: "Custom design, colour palette and flexible approach for B2B partners.",
        uz: "B2B hamkorlar uchun individual dizayn, ranglar palitrasi va moslashuvchan yondashuv.",
        ru: "Индивидуальный дизайн, цветовая палитра и гибкий подход для B2B-партнёров.",
        zh: "为 B2B 合作伙伴提供定制设计、配色方案及灵活合作方式。",
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
      zh: "面粉生产",
    },
    heading: {
      en: "29,200 Tons Annual Flour Production",
      uz: "Yillik ishlab chiqarish 29 200 tonna",
      ru: "29 200 тонн муки в год",
      zh: "年产 29,200 吨面粉",
    },
    description: {
      en: "Operating since 2022, our modern mill complex is the key link ensuring food security for our cluster. We process wheat from the fields according to international standards and bring abundance to households.",
      uz: "2022-yildan buyon faoliyat yuritayotgan zamonaviy tegirmon majmuamiz klasterimizning oziq-ovqat xavfsizligini ta'minlovchi asosiy bo'g'indir. Biz daladan olingan bug'doyni xalqaro standartlar asosida qayta ishlab, xonadonlarga baraka ulashamiz.",
      ru: "Работающий с 2022 года современный мельничный комплекс — ключевое звено, обеспечивающее продовольственную безопасность нашего кластера. Мы перерабатываем пшеницу с полей по международным стандартам и приносим достаток в каждый дом.",
      zh: "自 2022 年起运营的现代化磨坊综合体是保障集群食品安全的关键环节。我们按照国际标准加工田间小麦，把丰收送进千家万户。",
    },
    cardHeading: {
      en: "29,200 Tons Per Year",
      uz: "Yiliga 29 200 tonna",
      ru: "29 200 тонн в год",
      zh: "年产 29,200 吨",
    },
    cardText: {
      en: "From field to table. Wheat grown on FAYZ-M fields is milled at our own facility and supplied as finished product to the cluster's needs and the local population.",
      uz: "Daladan dasturxongacha bo'lgan yo'l. FAYZ-M dalalarida yetishtirilgan bug'doy o'z tegirmonimizda qayta ishlanadi va tayyor mahsulot sifatida klaster ehtiyojlariga hamda aholi iste'moliga yo'naltiriladi.",
      ru: "Путь от поля до стола. Пшеница, выращенная на полях FAYZ-M, перерабатывается на собственной мельнице и в виде готового продукта направляется на нужды кластера и потребности населения.",
      zh: "从田间到餐桌。FAYZ-M 田间种植的小麦在自有磨坊加工，作为成品供应集群和本地居民。",
    },
    bodyText: {
      en: "50 full-time employees operate the mill year-round. Raw materials come from the cluster's own grain fields, ensuring full traceability from field to bag, with primary output serving domestic consumption.",
      uz: "50 doimiy xodim tegirmonni yil davomida boshqaradi. Xom ashyo klasterning o'z don dalalaridan olinadi, asosiy mahsulot ichki iste'molga yo'naltiriladi.",
      ru: "50 постоянных сотрудников работают круглый год. Сырьё с собственных полей кластера, основная продукция — для внутреннего потребления.",
      zh: "50 名全职员工常年运营磨坊。原料来自集群自有的粮田，全程可追溯，主要供应国内市场。",
    },
    strategyHeading: {
      en: "From Field to Table: A Full Chain of Control",
      uz: "Daladan dasturxongacha: To'liq nazorat zanjiri",
      ru: "От поля до стола: Полная цепочка контроля",
      zh: "从田间到餐桌：完整的管控链条",
    },
    strategyDesc: {
      en: "The FAYZ-M cluster processes select wheat grown on its own fields at a modern mill complex. This lets us strictly control raw material quality at every stage — from sowing to the finished flour product.",
      uz: "FAYZ-M klasteri o'z dalalarida yetishtirilgan sara bug'doyni zamonaviy tegirmon majmuasida qayta ishlaydi. Bu bizga xomashyo sifatini ekish jarayonidan boshlab, tayyor un mahsulotigacha bo'lgan har bir bosqichda qat'iy nazorat qilish imkonini beradi.",
      ru: "Кластер FAYZ-M перерабатывает отборную пшеницу, выращенную на собственных полях, в современном мельничном комплексе. Это позволяет нам строго контролировать качество сырья на каждом этапе — от посева до готового мучного продукта.",
      zh: "FAYZ-M 集群在现代化磨坊综合体加工自有田间精选的小麦，使我们能够从播种到面粉成品对每一个环节进行严格的质量管控。",
    },
    features: [
      {
        en: "Started operations in 2022",
        uz: "2022 yilda o'z faoliyatini boshlagan",
        ru: "Начало работу в 2022 году",
        zh: "2022 年正式投产",
      },
      {
        en: "Annual production capacity is 29,200 tons",
        uz: "Yillik ishlab chiqarish quvvati 29 200 tonna",
        ru: "Годовая производственная мощность — 29 200 тонн",
        zh: "年产能 29,200 吨",
      },
      {
        en: "50 employees, wheat sourced from cluster's own farm",
        uz: "50 xodim, bug'doy klasterning o'z xo'jaligidan",
        ru: "50 сотрудников, пшеница с собственной фермы кластера",
        zh: "50 名员工，小麦来自集群自有农场",
      },
      {
        en: "Laboratory quality testing and strict hygiene standards",
        uz: "Laboratoriya sifat sinovlari va qat'iy gigiyena standartlari",
        ru: "Лабораторный контроль качества и строгие стандарты гигиены",
        zh: "实验室质量检测与严格的卫生标准",
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
      zh: "加油站",
    },
    heading: {
      en: "100,000 Litres of Fuel Reserve",
      uz: "100 000 litr yoqilg'i zaxirasi",
      ru: "100 000 литров топливного резерва",
      zh: "10 万升燃油储备",
    },
    description: {
      en: "Providing uninterrupted fuel for the cluster's specialised machinery and the local community is our priority. Our modern 100,000-litre tanks guarantee a stable reserve.",
      uz: "Klasterimizning maxsus texnikalari va mahalliy aholi ehtiyojlarini uzluksiz yoqilg'i bilan ta'minlash — bizning ustuvor vazifamizdir. 100 000 litrlik zamonaviy sig'imlarimiz barqaror zaxirani kafolatlaydi.",
      ru: "Бесперебойное обеспечение топливом специализированной техники кластера и местного населения — наша приоритетная задача. Современные ёмкости на 100 000 литров гарантируют стабильный резерв.",
      zh: "为集群专用机械与本地居民提供不间断的燃油供应是我们的首要任务。10 万升现代化储油罐保障稳定储备。",
    },
    cardHeading: {
      en: "Strategic Fuel Infrastructure",
      uz: "Ishonchli yoqilg'i ta'minoti",
      ru: "Стратегическая топливная инфраструктура",
      zh: "战略级燃油基础设施",
    },
    cardText: {
      en: "100,000-litre fuel storage helps keep production transport and local service needs supplied without interruption.",
      uz: "100 000 litr yoqilg'i saqlash quvvati ishlab chiqarish texnikalari va mahalliy ehtiyojlarni uzluksiz ta'minlashga yordam beradi.",
      ru: "Хранилище на 100 000 литров помогает бесперебойно обеспечивать производственный транспорт и местные потребности.",
      zh: "10 万升的储油能力，确保生产运输与本地服务需求不间断地得到供应。",
    },
    bodyText: {
      en: "The station supports daily operations by serving FAYZ-M equipment and nearby residents from one reliable fuel point.",
      uz: "Shoxobcha FAYZ-M texnikalari va yaqin atrofdagi aholiga bir joydan ishonchli yoqilg'i xizmati ko'rsatadi.",
      ru: "Станция поддерживает ежедневную работу, обслуживая технику FAYZ-M и жителей рядом из одной надёжной точки.",
      zh: "加油站从一个可靠的供油点出发，为 FAYZ-M 设备和周边居民提供日常服务。",
    },
    strategyHeading: {
      en: "Reliable Fuel Supply",
      uz: "Ishonchli yoqilg'i ta'minoti",
      ru: "Надёжное топливное обеспечение",
      zh: "可靠的燃油供应",
    },
    strategyDesc: {
      en: "With 100,000 litres of storage capacity, the station keeps cluster machinery and local community fuel needs covered.",
      uz: "100 000 litr saqlash quvvati klaster texnikalari va mahalliy aholi ehtiyojlarini qondirishga xizmat qiladi.",
      ru: "Вместимость 100 000 литров помогает закрывать потребности техники кластера и местного населения.",
      zh: "10 万升的储油容量，满足集群机械与本地社区的燃油需求。",
    },
    features: [
      {
        en: "Servicing the FAYZ-M cluster's specialised and agricultural machinery.",
        uz: "FAYZ-M klasterining maxsus va qishloq xo'jaligi texnikalariga xizmat ko'rsatish.",
        ru: "Обслуживание специализированной и сельскохозяйственной техники кластера FAYZ-M.",
        zh: "为 FAYZ-M 集群的专用与农业机械提供服务。",
      },
      {
        en: "Safe, modern 100,000-litre storage tanks.",
        uz: "100 000 litr hajmdagi xavfsiz va zamonaviy saqlash rezervuarlari.",
        ru: "Безопасные и современные резервуары для хранения объёмом 100 000 литров.",
        zh: "安全、现代化的 10 万升储油罐。",
      },
      {
        en: "Capacity to dispense up to 35,000 litres of fuel daily for the local community.",
        uz: "Mahalliy aholi uchun kunlik 35 000 litrgacha yoqilg'i tarqatish imkoniyati.",
        ru: "Возможность ежедневной выдачи до 35 000 литров топлива для местного населения.",
        zh: "可为本地居民每日供应最多 35,000 升燃油。",
      },
      {
        en: "24-hour operation and a team of qualified operators.",
        uz: "24 soatlik ish tartibi va malakali operatorlar jamoasi.",
        ru: "Круглосуточный режим работы и команда квалифицированных операторов.",
        zh: "24 小时不间断运营，并配备经验丰富的操作员团队。",
      },
    ],
    image1: img.p1,
    image2: img.p2,
    image3: img.p3,
    ctaImage: img.pCta,
  },
  {
    slug: "farm",
    label: {
      en: "Farm",
      uz: "Chorvachilik",
      ru: "Фермерское хозяйство",
      zh: "畜牧业",
    },
    heading: {
      en: "Zokirjon Ota — Livestock & Agriculture",
      uz: "Zokirjon Ota — Chorvachilik",
      ru: "Зокиржон Ота — Животноводство и сельское хозяйство",
      zh: "Zokirjon Ota — 畜牧与农业",
    },
    description: {
      en: "Founded in 2018, our farm specialises in raising the finest pedigree cattle, sheep and horses from Europe. We acclimatised premium livestock from Switzerland, the Netherlands and Poland to the local environment and built a high-quality production chain.",
      uz: "2018-yilda asos solingan xo'jaligimiz Yevropaning eng sara zotli qoramollari, qo'ylari va otlarini yetishtirishga ixtisoslashgan. Biz Shveytsariya, Niderlandiya va Polshadan keltirilgan premium chorva naslini mahalliy iqlimga moslashtirib, sifatli mahsulot zanjirini yaratdik.",
      ru: "Основанное в 2018 году, наше хозяйство специализируется на разведении лучших племенных пород крупного рогатого скота, овец и лошадей из Европы. Мы адаптировали премиальные породы из Швейцарии, Нидерландов и Польши к местному климату и создали цепочку качественной продукции.",
      zh: "我们的牧场创立于 2018 年，专注饲养来自欧洲的优质纯种牛、羊和马匹。我们将从瑞士、荷兰和波兰引进的高端畜种适应当地气候，构建了高品质的产品链条。",
    },
    cardHeading: {
      en: "Premium Livestock From Europe",
      uz: "Yevropadan premium chorva",
      ru: "Племенной скот из Европы",
      zh: "源自欧洲的优质畜种",
    },
    cardText: {
      en: "The livestock operation brings together cattle, sheep, and horses imported from Europe for stable meat and dairy production.",
      uz: "Chorvachilik xo'jaligi Yevropadan keltirilgan qoramol, qo'y va otlarni birlashtirib, go'sht va sut mahsulotlari yetishtirishga xizmat qiladi.",
      ru: "Животноводческое хозяйство объединяет крупный рогатый скот, овец и лошадей из Европы для стабильного производства мяса и молока.",
      zh: "畜牧基地将来自欧洲的牛、羊与马汇聚一处，稳定供应肉类和奶制品。",
    },
    bodyText: {
      en: "The farm supports 13 permanent jobs and aims to provide the local population with affordable, high-quality, and consistent meat and dairy products — contributing to regional food security alongside the cluster's cotton and grain operations.",
      uz: "Chorvachilik xo'jaligi 13 doimiy ish o'rni yaratadi va mahalliy aholiga sifatli va barqaror go'sht hamda sut mahsulotlari yetkazib berishni maqsad qiladi.",
      ru: "Ферма создаёт 13 постоянных рабочих мест и обеспечивает местное население качественными мясными и молочными продуктами.",
      zh: "牧场提供 13 个长期就业岗位，致力于为本地居民提供优质、稳定的肉类与奶制品。",
    },
    strategyHeading: {
      en: "Integrated Livestock Ecosystem",
      uz: "Integratsiyalashgan chorvachilik ekotizimi",
      ru: "Интегрированная животноводческая экосистема",
      zh: "一体化的畜牧生态系统",
    },
    strategyDesc: {
      en: "Started with 30 cattle and expanded to 1,300+ livestock across multiple species. The farm produces its own fodder through maize-barley crop rotation.",
      uz: "30 ta qoramoldan boshlangan xo'jalik bir nechta tur bo'yicha 1 300 dan ortiq chorva boshiga kengaydi. Ozuqa makkajo'xori-arpa almashlab ekish orqali yetishtiriladi.",
      ru: "Начав с 30 голов скота, ферма расширилась до 1 300+ животных разных видов. Корма выращиваются через чередование кукурузы и ячменя.",
      zh: "牧场由 30 头牛起步，已发展为多品种、1,300 头以上的规模。通过玉米与大麦轮作自产饲料。",
    },
    features: [
      {
        en: "Over 200 pedigree cows and 100 bulls imported from Switzerland and the Netherlands.",
        uz: "Shveytsariya va Niderlandiyadan keltirilgan 200 dan ortiq zotli sigir va 100 ta buqa.",
        ru: "Более 200 племенных коров и 100 быков, завезённых из Швейцарии и Нидерландов.",
        zh: "从瑞士与荷兰引进 200 余头纯种母牛和 100 头公牛。",
      },
      {
        en: "Over 1,000 pedigree sheep and 20 select horses from Poland.",
        uz: "1000 dan ortiq zotli qo'y va Polshadan keltirilgan 20 ta sara otlar.",
        ru: "Более 1 000 племенных овец и 20 отборных лошадей из Польши.",
        zh: "1,000 多只纯种羊与来自波兰的 20 匹精选良驹。",
      },
      {
        en: "Full self-sufficiency in fodder via a maize-barley crop rotation system.",
        uz: "Makka-arpa almashlab ekish tizimi orqali o'z-o'zini to'liq ozuqa bilan ta'minlash.",
        ru: "Полная самообеспеченность кормами через систему севооборота кукурузы и ячменя.",
        zh: "通过玉米与大麦的轮作系统实现饲料完全自给。",
      },
      {
        en: "Modern jobs and guaranteed food security for the local population.",
        uz: "Zamonaviy ish o'rinlari va hudud aholisi uchun kafolatlangan oziq-ovqat xavfsizligi.",
        ru: "Современные рабочие места и гарантированная продовольственная безопасность для местного населения.",
        zh: "为本地居民创造现代化岗位，保障食品安全。",
      },
    ],
    image1: img.farm1,
    image2: img.farm2,
    image3: img.farm3,
    ctaImage: img.farmCta,
  },
  {
    slug: "cottonseed-oil",
    label: {
      en: "Cottonseed Oil",
      uz: "Paxta yog'i",
      ru: "Хлопковое масло",
      zh: "棉籽油",
    },
    heading: {
      en: "7,300 Tons of High-Quality Cottonseed Oil Per Year",
      uz: "Yiliga 7 300 tonna yuqori sifatli paxta yog'i",
      ru: "7 300 тонн высококачественного хлопкового масла в год",
      zh: "年产 7,300 吨高品质棉籽油",
    },
    description: {
      en: "Cottonseed oil production is a strategic direction of FAYZ-M's vertically integrated system. Using cottonseed grown on our own fields, we produce high-quality oil, meal and hulls based on eco-friendly, zero-waste technology.",
      uz: "Paxta yog'i ishlab chiqarish — FAYZ-M vertikal integratsiyalashgan tizimining strategik yo'nalishidir. Biz o'z dalalarimizda yetishtirilgan chigitdan foydalanib, ekologik toza va chiqindisiz texnologiya asosida sifatli yog', kunjara va qobiq ishlab chiqaramiz.",
      ru: "Производство хлопкового масла — стратегическое направление вертикально интегрированной системы FAYZ-M. Используя хлопковые семена с собственных полей, мы производим качественное масло, шрот и шелуху на основе экологичной безотходной технологии.",
      zh: "棉籽油生产是 FAYZ-M 垂直一体化体系中的战略方向。我们采用自有田间种植的棉籽，基于生态环保、零废弃工艺生产优质油脂、饼粕和籽壳。",
    },
    cardHeading: {
      en: "Zero-Waste Cotton Processing",
      uz: "Chiqindisiz paxta qayta ishlash",
      ru: "Безотходная переработка хлопка",
      zh: "零废弃棉籽加工",
    },
    cardText: {
      en: "7,300 tons of cottonseed oil annually. By-products — meal and hulls — used as animal feed. Full circular economy from field to finished product.",
      uz: "Yiliga 7 300 tonna paxta yog'i. Qo'shimcha mahsulotlar — kunjara va qobiq — chorva ozuqasi sifatida ishlatiladi.",
      ru: "7 300 тонн масла в год. Побочные продукты — шрот и шелуха — идут на корм скоту. Полная циклическая экономика.",
      zh: "年产 7,300 吨棉籽油。副产品——饼粕和籽壳——作为牲畜饲料，实现从田间到成品的完整循环经济。",
    },
    bodyText: {
      en: "The cottonseed oil division supports national food industry resilience through resource control and environmental efficiency. Output is primarily sold on domestic markets, with growing export potential as production scales.",
      uz: "Paxta yog'i bo'limi resurs nazorati va ekologik samaradorlik orqali milliy oziq-ovqat sanoatining barqarorligini qo'llab-quvvatlaydi.",
      ru: "Подразделение поддерживает устойчивость национальной пищевой промышленности через контроль ресурсов и экологическую эффективность.",
      zh: "棉籽油部门通过资源管控与环保高效运营，支持国家食品工业的稳定发展。产品主要面向国内市场，并随产能提升不断拓展出口。",
    },
    strategyHeading: {
      en: "From Field to Table: Full Vertical Integration",
      uz: "Daladan dasturxongacha: To'liq vertikal integratsiya",
      ru: "От поля до стола: Полная вертикальная интеграция",
      zh: "从田间到餐桌：完整的垂直一体化",
    },
    strategyDesc: {
      en: "FAYZ-M processes raw material from its own fields in a modern plant. This lets us lower product cost and strictly control quality at every stage.",
      uz: "FAYZ-M o'z dalalaridan olingan xomashyoni zamonaviy zavodda qayta ishlaydi. Bu bizga mahsulot tannarxini pasaytirish va har bir bosqichda sifatni qat'iy nazorat qilish imkonini beradi.",
      ru: "FAYZ-M перерабатывает сырьё, полученное с собственных полей, на современном заводе. Это позволяет снижать себестоимость продукции и строго контролировать качество на каждом этапе.",
      zh: "FAYZ-M 在现代化工厂加工自有田间的原料，从而降低产品成本，并在每一道工序严格管控品质。",
    },
    features: [
      {
        en: "7,300 tons of refined cottonseed oil produced annually",
        uz: "Yiliga 7 300 tonna tozalangan paxta yog'i",
        ru: "7 300 тонн рафинированного хлопкового масла в год",
        zh: "年产 7,300 吨精炼棉籽油",
      },
      {
        en: "Cottonseed sourced from FAYZ-M's own farm fields",
        uz: "Chigit FAYZ-M ning o'z xo'jalik dalalaridan olinadi",
        ru: "Хлопковые семена с собственных полей фермы FAYZ-M",
        zh: "棉籽来自 FAYZ-M 自有农场",
      },
      {
        en: "By-products (meal, hulls) used as animal feed — zero waste",
        uz: "Qo'shimcha mahsulotlar (kunjara, qobiq) hayvon ozuqasi sifatida ishlatiladi — chiqindisiz",
        ru: "Побочные продукты (шрот, шелуха) — корм для скота, ноль отходов",
        zh: "副产品（饼粕、籽壳）用作牲畜饲料 —— 零废弃",
      },
      {
        en: "Primarily domestic supply with growing export potential",
        uz: "Asosan ichki ta'minot, o'sib boruvchi eksport salohiyati",
        ru: "Преимущественно внутренние поставки с растущим экспортным потенциалом",
        zh: "以国内供应为主，出口潜力不断增长",
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

const LOCALE_INDEX: Record<Locale, number> = { en: 0, uz: 1, ru: 2, zh: 3 };

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
