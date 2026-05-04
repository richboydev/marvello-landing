"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import OrderModal from "@/components/ui/OrderModal";

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80')",
          }}
          role="presentation"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg,rgba(26,18,9,0.82) 38%,rgba(26,18,9,0.35) 70%,transparent)",
          }}
        />

        {/* Content */}
        <div className="w-[min(100%,1000px)] mx-auto">
          <div
            className="relative z-10 max-w-[600px]"
            style={{ padding: "0 4%", marginTop: "5rem" }}
          >
            <p
              className="text-[11px] font-semibold tracking-[3px] uppercase mb-5 flex items-center gap-2.5"
              style={{ color: "var(--gold)" }}
            >
              <span
                className="block w-[30px] h-px"
                style={{ background: "var(--gold)" }}
              />
              Marvello Mebel — 2010
            </p>
            <h1
              className="font-serif font-normal mb-5"
              style={{
                fontSize: "clamp(42px,5vw,72px)",
                color: "#EADFCF",
                lineHeight: 1.08,
              }}
            >
              {t("hero_title")}
              {/* <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                {t("hero_title").includes("premium")
                  ? "premium" + t("hero_title").split("premium")[1]
                  : ""}
              </em> */}
              {/* {!t("hero_title").includes("premium") && t("hero_title")} */}
            </h1>
            <p
              className="text-base mb-10 max-w-[440px]"
              style={{ color: "rgba(234,223,207,0.75)", lineHeight: 1.8 }}
            >
              {t("hero_sub")}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href={`/${locale}/catalog`}
                className="inline-block px-8 py-3.5 rounded-[8px] text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--brown)", color: "#EADFCF" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--gold)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--brown)")
                }
              >
                {t("cta1")}
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-[13px] rounded-[8px] text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-[#1A1209]"
                style={{
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  background: "transparent",
                }}
              >
                {t("cta2")}
              </button>
            </div>
          </div>
        </div>

        {/* Chips */}
        <div className="absolute bottom-[5%] right-[4%] hidden md:flex flex-col gap-2.5 z-10">
          {(
            [
              { key: "cat_bedroom" as const, cat: "bedroom" },
              { key: "cat_living" as const, cat: "living" },
              { key: "cat_soft" as const, cat: "soft" },
            ] as {
              key: "cat_bedroom" | "cat_living" | "cat_soft";
              cat: string;
            }[]
          ).map(({ key, cat }) => (
            <Link
              key={cat}
              href={`/${locale}/catalog?cat=${cat}`}
              className="px-[18px] py-2.5 rounded-full text-[12px] tracking-wide transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "rgba(234,223,207,0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span
            className="text-[10px] tracking-[2px] uppercase"
            style={{ color: "rgba(234,223,207,0.5)" }}
          >
            {t("scroll_text")}
          </span>
          <div
            className="w-px h-10 scroll-arrow-anim"
            style={{
              background:
                "linear-gradient(to bottom,transparent,rgba(201,168,76,0.6))",
            }}
          />
        </div>
      </section>

      <OrderModal
        isOpen={modalOpen}
        productName=""
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
