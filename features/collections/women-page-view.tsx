import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";
import { ProductGallery } from "./product-gallery";

const womenProducts = [
  {
    id: "w1",
    name: "Classic Hoodie",
    size: "XS – XL",
    image: "/images/k2.jpg",
    href: "/contact",
  },
  {
    id: "w2",
    name: "Ribbed Pullover",
    size: "S – XXL",
    image: "/images/k4.jpg",
    href: "/contact",
  },
  {
    id: "w3",
    name: "Oversized Knit",
    size: "S – XL",
    image: "/images/k5.jpg",
    href: "/contact",
  },
  {
    id: "w4",
    name: "Slim Turtleneck",
    size: "XS – L",
    image: "/images/k6.jpg",
    href: "/contact",
  },
  {
    id: "w5",
    name: "Cropped Cardigan",
    size: "S – XL",
    image: "/images/k3.jpg",
    href: "/contact",
  },
  {
    id: "w6",
    name: "Zip-Up Fleece",
    size: "XS – XXL",
    image: "/images/k2.jpg",
    href: "/contact",
  },
  {
    id: "w7",
    name: "V-Neck Sweater",
    size: "S – XL",
    image: "/images/k5.jpg",
    href: "/contact",
  },
  {
    id: "w8",
    name: "Cable Knit Vest",
    size: "S – L",
    image: "/images/k4.jpg",
    href: "/contact",
  },
  {
    id: "w9",
    name: "Wrap Cardigan",
    size: "XS – XL",
    image: "/images/k6.jpg",
    href: "/contact",
  },
  {
    id: "w10",
    name: "Polo Neck Knit",
    size: "S – XXL",
    image: "/images/k3.jpg",
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
