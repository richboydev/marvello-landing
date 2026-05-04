import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import type { ApiProduct } from "@/types/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ProductDetailClient from "@/components/sections/ProductDetailClient";
import { getProductById, getProductDetailContent } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function fetchRelatedProducts(productTypeId: number): Promise<ApiProduct[]> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (API_TOKEN) headers["Authorization"] = `Bearer ${API_TOKEN}`;

    const res = await fetch(
      `${API_URL}/api/product?productTypeId=${productTypeId}`,
      { headers, next: { revalidate: 300 } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: Locale; id: string };
}): Promise<Metadata> {
  const product = getProductById(id);
  const t = await getTranslations({ locale });

  if (!product) {
    return { title: t("meta_catalog_title"), description: t("meta_catalog_desc") };
  }

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => { alternateLanguages[l] = `${siteUrl}/${l}/catalog/${id}`; });

  return {
    title: `${product.name} | ${t("nav_catalog")}`,
    description: `${product.name} - ${product.dims} - ${product.price} UZS`,
    alternates: {
      canonical: `${siteUrl}/${locale}/catalog/${id}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${product.name} | Marvello Mebel`,
      description: `${product.name} - ${product.price} UZS`,
      images: [{ url: product.img }],
      url: `${siteUrl}/${locale}/catalog/${id}`,
    },
  };
}

export default async function ProductDetailPage({
  params: { locale, id },
  searchParams,
}: {
  params: { locale: Locale; id: string };
  searchParams: { productTypeId?: string };
}) {
  setRequestLocale(locale);
  const product = getProductById(id);
  if (!product) notFound();

  const content = getProductDetailContent(product);
  const productTypeId = searchParams.productTypeId
    ? Number(searchParams.productTypeId)
    : undefined;

  const relatedProducts = productTypeId
    ? await fetchRelatedProducts(productTypeId)
    : [];

  return (
    <>
      <RevealInit />
      <Header />
      <main>
        <ProductDetailClient
          product={product}
          content={content}
          relatedProducts={relatedProducts}
        />
      </main>
      <Footer />
    </>
  );
}
