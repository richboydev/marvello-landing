import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import { GALLERY_IMAGES } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => { alternateLanguages[l] = `${siteUrl}/${l}/about`; });

  return {
    title: t("meta_about_title"),
    description: t("meta_about_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("meta_about_title"),
      description: t("meta_about_desc"),
      url: `${siteUrl}/${locale}/about`,
    },
  };
}

const VALUES = [
  { num: "01", titleKey: "v1", descKey: "v1d" },
  { num: "02", titleKey: "v2", descKey: "v2d" },
  { num: "03", titleKey: "v3", descKey: "v3d" },
  { num: "04", titleKey: "v4", descKey: "v4d" },
  { num: "05", titleKey: "v5", descKey: "v5d" },
  { num: "06", titleKey: "v6", descKey: "v6d" },
] as const;

export default async function AboutPage({
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
        {/* About Hero */}
        <div
          className="relative flex items-flex-end"
          style={{ minHeight: "60vh", display: "flex", alignItems: "flex-end", padding: "4rem 4%" }}
        >
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80')",
              backgroundPosition: "center top",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top,rgba(26,18,9,0.9) 30%,rgba(26,18,9,0.4) 100%)",
            }}
          />
          <div className="relative z-10">
            <p
              className="text-[11px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-2.5"
              style={{ color: "var(--gold)" }}
            >
              <span className="block w-[30px] h-px" style={{ background: "var(--gold)" }} />
              {t("about_tag")}
            </p>
            <h1
              className="font-serif font-normal"
              style={{
                color: "#EADFCF",
                fontSize: "clamp(40px,5vw,64px)",
              }}
            >
              {t("about_title")}
            </h1>
          </div>
        </div>

        {/* About Body */}
        <section style={{ padding: "6rem 4%" }}>
          <div
            className="grid gap-20 items-center"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <div className="reveal">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80"
                alt="Marvello Mebel Showroom"
                width={700}
                height={500}
                className="w-full object-cover"
                style={{ borderRadius: "14px" }}
              />
            </div>
            <div className="reveal reveal-delay-2">
              <p
                className="text-[11px] font-semibold tracking-[3px] uppercase mb-4"
                style={{ color: "var(--gold)" }}
              >
                2010
              </p>
              <h2
                className="font-serif mb-6"
                style={{
                  fontSize: "clamp(32px,3vw,46px)",
                  color: "var(--text)",
                  lineHeight: 1.1,
                }}
              >
                {t("about_title")}
              </h2>
              <p
                className="mb-8"
                style={{ color: "var(--muted)", lineHeight: 1.85 }}
              >
                {t("about_body_full")}
              </p>
              <div
                className="grid gap-4 mt-8"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                {[
                  { val: "50k+", labelKey: "stat1" as const },
                  { val: "15+", labelKey: "stat2" as const },
                ].map((s) => (
                  <div
                    key={s.labelKey}
                    className="p-5 rounded-[8px]"
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                    }}
                  >
                    <p
                      className="font-serif text-[32px]"
                      style={{ color: "var(--gold)" }}
                    >
                      {s.val}
                    </p>
                    <p className="text-[13px]" style={{ color: "var(--muted)" }}>
                      {t(s.labelKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ background: "var(--surface)", padding: "6rem 4%" }}>
          <h2
            className="font-serif text-center reveal"
            style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "var(--text)" }}
          >
            {t("values_title")}
          </h2>
          <div
            className="grid gap-5 mt-12 reveal"
            style={{ gridTemplateColumns: "repeat(3,1fr)" }}
          >
            {VALUES.map((v) => (
              <div
                key={v.num}
                className="p-8 rounded-[14px] transition-all duration-300"
                style={{
                  background: "var(--bg)",
                  border: "0.5px solid var(--border)",
                }}
              >
                <div
                  className="font-serif text-[42px] font-normal leading-none"
                  style={{ color: "var(--gold)", opacity: 0.4 }}
                >
                  {v.num}
                </div>
                <h3
                  className="font-serif text-[22px] my-2"
                  style={{ color: "var(--text)" }}
                >
                  {t(v.titleKey)}
                </h3>
                <p className="text-[13px]" style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                  {t(v.descKey)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Block */}
        <div
          className="text-center reveal"
          style={{ padding: "5rem 4%", background: "var(--dark-bar)" }}
        >
          <p
            className="font-serif font-normal italic max-w-[800px] mx-auto"
            style={{
              fontSize: "clamp(24px,3vw,38px)",
              color: "var(--gold-light)",
              lineHeight: 1.4,
            }}
          >
            &ldquo;{t("quote_text")}&rdquo;
          </p>
        </div>

        {/* Gallery */}
        <section style={{ padding: "6rem 4%" }}>
          <h2
            className="font-serif text-center reveal"
            style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "var(--text)" }}
          >
            {t("gallery_title")}
          </h2>
          <div
            className="grid gap-4 mt-12 reveal"
            style={{ gridTemplateColumns: "repeat(3,1fr)" }}
          >
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer"
                style={{ borderRadius: "8px", aspectRatio: "4/3" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.06]"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
