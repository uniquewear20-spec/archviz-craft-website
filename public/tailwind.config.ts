import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        gold: "#c9a96e",
      },
      letterSpacing: {
        widest: ".3em",
        ultra: ".5em",
      },
    },
  },
  plugins: [],
};

export default config;