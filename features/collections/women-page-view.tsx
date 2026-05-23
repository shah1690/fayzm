import { pageMetadata } from "@/content/page-metadata";
import { getProductsByGender } from "@/content/products";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";
import { ProductGallery } from "./product-gallery";

type WomenPageViewProps = Readonly<{ locale: Locale }>;

const text = {
  products: { en: "products", uz: "mahsulot", ru: "товаров", zh: "products" },
} as const;

export function WomenPageView({ locale }: WomenPageViewProps) {
  const products = getProductsByGender("women").map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    href: localizeHref(locale, `/collections/women/${p.slug}`),
  }));

  return (
    <main className="px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#070A0F] md:text-3xl">
            {pageMetadata.collectionsWomen.heading[locale]}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {products.length} {text.products[locale]}
          </p>
        </div>
        <ProductGallery products={products} />
      </div>
    </main>
  );
}
