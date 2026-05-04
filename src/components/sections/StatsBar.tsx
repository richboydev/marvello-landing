import { getTranslations } from "next-intl/server";

export default async function StatsBar() {
  const t = await getTranslations();

  const stats = [
    { value: "50k+", label: t("stat1") },
    { value: "15+", label: t("stat2") },
    { value: "45+", label: t("stat3") },
    { value: "100%", label: t("stat4") },
  ];

  return (
    <div
      className="grid"
      style={{
        background: "var(--dark-bar)",
        padding: "3rem 4%",
        gridTemplateColumns: "repeat(4,1fr)",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="px-8 text-center relative reveal"
          style={
            i < stats.length - 1
              ? ({
                  "--delay": `${i * 0.1}s`,
                } as React.CSSProperties)
              : undefined
          }
        >
          {i < stats.length - 1 && (
            <span
              className="absolute right-0 top-[10%] w-px"
              style={{
                height: "80%",
                background: "rgba(201,168,76,0.25)",
              }}
            />
          )}
          <span
            className="font-serif block"
            style={{
              fontSize: "clamp(28px,3vw,44px)",
              color: "var(--gold)",
              fontWeight: 500,
            }}
          >
            {stat.value}
          </span>
          <span
            className="text-[12px] block mt-1 tracking-wide"
            style={{ color: "rgba(234,223,207,0.6)" }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
