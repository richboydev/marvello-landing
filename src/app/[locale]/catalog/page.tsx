import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogClient from "@/components/sections/CatalogClient";
import RevealInit from "@/components/ui/RevealInit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => { alternateLanguages[l] = `${siteUrl}/${l}/catalog`; });

  return {
    title: t("meta_catalog_title"),
    description: t("meta_catalog_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/catalog`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("meta_catalog_title"),
      description: t("meta_catalog_desc"),
      url: `${siteUrl}/${locale}/catalog`,
    },
  };
}

export default async function CatalogPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <RevealInit />
      <Header />
      <main>
        {/* Page Hero */}
        <div
          style={{
            padding: "8rem 4% 4rem",
            background: "var(--surface)",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <p
            className="flex gap-2 items-center mb-2"
            style={{ fontSize: "12px", color: "var(--muted)" }}
          >
            <a href={`/${locale}`} style={{ color: "var(--muted)" }}>
              {t("breadcrumb_home")}
            </a>
            <span style={{ color: "var(--gold)" }}>/</span>
            <span style={{ color: "var(--gold)" }}>{t("nav_catalog")}</span>
          </p>
          <h1
            className="font-serif font-normal"
            style={{ fontSize: "clamp(40px,5vw,64px)", color: "var(--text)" }}
          >
            {t("nav_catalog")}
          </h1>
        </div>

        {/* Catalog with tab switcher */}
        <CatalogClient />
      </main>
      <Footer />
    </>
  );
}
