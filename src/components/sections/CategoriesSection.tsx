import Link from "next/link";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { CATEGORY_IMAGES } from "@/lib/data";

export default async function CategoriesSection() {
  const t = await getTranslations();
  const locale = await getLocale();


  const categories = [
    { key: "bedroom" as const, labelKey: "cat_bedroom" as const },
    { key: "living" as const, labelKey: "cat_living" as const },
    { key: "soft" as const, labelKey: "cat_soft" as const },
  ];

  return (
    <section style={{ padding: "6rem 4%" }}>
      <p
        className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center justify-center gap-2.5 mb-4"
        style={{ color: "var(--gold)" }}
      >
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
        {t("cats_tag")}
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
      </p>
      <h2
        className="font-serif text-center mb-0 reveal"
        style={{
          fontSize: "clamp(32px,3.5vw,48px)",
          color: "var(--text)",
        }}
      >
        {t("cats_title")}
      </h2>

      <div
        className="grid gap-6 mt-12 reveal"
        style={{ gridTemplateColumns: "repeat(3,1fr)" }}
      >
        {categories.map(({ key, labelKey }) => {
          const img = CATEGORY_IMAGES[key];
          return (
            <Link
              key={key}
              href={`/${locale}/catalog?cat=${key}`}
              className="cat-card relative overflow-hidden cursor-pointer"
              style={{ aspectRatio: "3/4", borderRadius: "var(--radius)" }}
              aria-label={t(labelKey)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(to top,rgba(26,18,9,0.75) 35%,transparent 65%)",
                }}
              />
              <div className="cat-border" />
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 z-10 flex justify-between items-end">
                <span
                  className="font-serif text-[26px] font-normal"
                  style={{ color: "#EADFCF", lineHeight: 1.1 }}
                >
                  {t(labelKey)}
                </span>
                <span
                  className="cat-card-link text-[12px] tracking-[1px] uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  {t("cat_view")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
