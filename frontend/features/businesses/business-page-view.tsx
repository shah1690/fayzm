import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/shared/i18n/translations";
import { getBusinessBySlug } from "@/shared/lib/cms";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";
import { localizeHref } from "@/shared/lib/localize-href";

function FactoryIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <path
        d="M7 19V13L11 16V13L15 16V10H21V19H7Z"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type BusinessPageViewProps = Readonly<{
  slug: string;
  locale: Locale;
}>;

type BusinessDesign = {
  heroMediaFirst: boolean;
  insightImageFirst: boolean;
  strategyImageFirst: boolean;
  featureMode: "cards" | "list";
  quoteDark: boolean;
  ctaAlign: "left" | "right";
  heroPanelBackground: string;
  heroPanelText: string;
  heroPanelMuted: string;
  heroPanelBorder: string;
  insightBackground: string;
  quoteBackground: string;
  quoteText: string;
  quoteMuted: string;
  heroOverlay: string;
  insightOverlay: string;
  strategyOverlay: string;
  ctaOverlay: string;
  highlightIndex: number;
};

type LocalizedText = Record<Locale, string>;

type BusinessOverviewStat = {
  value: string;
  suffix?: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
};

type BusinessOverview = {
  quote: LocalizedText;
  stats: [BusinessOverviewStat, BusinessOverviewStat];
  partnershipDesc?: LocalizedText;
};

const text = {
  contactUs: {
    en: "Contact Us →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
    zh: "联系我们 →",
  },
  overview: {
    en: "Overview",
    uz: "Faoliyat sharhi",
    ru: "Обзор направления",
    zh: "业务概览",
  },
  capabilityFrame: {
    en: "Production capabilities",
    uz: "Ishlab chiqarish imkoniyatlari",
    ru: "Производственные возможности",
    zh: "生产能力",
  },
  whatWeBuilt: {
    en: "Key strengths",
    uz: "Asosiy imkoniyatlar",
    ru: "Ключевые возможности",
    zh: "核心优势",
  },
  clusterScale: {
    en: "Cluster scale",
    uz: "Klaster ko'lami",
    ru: "Масштаб кластера",
    zh: "集群规模",
  },
  partnershipHeading: {
    en: "Want to partner with us?",
    uz: "Biz bilan hamkorlik qilishni xohlaysizmi?",
    ru: "Хотите сотрудничать с нами?",
    zh: "想与我们合作吗？",
  },
  partnershipDesc: {
    en: "Get quality fabric supply and a long-term reliable partnership with FAYZ-M. Get in touch and let's take the next step together!",
    uz: "FAYZ-M bilan sifatli mato ta'minoti va uzoq muddatli ishonchli hamkorlikka ega bo'ling. Biz bilan bog'laning va yangi bosqichga birga qadam tashlaylik!",
    ru: "Получите качественное снабжение тканями и долгосрочное надёжное партнёрство с FAYZ-M. Свяжитесь с нами и сделаем следующий шаг вместе!",
    zh: "与 FAYZ-M 携手获得优质面料供应与长期可靠的合作。立即联系我们，共同迈向新阶段！",
  },
  partnershipCta: {
    en: "Request a consultation →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
    zh: "预约咨询 →",
  },
} as const;

