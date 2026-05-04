import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brown: "#553B24",
        beige: "#E2D3C1",
        cream: "#EADFCF",
        gold: "#C9A84C",
        "gold-light": "#E8D5A3",
        bg: "#F8F4EF",
        surface: "#FFFFFF",
        "brand-text": "#2A1F14",
        muted: "#7A6858",
        "dark-bar": "#2B1F14",
        "footer-bg": "#1A1209",
        border: "rgba(85,59,36,0.15)",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Jost", "sans-serif"],
      },
      borderRadius: {
        brand: "14px",
        "brand-sm": "8px",
      },
      boxShadow: {
        brand: "0 4px 32px rgba(85,59,36,0.10)",
        "brand-hover": "0 12px 48px rgba(85,59,36,0.18)",
      },
      keyframes: {
        scrollAnim: {
          "0%, 100%": { transform: "scaleY(0.5)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scrollAnim: "scrollAnim 2s infinite",
        fadeInUp: "fadeInUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
