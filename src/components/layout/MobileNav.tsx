"use client";

import Link from "next/link";
import LangSwitcher from "@/components/ui/LangSwitcher";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export default function MobileNav({ isOpen, onClose, navLinks }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 px-8"
      style={{ background: "var(--footer-bg)" }}
    >
      <button
        className="absolute top-6 right-6 text-2xl cursor-pointer"
        style={{ color: "var(--cream)", background: "none", border: "none" }}
        onClick={onClose}
        aria-label="Close menu"
      >
        ✕
      </button>

      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="font-serif text-[28px] font-normal transition-colors duration-200"
          style={{ color: "var(--cream)" }}
        >
          {link.label}
        </Link>
      ))}

      <div className="mt-4">
        <LangSwitcher />
      </div>
    </div>
  );
}
