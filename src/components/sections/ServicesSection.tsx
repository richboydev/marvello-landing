import { getTranslations } from "next-intl/server";

const SERVICE_ICONS = [
  <svg key="1" className="service-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52"><rect x="8" y="8" width="36" height="36" rx="4"/><path d="M26 16v20M16 26h20"/></svg>,
  <svg key="2" className="service-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52"><circle cx="26" cy="26" r="18"/><path d="M26 8v36M8 26h36"/><path d="M18 14c0 8 16 8 16 0M18 38c0-8 16-8 16 0"/></svg>,
  <svg key="3" className="service-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52"><rect x="4" y="16" width="28" height="20" rx="2"/><path d="M32 22h8l6 6v8h-14V22z"/><circle cx="12" cy="40" r="4"/><circle cx="38" cy="40" r="4"/></svg>,
];

export default async function ServicesSection() {
  const t = await getTranslations();

  const services = [
    { titleKey: "svc1_t" as const, descKey: "svc1_d" as const, iconIdx: 0 },
    { titleKey: "svc2_t" as const, descKey: "svc2_d" as const, iconIdx: 1 },
    { titleKey: "svc3_t" as const, descKey: "svc3_d" as const, iconIdx: 2 },
  ];

  return (
    <section style={{ padding: "6rem 4%" }}>
      <p
        className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center justify-center gap-2.5 mb-4"
        style={{ color: "var(--gold)" }}
      >
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
        {t("svc_tag")}
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
      </p>
      <h2
        className="font-serif text-center reveal"
        style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "var(--text)" }}
      >
        {t("svc_title")}
      </h2>

      <div
        className="grid gap-6 mt-12 reveal"
        style={{ gridTemplateColumns: "repeat(3,1fr)" }}
      >
        {services.map((svc, i) => (
          <div
            key={i}
            className="service-card rounded-[14px] p-10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
            }}
          >
            {/* Gold top bar on hover — handled via CSS class service-card */}
            <div
              className="mb-6"
              style={{ color: "var(--gold)", width: "52px", height: "52px" }}
            >
              {SERVICE_ICONS[svc.iconIdx]}
            </div>
            <h3
              className="font-serif text-[22px] mb-3"
              style={{ color: "var(--text)" }}
            >
              {t(svc.titleKey)}
            </h3>
            <p
              className="text-[14px]"
              style={{ color: "var(--muted)", lineHeight: 1.75 }}
            >
              {t(svc.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
