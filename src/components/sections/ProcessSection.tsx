import { getTranslations } from "next-intl/server";

const STEP_ICONS = [
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 004.93 19.07M20.66 8.27A10 10 0 003.34 15.73"/></svg>,
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
];

export default async function ProcessSection() {
  const t = await getTranslations();

  const steps = [
    { num: "01", titleKey: "step1_t" as const, descKey: "step1_d" as const, delay: "" },
    { num: "02", titleKey: "step2_t" as const, descKey: "step2_d" as const, delay: "reveal-delay-1" },
    { num: "03", titleKey: "step3_t" as const, descKey: "step3_d" as const, delay: "reveal-delay-2" },
    { num: "04", titleKey: "step4_t" as const, descKey: "step4_d" as const, delay: "reveal-delay-3" },
  ];

  return (
    <section style={{ background: "var(--dark-bar)", padding: "6rem 4%" }}>
      <p
        className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center justify-center gap-2.5 mb-4"
        style={{ color: "var(--gold)" }}
      >
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
        {t("proc_tag")}
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
      </p>
      <h2
        className="font-serif text-center reveal"
        style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "#EADFCF" }}
      >
        {t("proc_title")}
      </h2>

      <div
        className="grid mt-16 relative process-line"
        style={{ gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            className={`text-center px-6 relative z-10 reveal ${step.delay}`}
          >
            <div
              className="w-14 h-14 rounded-full border flex items-center justify-center mx-auto mb-6 font-serif text-[20px] transition-all duration-300"
              style={{
                borderColor: "var(--gold)",
                color: "var(--gold)",
                background: "var(--dark-bar)",
                borderWidth: "1.5px",
              }}
            >
              {step.num}
            </div>
            <div
              className="flex justify-center mb-2"
              style={{ color: "var(--gold)", opacity: 0.7 }}
            >
              {STEP_ICONS[i]}
            </div>
            <h3
              className="font-serif text-[22px] mb-3"
              style={{ color: "#EADFCF" }}
            >
              {t(step.titleKey)}
            </h3>
            <p
              className="text-[13px] leading-[1.7]"
              style={{ color: "rgba(234,223,207,0.55)" }}
            >
              {t(step.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
