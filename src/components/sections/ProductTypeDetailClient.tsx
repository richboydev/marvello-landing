"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { ProductType, ApiProduct } from "@/types/api";
import { getImageUrls, getFirstImageUrl } from "@/types/api";
import OrderModal from "@/components/ui/OrderModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FALLBACK =
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80";
const FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=100&q=60";

interface Props {
  productType: ProductType;
  products: ApiProduct[];
}

/* ── Lightbox ──────────────────────────────────────────────────────────── */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % images.length), [images.length]);

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-[3000] flex flex-col"
      style={{ background: "rgba(10,7,4,0.96)" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}
      >
        <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
          {current + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="text-[22px] transition-opacity duration-200 hover:opacity-60"
          style={{ color: "#fff" }}
          aria-label="Yopish"
        >
          ✕
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative px-14 py-6 min-h-0">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-3 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:opacity-80"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.15)",
            color: "#fff",
          }}
          aria-label="Oldingi"
        >
          ←
        </button>

        {/* Image */}
        <div className="relative w-full h-full max-w-4xl mx-auto">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: idx === current ? 1 : 0, pointerEvents: idx === current ? "auto" : "none" }}
            >
              <Image
                src={src}
                alt={`Rasm ${idx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width:768px) 100vw, 80vw"
                unoptimized={src !== FALLBACK}
              />
            </div>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:opacity-80"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.15)",
            color: "#fff",
          }}
          aria-label="Keyingi"
        >
          →
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="shrink-0 flex gap-2 overflow-x-auto px-6 pb-5 pt-3 justify-center"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
      >
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="relative shrink-0 overflow-hidden rounded-[6px] transition-all duration-200"
            style={{
              width: "60px",
              height: "48px",
              border:
                idx === current
                  ? "2px solid #C9A96E"
                  : "1px solid rgba(255,255,255,0.15)",
              opacity: idx === current ? 1 : 0.5,
            }}
          >
            <Image
              src={src}
              alt={`thumb ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized={src !== FALLBACK}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────────── */
export default function ProductTypeDetailClient({ productType, products }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayName =
    productType.nameUz ?? productType.nameRu ?? productType.nameEn ?? productType.name;

  const pt = productType as ProductType & { descriptionUz?: string; descriptionRu?: string };
  const description = pt.descriptionUz ?? pt.descriptionRu ?? productType.description;

  const images = getImageUrls(productType.items, BASE_URL);
  const heroImages = images.length ? images : [FALLBACK];

  const sumFromProducts = products.reduce((sum, p) => sum + (p.price ?? 0), 0);
  const totalPrice = productType.price ?? (sumFromProducts > 0 ? sumFromProducts : null);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "7rem 4% 3rem",
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        {/* Breadcrumb */}
        <p
          className="flex gap-2 items-center mb-6 text-[12px]"
          style={{ color: "var(--muted)" }}
        >
          <Link href={`/${locale}`} style={{ color: "var(--muted)" }}>
            {t("breadcrumb_home")}
          </Link>
          <span style={{ color: "var(--gold)" }}>/</span>
          <Link href={`/${locale}/catalog`} style={{ color: "var(--muted)" }}>
            {t("nav_catalog")}
          </Link>
          <span style={{ color: "var(--gold)" }}>/</span>
          <span style={{ color: "var(--gold)" }}>{displayName}</span>
        </p>

        <div className="grid gap-10 lg:grid-cols-2 items-start">

          {/* ── LEFT: Gallery ──────────────────────────────────────── */}
          <div className="space-y-3">
            {/* Main image — clickable to open lightbox */}
            <div
              className="relative overflow-hidden rounded-[14px] cursor-zoom-in"
              style={{
                aspectRatio: "4/3",
                border: "0.5px solid var(--border)",
                background: "var(--bg)",
              }}
              onClick={() => setLightboxOpen(true)}
            >
              {heroImages.map((src, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: idx === activeImg ? 1 : 0 }}
                >
                  <Image
                    src={src}
                    alt={`${displayName} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    priority={idx === 0}
                    unoptimized={src !== FALLBACK}
                  />
                </div>
              ))}

              {/* "Barcha rasmlar" badge — bottom right */}
              {heroImages.length > 1 && (
                <div
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  style={{
                    background: "rgba(10,7,4,0.65)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    border: "0.5px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                  {heroImages.length} ta rasm
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {heroImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {heroImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className="relative shrink-0 overflow-hidden rounded-[8px] transition-all duration-200"
                    style={{
                      width: "72px",
                      height: "56px",
                      border:
                        activeImg === idx
                          ? "2px solid var(--gold)"
                          : "0.5px solid var(--border)",
                      opacity: activeImg === idx ? 1 : 0.6,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`thumb ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={src !== FALLBACK}
                    />
                  </button>
                ))}

                {/* "Barchasi" button at end */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="shrink-0 flex items-center justify-center rounded-[8px] text-[10px] font-semibold transition-all duration-200 hover:opacity-80"
                  style={{
                    width: "72px",
                    height: "56px",
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    color: "var(--gold)",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                  Barchasi
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: Info + Tarkibi ──────────────────────────────── */}
          <div className="flex flex-col gap-5">

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(28px,3.5vw,44px)",
                color: "var(--text)",
                lineHeight: 1.15,
              }}
            >
              {displayName}
            </h1>

            {totalPrice != null && (
              <p className="text-[26px] font-semibold" style={{ color: "var(--gold)" }}>
                {totalPrice.toLocaleString()} UZS
              </p>
            )}

            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3.5 rounded-[10px] text-[12px] font-semibold tracking-[1.2px] uppercase transition-all duration-300"
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

            {/* Tarkibi box */}
            {products.length > 0 && (
              <div
                className="rounded-[12px] overflow-hidden"
                style={{ border: "0.5px solid var(--border)" }}
              >
                <div
                  className="px-4 py-2.5"
                  style={{
                    background: "var(--surface)",
                    borderBottom: "0.5px solid var(--border)",
                  }}
                >
                  <p
                    className="text-[11px] font-semibold tracking-[2.5px] uppercase"
                    style={{ color: "var(--muted)" }}
                  >
                    Tarkibi
                  </p>
                </div>

                <div style={{ background: "var(--bg)" }}>
                  {products.map((product, i) => {
                    const name =
                      product.nameUz ?? product.nameRu ?? product.nameEn ?? product.name;
                    const thumb =
                      getFirstImageUrl(product.items, BASE_URL) ?? FALLBACK_THUMB;
                    const qty = product.quantity ?? 1;

                    return (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          borderBottom:
                            i < products.length - 1
                              ? "0.5px solid var(--border)"
                              : "none",
                        }}
                      >
                        <div
                          className="relative shrink-0 rounded-[6px] overflow-hidden"
                          style={{
                            width: "52px",
                            height: "44px",
                            border: "0.5px solid var(--border)",
                            background: "var(--surface)",
                          }}
                        >
                          <Image
                            src={thumb}
                            alt={name}
                            fill
                            className="object-cover"
                            unoptimized={thumb !== FALLBACK_THUMB}
                          />
                        </div>

                        <p
                          className="flex-1 text-[13px] leading-5"
                          style={{ color: "var(--text)" }}
                        >
                          {name}
                        </p>

                        <span
                          className="shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                          style={{
                            background: "var(--surface)",
                            border: "0.5px solid var(--border)",
                            color: "var(--muted)",
                          }}
                        >
                          {qty} sht.
                        </span>
                      </div>
                    );
                  })}
                </div>

                {totalPrice != null && (
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      background: "var(--surface)",
                      borderTop: "0.5px solid var(--border)",
                    }}
                  >
                    <span
                      className="text-[11px] font-semibold tracking-[1.5px] uppercase"
                      style={{ color: "var(--muted)" }}
                    >
                      Jamiy narx
                    </span>
                    <span
                      className="text-[18px] font-semibold"
                      style={{ color: "var(--gold)" }}
                    >
                      {totalPrice.toLocaleString()} UZS
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Xususiyatlar ─────────────────────────────────────────────── */}
      {description && (
        <section style={{ padding: "4rem 4% 6rem" }}>
          <p
            className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center gap-2.5 mb-3"
            style={{ color: "var(--gold)" }}
          >
            <span className="h-px w-8" style={{ background: "var(--gold)" }} />
            Xususiyatlar
          </p>
          <h2
            className="font-serif mb-6"
            style={{ fontSize: "clamp(24px,2.5vw,32px)", color: "var(--text)" }}
          >
            {displayName}
          </h2>
          <p
            className="text-[15px] leading-8 max-w-[680px]"
            style={{ color: "var(--muted)" }}
          >
            {description}
          </p>
        </section>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <Lightbox
          images={heroImages}
          startIndex={activeImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <OrderModal
        isOpen={modalOpen}
        productName={displayName}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
