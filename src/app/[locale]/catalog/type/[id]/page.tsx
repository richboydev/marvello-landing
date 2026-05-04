import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import type { ApiProduct } from "@/types/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ProductTypeDetailClient from "@/components/sections/ProductTypeDetailClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

function buildHeaders(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (API_TOKEN) h["Authorization"] = `Bearer ${API_TOKEN}`;
  return h;
}

async function fetchProductType(id: string, catalogId?: string) {
  try {
    const url = catalogId
      ? `${API_URL}/api/product-type?catalogId=${catalogId}`
      : `${API_URL}/api/product-type`;

    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    return list.find((pt: { id: number }) => String(pt.id) === id) ?? null;
  } catch {
    return null;
  }
}

async function fetchProducts(productTypeId: number): Promise<ApiProduct[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/product?productTypeId=${productTypeId}`,
      {
        headers: buildHeaders(),
        next: { revalidate: 300 },
      }
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
  searchParams,
}: {
  params: { locale: Locale; id: string };
  searchParams: { catalogId?: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const pt = await fetchProductType(id, searchParams.catalogId);
  const name = pt?.nameUz ?? pt?.nameRu ?? pt?.nameEn ?? pt?.name ?? t("nav_catalog");

  return {
    title: `${name} | ${t("nav_catalog")}`,
    description: pt?.descriptionUz ?? pt?.descriptionRu ?? pt?.description ?? "",
  };
}

export default async function ProductTypePage({
  params: { locale, id },
  searchParams,
}: {
  params: { locale: Locale; id: string };
  searchParams: { catalogId?: string };
}) {
  setRequestLocale(locale);

  const [productType, products] = await Promise.all([
    fetchProductType(id, searchParams.catalogId),
    fetchProducts(Number(id)),
  ]);

  if (!productType) notFound();

  return (
    <>
      <RevealInit />
      <Header />
      <main>
        <ProductTypeDetailClient productType={productType} products={products} />
      </main>
      <Footer />
    </>
  );
}
