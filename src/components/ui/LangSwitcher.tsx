"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n";

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div
      className="flex overflow-hidden rounded-full p-0.5"
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
      }}
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLang(l)}
          className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full tracking-wide transition-all duration-300"
          style={{
            color: locale === l ? "#EADFCF" : "var(--muted)",
            background: locale === l ? "var(--brown)" : "transparent",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
