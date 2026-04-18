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
    image1: img.k1, image2: img.k2, image3: img.k3,
  },
  {
    slug: "yarn-production",
    label: { en: "Yarn Production", uz: "Ip ishlab chiqarish", ru: "Производство пряжи" },
    heading: { en: "Premium Yarn For Global Markets", uz: "Global bozorlar uchun premium ip", ru: "Высококачественная пряжа для мировых рынков" },
    description: {
      en: "Launched in 2015, operating with a 24-ton daily capacity spinning mill opened in 2022, producing 9,417 tons of yarn annually.",
      uz: "2015 yilda ishga tushirilgan, 2022 yilda ochilgan 24 tonna kunlik quvvatli egrish zavodi bilan yiliga 9 417 tonna ip.",
      ru: "Запущено в 2015 году, прядильная фабрика мощностью 24 тонны в сутки производит 9 417 тонн пряжи в год.",
    },
    cardHeading: { en: "9,417 Tons of Yarn Per Year", uz: "Yiliga 9 417 tonna ip", ru: "9 417 тонн пряжи в год" },
    cardText: {
      en: "State-of-the-art spinning equipment ensures consistent quality for domestic and international buyers.",
      uz: "Zamonaviy egrish uskunalari mahalliy va xalqaro xaridorlar uchun izchil sifatni ta'minlaydi.",
      ru: "Современное оборудование обеспечивает стабильное качество для внутреннего и международного рынков.",
    },
    bodyText: {
      en: "The spinning mill feeds yarn into the knitting and garment divisions. Exports reach Poland, Turkey, Russia, Italy, and Kazakhstan.",
      uz: "Egrish zavodi ip trikotaj va tikuvchilik bo'limlariga yetkazadi. Eksport Polsha, Turkiya, Rossiya, Italiya va Qozog'istonga.",
      ru: "Пряжа поставляется в трикотажное и швейное подразделения. Экспорт в Польшу, Турцию, Россию, Италию и Казахстан.",
    },
    strategyHeading: { en: "Spinning Mill Capabilities", uz: "Egrish zavodi imkoniyatlari", ru: "Возможности прядильной фабрики" },
    strategyDesc: {
      en: "The 2022 spinning mill expansion brought daily capacity to 24 tons, making FAYZ-M one of the region's leading yarn producers.",
      uz: "2022 yilgi kengaytma kunlik quvvatni 24 tonnaga yetkazdi, FAYZ-Mni mintaqaning yetakchi ip ishlab chiqaruvchilaridan biriga aylantirdi.",
      ru: "Расширение 2022 года довело суточную мощность до 24 тонн, сделав FAYZ-M одним из ведущих производителей пряжи в регионе.",
    },
    features: [
      { en: "Spinning mill opened in 2022 with 24-ton daily capacity", uz: "2022 yilda 24 tonna kunlik quvvat bilan egrish zavodi ochildi", ru: "Прядильная фабрика открыта в 2022 году мощностью 24 т/сутки" },
      { en: "9,417 tons of yarn produced annually", uz: "Yiliga 9 417 tonna ip ishlab chiqariladi", ru: "9 417 тонн пряжи в год" },
      { en: "Supplies knitting and garment divisions internally", uz: "Trikotaj va tikuvchilik bo'limlarini ichki ta'minlaydi", ru: "Обеспечивает трикотажное и швейное подразделения" },
      { en: "Exports to Poland, Turkey, Russia, Italy, Kazakhstan", uz: "Polsha, Turkiya, Rossiya, Italiya, Qozog'istonga eksport", ru: "Экспорт в Польшу, Турцию, Россию, Италию, Казахстан" },
    ],
    image1: img.k3, image2: img.k4, image3: img.k1,
  },
  {
    slug: "garment-production",
    label: { en: "Garment Production", uz: "Tikuvchilik", ru: "Швейное производство" },
    heading: { en: "7 Million Garments Produced Annually", uz: "Yiliga 7 million dona kiyim", ru: "7 миллионов изделий в год" },
    description: {
      en: "FAYZ-M's garment division produces 7 million garments per year, combining quality fabrics from the cluster's own knitting and yarn units.",
      uz: "FAYZ-M tikuvchilik bo'limi yiliga 7 million dona kiyim ishlab chiqaradi.",
      ru: "Швейное подразделение производит 7 миллионов изделий в год.",
    },
    cardHeading: { en: "From Fiber to Fashion", uz: "Toladan modaga", ru: "От волокна до моды" },
    cardText: {
      en: "Vertically integrated workflow from cotton to finished garment ensures quality control at every step.",
      uz: "Paxtadan tayyor kiyimgacha vertikal integratsiyalashgan jarayon sifat nazoratini ta'minlaydi.",
      ru: "Вертикально интегрированный процесс обеспечивает контроль качества на каждом этапе.",
    },
    bodyText: {
      en: "Garments are exported to Poland, Turkey, Russia, Italy, and Kazakhstan. The division employs hundreds of skilled workers and continues to expand production capacity.",
      uz: "Kiyimlar Polsha, Turkiya, Rossiya, Italiya va Qozog'istonga eksport qilinadi.",
      ru: "Изделия экспортируются в Польшу, Турцию, Россию, Италию и Казахстан.",
    },
    strategyHeading: { en: "Garment Production Process", uz: "Tikuvchilik jarayoni", ru: "Процесс швейного производства" },
    strategyDesc: {
      en: "Every garment is crafted using yarn and fabric from FAYZ-M's own divisions, ensuring complete supply chain visibility and quality at every stage.",
      uz: "Har bir kiyim FAYZ-M ning o'z bo'limlaridan ip va mato bilan tikiladi, to'liq ta'minot zanjiri nazoratini ta'minlaydi.",
      ru: "Каждое изделие изготавливается из пряжи и тканей собственных подразделений FAYZ-M.",
    },
    features: [
      { en: "7 million garments produced annually", uz: "Yiliga 7 million dona kiyim ishlab chiqariladi", ru: "7 миллионов изделий в год" },
      { en: "Uses yarn and fabric from cluster's own divisions", uz: "Klasterning o'z bo'limlari ip va matodan foydalanadi", ru: "Использует пряжу и ткани собственных подразделений" },
      { en: "Exports to 5 countries: Poland, Turkey, Russia, Italy, Kazakhstan", uz: "5 mamlakatga eksport: Polsha, Turkiya, Rossiya, Italiya, Qozog'iston", ru: "Экспорт в 5 стран: Польша, Турция, Россия, Италия, Казахстан" },
      { en: "Hundreds of skilled workers employed", uz: "Yuzlab malakali ishchilar band", ru: "Сотни квалифицированных сотрудников" },
    ],
    image1: img.k6, image2: img.k5, image3: img.k2,
  },
  {
    slug: "flour",
    label: { en: "Flour Production", uz: "Un ishlab chiqarish", ru: "Производство муки" },
    heading: { en: "14,600 Tons of Flour Per Year", uz: "Yiliga 14 600 tonna un", ru: "14 600 тонн муки в год" },
    description: {
      en: "FAYZ-M's flour mill processes locally grown wheat into premium quality flour, producing 14,600 tons annually for domestic and regional markets.",
      uz: "FAYZ-M tegirmoni mahalliy bug'doyni premium sifatli unga aylantiradi, yiliga 14 600 tonna.",
      ru: "Мельница FAYZ-M перерабатывает местную пшеницу в муку премиального качества, 14 600 тонн в год.",
    },
    cardHeading: { en: "Premium Quality Flour Milling", uz: "Premium sifatli un tortish", ru: "Помол муки премиального качества" },
    cardText: {
      en: "Modern milling equipment ensures consistent grain-to-flour conversion with strict quality and hygiene standards.",
      uz: "Zamonaviy tegirmon uskunalari dondan unga izchil konvertatsiyani ta'minlaydi.",
      ru: "Современное оборудование обеспечивает стабильное преобразование зерна в муку.",
    },
    bodyText: {
      en: "The flour division supports local food security and creates stable employment for the Khodjaabad district community, operating year-round.",
      uz: "Un bo'limi mahalliy oziq-ovqat xavfsizligini ta'minlaydi va Xo'jaobod tumani uchun barqaror ish o'rinlari yaratadi.",
      ru: "Мучное подразделение поддерживает местную продовольственную безопасность и создаёт стабильную занятость.",
    },
    strategyHeading: { en: "Flour Mill Operations", uz: "Tegirmon operatsiyalari", ru: "Работа мельницы" },
    strategyDesc: {
      en: "Operating year-round with locally sourced wheat, the flour mill ensures food security for the region while delivering consistent premium-grade output.",
      uz: "Mahalliy bug'doy bilan yil davomida ishlaydigan tegirmon mintaqa oziq-ovqat xavfsizligini ta'minlaydi.",
      ru: "Работая круглый год на местной пшенице, мельница обеспечивает продовольственную безопасность региона.",
    },
    features: [
      { en: "14,600 tons of flour produced annually", uz: "Yiliga 14 600 tonna un ishlab chiqariladi", ru: "14 600 тонн муки в год" },
      { en: "Locally grown wheat sourced directly from FAYZ-M farm", uz: "Mahalliy bug'doy bevosita FAYZ-M fermasidan olinadi", ru: "Местная пшеница с фермы FAYZ-M" },
      { en: "Strict hygiene and quality control standards", uz: "Qat'iy gigiyena va sifat nazorati standartlari", ru: "Строгий контроль гигиены и качества" },
      { en: "Year-round operations supporting local food security", uz: "Mahalliy oziq-ovqat xavfsizligini ta'minlovchi yillik operatsiyalar", ru: "Круглогодичная работа для местной продовольственной безопасности" },
    ],
    image1: img.eco, image2: img.portrait, image3: img.k4,
  },
  {
    slug: "petrol",
    label: { en: "Petrol Station", uz: "Yoqilg'i stantsiyasi", ru: "АЗС" },
    heading: { en: "Fueling the Cluster And Community", uz: "Klaster va jamoani ta'minlash", ru: "Обеспечение топливом кластера" },
    description: {
      en: "FAYZ-M operates a petrol station serving the cluster's internal fleet and local community, ensuring uninterrupted fuel supply for production and logistics.",
      uz: "FAYZ-M klasterning ichki transporti va mahalliy jamoaga xizmat qiluvchi benzin stantsiyasini boshqaradi.",
      ru: "FAYZ-M управляет АЗС для внутреннего автопарка и местного сообщества.",
    },
    cardHeading: { en: "24/7 Fuel Supply For Production", uz: "Ishlab chiqarish uchun 24/7 yoqilg'i", ru: "Круглосуточное снабжение топливом" },
    cardText: {
      en: "Strategically located within the cluster, minimising logistics costs and downtime for all FAYZ-M operations.",
      uz: "Klaster ichida strategik joylashgan, barcha FAYZ-M operatsiyalari uchun logistika xarajatlarini minimallashtiradis.",
      ru: "Стратегически расположена внутри кластера, минимизируя логистические затраты.",
    },
    bodyText: {
      en: "The petrol station is key support infrastructure for FAYZ-M's multi-sector operations, enabling efficient movement of goods across all divisions.",
      uz: "Benzin stantsiyasi FAYZ-M ko'p tarmoqli operatsiyalari uchun asosiy infratuzilma bo'lib xizmat qiladi.",
      ru: "АЗС является ключевой инфраструктурой для многосекторных операций FAYZ-M.",
    },
    strategyHeading: { en: "Integrated Fuel Infrastructure", uz: "Integratsiyalashgan yoqilg'i infratuzilmasi", ru: "Интегрированная топливная инфраструктура" },
    strategyDesc: {
      en: "Located within the FAYZ-M cluster, the petrol station reduces transportation costs and supports uninterrupted production across all divisions.",
      uz: "FAYZ-M klasteri ichida joylashgan benzin stantsiyasi transport xarajatlarini kamaytiradi.",
      ru: "Расположенная внутри кластера, АЗС снижает транспортные расходы и поддерживает непрерывное производство.",
    },
    features: [
      { en: "Serves FAYZ-M's internal vehicle fleet 24/7", uz: "FAYZ-M ning ichki transport parkiga 24/7 xizmat qiladi", ru: "Обслуживает внутренний автопарк FAYZ-M 24/7" },
      { en: "Open to local community and public", uz: "Mahalliy jamoa va jamoatchilikka ochiq", ru: "Открыта для местного сообщества" },
      { en: "Reduces logistics costs across all divisions", uz: "Barcha bo'limlar bo'ylab logistika xarajatlarini kamaytiradi", ru: "Снижает логистические затраты всех подразделений" },
      { en: "Strategic location within the industrial cluster", uz: "Sanoat klasteri ichida strategik joylashuv", ru: "Стратегическое расположение внутри кластера" },
    ],
    image1: img.k1, image2: img.k2, image3: img.eco,
  },
  {
    slug: "farm",
    label: { en: "Farm", uz: "Fermer xo'jaligi", ru: "Фермерское хозяйство" },
    heading: { en: "Sustainable Farming At The Source", uz: "Manbada barqaror dehqonchilik", ru: "Устойчивое земледелие у истоков" },
    description: {
      en: "FAYZ-M's farm grows cotton and wheat locally, feeding directly into the cluster's textile and flour production — full supply chain control from field to product.",
      uz: "FAYZ-M fermasi mahalliy g'o'za va bug'doy etishtirib, klasterning to'qimachilik va un ishlab chiqarishiga to'g'ridan-to'g'ri yetkazib beradi.",
      ru: "Ферма FAYZ-M выращивает хлопок и пшеницу, напрямую поставляя в текстильное и мучное производство.",
    },
    cardHeading: { en: "From Field to Finished Product", uz: "Daladam tayyor mahsulotgacha", ru: "От поля до готового продукта" },
    cardText: {
      en: "Local raw materials reduce costs, shorten supply chains, and ensure traceability from cultivation to final product.",
      uz: "Mahalliy xom ashyo xarajatlarni kamaytiradi va kuzatuvchanligi ta'minlaydi.",
      ru: "Местное сырьё снижает затраты и обеспечивает прослеживаемость от выращивания до продукта.",
    },
    bodyText: {
      en: "The farm is an integral part of FAYZ-M's vision for a fully integrated, sustainable textile cluster — from seed to finished garment.",
      uz: "Ferma FAYZ-M ning to'liq integratsiyalashgan, barqaror to'qimachilik klasteri uchun ko'rshining ajralmas qismi.",
      ru: "Ферма — неотъемлемая часть видения FAYZ-M полностью интегрированного кластера.",
    },
    strategyHeading: { en: "Vertical Integration From The Ground Up", uz: "Yerdan boshlab vertikal integratsiya", ru: "Вертикальная интеграция с нуля" },
    strategyDesc: {
      en: "Growing cotton and wheat on-site gives FAYZ-M complete control over raw material quality, cost, and availability across the entire production cycle.",
      uz: "Mahalliy g'o'za va bug'doy yetishtirish FAYZ-M ga xom ashyo sifati va mavjudligi ustidan to'liq nazorat beradi.",
      ru: "Выращивание хлопка и пшеницы на месте даёт полный контроль над качеством сырья.",
    },
    features: [
      { en: "Cotton grown on-site for textile production", uz: "To'qimachilik ishlab chiqarish uchun mahalliy g'o'za", ru: "Хлопок выращивается на месте для текстильного производства" },
      { en: "Wheat supplied directly to flour mill", uz: "Bug'doy bevosita tegirmonga yetkaziladi", ru: "Пшеница поставляется напрямую на мельницу" },
      { en: "Full traceability from seed to finished product", uz: "Urug'dan tayyor mahsulotgacha to'liq kuzatuvchanlik", ru: "Полная прослеживаемость от семени до готового продукта" },
      { en: "Reduces import dependency for raw materials", uz: "Xom ashyo uchun import qaramligini kamaytiradi", ru: "Снижает зависимость от импорта сырья" },
    ],
    image1: img.eco, image2: img.k4, image3: img.portrait,
  },
  {
    slug: "cottonseed-oil",
    label: { en: "Cottonseed Oil", uz: "G'o'za yog'i", ru: "Хлопковое масло" },
    heading: { en: "7,300 Tons of Cottonseed Oil Per Year", uz: "Yiliga 7 300 tonna g'o'za moyi", ru: "7 300 тонн хлопкового масла в год" },
    description: {
      en: "FAYZ-M produces 7,300 tons of cottonseed oil annually — a by-product of cotton processing that adds significant value to the supply chain.",
      uz: "FAYZ-M yiliga 7 300 tonna g'o'za moyi ishlab chiqaradi — paxta qayta ishlashning qo'shimcha mahsuloti.",
      ru: "FAYZ-M производит 7 300 тонн хлопкового масла в год — побочный продукт переработки хлопка.",
    },
    cardHeading: { en: "Zero Waste Cotton Processing", uz: "Chiqindisiz paxta qayta ishlash", ru: "Безотходная переработка хлопка" },
    cardText: {
      en: "Every part of the cotton plant is utilised — oil for food, husks for feed — ensuring maximum efficiency.",
      uz: "G'o'za o'simligining har bir qismi ishlatiladi — oziq-ovqat uchun yog', ozuqa uchun qobiq.",
      ru: "Каждая часть хлопчатника используется — масло для питания, шелуха для корма.",
    },
    bodyText: {
      en: "Cottonseed oil production demonstrates FAYZ-M's circular economy principles — turning every by-product into valuable commodity for domestic and export markets.",
      uz: "G'o'za moyi ishlab chiqarish FAYZ-M ning aylanma iqtisodiyot tamoyillariga sodiqligini namoyish etadi.",
      ru: "Производство хлопкового масла демонстрирует приверженность FAYZ-M принципам циклической экономики.",
    },
    strategyHeading: { en: "Circular Economy In Action", uz: "Amalda aylanma iqtisodiyot", ru: "Циклическая экономика в действии" },
    strategyDesc: {
      en: "By processing cottonseed into premium oil, FAYZ-M maximises the value of every kilogram of cotton harvested, reducing waste to near zero.",
      uz: "G'o'za urug'ini premium moyga qayta ishlash orqali FAYZ-M har bir kilogramm paxtaning qiymatini maksimallashtiradi.",
      ru: "Переработка семян хлопка в масло позволяет FAYZ-M максимизировать ценность каждого кг хлопка.",
    },
    features: [
      { en: "7,300 tons of cottonseed oil produced annually", uz: "Yiliga 7 300 tonna g'o'za moyi ishlab chiqariladi", ru: "7 300 тонн хлопкового масла в год" },
      { en: "By-product of internal cotton processing", uz: "Ichki paxta qayta ishlashning qo'shimcha mahsuloti", ru: "Побочный продукт внутренней переработки хлопка" },
      { en: "Zero-waste approach — husks used as animal feed", uz: "Chiqindisiz yondashuv — qobiqlar hayvonlar ozuqasi sifatida", ru: "Безотходный подход — шелуха используется как корм" },
      { en: "Sold on domestic and export markets", uz: "Mahalliy va eksport bozorlarida sotiladi", ru: "Продаётся на внутреннем и экспортном рынках" },
    ],
    image1: img.k4, image2: img.k6, image3: img.k5,
  },
];

export function getBusinessBySlug(slug: string): BusinessData | undefined {
  return businesses.find((b) => b.slug === slug);
}
