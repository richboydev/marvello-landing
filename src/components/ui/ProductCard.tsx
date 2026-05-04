"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { ApiProduct } from "@/types/api";
import { getFirstImageUrl } from "@/types/api";
import OrderModal from "@/components/ui/OrderModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FALLBACK =
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=75";

interface Props {
  product: ApiProduct;
  categoryLabel?: string;
}

export default function ProductCard({ product, categoryLabel }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);

  const displayName =
    product.nameUz ?? product.nameRu ?? product.nameEn ?? product.name;

  const imageSrc =
    getFirstImageUrl(product.items, BASE_URL) ?? FALLBACK;

  const isExternal = imageSrc !== FALLBACK;

  return (
    <>
      <article
        className="reveal rounded-[14px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <Image
            src={imageSrc}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,25vw"
            loading="lazy"
            unoptimized={isExternal}
          />
          {categoryLabel && (
            <span
              className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide"
              style={{ background: "var(--brown)", color: "var(--cream)" }}
            >
              {categoryLabel}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <p
            className="font-serif text-[20px] mb-1"
            style={{ color: "var(--text)" }}
          >
            {displayName}
          </p>

          {product.dimensions && (
            <p
              className="text-[12px] mb-2.5"
              style={{ color: "var(--muted)" }}
            >
              {product.dimensions}
            </p>
          )}

          {product.price != null && (
            <p
              className="text-[15px] font-semibold mb-4"
              style={{ color: "var(--gold)" }}
            >
              {product.price.toLocaleString()} UZS
            </p>
          )}

          <div className="flex gap-2">
            <Link
              href={
                product.productTypeId
                  ? `/${locale}/catalog/${product.id}?productTypeId=${product.productTypeId}`
                  : `/${locale}/catalog/${product.id}`
              }
              className="flex-1 py-2.5 rounded-[8px] text-[11px] text-center font-semibold tracking-[1px] uppercase transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              {t("btn_detail")}
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 py-2.5 rounded-[8px] text-[11px] font-semibold tracking-[1px] uppercase transition-all duration-300"
              style={{ background: "var(--brown)", color: "var(--cream)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--brown)")
              }
            >
              {t("btn_order")}
            </button>
          </div>
        </div>
      </article>

      <OrderModal
        isOpen={modalOpen}
        productId={product.id}
        productName={displayName}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
