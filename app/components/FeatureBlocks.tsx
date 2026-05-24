"use client";

import { useState } from "react";
import Image from "next/image";

// ── omegarender-style feature blocks ────────────────────────────────────────
// White background, black text/buttons, two alternating image/text blocks,
// floating "Schedule a call" pill. Placed right after the Hero.

const BLOCKS = [
  {
    id: "exterior",
    eyebrow: "",
    title: "EXTERIOR 3D VISUALIZATION",
    body: "BRING ARCHITECTURAL DESIGNS TO LIFE WITH STUNNING EXTERIOR 3D RENDERINGS. SHOWCASE YOUR PROJECTS IN PHOTOREALISTIC DETAIL FROM EVERY ANGLE.",
    cta: "SEE MORE",
    href: "#villas-exteriors",
    img: "/images/feature/feature-exterior.jpg",
    textSide: "left" as const,
  },
  {
    id: "interior",
    eyebrow: "",
    title: "INTERIOR 3D RENDERINGS",
    body: "TRANSFORM IDEAS INTO BREATHTAKING INTERIOR VISUALS. SEE EVERY DETAIL OF YOUR DESIGN COME ALIVE.",
    cta: "SEE MORE",
    href: "#bedrooms",
    img: "/images/feature/feature-interior.png",
    textSide: "right" as const,
  },
];

export default function FeatureBlocks() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#ffffff",
        color: "#0a0a0a",
        padding: "clamp(4rem, 9vw, 9rem) clamp(1.5rem, 5vw, 5.5rem)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(3.5rem, 8vw, 8rem)",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {BLOCKS.map((b) => (
          <FeatureRow key={b.id} block={b} />
        ))}
      </div>

      {/* Floating Schedule a call pill */}
      <ScheduleCall />

      <style>{`
        .feature-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }
        .feature-row.text-right .feature-text { order: 2; }
        .feature-row.text-right .feature-img  { order: 1; }
        @media (max-width: 860px) {
          .feature-row { grid-template-columns: 1fr !important; gap: 1.75rem !important; }
          .feature-row.text-right .feature-text { order: 1; }
          .feature-row.text-right .feature-img  { order: 2; }
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
          color: "#0a0a0a",
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
          color: "#1a1a1a",
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
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "var(--font-dm), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(0.7rem, 0.9vw, 0.82rem)",
          letterSpacing: "0.12em",
          padding: "1rem 2.4rem",
          textDecoration: "none",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.78")}
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
        aspectRatio: "4 / 3",
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
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "var(--font-dm), sans-serif",
        fontWeight: 500,
        fontSize: "clamp(0.78rem, 1vw, 0.95rem)",
        letterSpacing: "0.02em",
        padding: "0.95rem 1.8rem",
        borderRadius: "9999px",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 10px 34px rgba(0,0,0,0.32)"
          : "0 6px 22px rgba(0,0,0,0.22)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      Schedule a call
    </a>
  );
}