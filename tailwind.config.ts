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
        paper: "#f4f2ee", // off-white
        canvas: "#eeece6",
        ink: "#151412", // near-black
        stone: "#8a8478", // warm gray
        stoneLight: "#c9c4b8",
        line: "#d9d5c9",
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
