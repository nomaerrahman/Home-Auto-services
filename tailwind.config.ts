import type { Config } from "tailwindcss";

/**
 * APEX industrial-luxury tokens.
 * `accent` / `accent-deep` are driven by CSS variables so the Industry Mode
 * Switcher can re-tint the whole site live (see lib/data/trades.ts).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "2rem" }, screens: { "2xl": "1360px" } },
    extend: {
      colors: {
        titanium: { DEFAULT: "#121316", 950: "#0B0C0E", 900: "#121316", 850: "#17181C" },
        carbon: { DEFAULT: "#1C1E22", 800: "#1C1E22", 700: "#25282D", 600: "#2F3238", 500: "#3B3F46" },
        copper: { DEFAULT: "#D97706", light: "#F59E0B" },
        bronze: { DEFAULT: "#B45309" },
        bone: { DEFAULT: "#F3F4F6", muted: "#A1A4AB", dim: "#6B6F77" },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          deep: "rgb(var(--accent-deep) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', "Impact", "sans-serif"],
        sans: ['"Manrope Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      letterSpacing: { architect: "0.32em" },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(243,244,246,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,244,246,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
