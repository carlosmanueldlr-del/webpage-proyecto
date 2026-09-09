/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Manrope", "system-ui", "sans-serif"],
      },
      colors: {
        about: {
          bg: "#F7E5EE",
          bg2: "#EFD3E1",
          fg: "#231521",
          accent: "#C9417F",
        },
        portfolio: {
          bg: "#121216",
          bg2: "#1A1A20",
          fg: "#F4F1EA",
          accent: "#8F8CFF",
        },
        contact: {
          bg: "#B93E22",
          bg2: "#8F2C18",
          fg: "#FFF6EE",
          accent: "#FFD9A0",
        },
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};
