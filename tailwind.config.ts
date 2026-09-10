import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Bold Editorial" variant — inverted: near-black dominant, cream
        // text. paper/ink swap ROLES (paper = main bg, ink = main text) so
        // every component that already uses those tokens just works.
        paper: "#17120f", // near-black, warm undertone
        canvas: "#1d1712",
        ink: "#f3ebe0", // warm cream
        stone: "#b3a692", // warm taupe-gray (secondary text)
        stoneLight: "#6b6152", // dim warm gray (tertiary/faint text)
        line: "#3a332a",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.03em",
        label: "0.14em",
        wide2: "0.2em",
      },
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