const businessOverviews: Record<string, BusinessOverview> = {
  knitting: {
    quote: {
      en: "Fabric quality is the result of carefully selected yarn and precision in knit construction. Every roll is produced with consistent structure, stretch and impeccable finish.",
      uz: "Mato sifati — to'g'ri tanlangan ip va trikotaj to'qilishidagi aniqlik natijasidir. Bizda har bir rulon bir xil tuzilish, cho'ziluvchanlik va mukammal pardoz bilan ishlab chiqariladi.",
      ru: "Качество ткани — результат правильно подобранной пряжи и точности трикотажной вязки. Каждый рулон производится с одинаковой структурой, эластичностью и безупречной отделкой.",
      zh: "面料品质源于精选的纱线与精准的针织工艺。我们生产的每一卷面料都拥有一致的结构、延展性和完美的表面处理。",
    },
    stats: [
      {
        value: "4 015",
        suffix: { en: "t", uz: "t", ru: "т", zh: "吨" },
        title: {
          en: "Annual fabric output",
          uz: "Yillik mato quvvati",
          ru: "Годовой выпуск ткани",
          zh: "年产面料",
        },
        description: {
          en: "The knitting division produces 4,015 tons of fabric per year for internal garment lines and B2B supply.",
          uz: "Trikotaj bo'limi ichki tikuvchilik liniyalari va B2B ta'minot uchun yiliga 4 015 tonna mato ishlab chiqaradi.",
          ru: "Трикотажное направление выпускает 4 015 тонн ткани в год для внутренних швейных линий и B2B-поставок.",
          zh: "针织部门每年生产 4,015 吨面料，供应集团内部服装生产线和 B2B 客户。",
        },
      },
      {
        value: "50",
        suffix: { en: "+", uz: "+", ru: "+", zh: "+" },
        title: {
          en: "Specialists",
          uz: "Mutaxassislar",
          ru: "Специалисты",
          zh: "专业人员",
        },
        description: {
          en: "Our experienced team monitors product quality every second on Taifan, Honknit, Boosan and Jacquard equipment.",
          uz: "Bizning tajribali jamoamiz Taifan, Honknit, Boosan va Jacquard uskunalarida mahsulot sifatini har soniyada nazorat qiladi.",
          ru: "Наша опытная команда ежесекундно контролирует качество продукции на оборудовании Taifan, Honknit, Boosan и Jacquard.",
          zh: "我们经验丰富的团队在 Taifan、Honknit、Boosan 与 Jacquard 设备上对产品质量进行实时监控。",
        },
      },
    ],
  },
  "yarn-production": {
    quote: {
      en: "The foundation of quality yarn is a precise technological process. RIETER lines ensure that every spindle meets our cluster's strict standards — a solid base for our knitwear production.",
      uz: "Sifatli ipning asosi — aniq texnologik jarayon. RIETER liniyalari har bir urchuqning klasterimizning qat'iy standartlariga mos kelishini ta'minlaydi, bu esa trikotaj ishlab chiqarishimiz uchun mustahkam poydevordir.",
      ru: "Основа качественной пряжи — точный технологический процесс. Линии RIETER гарантируют соответствие каждого веретена строгим стандартам нашего кластера, что служит надёжной основой для нашего трикотажного производства.",
      zh: "高品质纱线的根基在于精准的工艺流程。RIETER 生产线确保每一锭纱都符合我们集群的严格标准，为针织生产打下坚实基础。",
    },
    stats: [
      {
        value: "9 417",
        suffix: { en: "t", uz: "t", ru: "т", zh: "吨" },
        title: {
          en: "Annual yarn capacity",
          uz: "Yillik ip quvvati",
          ru: "Годовая мощность пряжи",
          zh: "年纱线产能",
        },
        description: {
          en: "Scale and capacity. While fully covering the cluster's needs, we also supply high-quality yarn to export markets.",
          uz: "Masshtab va quvvat. Klaster ehtiyojlarini to'liq qoplash bilan birga, yuqori sifatli ipni eksport bozorlariga ham yetkazib beramiz.",
          ru: "Масштаб и мощность. Полностью покрывая потребности кластера, мы также поставляем высококачественную пряжу на экспортные рынки.",
          zh: "规模与产能并重。在充分满足集群内部需求的同时，我们也向出口市场供应优质纱线。",
        },
      },
      {
        value: "300",
        suffix: { en: "+", uz: "+", ru: "+", zh: "+" },
        title: {
          en: "Line employees",
          uz: "Liniya xodimlari",
          ru: "Сотрудники линий",
          zh: "生产线员工",
        },
        description: {
          en: "Human capital and automation. Our team consists of professionals with specialised training in operating Swiss technologies.",
          uz: "Inson kapitali va avtomatizatsiya. Jamoamiz Shveytsariya texnologiyalarini boshqarish bo'yicha maxsus tayyorgarlikdan o'tgan professional mutaxassislardan iborat.",
          ru: "Человеческий капитал и автоматизация. Наша команда состоит из профессионалов, прошедших специальную подготовку по управлению швейцарскими технологиями.",
          zh: "人才与自动化并举。我们的团队由经过专业培训、熟练操作瑞士技术设备的专业人员组成。",
        },
      },
    ],
  },
  "garment-production": {
    quote: {
      en: "For us, quality is not an accident — it is the product of systematic discipline. Design, cutting and sewing are unified into a single technological chain, which guarantees accountability for every stitch.",
      uz: "Bizda sifat tasodif emas, balki tizimli intizom mahsulidir. Dizayn, bichish va tikish jarayonlari yagona texnologik zanjirga birlashtirilgan bo'lib, bu har bir chok uchun mas'uliyatni kafolatlaydi.",
      ru: "У нас качество — не случайность, а результат системной дисциплины. Дизайн, раскрой и пошив объединены в единую технологическую цепочку, что гарантирует ответственность за каждый стежок.",
      zh: "对我们而言，品质并非偶然，而是源于系统化的纪律。设计、裁剪与缝制被整合进同一条技术链，从而对每一道针脚负责。",
    },
    stats: [
      {
        value: "10",
        suffix: { en: "M+", uz: "mln+", ru: "млн+", zh: "百万+" },
        title: {
          en: "Garments per year",
          uz: "Yillik kiyim hajmi",
          ru: "Изделий в год",
          zh: "年产成衣",
        },
        description: {
          en: "FAYZ-M produces everyday and seasonal knitwear for regional and export markets from one integrated base.",
          uz: "FAYZ-M kundalik va mavsumiy trikotaj kiyimlarni hududiy hamda eksport bozorlari uchun yagona integratsiyalashgan bazada ishlab chiqaradi.",
          ru: "FAYZ-M производит повседневный и сезонный трикотаж для региональных и экспортных рынков на единой интегрированной базе.",
          zh: "FAYZ-M 在统一的一体化基地中，为本地与出口市场生产日常款与季节款针织服装。",
        },
      },
      {
        value: "700",
        suffix: { en: "+", uz: "+", ru: "+", zh: "+" },
        title: {
          en: "Skilled workers",
          uz: "Malakali ishchilar",
          ru: "Квалифицированные работники",
          zh: "熟练员工",
        },
        description: {
          en: "Most team members are local women trained in production discipline, quality control, and export requirements.",
          uz: "Jamoaning katta qismi ishlab chiqarish intizomi, sifat nazorati va eksport talablari bo'yicha tayyorlangan mahalliy ayollardan iborat.",
          ru: "Большинство команды — местные женщины, обученные производственной дисциплине, контролю качества и экспортным требованиям.",
          zh: "团队大多数成员是来自当地的女性，并经过生产纪律、质量管控和出口标准的专业培训。",
        },
      },
    ],
  },
  flour: {
    quote: {
      en: "Quality is our primary measure. Every stage — from grain intake to the finished flour bag — passes through laboratory control. We guarantee product purity through a full chain of control inside the cluster.",
      uz: "Sifat — bizning bosh mezonimiz. Donni qabul qilishdan tortib, tayyor un qoplariga qadar har bir bosqich laboratoriya nazoratidan o'tadi. Biz klaster ichidagi to'liq nazorat zanjiri orqali mahsulot sofligini kafolatlaymiz.",
      ru: "Качество — наш главный критерий. Каждый этап — от приёмки зерна до готовых мешков муки — проходит лабораторный контроль. Мы гарантируем чистоту продукции через полную цепочку контроля внутри кластера.",
      zh: "品质是我们的首要标准。从谷物入库到面粉成袋的每一个环节都经过实验室检测。我们通过集群内的完整管控链条，保证产品的纯净。",
    },
    stats: [
      {
        value: "29 200",
        suffix: { en: "t", uz: "t", ru: "т", zh: "吨" },
        title: {
          en: "Annual flour output",
          uz: "Yillik un quvvati",
          ru: "Годовой выпуск муки",
          zh: "年产面粉",
        },
        description: {
          en: "Wheat from FAYZ-M fields is milled for domestic supply and cluster food needs with year-round operation.",
          uz: "FAYZ-M dalalaridagi bug'doy ichki ta'minot va klaster oziq-ovqat ehtiyojlari uchun yil davomida tortiladi.",
          ru: "Пшеница с полей FAYZ-M круглый год перемалывается для внутреннего снабжения и пищевых нужд кластера.",
          zh: "来自 FAYZ-M 田间的小麦全年进行磨制，满足国内供应和集群的食品需求。",
        },
      },
      {
        value: "50",
        suffix: { en: "+", uz: "+", ru: "+", zh: "+" },
        title: {
          en: "Mill employees",
          uz: "Tegirmon xodimlari",
          ru: "Сотрудники мельницы",
          zh: "磨坊员工",
        },
        description: {
          en: "Full-time teams operate milling, hygiene, and lab testing workflows with strict production discipline.",
          uz: "Doimiy jamoalar tortish, gigiyena va laboratoriya sinovi jarayonlarini qat'iy ishlab chiqarish intizomi bilan boshqaradi.",
          ru: "Постоянные команды ведут помол, гигиену и лабораторные проверки с жёсткой производственной дисциплиной.",
          zh: "全职团队以严格的生产纪律运营磨制、卫生与实验室检测流程。",
        },
      },
    ],
  },
  petrol: {
    quote: {
      en: "Fuel is the power source of the production chain. Every process — from storage to distribution — is managed from a single control point, ensuring quality and accuracy.",
      uz: "Yoqilg'i — ishlab chiqarish zanjirining quvvat manbai. Saqlashdan tortib tarqatishgacha bo'lgan barcha jarayonlar yagona nazorat nuqtasidan boshqariladi, bu esa sifat va aniqlikni ta'minlaydi.",
      ru: "Топливо — источник энергии производственной цепочки. Все процессы — от хранения до распределения — управляются из единой точки контроля, что обеспечивает качество и точность.",
      zh: "燃油是生产链条的动力之源。从储存到分发的每一个环节都由统一控制点管理，确保品质与精准。",
    },
    stats: [
      {
        value: "100",
        suffix: { en: "k L", uz: "ming l", ru: "тыс. л", zh: "千升" },
        title: {
          en: "Storage capacity",
          uz: "Saqlash quvvati",
          ru: "Ёмкость хранения",
          zh: "储存容量",
        },
        description: {
          en: "Massive reserve capacity. Modern technology strictly controls both fuel quality and volume.",
          uz: "Ulkan zaxira quvvati. Zamonaviy texnologiyalar yordamida yoqilg'i sifati va miqdori qat'iy nazorat qilinadi.",
          ru: "Огромная резервная мощность. Современные технологии обеспечивают строгий контроль качества и объёма топлива.",
          zh: "雄厚的储备能力。现代化技术严格管控燃油的品质与数量。",
        },
      },
      {
        value: "24",
        suffix: { en: "/7", uz: "/7", ru: "/7", zh: "/7" },
        title: {
          en: "Service mode",
          uz: "Xizmat rejimi",
          ru: "Режим сервиса",
          zh: "服务模式",
        },
        description: {
          en: "Non-stop service. Our station serves both the company's machinery and the local community around the clock.",
          uz: "Uzluksiz xizmat rejimi. Bizning shoxobchamiz sutka davomida ham korxona texnikalariga, ham mahalliy aholiga xizmat ko'rsatadi.",
          ru: "Непрерывный режим работы. Наша станция круглосуточно обслуживает как технику предприятия, так и местное население.",
          zh: "全天候不间断服务。我们的加油站全天 24 小时为公司机械及周边居民提供服务。",
        },
      },
    ],
    partnershipDesc: {
      en: "Get quality fuel supply and a long-term reliable partnership with FAYZ-M. Get in touch and let's take the next step together!",
      uz: "FAYZ-M bilan sifatli yoqilg'i ta'minoti va uzoq muddatli ishonchli hamkorlikka ega bo'ling. Biz bilan bog'laning va yangi bosqichga birga qadam tashlaylik!",
      ru: "Получите качественное топливное снабжение и долгосрочное надёжное партнёрство с FAYZ-M. Свяжитесь с нами и сделаем следующий шаг вместе!",
      zh: "携手 FAYZ-M 获得优质燃油供应与长期可靠的合作。立即联系我们，共同迈向新阶段！",
    },
  },
  farm: {
    quote: {
      en: "Healthy livestock is the guarantee of quality products. We unify animal care, fodder production and finished product supply within a single technological system, ensuring high quality and control at every stage.",
      uz: "Sog'lom chorva — sifatli mahsulot garovi. Bizda hayvonlarni parvarish qilish, ozuqa yetishtirish va tayyor mahsulot yetkazib berish yagona texnologik tizimda birlashgan. Bu har bir bosqichda yuqori sifat va nazoratni ta'minlaydi.",
      ru: "Здоровое поголовье — залог качественной продукции. У нас уход за животными, производство кормов и поставка готовой продукции объединены в единой технологической системе. Это обеспечивает высокое качество и контроль на каждом этапе.",
      zh: "健康的畜群是优质产品的保障。我们将动物饲养、饲料生产与成品供应整合在同一套技术体系中，确保每一道环节都保持高质量与可控性。",
    },
    stats: [
      {
        value: "1 300",
        suffix: { en: "+", uz: "+", ru: "+", zh: "+" },
        title: {
          en: "Livestock headcount",
          uz: "Chorva bosh soni",
          ru: "Голов скота",
          zh: "牲畜头数",
        },
        description: {
          en: "Starting from 30 head of cattle, our farm has grown today into a large complex containing more than 1,300 select pedigree animals.",
          uz: "30 ta qoramoldan boshlangan xo'jaligimiz bugungi kunda 1300 dan ortiq sara zotli hayvonlarni o'z ichiga olgan yirik majmuaga aylandi.",
          ru: "Начав с 30 голов крупного рогатого скота, наше хозяйство сегодня превратилось в крупный комплекс, в котором содержится более 1 300 отборных племенных животных.",
          zh: "我们的牧场从 30 头牛起步，如今已发展为拥有超过 1,300 头精选纯种动物的大型综合体。",
        },
      },
      {
        value: "2018",
        title: {
          en: "Established",
          uz: "Tashkil etilgan",
          ru: "Основано",
          zh: "成立年份",
        },
        description: {
          en: "In a short time, through an innovative approach, we have fully covered our cluster's demand for meat and dairy products.",
          uz: "Qisqa vaqt ichida biz innovatsion yondashuv orqali klasterimizning go'sht va sut mahsulotlariga bo'lgan ehtiyojini to'liq qoplashga erishdik.",
          ru: "За короткое время благодаря инновационному подходу мы полностью покрыли потребности нашего кластера в мясной и молочной продукции.",
          zh: "在很短的时间内，我们凭借创新方式，完全满足了集群对肉类和乳制品的需求。",
        },
      },
    ],
  },
  "cottonseed-oil": {
    quote: {
      en: "We extract maximum value from every gram of cottonseed. Refined oil for food, meal and hulls for livestock — all unified into a single zero-waste production flow.",
      uz: "Biz chigitning har bir grammidan maksimal foyda chiqaramiz. Tozalangan yog' oziq-ovqat uchun, kunjara va qobiq esa chorvachilik uchun — barchasi yagona chiqindisiz ishlab chiqarish oqimida birlashgan.",
      ru: "Мы извлекаем максимальную пользу из каждого грамма хлопкового семени. Рафинированное масло — для пищевой промышленности, шрот и шелуха — для животноводства, всё объединено в единый безотходный производственный поток.",
      zh: "我们从每一克棉籽中榨取最大价值。精炼油用于食品，饼粕与籽壳用于畜牧——一切整合在同一条零废弃生产流程中。",
    },
    stats: [
      {
        value: "7 300",
        suffix: { en: "t", uz: "t", ru: "т", zh: "吨" },
        title: {
          en: "Annual oil output",
          uz: "Yillik yog' quvvati",
          ru: "Годовой выпуск масла",
          zh: "年产油量",
        },
        description: {
          en: "Refined cottonseed oil is produced from FAYZ-M fields for domestic supply and future export potential.",
          uz: "Tozalangan paxta yog'i FAYZ-M dalalaridagi chigitdan ichki ta'minot va eksport salohiyati uchun ishlab chiqariladi.",
          ru: "Рафинированное хлопковое масло производится из семян с полей FAYZ-M для внутреннего снабжения и будущего экспортного потенциала.",
          zh: "精炼棉籽油以 FAYZ-M 田间的棉籽为原料生产，供应国内市场并具备广阔的出口潜力。",
        },
      },
      {
        value: "0",
        suffix: { en: "waste", uz: "chiqindi", ru: "отходов", zh: "废弃" },
        title: {
          en: "100% efficiency",
          uz: "100% samaradorlik",
          ru: "100% эффективность",
          zh: "100% 效率",
        },
        description: {
          en: "No waste remains from the production process — by-products are directed to the livestock farms inside the cluster.",
          uz: "Ishlab chiqarish jarayonida hech qanday chiqindi qolmaydi — qo'shimcha mahsulotlar klaster ichidagi chorvachilik xo'jaliklariga yo'naltiriladi.",
          ru: "В процессе производства не остаётся отходов — побочные продукты направляются на животноводческие хозяйства внутри кластера.",
          zh: "生产过程中不产生任何废弃物——副产品全部转入集群内的畜牧场使用。",
        },
      },
    ],
  },
};

