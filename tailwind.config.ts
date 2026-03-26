import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // Tailwind v4 theme tokens live in src/app/globals.css via @theme.
  plugins: [],
};

export default config;
