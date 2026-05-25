"use client";

import { useState } from "react";
import Image from "next/image";

// ── omegarender-style feature section — LIVOORA warm palette ────────────────
// Alternating text/image rows (Interior, Exterior) then a full-bleed
// ultra-wide 3D ANIMATION video row beneath. Warm brown bg, sand/gold text.

const BLOCKS = [
  {
    id: "exterior",
    title: "EXTERIOR 3D VISUALIZATION",
    body: "BRING ARCHITECTURAL DESIGNS TO LIFE WITH STUNNING EXTERIOR 3D RENDERINGS. SHOWCASE YOUR PROJECTS IN PHOTOREALISTIC DETAIL FROM EVERY ANGLE.",
    cta: "SEE MORE",
    href: "#villas-exteriors",
    img: "/images/feature/feature-exterior.jpg",
    textSide: "left" as const,
    aspect: "1402 / 1122",
  },
  {
    id: "interior",
    title: "INTERIOR 3D RENDERINGS",
    body: "TRANSFORM IDEAS INTO BREATHTAKING INTERIOR VISUALS. SEE EVERY DETAIL OF YOUR DESIGN COME ALIVE.",
    cta: "SEE MORE",
    href: "#bedrooms",
    img: "/images/feature/feature-interior.png",
    textSide: "right" as const,
    aspect: "1402 / 1122",
  },
];

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
      {/* Image rows — within content width */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(3.5rem, 8vw, 7rem)",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5.5rem)",
        }}
      >
        {BLOCKS.map((b) => (
          <FeatureRow key={b.id} block={b} />
        ))}
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
        <h2
          style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
            letterSpacing: "0.01em",
            lineHeight: 1.1,
            margin: 0,
            color: "var(--text-loud)",
          }}
        >
          3D ANIMATION
        </h2>
        <a
          href="#contact"
          style={{
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
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >
          SEE MORE
        </a>
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
        .feature-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }
        .feature-row .feature-text {
          align-self: start;
          padding-top: clamp(1rem, 4vw, 4rem);
        }
        .feature-row.text-right .feature-text { order: 2; }
        .feature-row.text-right .feature-img  { order: 1; }
        @media (max-width: 860px) {
          .feature-row { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .feature-row .feature-text { align-self: auto; padding-top: 0 !important; }
          .feature-row.text-right .feature-text { order: 1; }
          .feature-row.text-right .feature-img  { order: 2; margin-top: 0 !important; }
          .feature-img { aspect-ratio: 1402 / 1122 !important; }
        }
      `}</style>
    </section>
  );
}

function FeatureRow({ block }: { block: (typeof BLOCKS)[number] }) {
  const isRight = block.textSide === "right";

  const Text = (
    <div className="feature-text">
      <h2
        style={{
          fontFamily: "var(--font-dm), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
          letterSpacing: "0.01em",
          lineHeight: 1.1,
          margin: 0,
          color: "var(--text-loud)",
        }}
      >
        {block.title}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-dm), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.82rem, 1.05vw, 1rem)",
          letterSpacing: "0.04em",
          lineHeight: 1.75,
          color: "var(--text-mid)",
          marginTop: "1.4rem",
          marginBottom: "2.2rem",
          maxWidth: "30rem",
        }}
      >
        {block.body}
      </p>
      <a
        href={block.href}
        style={{
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
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
      >
        {block.cta}
      </a>
    </div>
  );

  const Img = (
    <div
      className="feature-img"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: block.aspect,
        overflow: "hidden",
      }}
    >
      <Image
        src={block.img}
        alt={block.title}
        fill
        sizes="(max-width: 860px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );

  return (
    <div className={`feature-row ${isRight ? "text-right" : ""}`}>
      {Text}
      {Img}
    </div>
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