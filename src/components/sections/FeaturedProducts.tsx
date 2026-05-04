import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import type { ApiProduct } from "@/types/api";
import ProductCard from "@/components/ui/ProductCard";

async function fetchFeaturedProducts(): Promise<ApiProduct[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${baseUrl}/api/product`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 8) : [];
  } catch {
    return [];
  }
}

export default async function FeaturedProducts() {
  const t = await getTranslations();
  const locale = await getLocale();
  const featured = await fetchFeaturedProducts();

  return (
    <section style={{ background: "var(--surface)", padding: "6rem 4%" }}>
      <p
        className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center justify-center gap-2.5 mb-4"
        style={{ color: "var(--gold)" }}
      >
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
        {t("prod_tag")}
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
      </p>
      <h2
        className="font-serif text-center reveal"
        style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "var(--text)" }}
      >
        {t("prod_title")}
      </h2>
      <p
        className="text-center text-[15px] max-w-[500px] mx-auto mt-4 mb-14 reveal"
        style={{ color: "var(--muted)" }}
      >
        {t("prod_sub")}
      </p>

      {featured.length > 0 ? (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(4,1fr)" }}
        >
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(4,1fr)" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[14px] overflow-hidden animate-pulse"
              style={{ background: "var(--bg)", border: "0.5px solid var(--border)" }}
            >
              <div style={{ aspectRatio: "4/3", background: "var(--border)" }} />
              <div className="p-5 space-y-3">
                <div className="h-5 rounded" style={{ background: "var(--border)", width: "60%" }} />
                <div className="h-4 rounded" style={{ background: "var(--border)", width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12 reveal">
        <Link
          href={`/${locale}/catalog`}
          className="inline-block px-8 py-[13px] rounded-[8px] text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{
            border: "1px solid var(--brown)",
            color: "var(--brown)",
            background: "transparent",
          }}
        >
          {t("load_more")}
        </Link>
      </div>
    </section>
  );
}
