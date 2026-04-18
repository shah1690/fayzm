import { pageMetadata } from "@/content/page-metadata";
import type { Locale } from "@/shared/i18n/translations";
import { ProductGallery } from "./product-gallery";

const menProducts = [
  {
    id: "m-875",
    name: "M-875",
    image: "/images/products/m-875.jpg",
    href: "/contact",
  },
  {
    id: "m-874",
    name: "M-874",
    image: "/images/products/m-874.jpg",
    href: "/contact",
  },
  {
    id: "m-876",
    name: "M-876",
    image: "/images/products/m-876.jpg",
    href: "/contact",
  },
  {
    id: "m-008d",
    name: "008 D",
    image: "/images/products/m-008d.jpg",
    href: "/contact",
  },
  {
    id: "m-001",
    name: "M-001",
    image: "/images/products/m-001.jpg",
    href: "/contact",
  },
  {
    id: "m-627",
    name: "M-627",
    image: "/images/products/m-627.jpg",
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
