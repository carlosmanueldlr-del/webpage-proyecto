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
          bg: "#EEF0F8",
          bg2: "#E1E5F3",
          fg: "#171B2E",
          accent: "#5B6FA8",
        },
        portfolio: {
          bg: "#10121C",
          bg2: "#191D2E",
          fg: "#F2F1F7",
          accent: "#8C93D9",
        },
        contact: {
          bg: "#2E3A8C",
          bg2: "#1C2560",
          fg: "#F6F4FF",
          accent: "#FF9F6B",
        },
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};
