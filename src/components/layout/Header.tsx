"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";
import LangSwitcher from "@/components/ui/LangSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNav from "./MobileNav";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("nav_home") },
    { href: `/${locale}/catalog`, label: t("nav_catalog") },
    { href: `/${locale}/about`, label: t("nav_about") },
    { href: `/${locale}/news`, label: t("nav_news") },
    { href: `/${locale}/contact`, label: t("nav_contact") },
  ];

  return (
    <>
      <header
        id="mainHeader"
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,244,239,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 0 var(--border)" : "none",
        }}
      >
        <div
          className="site-shell flex items-center justify-between gap-4"
          style={{ padding: scrolled ? "0.8rem 4%" : "1.2rem 4%" }}
        >
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[13px] font-medium tracking-wide relative transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden md:flex">
              <LangSwitcher />
            </div>
            <ThemeToggle />
            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col gap-[5px] p-2 cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span
                className="block w-[22px] h-[1.5px] rounded-sm transition-all duration-300"
                style={{ background: "var(--text)" }}
              />
              <span
                className="block w-[22px] h-[1.5px] rounded-sm transition-all duration-300"
                style={{ background: "var(--text)" }}
              />
              <span
                className="block w-[22px] h-[1.5px] rounded-sm transition-all duration-300"
                style={{ background: "var(--text)" }}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
