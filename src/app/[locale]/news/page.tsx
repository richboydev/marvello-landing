import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import { NEWS } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => { alternateLanguages[l] = `${siteUrl}/${l}/news`; });

  return {
    title: t("meta_news_title"),
    description: t("meta_news_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/news`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("meta_news_title"),
      description: t("meta_news_desc"),
      url: `${siteUrl}/${locale}/news`,
    },
  };
}

export default async function NewsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const catLabels: Record<string, string> = {
    cats_tag: t("cats_tag"),
    prod_tag: t("prod_tag"),
    svc_tag: t("svc_tag"),
  };

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
            <span style={{ color: "var(--gold)" }}>{t("nav_news")}</span>
          </p>
          <h1
            className="font-serif font-normal"
            style={{ fontSize: "clamp(40px,5vw,64px)", color: "var(--text)" }}
          >
            {t("nav_news")}
          </h1>
        </div>

        {/* News Grid */}
        <section style={{ padding: "4rem 4% 6rem" }}>
          <div
            className="grid gap-8 mt-8"
            style={{ gridTemplateColumns: "repeat(3,1fr)" }}
          >
            {NEWS.map((item) => {
              const title =
                locale === "ru"
                  ? item.title_ru
                  : locale === "en"
                  ? item.title_en
                  : item.title_uz;
              const excerpt =
                locale === "ru"
                  ? item.excerpt_ru
                  : locale === "en"
                  ? item.excerpt_en
                  : item.excerpt_uz;

              return (
                <article
                  key={item.id}
                  className="reveal rounded-[14px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                  }}
                >
                  <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={item.img}
                      alt={title}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span
                      className="text-[10px] font-semibold tracking-[2px] uppercase block mb-3"
                      style={{ color: "var(--gold)" }}
                    >
                      {catLabels[item.cat_key] || ""}
                    </span>
                    <h2
                      className="font-serif text-[20px] mb-3"
                      style={{ color: "var(--text)", lineHeight: 1.3 }}
                    >
                      {title}
                    </h2>
                    <p
                      className="text-[12px] mb-3"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.date}
                    </p>
                    <p
                      className="text-[13px]"
                      style={{ color: "var(--muted)", lineHeight: 1.75 }}
                    >
                      {excerpt}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
