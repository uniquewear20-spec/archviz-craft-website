import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/**
 * Font Pairing Strategy — Zenith-inspired
 * ─────────────────────────────────────────
 * DISPLAY:  Cormorant Garamond (serif, italic variants)
 *           → Evokes old-world luxury, editorial gravitas
 *           → Used for hero headlines, section titles, pull quotes
 *
 * BODY/UI:  DM Sans (humanist sans-serif, light weight)
 *           → Clean, precise, contemporary
 *           → Used for nav, labels, captions, body text, buttons
 *
 * Alternative pairings to consider:
 *   - Playfair Display + Jost     (more dramatic)
 *   - Libre Baskerville + Outfit  (warmer, more approachable)
 *   - EB Garamond + DM Sans       (most authentic to Zenith)
 */

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Archviz Craft — Architectural Visualisation Studio · Dubai",
  description:
    "Premium architectural visualisation studio based in Dubai. Cinematic renders for the world's most ambitious architectural projects.",
  openGraph: {
    title: "Archviz Craft — Architectural Visualisation Studio · Dubai",
    description:
      "Premium architectural visualisation studio based in Dubai. Cinematic renders for the world's most ambitious architectural projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      {/*
        bg-page     → #F5F0E8 warm cream (replaces #0a0a08 dark bg)
        text-ink    → #1C1917 near-black (replaces stone-100 light text)
        font-sans   → DM Sans (light weight default)
      */}
      <body className="bg-page text-ink font-sans font-light antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}