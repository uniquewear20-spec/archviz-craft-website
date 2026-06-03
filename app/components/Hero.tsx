"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ══════════════════════════════════════════════════════════════════════════
// HERO — the opening frame of a film, not a slideshow.
// One commanding still render, held. A very slow Ken Burns drift so it
// breathes rather than slides. Massive editorial typography arriving
// line-by-line with a long, confident stagger. A long quiet beat before the
// eye is asked to move. Minimal copy. Maximum stillness.
// ══════════════════════════════════════════════════════════════════════════

// The single hero render. Choose the strongest frame in the library.
const HERO_SRC = "/images/hero/hero-1.png";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "660px",
        overflow: "hidden",
        backgroundColor: "#1A130C",
      }}
    >
      {/* ── Single held render with a very slow drift (breathes, never slides) ── */}
      <motion.div
        style={{ position: "absolute", inset: "-4%", width: "108%", height: "108%", willChange: "transform" }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 18, ease: "linear" }}
      >
        <Image
          src={HERO_SRC}
          alt="ArchViz Craft — architectural visualization"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

      {/* ── Cinematic gradient + vignette ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          background:
            "linear-gradient(to bottom, rgba(26,19,12,0.42) 0%, rgba(26,19,12,0.40) 45%, rgba(26,19,12,0.74) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 11,
          background:
            "radial-gradient(ellipse at center, transparent 38%, rgba(26,19,12,0.55) 100%)",
        }}
      />

      {/* ── Content ── */}
      {mounted && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 20,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(1.5rem, 6vw, 4rem)",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "clamp(2rem,4vw,3rem)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#A8885A", display: "inline-block", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "clamp(8px,0.85vw,10px)",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(236,227,213,0.58)",
                fontWeight: 300,
              }}
            >
              Architectural Visualization · Dubai
            </span>
          </motion.div>

          {/* Headline — two words, then two. Arrives line-by-line, long stagger. */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              lineHeight: 0.96,
              margin: 0,
              letterSpacing: "-0.015em",
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block", color: "#F3ECE0", fontSize: "clamp(3.4rem, 11vw, 10rem)", fontWeight: 300 }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.55, ease: EASE }}
              >
                Unbuilt.
              </motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden", marginTop: "0.02em" }}>
              <motion.span
                style={{ display: "block", fontStyle: "italic", fontWeight: 300, color: "#A8885A", fontSize: "clamp(3.4rem, 11vw, 10rem)" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.95, ease: EASE }}
              >
                Made undeniable.
              </motion.span>
            </span>
          </h1>

          {/* Gold rule */}
          <motion.div
            style={{ marginTop: "clamp(2rem,3.5vw,2.8rem)", height: "1px", width: "64px", backgroundColor: "#A8885A", opacity: 0.65, transformOrigin: "center" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.65 }}
            transition={{ duration: 1.0, delay: 1.5, ease: EASE }}
          />

          {/* Subtitle — one calm line */}
          <motion.p
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              color: "rgba(236,227,213,0.62)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              marginTop: "clamp(1.4rem,2.5vw,1.8rem)",
              maxWidth: "34rem",
              fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
              lineHeight: 1.75,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.7, ease: EASE }}
          >
            A luxury visualization atelier rendering ambitious architecture
            with cinematic precision — long before the first stone is laid.
          </motion.p>

          {/* CTA */}
          <motion.div
            style={{ marginTop: "clamp(2.5rem,4vw,3.2rem)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.95, ease: EASE }}
          >
            <HeroCTA />
          </motion.div>

          {/* Scroll cue — bottom center, quiet */}
          <motion.div
            style={{
              position: "absolute", bottom: "2.4rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.7rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.0 }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "8px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(236,227,213,0.32)",
                fontWeight: 300,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px", height: "40px",
                background: "linear-gradient(to bottom, rgba(168,136,90,0.65), transparent)",
                animation: "scrollline 2.4s ease-in-out infinite",
              }}
            />
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes scrollline {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function HeroCTA() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#bedrooms"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.95rem",
        fontFamily: "var(--font-dm), sans-serif",
        color: hovered ? "#1A130C" : "#F3ECE0",
        fontWeight: 300,
        letterSpacing: "0.2em",
        fontSize: "clamp(9px,0.9vw,11px)",
        textTransform: "uppercase",
        padding: "1.05rem 2.9rem",
        backgroundColor: hovered ? "#A8885A" : "transparent",
        border: "1px solid rgba(168,136,90,0.55)",
        textDecoration: "none",
        transition: "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease",
        borderColor: hovered ? "#A8885A" : "rgba(168,136,90,0.55)",
      }}
    >
      View the Work
      <span
        style={{
          display: "inline-block",
          width: "22px",
          height: "1px",
          backgroundColor: "currentColor",
          transition: "transform 0.4s ease",
          transform: hovered ? "translateX(5px)" : "translateX(0)",
        }}
      />
    </a>
  );
}