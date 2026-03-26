import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Keep a strict semantic palette so random Tailwind colors are unavailable.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      primary: "#5B6CFF",
      primaryDark: "#4A5BE6",
      primaryLight: "#7C8AFF",

      base: "#F5F7FB" /* main page background */,
      surface: "#FFFFFF" /* cards / forms */,
      surfaceSoft: "#EEF1F7" /* subtle sections */,

      text: "#1F2937" /* main heading */,
      textLight: "#6B7280" /* secondary text */,
      textMuted: "#9CA3AF" /* placeholder / hint */,
    },
  },

  plugins: [],
};

export default config;
