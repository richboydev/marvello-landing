"use client";

import { useState, useEffect, useCallback } from "react";
import type { Catalog, ProductType } from "@/types/api";
import { getCatalogs, getProductTypes } from "@/lib/api";
import ProductTypeCard from "@/components/ui/ProductTypeCard";

/* ── Catalog tab bar ─────────────────────────────────────────────────── */
function CatalogTabs({
  catalogs,
  activeId,
  onSelect,
}: {
  catalogs: Catalog[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  if (!catalogs.length) return null;

  return (
    <div className="flex justify-center">
      <div
        className="flex overflow-hidden w-fit"
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        {catalogs.map((cat) => {
          const label = cat.nameUz ?? cat.nameRu ?? cat.nameEn ?? cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="px-9 py-3.5 text-[13px] font-semibold tracking-wide transition-all duration-300"
              style={{
                color: activeId === cat.id ? "#EADFCF" : "var(--muted)",
                background:
                  activeId === cat.id ? "var(--brown)" : "transparent",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Skeleton grid ───────────────────────────────────────────────────── */
function CardSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
    >
      {Array.from({ length: count }).map((_, i) => (
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
              style={{ background: "var(--border)", width: "35%" }}
            />
            <div
              className="h-3 rounded"
              style={{ background: "var(--border)", width: "45%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export default function CatalogClient() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [activeCatalogId, setActiveCatalogId] = useState<number | null>(null);

  const [loadingCatalogs, setLoadingCatalogs] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(false);

  /* fetch catalogs once */
  useEffect(() => {
    getCatalogs()
      .then((data) => {
        setCatalogs(data);
        if (data.length) setActiveCatalogId(data[0].id);
      })
      .finally(() => setLoadingCatalogs(false));
  }, []);

  /* fetch product types whenever active catalog changes */
  const loadTypes = useCallback((catalogId: number) => {
    setLoadingTypes(true);
    setProductTypes([]);
    getProductTypes(catalogId)
      .then(setProductTypes)
      .finally(() => setLoadingTypes(false));
  }, []);

  useEffect(() => {
    if (activeCatalogId !== null) loadTypes(activeCatalogId);
  }, [activeCatalogId, loadTypes]);

  /* ── render ── */
  if (loadingCatalogs) {
    return (
      <section style={{ padding: "2rem 4% 6rem" }}>
        <div className="flex justify-center my-12">
          <div
            className="h-12 rounded-[8px] animate-pulse"
            style={{
              width: "360px",
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
            }}
          />
        </div>
        <CardSkeleton />
      </section>
    );
  }

  return (
    <section style={{ padding: "2rem 4% 6rem" }}>
      {/* Catalog tabs */}
      <div className="my-10">
        <CatalogTabs
          catalogs={catalogs}
          activeId={activeCatalogId}
          onSelect={setActiveCatalogId}
        />
      </div>

      {/* Product type cards */}
      {loadingTypes ? (
        <CardSkeleton />
      ) : productTypes.length > 0 ? (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {productTypes.map((pt) => (
            <ProductTypeCard key={pt.id} productType={pt} />
          ))}
        </div>
      ) : (
        <p
          className="text-center py-24 text-[14px]"
          style={{ color: "var(--muted)" }}
        >
          — Hozircha mahsulotlar yo&apos;q —
        </p>
      )}
    </section>
  );
}
