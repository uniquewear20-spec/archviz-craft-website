import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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
    title: "Archviz Craft",
    description: "Architectural Visualisation Studio · Dubai",
    url: "https://archvizcraft.com",
    siteName: "Archviz Craft",
    locale: "en_US",
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
      <body className="bg-[#0a0a08] text-stone-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}