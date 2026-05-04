"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import OrderModal from "@/components/ui/OrderModal";
import ProductCard from "@/components/ui/ProductCard";
import type { Product, ProductDetailContent } from "@/lib/data";
import type { ApiProduct } from "@/types/api";

interface Props {
  product: Product;
  content: ProductDetailContent;
  relatedProducts?: ApiProduct[];
}

export default function ProductDetailClient({ product, content, relatedProducts = [] }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section style={{ padding: "2rem 4% 5rem" }}>
        {/* Back link */}
        <div className="mb-6">
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 text-[13px]"
            style={{ color: "var(--gold)" }}
          >
            <span>←</span>
            <span>{t("nav_catalog")}</span>
          </Link>
        </div>

        {/* Hero grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-[14px]"
            style={{
              minHeight: "420px",
              border: "0.5px solid var(--border)",
              boxShadow: "var(--shadow)",
              aspectRatio: "4 / 3",
            }}
          >
            <Image
              src={product.img}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p
              className="text-[11px] uppercase tracking-[1.2px] mb-2"
              style={{ color: "var(--gold)" }}
            >
              {content.tagline}
            </p>
            <h1
              className="font-serif text-[clamp(34px,5vw,56px)] mb-3"
              style={{ color: "var(--text)" }}
            >
              {product.name}
            </h1>

            <div className="mb-4">
              <span
                className="text-[12px] px-3 py-1.5 rounded-full"
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                {product.dims}
              </span>
            </div>

            <p
              className="text-[30px] font-semibold mb-5"
              style={{ color: "var(--gold)" }}
            >
              {product.price} UZS
            </p>

            <p
              className="text-[15px] leading-8 mb-7 max-w-[56ch]"
              style={{ color: "var(--muted)" }}
            >
              {content.description}
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-[10px] text-[12px] font-semibold tracking-[1.2px] uppercase transition-all duration-300"
              style={{ background: "var(--brown)", color: "var(--cream)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--brown)")
              }
            >
              {t("btn_order")}
            </button>

            <div className="mt-7">
              <CompositionCard
                title={t("detail_composition")}
                items={content.composition}
              />
            </div>
          </div>
        </div>

        {/* Features / suitable */}
        <div className="grid gap-5 lg:grid-cols-2 mt-10">
          <InfoCard title={t("detail_features")} items={content.features} />
          <InfoCard title={t("detail_suitable")} items={content.suitableFor} />
        </div>

        {/* Related products from API */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2
              className="font-serif text-[32px] mb-8"
              style={{ color: "var(--text)" }}
            >
              {t("detail_related")}
            </h2>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
            >
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </section>

      <OrderModal
        isOpen={modalOpen}
        productName={product.name}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

/* ── InfoCard ──────────────────────────────────────────────────────────── */
function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article
      className="rounded-[12px] p-5 h-full"
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <h3 className="font-serif text-[22px] mb-3" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-[14px] leading-7 flex gap-2"
            style={{ color: "var(--muted)" }}
          >
            <span style={{ color: "var(--gold)" }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ── CompositionCard ───────────────────────────────────────────────────── */
function CompositionCard({
  title,
  items,
}: {
  title: string;
  items: ProductDetailContent["composition"];
}) {
  const normalized = items.map((item) =>
    typeof item === "string"
      ? { title: item, image: undefined, qty: "1 sht." }
      : item,
  );

  return (
    <article
      className="rounded-[12px] p-5 h-full"
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <h3 className="font-serif text-[22px] mb-3" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      <div className="space-y-2.5">
        {normalized.map((item) => (
          <div
            key={item.title}
            className="rounded-[10px] p-2.5 flex items-center gap-3"
            style={{ border: "0.5px solid var(--border)", background: "var(--bg)" }}
          >
            <div
              className="relative shrink-0 rounded-[8px] overflow-hidden"
              style={{ width: "64px", height: "52px", border: "0.5px solid var(--border)" }}
            >
              <Image
                src={
                  item.image ??
                  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=75"
                }
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[14px] leading-5 flex-1" style={{ color: "var(--text)" }}>
              {item.title}
            </p>
            <p className="text-[14px] font-semibold shrink-0" style={{ color: "var(--muted)" }}>
              {item.qty || "1 sht."}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
