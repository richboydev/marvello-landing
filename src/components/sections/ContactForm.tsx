"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;
    if (!name || !phone) {
      alert(t("order_validation"));
      return;
    }
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    if (nameRef.current) nameRef.current.value = "";
    if (phoneRef.current) phoneRef.current.value = "";
    if (msgRef.current) msgRef.current.value = "";
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "var(--surface)",
    border: "0.5px solid var(--border)",
    borderRadius: "8px",
    fontFamily: "Jost, sans-serif",
    fontSize: "14px",
    color: "var(--text)",
    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "6px",
  };

  return (
    <div>
      <h2
        className="font-serif mb-8"
        style={{
          fontSize: "clamp(28px,3vw,40px)",
          color: "var(--text)",
        }}
      >
        {t("contact_form_title")}
      </h2>

      {sent && (
        <div
          className="mb-6 p-4 rounded-[8px] text-[14px] font-medium"
          style={{
            background: "rgba(201,168,76,0.15)",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
          }}
        >
          {t("contact_success")}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label style={labelStyle}>{t("form_name")}</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Sardor Toshmatov"
            className="form-input"
            style={inputStyle}
          />
        </div>

        <div className="mb-5">
          <label style={labelStyle}>{t("form_phone")}</label>
          <input
            ref={phoneRef}
            type="tel"
            placeholder="+998 99 123 45 67"
            className="form-input"
            style={inputStyle}
          />
        </div>

        <div className="mb-5">
          <label style={labelStyle}>{t("form_msg")}</label>
          <textarea
            ref={msgRef}
            placeholder={t("form_msg_ph")}
            rows={5}
            className="form-input"
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "130px",
            }}
          />
        </div>

        <button
          type="submit"
          className="px-10 py-4 rounded-[8px] text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--brown)", color: "#EADFCF" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "var(--gold)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "var(--brown)")
          }
        >
          {t("btn_send")}
        </button>
      </form>
    </div>
  );
}