const designs: Record<string, BusinessDesign> = {
  knitting: {
    heroMediaFirst: true,
    insightImageFirst: false,
    strategyImageFirst: false,
    featureMode: "cards",
    quoteDark: true,
    ctaAlign: "left",
    heroPanelBackground: "#F6F1EA",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#F8FAFC",
    quoteBackground: "#070A0F",
    quoteText: "#FFFFFF",
    quoteMuted: "rgba(255,255,255,0.68)",
    heroOverlay:
      "linear-gradient(155deg, rgba(0,53,102,0.65) 0%, rgba(0,53,102,0.2) 44%, rgba(0,0,0,0.18) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.08) 0%, rgba(7,10,15,0.28) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.18) 0%, rgba(0,0,0,0.3) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(7,10,15,0.86) 0%, rgba(7,10,15,0.5) 42%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 0,
  },
  "yarn-production": {
    heroMediaFirst: false,
    insightImageFirst: true,
    strategyImageFirst: true,
    featureMode: "list",
    quoteDark: false,
    ctaAlign: "right",
    heroPanelBackground: "#070A0F",
    heroPanelText: "#FFFFFF",
    heroPanelMuted: "rgba(255,255,255,0.7)",
    heroPanelBorder: "rgba(255,255,255,0.08)",
    insightBackground: "#F4F7FB",
    quoteBackground: "#FFFFFF",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.6)",
    heroOverlay:
      "linear-gradient(140deg, rgba(7,10,15,0.18) 0%, rgba(0,53,102,0.5) 55%, rgba(7,10,15,0.76) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(0,53,102,0.08) 0%, rgba(7,10,15,0.34) 100%)",
    strategyOverlay:
      "linear-gradient(180deg, rgba(0,53,102,0.08) 0%, rgba(7,10,15,0.38) 100%)",
    ctaOverlay:
      "linear-gradient(270deg, rgba(7,10,15,0.9) 0%, rgba(7,10,15,0.52) 35%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 1,
  },
  "garment-production": {
    heroMediaFirst: true,
    insightImageFirst: true,
    strategyImageFirst: false,
    featureMode: "cards",
    quoteDark: false,
    ctaAlign: "left",
    heroPanelBackground: "#FFFFFF",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(7,10,15,0.08)",
    insightBackground: "#F5F5F5",
    quoteBackground: "#EDE6DE",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.62)",
    heroOverlay:
      "linear-gradient(145deg, rgba(0,53,102,0.28) 0%, rgba(0,0,0,0.14) 42%, rgba(7,10,15,0.72) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.06) 0%, rgba(7,10,15,0.32) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.12) 0%, rgba(7,10,15,0.42) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(0,53,102,0.84) 0%, rgba(7,10,15,0.46) 45%, rgba(7,10,15,0.06) 100%)",
    highlightIndex: 2,
  },
  flour: {
    heroMediaFirst: false,
    insightImageFirst: false,
    strategyImageFirst: true,
    featureMode: "list",
    quoteDark: true,
    ctaAlign: "right",
    heroPanelBackground: "#F3ECE3",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.64)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#FBF8F3",
    quoteBackground: "#070A0F",
    quoteText: "#FFFFFF",
    quoteMuted: "rgba(255,255,255,0.68)",
    heroOverlay:
      "linear-gradient(150deg, rgba(0,53,102,0.42) 0%, rgba(255,255,255,0.02) 35%, rgba(7,10,15,0.72) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.08) 0%, rgba(7,10,15,0.3) 100%)",
    strategyOverlay:
      "linear-gradient(170deg, rgba(0,53,102,0.1) 0%, rgba(7,10,15,0.38) 100%)",
    ctaOverlay:
      "linear-gradient(270deg, rgba(7,10,15,0.88) 0%, rgba(7,10,15,0.45) 38%, rgba(7,10,15,0.06) 100%)",
    highlightIndex: 1,
  },
  petrol: {
    heroMediaFirst: true,
    insightImageFirst: true,
    strategyImageFirst: true,
    featureMode: "cards",
    quoteDark: true,
    ctaAlign: "left",
    heroPanelBackground: "#0B1220",
    heroPanelText: "#FFFFFF",
    heroPanelMuted: "rgba(255,255,255,0.72)",
    heroPanelBorder: "rgba(255,255,255,0.08)",
    insightBackground: "#F4F6F8",
    quoteBackground: "#0B1220",
    quoteText: "#FFFFFF",
    quoteMuted: "rgba(255,255,255,0.68)",
    heroOverlay:
      "linear-gradient(140deg, rgba(7,10,15,0.08) 0%, rgba(0,53,102,0.44) 38%, rgba(7,10,15,0.84) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.06) 0%, rgba(7,10,15,0.34) 100%)",
    strategyOverlay:
      "linear-gradient(155deg, rgba(0,53,102,0.18) 0%, rgba(7,10,15,0.42) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(7,10,15,0.9) 0%, rgba(0,53,102,0.52) 45%, rgba(7,10,15,0.1) 100%)",
    highlightIndex: 3,
  },
  farm: {
    heroMediaFirst: false,
    insightImageFirst: true,
    strategyImageFirst: false,
    featureMode: "cards",
    quoteDark: false,
    ctaAlign: "right",
    heroPanelBackground: "#F6F5F1",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#F7FAFC",
    quoteBackground: "#FFFFFF",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.62)",
    heroOverlay:
      "linear-gradient(150deg, rgba(0,53,102,0.34) 0%, rgba(255,255,255,0.06) 42%, rgba(7,10,15,0.7) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.05) 0%, rgba(7,10,15,0.28) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.1) 0%, rgba(7,10,15,0.34) 100%)",
    ctaOverlay:
      "linear-gradient(270deg, rgba(7,10,15,0.88) 0%, rgba(7,10,15,0.44) 40%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 0,
  },
  "cottonseed-oil": {
    heroMediaFirst: true,
    insightImageFirst: false,
    strategyImageFirst: true,
    featureMode: "list",
    quoteDark: false,
    ctaAlign: "left",
    heroPanelBackground: "#EEE7DF",
    heroPanelText: "#070A0F",
    heroPanelMuted: "rgba(7,10,15,0.62)",
    heroPanelBorder: "rgba(0,53,102,0.08)",
    insightBackground: "#F6F7F8",
    quoteBackground: "#F0EBE4",
    quoteText: "#070A0F",
    quoteMuted: "rgba(7,10,15,0.62)",
    heroOverlay:
      "linear-gradient(145deg, rgba(0,53,102,0.28) 0%, rgba(255,255,255,0.04) 35%, rgba(7,10,15,0.78) 100%)",
    insightOverlay:
      "linear-gradient(180deg, rgba(7,10,15,0.06) 0%, rgba(7,10,15,0.28) 100%)",
    strategyOverlay:
      "linear-gradient(160deg, rgba(0,53,102,0.12) 0%, rgba(7,10,15,0.36) 100%)",
    ctaOverlay:
      "linear-gradient(90deg, rgba(7,10,15,0.86) 0%, rgba(0,53,102,0.44) 40%, rgba(7,10,15,0.08) 100%)",
    highlightIndex: 2,
  },
};

