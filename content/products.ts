export type ProductSpec = {
  fabric: string;
  composition: string;
  weight: string;
};

export type ProductData = {
  id: string;
  slug: string;
  gender: "women" | "men";
  name: string;
  description: { en: string; uz: string; ru: string };
  image: string;
  specs: ProductSpec;
  sizes: string[];
};

export const products: ProductData[] = [
  // ─── Women ───────────────────────────────────────────────
  {
    id: "w-1474",
    slug: "1474",
    gender: "women",
    name: "1474",
    description: {
      en: "Soft knitwear hoodie with a relaxed fit and brushed interior. Crafted from premium cotton blend for all-day comfort.",
      uz: "Yumshoq trikotaj tolali keng kesimli kurti. Premium paxta aralashmasi asosida ishlab chiqarilgan.",
      ru: "Мягкое трикотажное худи свободного кроя с начёсом внутри. Из премиальной хлопковой смеси для комфорта на весь день.",
    },
    image: "/images/products/w-1474.jpg",
    specs: {
      fabric: "French terry",
      composition: "100% cotton",
      weight: "340 g/m²",
    },
    sizes: ["44", "46", "48", "50", "52"],
  },
  {
    id: "w-1472",
    slug: "1472",
    gender: "women",
    name: "1472",
    description: {
      en: "Ribbed pullover with a clean finish. Lightweight yet warm — perfect layering piece for transitional weather.",
      uz: "Qovurg'ali pullover. Yengil ammo issiq — o'tish fasli uchun ideal.",
      ru: "Рибированный пуловер с аккуратной отделкой. Лёгкий, но тёплый — идеальный слой для переходной погоды.",
    },
    image: "/images/products/w-1472.jpg",
    specs: {
      fabric: "Rib knit",
      composition: "95% cotton / 5% elastane",
      weight: "300 g/m²",
    },
    sizes: ["44", "46", "48", "50"],
  },
  {
    id: "w-1450",
    slug: "w-1450",
    gender: "women",
    name: "W-1450",
    description: {
      en: "Oversized knit with dropped shoulders and a cozy feel. A wardrobe staple made to last season after season.",
      uz: "Keng yelkali naqshli trikotaj. Mavsum ortidan mavsum kiyish uchun mo'ljallangan.",
      ru: "Оверсайз-вязка с опущенными плечами и уютным ощущением. Базовая вещь гардероба, рассчитанная на многие сезоны.",
    },
    image: "/images/products/w-1450.jpg",
    specs: {
      fabric: "Interlock",
      composition: "100% cotton",
      weight: "320 g/m²",
    },
    sizes: ["44", "46", "48", "50", "52"],
  },
  {
    id: "w-9149",
    slug: "9149",
    gender: "women",
    name: "9149",
    description: {
      en: "Slim turtleneck with a smooth knit surface. Elegant and versatile — from office to evening.",
      uz: "Silliq trikotaj yuzali ingichka rulonli bo'yin. Ofisdan kechki vaqtgacha — universallik timsoli.",
      ru: "Облегающая водолазка с гладкой вязаной поверхностью. Элегантная и универсальная — от офиса до вечера.",
    },
    image: "/images/products/w-9149.jpg",
    specs: {
      fabric: "Single jersey",
      composition: "100% cotton",
      weight: "180 g/m²",
    },
    sizes: ["44", "46", "48", "50"],
  },
  {
    id: "w-1495",
    slug: "1495",
    gender: "women",
    name: "1495",
    description: {
      en: "Cropped cardigan with button closure and structured silhouette. Pairs seamlessly with high-waist styles.",
      uz: "Tugmalik qisqa kardigan. Yuqori bel uslublari bilan mukammal juftlanadi.",
      ru: "Укороченный кардиган с пуговицами и структурированным силуэтом. Идеально сочетается с завышенной талией.",
    },
    image: "/images/products/w-1495.jpg",
    specs: {
      fabric: "Purl knit",
      composition: "80% cotton / 20% polyester",
      weight: "280 g/m²",
    },
    sizes: ["44", "46", "48", "50", "52"],
  },
  {
    id: "w-1456",
    slug: "w-1456",
    gender: "women",
    name: "W-1456",
    description: {
      en: "V-neck sweater in a relaxed silhouette. Timeless design with a fine texture that flatters every body type.",
      uz: "V-bo'yin sviter. Har qanday tana tipini bezaydigan bezatilmagan klassik dizayn.",
      ru: "Свитер с V-образным вырезом в свободном силуэте. Вневременной дизайн с тонкой текстурой для любой фигуры.",
    },
    image: "/images/products/w-1456.jpg",
    specs: {
      fabric: "Fine knit",
      composition: "100% cotton",
      weight: "220 g/m²",
    },
    sizes: ["44", "46", "48", "50"],
  },

  // ─── Men ─────────────────────────────────────────────────
  {
    id: "m-875",
    slug: "m-875",
    gender: "men",
    name: "M-875",
    description: {
      en: "Heavy zip-up hoodie with structured hood and reinforced cuffs. Built for durability and daily wear.",
      uz: "Og'ir fermuarli kofta. Chidamlilik va kundalik kiyim uchun yaratilgan.",
      ru: "Тяжёлое худи на молнии со структурированным капюшоном и усиленными манжетами. Создано для прочности и ежедневной носки.",
    },
    image: "/images/products/m-875.jpg",
    specs: {
      fabric: "French terry",
      composition: "100% cotton",
      weight: "380 g/m²",
    },
    sizes: ["48", "50", "52", "54", "56"],
  },
  {
    id: "m-874",
    slug: "m-874",
    gender: "men",
    name: "M-874",
    description: {
      en: "Zip-up hoodie with a stonewashed finish. High-quality cotton French terry with a soft interior — built for warmth and comfort during chilly days.",
      uz: "Toshlangan effektli fermuarli kofta. Yumshoq ichki qismi bilan sifatli paxta fransuz terri — sovuq kunlar uchun yaratilgan.",
      ru: "Худи на молнии со стираным эффектом. Высококачественный хлопковый French terry с мягкой подкладкой — создан для тепла и комфорта в прохладные дни.",
    },
    image: "/images/products/m-874.jpg",
    specs: {
      fabric: "French terry",
      composition: "100% cotton",
      weight: "360 g/m²",
    },
    sizes: ["48", "50", "52", "54", "56"],
  },
  {
    id: "m-876",
    slug: "m-876",
    gender: "men",
    name: "M-876",
    description: {
      en: "Track jacket with contrast stripe detailing. A clean sport-meets-street silhouette with comfortable stretch.",
      uz: "Kontrast yo'l-yo'l bezatilgan sport kurtka. Qulay cho'ziluvchanligi bilan sport va ko'cha uslubi.",
      ru: "Спортивная куртка с контрастными полосками. Чистый силуэт на стыке спорта и стрита с комфортным стрейчем.",
    },
    image: "/images/products/m-876.jpg",
    specs: {
      fabric: "Tricot knit",
      composition: "90% polyester / 10% elastane",
      weight: "260 g/m²",
    },
    sizes: ["46", "48", "50", "52", "54"],
  },
  {
    id: "m-008d",
    slug: "008-d",
    gender: "men",
    name: "008 D",
    description: {
      en: "Crew neck sweater in a medium weight knit. Versatile enough for layering or wearing solo — an everyday essential.",
      uz: "O'rta og'irlikdagi trikotajdan yasalgan yumaloq bo'yin sviter. Qatlamli yoki mustaqil kiyish uchun universal.",
      ru: "Свитер с круглым вырезом из трикотажа среднего веса. Достаточно универсален для слоёв или самостоятельной носки — ежедневный must-have.",
    },
    image: "/images/products/m-008d.jpg",
    specs: {
      fabric: "Single jersey",
      composition: "100% cotton",
      weight: "200 g/m²",
    },
    sizes: ["46", "48", "50", "52", "54", "56"],
  },
  {
    id: "m-001",
    slug: "m-001",
    gender: "men",
    name: "M-001",
    description: {
      en: "Bold pullover in a deep plum colorway. Ribbed hem and cuffs with a relaxed silhouette for an elevated casual look.",
      uz: "To'q binafsha rangli yorqin pullover. Qovurg'ali etak va bilaklar bilan erkin siluet.",
      ru: "Смелый пуловер в глубоком сливовом цвете. Рибированный низ и манжеты со свободным силуэтом для стильного кэжуал-образа.",
    },
    image: "/images/products/m-001.jpg",
    specs: {
      fabric: "Rib knit",
      composition: "95% cotton / 5% elastane",
      weight: "310 g/m²",
    },
    sizes: ["46", "48", "50", "52", "54"],
  },
  {
    id: "m-627",
    slug: "m-627",
    gender: "men",
    name: "M-627",
    description: {
      en: "Half-zip sweatshirt with brushed fleece interior. A performance-inspired silhouette that transitions from outdoor to everyday use.",
      uz: "Cho'tkalangan fleece ichki qismi bilan yarim fermuarli svitshot. Tashqaridan kundalik foydalanishga o'tadigan siluet.",
      ru: "Свитшот на полумолнии с начёсом из флиса. Силуэт, вдохновлённый перформансом, — от активного отдыха до повседневной носки.",
    },
    image: "/images/products/m-627.jpg",
    specs: {
      fabric: "Fleece",
      composition: "80% cotton / 20% polyester",
      weight: "420 g/m²",
    },
    sizes: ["46", "48", "50", "52", "54", "56"],
  },
  {
    id: "m-661",
    slug: "m-661",
    gender: "men",
    name: "M-661",
    description: {
      en: "Classic crewneck sweatshirt with a clean, minimal silhouette. Soft brushed interior for all-day comfort.",
      uz: "Klassik yumaloq bo'yin svitshot. Yumshoq ichki qismi bilan butun kun qulay.",
      ru: "Классический свитшот с круглым вырезом и минималистичным силуэтом. Мягкий начёс внутри для комфорта на весь день.",
    },
    image: "/images/products/m-661.jpg",
    specs: {
      fabric: "French terry",
      composition: "100% cotton",
      weight: "340 g/m²",
    },
    sizes: ["46", "48", "50", "52", "54", "56"],
  },
  {
    id: "w-1497",
    slug: "1497",
    gender: "women",
    name: "1497",
    description: {
      en: "Relaxed-fit pullover with a soft touch and clean finish. Everyday comfort with a polished look.",
      uz: "Yumshoq va silliq erkin kesimli pullover. Har kunlik qulay kiyim.",
      ru: "Пуловер свободного кроя с мягкой текстурой и аккуратной отделкой. Ежедневный комфорт с безупречным видом.",
    },
    image: "/images/products/w-1497.jpg",
    specs: {
      fabric: "French terry",
      composition: "100% cotton",
      weight: "320 g/m²",
    },
    sizes: ["44", "46", "48", "50", "52"],
  },
];

export function getProduct(
  gender: "women" | "men",
  slug: string,
): ProductData | undefined {
  return products.find((p) => p.gender === gender && p.slug === slug);
}

export function getProductsByGender(gender: "women" | "men"): ProductData[] {
  return products.filter((p) => p.gender === gender);
}
