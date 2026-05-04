import { getTranslations } from "next-intl/server";
import FAQAccordion from "@/components/ui/FAQAccordion";

export default async function FAQSection() {
  const t = await getTranslations();

  const questions = t.raw("faq_questions") as string[];
  const answers = t.raw("faq_answers") as string[];

  const items = questions.map((q, i) => ({
    question: q,
    answer: answers[i] || "",
  }));

  return (
    <section style={{ background: "var(--surface)", padding: "6rem 4%" }}>
      <p
        className="text-[11px] font-semibold tracking-[3px] uppercase flex items-center justify-center gap-2.5 mb-4"
        style={{ color: "var(--gold)" }}
      >
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
        FAQ
        <span className="flex-1 h-px" style={{ background: "var(--gold)" }} />
      </p>
      <h2
        className="font-serif text-center reveal"
        style={{ fontSize: "clamp(32px,3.5vw,48px)", color: "var(--text)" }}
      >
        {t("faq_title")}
      </h2>

      <div className="max-w-[700px] mx-auto mt-12 reveal">
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
