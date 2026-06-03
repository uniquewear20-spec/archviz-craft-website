"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ══════════════════════════════════════════════════════════════════════════
// HERO — a cinematic image sequence, not a slideshow.
//
// 3–5 of the strongest renders. Each is HELD for a long, confident beat
// (~7.5s), then dissolves into the next over a slow 2.2s crossfade. Through
// the whole hold, an almost-imperceptible zoom drifts the frame so it breathes
// like a film plate. No dots, no arrows, no carousel chrome — the images are
// the experience. Typography stays minimal and still over the top; only the
// imagery moves. prefers-reduced-motion → first frame, static.
// ══════════════════════════════════════════════════════════════════════════

const HERO_IMAGES = [
  "/images/hero/hero-1.png",
  "/images/hero/hero-2.png",
  "/images/hero/hero-3.png",
  "/images/hero/hero-4.png",
  "/images/hero/hero-5.png",
];

const HOLD_MS = 7500;       // how long each frame is held
const CROSSFADE_S = 2.2;    // dissolve duration between frames
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setMounted(true);
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const h = () => setReduce(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    if (reduce || HERO_IMAGES.length < 2) return;
    const t = setInterval(() => setIndex(p => (p + 1) % HERO_IMAGES.length), HOLD_MS);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "660px",
        overflow: "hidden",
        backgroundColor: "#1A130C",
      }}
    >
      {/* Cinematic image sequence — long holds, slow crossfades, drifting zoom */}
      <div style={{ position: "absolute", inset: 0 }}>
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: CROSSFADE_S, ease: "linear" }}
            style={{ position: "absolute", inset: 0, willChange: "opacity" }}
          >
            <motion.div
              initial={{ scale: reduce ? 1 : 1.0 }}
              animate={{ scale: reduce ? 1 : 1.12 }}
              transition={{ duration: (HOLD_MS + CROSSFADE_S * 1000) / 1000, ease: "linear" }}
              style={{ position: "absolute", inset: "-4%", width: "108%", height: "108%", willChange: "transform" }}
            >
              <Image
                src={HERO_IMAGES[index]}
                alt="ArchViz Craft — architectural visualization"
                fill
                priority={index === 0}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic gradient + vignette */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          background:
            "linear-gradient(to bottom, rgba(26,19,12,0.45) 0%, rgba(26,19,12,0.32) 45%, rgba(26,19,12,0.78) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 11,
          background:
            "radial-gradient(ellipse at center, transparent 36%, rgba(26,19,12,0.58) 100%)",
        }}
      />

      {/* Content (still; only imagery moves) */}
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
                color: "rgba(236,227,213,0.6)",
                fontWeight: 300,
              }}
            >
              Architectural Visualization · Dubai
            </span>
          </motion.div>

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

          <motion.div
            style={{ marginTop: "clamp(2rem,3.5vw,2.8rem)", height: "1px", width: "64px", backgroundColor: "#A8885A", opacity: 0.65, transformOrigin: "center" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.65 }}
            transition={{ duration: 1.0, delay: 1.5, ease: EASE }}
          />

          <motion.p
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              color: "rgba(236,227,213,0.64)",
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

          <motion.div
            style={{ marginTop: "clamp(2.5rem,4vw,3.2rem)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.95, ease: EASE }}
          >
            <HeroCTA />
          </motion.div>

        </div>
      )}

      {/* Scroll cue — bottom-right corner (out of the centered content column) */}
      {mounted && (
        <motion.div
          style={{
            position: "absolute", bottom: "2.4rem", right: "clamp(1.6rem,3vw,2.8rem)", zIndex: 20,
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
              color: "rgba(236,227,213,0.34)",
              fontWeight: 300,
              writingMode: "vertical-rl",
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