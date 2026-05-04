"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{ borderBottom: "0.5px solid var(--border)" }}
          className="overflow-hidden"
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center py-5 gap-4 text-left transition-colors duration-200"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-expanded={openIndex === i}
          >
            <span
              className="text-[15px] font-medium"
              style={{ color: openIndex === i ? "var(--gold)" : "var(--text)" }}
            >
              {item.question}
            </span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-base flex-shrink-0 transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                color: "var(--gold)",
                background: openIndex === i ? "var(--gold)" : "transparent",
                borderColor: openIndex === i ? "var(--gold)" : "var(--border)",
                transform: openIndex === i ? "rotate(45deg)" : "none",
              }}
            >
              <span
                style={{
                  color: openIndex === i ? "#1A1209" : "var(--gold)",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </span>
          </button>

          <div
            className="faq-answer"
            style={{
              maxHeight: openIndex === i ? "200px" : "0",
              overflow: "hidden",
              transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div
              className="pb-5 text-[14px]"
              style={{ color: "var(--muted)", lineHeight: 1.8 }}
            >
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