function StatCard({
  value,
  suffix,
  title,
  description,
}: Readonly<{
  value: string;
  suffix?: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[28px] border border-[#E5E7EB] bg-white p-6">
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold tracking-tight text-[#070A0F] md:text-5xl">
          {value}
        </span>
        {suffix ? (
          <span className="pb-1 text-lg font-semibold text-[#003566]/70 md:text-xl">
            {suffix}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#003566]/55">
          {title}
        </p>
        <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
    </div>
  );
}

function FeatureCards({
  features,
  locale,
  highlightIndex,
}: Readonly<{
  features: { en: string; uz: string; ru: string; zh: string }[];
  locale: Locale;
  highlightIndex: number;
}>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {features.map((feature, index) => {
        const highlighted = index === highlightIndex % features.length;
        return (
          <div
            key={feature.en}
            className="flex min-h-[132px] flex-col gap-4 rounded-[28px] border p-5 transition-transform duration-300 hover:-translate-y-1"
            style={{
              background: highlighted ? "#070A0F" : "#FFFFFF",
              borderColor: highlighted ? "#070A0F" : "#E5E7EB",
            }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
              style={{
                background: highlighted ? "rgba(255,255,255,0.12)" : "#EEF3FA",
                color: highlighted ? "#FFFFFF" : "#003566",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: highlighted ? "rgba(255,255,255,0.82)" : "#6B7280",
              }}
            >
              {feature[locale]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function FeatureList({
  features,
  locale,
}: Readonly<{
  features: { en: string; uz: string; ru: string; zh: string }[];
  locale: Locale;
}>) {
  return (
    <div className="rounded-[32px] border border-[#E5E7EB] bg-[#FAFAFA] p-6 md:p-7">
      <ul className="flex flex-col divide-y divide-[#E5E7EB]">
        {features.map((feature) => (
          <li key={feature.en} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#003566] text-xs font-bold text-white">
              ✓
            </span>
            <span className="text-sm leading-relaxed text-[#6B7280]">
              {feature[locale]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function BusinessPageView({
  slug,
  locale,
}: BusinessPageViewProps) {
  const business = await getBusinessBySlug(slug);

  if (!business) {
    throw new Error(`Unknown business slug: ${slug}`);
  }

  const design = designs[business.slug] ?? designs.knitting;
  const overview =
    businessOverviews[business.slug] ?? businessOverviews.knitting;
  const ctaAlignClass =
    design.ctaAlign === "right"
      ? "items-start md:items-end md:text-right"
      : "items-start text-left";
  const ctaButtonClass =
    design.ctaAlign === "right" ? "md:self-end" : "self-start";

  return (
    <main>
      <section className="bg-white px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div
              className={`relative min-h-[520px] overflow-hidden rounded-[40px] md:col-span-7 md:min-h-[680px] ${design.heroMediaFirst ? "md:order-1" : "md:order-2"}`}
            >
              <Image
                src={business.image1}
                alt={business.label[locale]}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
                {...shimmerImageProps(1400, 1600)}
              />
              <div
                className="absolute inset-0"
                style={{ background: design.heroOverlay }}
              />
              <div className="absolute left-6 top-6 md:left-8 md:top-8">
                <FactoryIcon />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="max-w-xl rounded-[28px] border border-white/15 bg-black/18 p-5 backdrop-blur-md md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58">
                    {business.label[locale]}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">
                    {business.cardHeading[locale]}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/72">
                    {business.cardText[locale]}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex rounded-[40px] border p-6 md:col-span-5 md:p-8 ${design.heroMediaFirst ? "md:order-2" : "md:order-1"}`}
              style={{
                background: design.heroPanelBackground,
                borderColor: design.heroPanelBorder,
                color: design.heroPanelText,
              }}
            >
              <div className="flex w-full flex-col justify-between gap-8">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#003566]" />
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.22em]"
                      style={{ color: design.heroPanelMuted }}
                    >
                      {business.label[locale]}
                    </span>
                  </div>
                  <h1 className="max-w-[12ch] text-4xl leading-[1.02] tracking-tight md:text-6xl">
                    {business.heading[locale]}
                  </h1>
                  <p
                    className="max-w-[56ch] text-sm leading-relaxed md:text-base"
                    style={{ color: design.heroPanelMuted }}
                  >
                    {business.description[locale]}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {business.features.slice(0, 2).map((feature, index) => (
                      <div
                        key={feature.en}
                        className="rounded-[24px] border px-4 py-4"
                        style={{
                          borderColor:
                            design.heroPanelText === "#FFFFFF"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(7,10,15,0.08)",
                          background:
                            design.heroPanelText === "#FFFFFF"
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(255,255,255,0.55)",
                        }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#003566]/65">
                          0{index + 1}
                        </p>
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: design.heroPanelMuted }}
                        >
                          {feature[locale]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <p
                      className="max-w-[58ch] text-sm leading-relaxed md:text-base"
                      style={{ color: design.heroPanelMuted }}
                    >
                      {business.bodyText[locale]}
                    </p>
                    <Link
                      href={localizeHref(locale, "/contact")}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-[#003566] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#002B52]"
                    >
                      {text.contactUs[locale]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-5 py-10 md:px-10 md:py-16"
        style={{ background: design.insightBackground }}
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div
              className={`flex flex-col gap-6 md:col-span-5 ${design.insightImageFirst ? "md:order-2" : "md:order-1"}`}
            >
              <div
                className="rounded-[36px] p-6 md:p-8"
                style={{
                  background: design.quoteBackground,
                  color: design.quoteText,
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: design.quoteMuted }}
                >
                  {text.overview[locale]}
                </p>
                <p className="mt-5 text-2xl font-semibold leading-snug md:text-3xl">
                  &ldquo;{overview.quote[locale]}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {overview.stats.map((stat) => (
                  <StatCard
                    key={stat.title.en}
                    value={stat.value}
                    suffix={stat.suffix?.[locale]}
                    title={stat.title[locale]}
                    description={stat.description[locale]}
                  />
                ))}
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 md:col-span-7 ${design.insightImageFirst ? "md:order-1" : "md:order-2"}`}
            >
              <div className="relative min-h-[420px] overflow-hidden rounded-[36px] md:min-h-[520px]">
                <Image
                  src={business.image2}
                  alt={business.label[locale]}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                  {...shimmerImageProps(1400, 1000)}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: design.insightOverlay }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="max-w-[540px] rounded-[28px] bg-white/88 p-5 backdrop-blur-md md:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                      {text.clusterScale[locale]}
                    </p>
                    <h3 className="mt-3 text-2xl leading-tight text-[#070A0F] md:text-3xl">
                      {business.cardHeading[locale]}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      {business.cardText[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div
              className={`relative min-h-[420px] overflow-hidden rounded-[40px] md:col-span-5 md:min-h-[620px] ${design.strategyImageFirst ? "md:order-1" : "md:order-2"}`}
            >
              <Image
                src={business.image3}
                alt={business.label[locale]}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                {...shimmerImageProps(1200, 1500)}
              />
              <div
                className="absolute inset-0"
                style={{ background: design.strategyOverlay }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="rounded-[28px] border border-white/12 bg-black/18 p-5 backdrop-blur-md md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                    {text.capabilityFrame[locale]}
                  </p>
                  <h3 className="mt-3 text-2xl leading-tight text-white md:text-3xl">
                    {business.strategyHeading[locale]}
                  </h3>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-6 md:col-span-7 ${design.strategyImageFirst ? "md:order-2" : "md:order-1"}`}
            >
              <div className="rounded-[36px] bg-[#F8FAFC] p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                  {text.capabilityFrame[locale]}
                </p>
                <h2 className="mt-4 max-w-[14ch] text-3xl leading-[1.05] tracking-tight text-[#070A0F] md:text-5xl">
                  {business.strategyHeading[locale]}
                </h2>
                <p
                  className="mt-4 max-w-[62ch] text-sm leading-relaxed md:text-base"
                  style={{ color: "#6B7280" }}
                >
                  {business.strategyDesc[locale]}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#003566]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003566]/60">
                    {text.whatWeBuilt[locale]}
                  </span>
                </div>
                {design.featureMode === "cards" ? (
                  <FeatureCards
                    features={business.features}
                    locale={locale}
                    highlightIndex={design.highlightIndex}
                  />
                ) : (
                  <FeatureList features={business.features} locale={locale} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative min-h-[460px] overflow-hidden rounded-[40px]">
            <Image
              src={business.ctaImage}
              alt={business.label[locale]}
              fill
              sizes="100vw"
              className="object-cover"
              {...shimmerImageProps(1600, 900)}
            />
            <div
              className="absolute inset-0"
              style={{ background: design.ctaOverlay }}
            />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div
              className={`relative z-10 flex h-full min-h-[460px] flex-col justify-between gap-8 p-8 md:p-14 ${ctaAlignClass}`}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5D6C9]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  {business.label[locale]}
                </span>
              </div>
              <div className="flex max-w-xl flex-col gap-4">
                <h2 className="text-3xl font-bold leading-[1.05] text-white md:text-5xl">
                  {text.partnershipHeading[locale]}
                </h2>
                <p className="text-sm leading-relaxed text-white/75 md:text-base">
                  {(overview.partnershipDesc ?? text.partnershipDesc)[locale]}
                </p>
                <Link
                  href={localizeHref(locale, "/contact")}
                  className={`inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#003566] hover:text-white ${ctaButtonClass}`}
                >
                  {text.partnershipCta[locale]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
