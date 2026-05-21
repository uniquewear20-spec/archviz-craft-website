import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colors ────────────────────────────────────────────────────────────
      colors: {
        // Page backgrounds
        page:    "#F5F0E8",   // warm cream
        surface: "#EDE8DF",   // card / section bg
        elevated:"#E8E2D8",   // subtle depth

        // Text
        ink: {
          DEFAULT: "#1C1917", // primary (near-black)
          muted:   "#6B6560", // secondary (warm grey)
          faint:   "#A09890", // tertiary (captions)
        },

        // Gold accent
        gold: {
          DEFAULT: "#A8885A",
          light:   "#C4A882",
          dark:    "#8C6E42",
          subtle:  "#D4C4A8",
        },

        // Border
        border: {
          DEFAULT: "#E2D9CC",
          strong:  "#C8BFB2",
        },
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        sans:      ["var(--font-dm)", "sans-serif"],
        serif:     ["var(--font-cormorant)", "Georgia", "serif"],
      },

      fontSize: {
        // Display scale
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)",   { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(3rem, 7vw, 6rem)",     { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-lg":  ["clamp(2.25rem, 5vw, 4rem)",  { lineHeight: "1.1",  letterSpacing: "-0.01em" }],
        "display-md":  ["clamp(1.75rem, 3.5vw, 3rem)",{ lineHeight: "1.15" }],

        // Label scale
        "label-xl":  ["0.8125rem",  { lineHeight: "1", letterSpacing: "0.18em" }],
        "label-lg":  ["0.75rem",    { lineHeight: "1", letterSpacing: "0.20em" }],
        "label-md":  ["0.6875rem",  { lineHeight: "1", letterSpacing: "0.22em" }],
        "label-sm":  ["0.625rem",   { lineHeight: "1", letterSpacing: "0.24em" }],
      },

      fontWeight: {
        light:   "300",
        normal:  "400",
        medium:  "500",
      },

      // ── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "section": "7rem",     // standard section vertical padding
        "page-x":  "6rem",     // standard horizontal page padding (lg)
      },

      // ── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        "pill": "9999px",
        "card": "0.25rem",     // subtle rounding — not round, not sharp
      },

      // ── Box Shadow ────────────────────────────────────────────────────────
      boxShadow: {
        "soft":    "0 2px 16px rgba(28, 25, 23, 0.06)",
        "card":    "0 4px 32px rgba(28, 25, 23, 0.10)",
        "lifted":  "0 8px 48px rgba(28, 25, 23, 0.14)",
        "deep":    "0 16px 64px rgba(28, 25, 23, 0.18)",
        "inset-t": "inset 0 1px 0 rgba(28, 25, 23, 0.06)",
      },

      // ── Transitions ───────────────────────────────────────────────────────
      transitionTimingFunction: {
        "expo-out":  "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in":   "cubic-bezier(0.7, 0, 0.84, 0)",
        "expo":      "cubic-bezier(0.83, 0, 0.17, 1)",
      },

      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "450": "450ms",
        "600": "600ms",
        "800": "800ms",
        "1000":"1000ms",
        "1200":"1200ms",
      },

      // ── Animation ─────────────────────────────────────────────────────────
      animation: {
        "fade-up":   "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":   "fadeIn 0.8s ease forwards",
        "pulse-dot": "pulseDot 2.5s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1",  transform: "scale(1)" },
          "50%":      { opacity: "0.4",transform: "scale(0.8)" },
        },
      },

      // ── Grid Columns (for gallery) ────────────────────────────────────────
      gridTemplateColumns: {
        "gallery-sm":  "repeat(2, 1fr)",
        "gallery-md":  "repeat(3, 1fr)",
        "gallery-lg":  "repeat(4, 1fr)",
        "gallery-hero":"2fr 1fr",          // hero + sidebar layout
        "masonry-2":   "repeat(2, 1fr)",
        "masonry-3":   "repeat(3, 1fr)",
      },

      // ── Z-Index ───────────────────────────────────────────────────────────
      zIndex: {
        "nav":     "50",
        "overlay": "80",
        "modal":   "100",
        "loader":  "200",
      },

      // ── Max Width ─────────────────────────────────────────────────────────
      maxWidth: {
        "prose-wide": "72ch",
        "content":    "1320px",
      },

      // ── Backdrop ─────────────────────────────────────────────────────────
      backdropBlur: {
        "xs": "4px",
      },
    },
  },

  plugins: [],
};

export default config;