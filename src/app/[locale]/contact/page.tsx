import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ContactForm from "@/components/sections/ContactForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => {
    alternateLanguages[l] = `${siteUrl}/${l}/contact`;
  });

  return {
    title: t("meta_contact_title"),
    description: t("meta_contact_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("meta_contact_title"),
      description: t("meta_contact_desc"),
      url: `${siteUrl}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({
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
            <span style={{ color: "var(--gold)" }}>{t("nav_contact")}</span>
          </p>
          <h1
            className="font-serif font-normal"
            style={{ fontSize: "clamp(40px,5vw,64px)", color: "var(--text)" }}
          >
            {t("nav_contact")}
          </h1>
        </div>

        {/* Contact Content */}
        <section style={{ padding: "6rem 4%" }}>
          <div
            className="grid gap-16 items-start"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {/* Form (client) */}
            <ContactForm />

            {/* Info Panel */}
            <div>
              <div
                className="rounded-[14px] p-12 mb-8"
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                }}
              >
                {/* Phone */}
                <div
                  className="flex items-start gap-4 pb-5"
                  style={{ borderBottom: "0.5px solid var(--border)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--cream)",
                      color: "var(--brown)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.14a16 16 0 006 6l.52-.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-semibold tracking-[1px] uppercase mb-1"
                      style={{ color: "var(--muted)" }}
                    >
                      {t("contact_phone_label")}
                    </p>
                    <a
                      href="tel:+998998560555"
                      className="text-[15px] font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      +99899 856 05 55
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div
                  className="flex items-start gap-4 py-5"
                  style={{ borderBottom: "0.5px solid var(--border)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--cream)",
                      color: "var(--brown)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-semibold tracking-[1px] uppercase mb-1"
                      style={{ color: "var(--muted)" }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:info@marvellobrand.uz"
                      className="text-[15px] font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      info@marvellobrand.uz
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 pt-5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--cream)",
                      color: "var(--brown)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-semibold tracking-[1px] uppercase mb-1"
                      style={{ color: "var(--muted)" }}
                    >
                      {t("contact_addr_label")}
                    </p>
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      Toshkent, O&apos;zbekiston
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "14px",
                  border: "0.5px solid var(--border)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7546.950456065495!2d65.353806!3d40.129879!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDA3JzQ3LjYiTiA2NcKwMjEnMTMuNyJF!5e1!3m2!1sru!2s!4v1776688713808!5m2!1sru!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  title="Marvello Mebel Location"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
