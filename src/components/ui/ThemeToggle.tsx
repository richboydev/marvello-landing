"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("ml_theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ml_theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-base"
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        color: "var(--muted)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "var(--gold)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "var(--border)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
      }}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
