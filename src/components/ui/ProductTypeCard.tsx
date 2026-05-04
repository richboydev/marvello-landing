"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { ProductType } from "@/types/api";
import { getFirstImageUrl } from "@/types/api";

const FALLBACK =
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=75";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface Props {
  productType: ProductType;
}

export default function ProductTypeCard({ productType }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  const displayName =
    productType.nameUz ?? productType.nameRu ?? productType.nameEn ?? productType.name;
  const imageSrc = getFirstImageUrl(productType.items, BASE_URL) ?? FALLBACK;

  return (
    <Link
      href={`/${locale}/catalog/type/${productType.id}?catalogId=${productType.catalogId}`}
      className="group revealss rounded-[14px] overflow-hidden block transition-all duration-300 hover:-translate-y-1.5"
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
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,25vw"
          loading="lazy"
          unoptimized={imageSrc.startsWith("http") && !imageSrc.includes("unsplash")}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top,rgba(26,18,9,0.55) 0%,transparent 60%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-serif text-[22px] mb-1" style={{ color: "var(--text)" }}>
          {displayName}
        </p>

        {productType.price != null && (
          <p className="text-[14px] font-semibold mb-3" style={{ color: "var(--gold)" }}>
            {productType.price.toLocaleString()} UZS
          </p>
        )}

        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[1px] uppercase transition-colors duration-200"
          style={{ color: "var(--muted)" }}
        >
          {t("btn_detail")}
          <span
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: "var(--gold)" }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
