import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";
import { ProductGallery } from "./product-gallery";

const womenProducts = [
  {
    id: "w-1474",
    name: "1474",
    image: "/images/products/w-1474.jpg",
    href: "/contact",
  },
  {
    id: "w-1472",
    name: "1472",
    image: "/images/products/w-1472.jpg",
    href: "/contact",
  },
  {
    id: "w-1450",
    name: "W-1450",
    image: "/images/products/w-1450.jpg",
    href: "/contact",
  },
  {
    id: "w-9149",
    name: "9149",
    image: "/images/products/w-9149.jpg",
    href: "/contact",
  },
  {
    id: "w-1495",
    name: "1495",
    image: "/images/products/w-1495.jpg",
    href: "/contact",
  },
  {
    id: "w-1456",
    name: "W-1456",
    image: "/images/products/w-1456.jpg",
    href: "/contact",
  },
];

type WomenPageViewProps = Readonly<{ locale: Locale }>;

export function WomenPageView({ locale }: WomenPageViewProps) {
  return (
    <main className="px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#070A0F] md:text-3xl">
            {pageMetadata.collectionsWomen.heading[locale]}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {womenProducts.length} products
          </p>
        </div>
        <ProductGallery products={womenProducts} />
      </div>
    </main>
  );
}
