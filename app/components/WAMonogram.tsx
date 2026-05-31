"use client";

import { useState } from "react";

// ── Wasim Akram portfolio monogram ──────────────────────────────────────────
// Gold-bordered circle, Cormorant "W·A" glyph. Fills gold on hover to match
// the site's nav/social hover language. Size scales via the `size` prop:
// 42px in the nav, 36px inline beside the footer socials.

export default function WAMonogram({ size = 42 }: { size?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wasim-akram-portfolio.netlify.app/"
      target="_blank"
      rel="noopener"
      aria-label="Wasim Akram Portfolio"
      title="Wasim Akram Portfolio"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: `1px solid ${hovered ? "var(--gold)" : "rgba(168,136,90,0.55)"}`,
        backgroundColor: hovered ? "var(--gold)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition:
          "background-color 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: `${Math.round(size * 0.36)}px`,
          fontWeight: 500,
          letterSpacing: "0.02em",
          lineHeight: 1,
          color: hovered ? "var(--bg)" : "var(--gold)",
          transition: "color 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        W&middot;A
      </span>
    </a>
  );
}