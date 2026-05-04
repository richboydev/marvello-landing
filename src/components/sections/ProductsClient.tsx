"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { ApiProduct } from "@/types/api";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";

interface Props {
  productTypeId: number;
}

function Skeleton() {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[14px] overflow-hidden animate-pulse"
          style={{
            background: "var(--surface)",
            border: "0.5px solid var(--border)",
          }}
        >
          <div style={{ aspectRatio: "4/3", background: "var(--border)" }} />
          <div className="p-5 space-y-3">
            <div
              className="h-5 rounded"
              style={{ background: "var(--border)", width: "60%" }}
            />
            <div
              className="h-4 rounded"
              style={{ background: "var(--border)", width: "40%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsClient({ productTypeId }: Props) {
  const t = useTranslations();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(productTypeId)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [productTypeId]);

  return (
    <div>
      {/* Section header */}
      <div className="mb-8">
        <p
          className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center gap-2.5"
          style={{ color: "var(--gold)" }}
        >
          <span className="h-px w-8" style={{ background: "var(--gold)" }} />
          {t("prod_tag")}
        </p>
        <h2
          className="font-serif mt-2"
          style={{ fontSize: "clamp(26px,3vw,36px)", color: "var(--text)" }}
        >
          {t("prod_title")}
        </h2>
      </div>

      {loading ? (
        <Skeleton />
      ) : products.length > 0 ? (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p
          className="py-16 text-center text-[14px]"
          style={{ color: "var(--muted)" }}
        >
          — Hozircha mahsulotlar yo&apos;q —
        </p>
      )}
    </div>
  );
}
