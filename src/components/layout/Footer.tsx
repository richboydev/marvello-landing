import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();


  return (
    <footer style={{ background: "var(--footer-bg)" }}>
      <div className="site-shell" style={{ padding: "5rem 4% 2rem" }}>
        <div
          className="grid gap-12 mb-16"
          style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr" } as React.CSSProperties}
        >
        {/* Brand */}
        <div>
          <div
            style={{ background: "#0D0A07" }}
            className="inline-flex flex-col items-center rounded-md px-2.5 py-1.5 mb-5"
          >
            <span className="font-serif text-[22px] font-semibold" style={{ color: "#C9A84C" }}>ML</span>
            <span className="text-[8px] font-semibold tracking-[3px] uppercase" style={{ color: "#C9A84C" }}>MARVELLO</span>
            <span className="font-serif italic text-[8px]" style={{ color: "#E8D5A3" }}>Luxury</span>
          </div>
          <p className="text-[13px] leading-[1.8] mb-6 max-w-[260px]" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("footer_tagline")}
          </p>
          <div className="flex gap-3">
            {/* Telegram */}
            <a
              href="#"
              title="Telegram"
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              title="Instagram"
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              title="YouTube"
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.7 12 2.7 12 2.7s-4.6 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.6 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-serif text-[18px] mb-5 font-normal" style={{ color: "#EADFCF" }}>
            {t("footer_cats")}
          </h4>
          <Link href={`/${locale}/catalog`} className="block text-[13px] mb-3 transition-colors duration-200" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("cat_bedroom")}
          </Link>
          <Link href={`/${locale}/catalog`} className="block text-[13px] mb-3 transition-colors duration-200" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("cat_living")}
          </Link>
          <Link href={`/${locale}/catalog`} className="block text-[13px] mb-3 transition-colors duration-200" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("cat_soft")}
          </Link>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-serif text-[18px] mb-5 font-normal" style={{ color: "#EADFCF" }}>
            {t("footer_comp")}
          </h4>
          <Link href={`/${locale}/about`} className="block text-[13px] mb-3 transition-colors duration-200" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("footer_about")}
          </Link>
          <a href="#" className="block text-[13px] mb-3 transition-colors duration-200" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("footer_partners")}
          </a>
          <Link href={`/${locale}/news`} className="block text-[13px] mb-3 transition-colors duration-200" style={{ color: "rgba(234,223,207,0.5)" }}>
            {t("nav_news")}
          </Link>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-[18px] mb-5 font-normal" style={{ color: "#EADFCF" }}>
            {t("nav_contact")}
          </h4>
          <div className="flex items-center gap-2.5 text-[13px] mb-3.5" style={{ color: "rgba(234,223,207,0.5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="flex-shrink-0">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.14a16 16 0 006 6l.52-.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <a href="tel:+998998560555">+99899 856 05 55</a>
          </div>
          <div className="flex items-center gap-2.5 text-[13px] mb-3.5" style={{ color: "rgba(234,223,207,0.5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="flex-shrink-0">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href="mailto:info@marvellobrand.uz">info@marvellobrand.uz</a>
          </div>
          <div className="flex items-center gap-2.5 text-[13px]" style={{ color: "rgba(234,223,207,0.5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="flex-shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Toshkent, O&apos;zbekiston</span>
          </div>
        </div>
        </div>

        <div
          className="flex justify-between items-center text-[12px] flex-wrap gap-2"
          style={{
            borderTop: "1px solid rgba(201,168,76,0.1)",
            paddingTop: "1.5rem",
            color: "rgba(234,223,207,0.3)",
          }}
        >
          <span>{t("footer_copy")}</span>
          <span>{t("footer_made")}</span>
        </div>
      </div>
    </footer>
  );
}
