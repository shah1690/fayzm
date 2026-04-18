import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProductsByGender } from "@/content/products";
import { ProductPageView } from "@/features/collections/product-page-view";
import type { Locale } from "@/shared/i18n/translations";

type Props = Readonly<{ params: Promise<{ locale: string; slug: string }> }>;

export default async function WomenProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProduct("women", slug);

  if (!product) notFound();

  return <ProductPageView product={product} locale={locale as Locale} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct("women", slug);

  return { title: product ? `${product.name} | FAYZ-M` : "FAYZ-M" };
}

export function generateStaticParams() {
  return getProductsByGender("women").map((p) => ({ slug: p.slug }));
}
