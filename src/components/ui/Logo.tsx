"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function Logo() {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className="flex items-center gap-2.5 flex-shrink-0">
      <div
        style={{ background: "#0D0A07" }}
        className="rounded-md px-2.5 py-1.5 flex flex-col items-center leading-none"
      >
        <span
          className="font-serif text-[22px] font-semibold tracking-tight"
          style={{ color: "#C9A84C" }}
        >
          ML
        </span>
        <span
          className="font-sans text-[8px] font-semibold tracking-[3px] uppercase"
          style={{ color: "#C9A84C" }}
        >
          MARVELLO
        </span>
        <span
          className="font-serif italic text-[8px]"
          style={{ color: "#E8D5A3" }}
        >
          Luxury
        </span>
      </div>
    </Link>
  );
}
