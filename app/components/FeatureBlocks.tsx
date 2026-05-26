"use client";

import { useState } from "react";
import Image from "next/image";

// ── omegarender-style feature section — LIVOORA warm palette ────────────────
// Interlocking stagger: the big tall INTERIOR image sits in the right column
// spanning both text blocks; the left column stacks INTERIOR text (top) then
// EXTERIOR text + image (offset down), so the two blocks interlock diagonally.
// Collapses to a clean single column on mobile.

const INTERIOR = {
  id: "interior",
  title: "INTERIOR 3D RENDERINGS",
  body: "TRANSFORM IDEAS INTO BREATHTAKING INTERIOR VISUALS. SEE EVERY DETAIL OF YOUR DESIGN COME ALIVE.",
  cta: "SEE MORE",
  href: "#bedrooms",
  img: "/images/feature/feature-interior.png",
};

const EXTERIOR = {
  id: "exterior",
  title: "EXTERIOR 3D VISUALIZATION",
  body: "BRING ARCHITECTURAL DESIGNS TO LIFE WITH STUNNING EXTERIOR 3D RENDERINGS. SHOWCASE YOUR PROJECTS IN PHOTOREALISTIC DETAIL FROM EVERY ANGLE.",
  cta: "SEE MORE",
  href: "#villas-exteriors",
  img: "/images/feature/feature-exterior.jpg",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm), sans-serif",
  fontWeight: 700,
  fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
  letterSpacing: "0.01em",
  lineHeight: 1.1,
  margin: 0,
  color: "var(--text-loud)",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm), sans-serif",
  fontWeight: 400,
  fontSize: "clamp(0.82rem, 1.05vw, 1rem)",
  letterSpacing: "0.04em",
  lineHeight: 1.75,
  color: "var(--text-mid)",
  marginTop: "1.4rem",
  marginBottom: "2.2rem",
  maxWidth: "30rem",
};

const ctaStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "var(--gold)",
  color: "#1A130C",
  fontFamily: "var(--font-dm), sans-serif",
  fontWeight: 500,
  fontSize: "clamp(0.7rem, 0.9vw, 0.82rem)",
  letterSpacing: "0.12em",
  padding: "1rem 2.4rem",
  textDecoration: "none",
  transition: "opacity 0.3s ease",
};

function Cta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={ctaStyle}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
    >
      {label}
    </a>
  );
}

export default function FeatureBlocks() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "var(--bg)",
        color: "var(--text-loud)",
        paddingTop: "clamp(1.5rem, 3vw, 3rem)",
        paddingBottom: "clamp(4rem, 9vw, 9rem)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* ── Interlocking stagger ── */}
      <div
        className="feat-stagger"
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5.5rem)",
        }}
      >
        {/* LEFT COLUMN — INTERIOR text (top), EXTERIOR text + image (offset down) */}
        <div className="feat-left">
          {/* INTERIOR text */}
          <div className="feat-interior-text">
            <h2 style={headingStyle}>{INTERIOR.title}</h2>
            <p style={bodyStyle}>{INTERIOR.body}</p>
            <Cta href={INTERIOR.href} label={INTERIOR.cta} />
          </div>

          {/* EXTERIOR text */}
          <div className="feat-exterior-text">
            <h2 style={headingStyle}>{EXTERIOR.title}</h2>
            <p style={bodyStyle}>{EXTERIOR.body}</p>
            <Cta href={EXTERIOR.href} label={EXTERIOR.cta} />
          </div>

          {/* EXTERIOR image — bottom-left */}
          <div className="feat-exterior-img feat-img-box" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={EXTERIOR.img}
              alt={EXTERIOR.title}
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN — big tall INTERIOR image, spans the stack */}
        <div className="feat-right">
          <div className="feat-interior-img feat-img-box" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={INTERIOR.img}
              alt={INTERIOR.title}
              fill
              sizes="(max-width: 860px) 100vw, 56vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* 3D ANIMATION row — heading within content width, video full-bleed */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "clamp(3.5rem, 8vw, 7rem) auto clamp(1rem, 2vw, 1.5rem)",
          padding: "0 clamp(1.5rem, 5vw, 5.5rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        <h2 style={headingStyle}>3D ANIMATION</h2>
        <Cta href="#contact" label="SEE MORE" />
      </div>

      {/* Full-bleed ultra-wide video band */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          aspectRatio: "1722 / 788",
          maxHeight: "70vh",
          overflow: "hidden",
          backgroundColor: "#1A130C",
        }}
      >
        <video
          src="/videos/feature-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Floating Schedule a call pill */}
      <ScheduleCall />

      <style>{`
        .feat-img-box {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Desktop: two columns. Right = big interior image (60%).
           Left (40%) stacks: interior text, then exterior text, then exterior image. */
        .feat-stagger {
          display: grid;
          grid-template-columns: 40% 60%;
          column-gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }
        .feat-left {
          display: flex;
          flex-direction: column;
        }
        .feat-interior-text {
          padding-top: 0;
        }
        /* Push the exterior block down so it interlocks beside the tall
           right-hand interior image (which extends past the interior text). */
        .feat-exterior-text {
          margin-top: clamp(6rem, 16vw, 16rem);
        }
        .feat-exterior-img {
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
          aspect-ratio: 4 / 5;
        }
        /* The big interior image on the right pulls up to sit beside the
           interior text and run down past it. */
        .feat-right {
          align-self: stretch;
        }

        @media (max-width: 860px) {
          .feat-stagger {
            grid-template-columns: 1fr !important;
            row-gap: 1.25rem;
          }
          /* Mobile reading order: interior text -> interior image ->
             exterior text -> exterior image. */
          .feat-left {
            display: contents;
          }
          .feat-interior-text { order: 1; padding-top: 0 !important; }
          .feat-right         { order: 2; }
          .feat-exterior-text { order: 3; margin-top: 1.5rem !important; }
          .feat-exterior-img  { order: 4; margin-top: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}

function ScheduleCall() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "clamp(1.2rem, 3vw, 2.2rem)",
        right: "clamp(1.2rem, 3vw, 2.2rem)",
        zIndex: 60,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "var(--gold)",
        color: "#1A130C",
        fontFamily: "var(--font-dm), sans-serif",
        fontWeight: 600,
        fontSize: "clamp(0.78rem, 1vw, 0.95rem)",
        letterSpacing: "0.02em",
        padding: "0.95rem 1.8rem",
        borderRadius: "9999px",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 10px 34px rgba(0,0,0,0.4)"
          : "0 6px 22px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      Schedule a call
    </a>
  );
}