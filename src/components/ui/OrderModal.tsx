"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { createLead } from "@/lib/api";

interface Props {
  isOpen: boolean;
  productId?: number | null;
  productName: string;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function OrderModal({ isOpen, productId, productName, onClose }: Props) {
  const t = useTranslations();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async () => {
    const fullName = nameRef.current?.value?.trim();
    const phoneNumber = phoneRef.current?.value?.trim();

    if (!fullName || !phoneNumber) {
      alert(t("order_validation"));
      return;
    }

    setStatus("loading");

    try {
      await createLead({
        fullName,
        phoneNumber,
        productId: productId ?? null,
        productName,
        leadStatusId: 1,
      });

      setStatus("success");
      if (nameRef.current) nameRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";

      setTimeout(onClose, 1800);
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ background: "rgba(26,18,9,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative max-w-[460px] w-[90%] rounded-[14px] p-12"
        style={{ background: "var(--bg)", border: "0.5px solid var(--border)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[22px] transition-colors duration-200"
          style={{ color: "var(--muted)" }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div
              className="text-5xl mb-4"
              style={{ color: "var(--gold)" }}
            >
              ✓
            </div>
            <p className="font-serif text-[26px] mb-2" style={{ color: "var(--text)" }}>
              {t("order_success")}
            </p>
            <p className="text-[13px]" style={{ color: "var(--muted)" }}>
              {t("modal_sub")}
            </p>
          </div>
        ) : (
          <>
            <p className="font-serif text-[28px] mb-1" style={{ color: "var(--text)" }}>
              {t("modal_title")}
            </p>
            <p className="text-[13px] mb-8" style={{ color: "var(--muted)" }}>
              {t("modal_sub")}
            </p>

            <div className="mb-5">
              <label
                className="block text-[12px] font-semibold tracking-wide uppercase mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                {t("form_name")}
              </label>
              <input
                ref={nameRef}
                type="text"
                placeholder="Sardor Toshmatov"
                disabled={status === "loading"}
                className="form-input w-full px-4 py-3.5 rounded-[8px] text-[14px] transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  color: "var(--text)",
                  fontFamily: "Jost, sans-serif",
                }}
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-[12px] font-semibold tracking-wide uppercase mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                {t("form_phone")}
              </label>
              <input
                ref={phoneRef}
                type="tel"
                placeholder="+998 99 123 45 67"
                disabled={status === "loading"}
                className="form-input w-full px-4 py-3.5 rounded-[8px] text-[14px] transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  color: "var(--text)",
                  fontFamily: "Jost, sans-serif",
                }}
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-[12px] font-semibold tracking-wide uppercase mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                {t("form_product")}
              </label>
              <input
                type="text"
                defaultValue={productName}
                readOnly
                className="w-full px-4 py-3.5 rounded-[8px] text-[14px]"
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  color: "var(--muted)",
                  fontFamily: "Jost, sans-serif",
                }}
              />
            </div>

            {status === "error" && (
              <p
                className="text-[12px] mb-3 text-center"
                style={{ color: "#e57373" }}
              >
                {t("order_validation")}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full py-4 mt-2 rounded-[8px] text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 disabled:opacity-60"
              style={{ background: "var(--brown)", color: "#EADFCF" }}
              onMouseEnter={(e) => {
                if (status !== "loading")
                  (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--brown)";
              }}
            >
              {status === "loading" ? "..." : t("btn_send")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
