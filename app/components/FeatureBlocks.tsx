"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// ── omegarender-style feature section — LIVOORA warm palette ────────────────
// Interlocking stagger: the big tall INTERIOR image sits in the right column
// spanning both text blocks; the left column stacks INTERIOR text (top) then
// EXTERIOR text + image (offset down), so the two blocks interlock diagonally.
// Collapses to a clean single column on mobile.

const INTERIOR = {
  id: "interior",
  title: "Interior 3D Renderings",
  body: "Transform ideas into breathtaking interior visuals. Every detail of your design, rendered alive.",
  cta: "See More",
  href: "#bedrooms",
  img: "/images/feature/feature-interior.png",
};

const EXTERIOR = {
  id: "exterior",
  title: "Exterior 3D Visualization",
  body: "Bring architectural designs to life with photorealistic exterior renderings — your project shown in full conviction, from every angle.",
  cta: "See More",
  href: "#villas-exteriors",
  img: "/images/feature/feature-exterior.jpg",
};

// Cormorant display heading — single voice shared with the rest of the site.
const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), serif",
  fontWeight: 300,
  fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
  letterSpacing: "-0.01em",
  lineHeight: 1.05,
  margin: 0,
  color: "var(--text-loud)",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm), sans-serif",
  fontWeight: 300,
  fontSize: "clamp(0.88rem, 1.05vw, 1rem)",
  letterSpacing: "0.01em",
  lineHeight: 1.85,
  color: "var(--text-soft)",
  marginTop: "1.5rem",
  marginBottom: "2.4rem",
  maxWidth: "30rem",
};

function Cta({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.85rem",
        backgroundColor: "transparent",
        color: hovered ? "var(--gold-light)" : "var(--gold)",
        fontFamily: "var(--font-dm), sans-serif",
        fontWeight: 400,
        fontSize: "clamp(0.62rem, 0.8vw, 0.7rem)",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        textDecoration: "none",
        paddingBottom: "4px",
        borderBottom: `1px solid ${hovered ? "var(--gold-light)" : "rgba(168,136,90,0.35)"}`,
        transition: "color 0.4s ease, border-color 0.4s ease, transform 0.4s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {label}
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "1px",
          backgroundColor: "currentColor",
          transition: "transform 0.4s ease",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      />
    </a>
  );
}

export default function FeatureBlocks() {
  const [isMuted, setIsMuted] = useState(true);
  const [btnHovered, setBtnHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "var(--bg)",
        color: "var(--text-loud)",
        paddingTop: "clamp(2rem, 4vw, 4rem)",
        paddingBottom: "clamp(5rem, 8vw, 9rem)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* ── Interlocking stagger ── */}
      <div
        className="feat-stagger"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(2rem, 7vw, 8rem)",
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
              quality={90}
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
              quality={90}
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
          maxWidth: "1440px",
          margin: "clamp(4rem, 8vw, 7rem) auto clamp(1.25rem, 2vw, 1.75rem)",
          padding: "0 clamp(2rem, 7vw, 8rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        <h2 style={headingStyle}>3D Animation</h2>
        <Cta href="#contact" label="See More" />
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
          backgroundColor: "var(--bg-subtle)",
        }}
      >
        <video
          ref={videoRef}
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

        {/* Minimalist Premium Audio Control */}
        <button
          onClick={toggleMute}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            position: "absolute",
            bottom: "1.5rem",
            right: "clamp(1.5rem, 5vw, 4rem)",
            background: "transparent",
            border: "none",
            color: btnHovered ? "var(--gold)" : "rgba(255, 255, 255, 0.6)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            fontFamily: "var(--font-dm), sans-serif",
            fontSize: "9px",
            fontWeight: 400,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
            zIndex: 10,
          }}
        >
          <span>{isMuted ? "Sound Off" : "Sound On"}</span>
          
          {/* Elegant audio status indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "8px" }}>
            <span style={{ width: "1px", height: isMuted ? "2px" : "8px", backgroundColor: "currentColor", transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} />
            <span style={{ width: "1px", height: isMuted ? "2px" : "5px", backgroundColor: "currentColor", transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} />
            <span style={{ width: "1px", height: isMuted ? "2px" : "7px", backgroundColor: "currentColor", transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} />
          </div>
        </button>
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
          column-gap: clamp(2.5rem, 5vw, 5.5rem);
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
            row-gap: 1.5rem;
          }
          /* Mobile reading order: interior text -> interior image ->
             exterior text -> exterior image. */
          .feat-left {
            display: contents;
          }
          .feat-interior-text { order: 1; padding-top: 0 !important; }
          .feat-right         { order: 2; }
          .feat-exterior-text { order: 3; margin-top: 2rem !important; }
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
        color: "var(--bg)",
        fontFamily: "var(--font-dm), sans-serif",
        fontWeight: 500,
        fontSize: "clamp(0.72rem, 0.95vw, 0.88rem)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.95rem 1.9rem",
        borderRadius: "9999px",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 12px 38px rgba(0,0,0,0.42)"
          : "0 6px 22px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
      }}
    >
      Schedule a Call
    </a>
  );
}