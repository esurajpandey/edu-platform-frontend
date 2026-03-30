import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        inherit: "inherit",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primaryDark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        primaryLight: "rgb(var(--color-primary-light) / <alpha-value>)",
        base: "rgb(var(--color-base) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        surfaceSoft: "rgb(var(--color-surface-soft) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        textLight: "rgb(var(--color-text-light) / <alpha-value>)",
        textMuted: "rgb(var(--color-text-muted) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
