"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ── Slide data ─────────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1, src: "/images/hero/hero-1.png", scale: [1.0, 1.07] as [number, number], x: ["0%", "0%"]   as [string, string] },
  { id: 2, src: "/images/hero/hero-2.png", scale: [1.08, 1.0] as [number, number], x: ["0%", "0%"]   as [string, string] },
  { id: 3, src: "/images/hero/hero-3.png", scale: [1.04, 1.04] as [number, number], x: ["-2%", "2%"] as [string, string] },
  { id: 4, src: "/images/hero/hero-4.png", scale: [1.04, 1.04] as [number, number], x: ["2%", "-2%"] as [string, string] },
  { id: 5, src: "/images/hero/hero-5.png", scale: [1.0, 1.07] as [number, number], x: ["0%", "0%"]   as [string, string] },
];

const SLIDE_DURATION = 7000;
const TRANSITION_DURATION = 2.0; // seconds
const KEN_BURNS_DURATION = SLIDE_DURATION / 1000 + TRANSITION_DURATION;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((p) => (p + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = SLIDES[index];

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* ── Cinematic background slideshow ─────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          style={{ position: "absolute", inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
        >
          {/* Ken Burns layer — no layout shifts, pure transform */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-5%",
              width: "110%",
              height: "110%",
              willChange: "transform",
            }}
            initial={{ scale: slide.scale[0], x: slide.x[0] }}
            animate={{ scale: slide.scale[1], x: slide.x[1] }}
            transition={{
              duration: KEN_BURNS_DURATION,
              ease: "linear",
            }}
          >
            <Image
              src={slide.src}
              alt="ArchViz Craft"
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Cinematic gradient overlay ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.65) 100%)",
          zIndex: 10,
        }}
      />

      {/* ── Vignette ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          zIndex: 11,
        }}
      />

      {/* ── Hero content ───────────────────────────────────────────────── */}
      {mounted && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(1.5rem, 6vw, 4rem)",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "2.5rem",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "#A8885A",
                display: "inline-block",
                animation: "heropulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "clamp(8px,0.85vw,10px)",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.48)",
                fontWeight: 300,
              }}
            >
              By Appointment Only · Dubai
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              lineHeight: 1.0,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
          >
            <span
              style={{
                display: "block",
                color: "#fff",
                fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
                fontWeight: 300,
                marginBottom: "0.1em",
              }}
            >
              The Power of Architectural
            </span>
            <span
              style={{
                display: "block",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#A8885A",
                fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
              }}
            >
              Visualization
            </span>
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            style={{
              marginTop: "2rem",
              height: "1px",
              width: "56px",
              backgroundColor: "#A8885A",
              opacity: 0.65,
              transformOrigin: "center",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.65 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          />

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              marginTop: "1.6rem",
              maxWidth: "34rem",
              fontSize: "clamp(0.82rem, 1.4vw, 1rem)",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
          >
            Bringing visionary developments to life before construction begins
          </motion.p>

          {/* CTA */}
          <motion.div
            style={{ marginTop: "3rem" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.2, ease: EASE }}
          >
            <HeroCTA />
          </motion.div>

          {/* Slide indicators */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === index ? "28px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  backgroundColor:
                    i === index ? "#A8885A" : "rgba(255,255,255,0.25)",
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  flexShrink: 0,
                }}
              />
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              right: "clamp(2rem,4vw,4rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "8px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                writingMode: "vertical-rl",
                fontWeight: 300,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "36px",
                background:
                  "linear-gradient(to bottom, rgba(168,136,90,0.6), transparent)",
                animation: "scrollline 2s ease-in-out infinite",
              }}
            />
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes heropulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.9); }
        }
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
        gap: "0.85rem",
        fontFamily: "var(--font-dm), sans-serif",
        color: hovered ? "#0E0C0A" : "#fff",
        fontWeight: 300,
        letterSpacing: "0.18em",
        fontSize: "clamp(9px,0.9vw,11px)",
        textTransform: "uppercase",
        padding: "0.95rem 2.6rem",
        backgroundColor: hovered ? "#A8885A" : "transparent",
        border: "1px solid rgba(168,136,90,0.55)",
        textDecoration: "none",
        transition: "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease",
        borderColor: hovered ? "#A8885A" : "rgba(168,136,90,0.55)",
      }}
    >
      See our work
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "1px",
          backgroundColor: "currentColor",
          transition: "transform 0.35s ease",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      />
    </a>
  );
}