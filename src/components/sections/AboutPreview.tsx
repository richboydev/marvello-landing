import Link from "next/link";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";

export default async function AboutPreview() {
  const t = await getTranslations();
  const locale = await getLocale();


  return (
    <section style={{ padding: "6rem 4%" }}>
      <div
        className="grid gap-20 items-center"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Collage */}
        <div
          className="grid gap-4 reveal"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            height: "500px",
          }}
        >
          <div
            className="rounded-[14px] overflow-hidden"
            style={{ gridRow: "span 2" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80"
              alt="Showroom"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[14px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80"
              alt="Bedroom"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[14px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"
              alt="Sofa"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="reveal reveal-delay-2">
          <p
            className="text-[11px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-2.5"
            style={{ color: "var(--gold)" }}
          >
            2010 — {t("about_tag")}
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
            {t("about_body")}
          </p>
          <Link
            href={`/${locale}/about`}
            className="gold-link text-[13px] font-semibold tracking-[1.5px] uppercase inline-flex items-center transition-all duration-300"
            style={{ color: "var(--gold)" }}
          >
            {t("read_more")}
          </Link>
        </div>
      </div>
    </section>
  );
}
