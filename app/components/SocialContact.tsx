"use client";

import React from "react";

// ── Social links row + Zenith-style floating Email & WhatsApp buttons ────────
// Social row: professional, centered, warm LIVOORA palette.
// Floating buttons: replicate Zenith Dubai (gold circular email + green
// WhatsApp), placed bottom-LEFT so they never collide with the existing
// "Schedule a call" pill on the bottom-right.

const WA = "971522783784"; // +971 52 278 3784, formatted for wa.me
const EMAIL = "archvizcraft.in@gmail.com";
const WA_MSG = "Hello ArchViz Craft, I'd like to discuss a visualization project.";

const SOCIALS: { id: string; name: string; href: string; icon: React.ReactNode }[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/archvizcraft/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://youtube.com/@archvizcraft",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "https://www.tiktok.com/@archvizcraft_",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.27 8.27 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/archvizcraft",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "behance",
    name: "Behance",
    href: "https://www.behance.net/archvizcraft",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X",
    href: "https://x.com/archvizcraft",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function SocialRow() {
  return (
    <section
      id="follow"
      style={{
        backgroundColor: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5.5rem)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "2rem",
          }}
        >
          Follow Our Work
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                textDecoration: "none",
                color: "var(--text-mid)",
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
                padding: "4px 0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)";
              }}
            >
              <span style={{ color: "inherit", display: "flex" }}>{s.icon}</span>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FloatingContact() {
  return (
    <>
      {/* Email — gold circle (Zenith style), bottom-LEFT to avoid the Schedule pill */}
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Email ArchViz Craft"
        style={{
          position: "fixed",
          bottom: "5.5rem",
          left: "1.5rem",
          zIndex: 60,
          height: "44px",
          width: "44px",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--gold)",
          boxShadow: "0 4px 22px rgba(0,0,0,0.35)",
          textDecoration: "none",
          transition: "transform 0.25s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.06)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1A130C" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </a>

      {/* WhatsApp — green circle (Zenith style) */}
      <a
        href={`https://wa.me/${WA}?text=${encodeURIComponent(WA_MSG)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ArchViz Craft"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 60,
          height: "44px",
          width: "44px",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#25D366",
          boxShadow: "0 4px 22px rgba(37,211,102,0.32)",
          textDecoration: "none",
          transition: "transform 0.25s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.06)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M12 22a10 10 0 0 0 8.66-15 10 10 0 0 0-16.9 10.6L3 22l4.56-.7A10 10 0 0 0 12 22Z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.35 8.9c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.1.8 2.6.7 3.1.6.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.3-.1-.2-.2-.3-.5-.4l-1.9-.9c-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.5l.4-.5c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.8-2Z"
            fill="white"
          />
        </svg>
      </a>
    </>
  );
}