import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";
import { ProductGallery } from "./product-gallery";

const menProducts = [
  { id: "m1", name: "Heavy Hoodie", image: "/images/k3.jpg", href: "/contact" },
  {
    id: "m2",
    name: "Structured Knit",
    image: "/images/k1.jpg",
    href: "/contact",
  },
  {
    id: "m3",
    name: "Crew Neck Sweater",
    image: "/images/k5.jpg",
    href: "/contact",
  },
  { id: "m4", name: "Zip Cardigan", image: "/images/k6.jpg", href: "/contact" },
  {
    id: "m5",
    name: "Slim Pullover",
    image: "/images/k4.jpg",
    href: "/contact",
  },
  {
    id: "m6",
    name: "Chunky Turtleneck",
    image: "/images/k2.jpg",
    href: "/contact",
  },
  { id: "m7", name: "Relaxed Knit", image: "/images/k3.jpg", href: "/contact" },
  {
    id: "m8",
    name: "Half-Zip Knit",
    image: "/images/k1.jpg",
    href: "/contact",
  },
];

type MenPageViewProps = Readonly<{ locale: Locale }>;

export function MenPageView({ locale }: MenPageViewProps) {
  return (
    <main className="px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#070A0F] md:text-3xl">
            {pageMetadata.collectionsMen.heading[locale]}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {menProducts.length} products
          </p>
        </div>
        <ProductGallery products={menProducts} />
      </div>
    </main>
  );
}
