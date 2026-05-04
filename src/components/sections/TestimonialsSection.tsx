import { getTranslations } from "next-intl/server";

export default async function TestimonialsSection() {
  const t = await getTranslations();

  const testimonials = [
    { textKey: "testi1_text" as const, name: "Sardor T.", initials: "ST" },
    { textKey: "testi2_text" as const, name: "Наталья К.", initials: "НК" },
    { textKey: "testi3_text" as const, name: "Ahmad M.", initials: "AM" },
  ];

  return (
    <section
      style={{ background: "var(--cream)", padding: "6rem 4%" }}
      className="dark:bg-surface"
    >
      <p
        className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center justify-center gap-2.5 mb-4"
        style={{ color: "var(--gold)" }}
      >
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
        {t("testi_tag")}
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
      </p>
      <h2
        className="font-serif text-center reveal"
        style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "var(--text)" }}
      >
        {t("testi_title")}
      </h2>

      <div
        className="grid gap-6 mt-12 reveal"
        style={{ gridTemplateColumns: "repeat(3,1fr)" }}
      >
        {testimonials.map((testi, i) => (
          <div
            key={i}
            className="rounded-[14px] p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
            }}
          >
            <div
              className="font-serif text-[36px] mb-4"
              style={{ color: "var(--gold)", lineHeight: 1, opacity: 0.6 }}
            >
              &ldquo;
            </div>
            <p
              className="text-[15px] mb-6 italic"
              style={{ color: "var(--muted)", lineHeight: 1.8 }}
            >
              {t(testi.textKey)}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[14px] font-semibold flex-shrink-0"
                style={{ background: "var(--brown)", color: "var(--cream)" }}
              >
                {testi.initials}
              </div>
              <div>
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {testi.name}
                </p>
                <div className="text-[12px] tracking-[1px]" style={{ color: "var(--gold)" }}>
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
