"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════════
// EDITORIAL INTERLUDE — a cinematic scroll moment between sections.
//
// A massive statement set in layered depth: a ghosted oversized word drifting
// in the background at one speed, the real headline arriving in the mid-ground
// with a Z-space settle (scale + perspective), a thin gold rule and a small
// label in the foreground moving at a third speed. Everything is scroll-linked,
// so the moment "plays" as the viewport passes through it — it doesn't just
// fade. Restrained: one big idea, lots of dark space, slow.
//
// Usage:
//   <EditorialInterlude
//     ghost="VISION"
//     line1="Vision"
//     line2="made visible."
//     label="The ArchViz Craft Philosophy"
//   />
// ══════════════════════════════════════════════════════════════════════════

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EditorialInterlude({
  ghost,
  line1,
  line2,
  label,
}: {
  ghost: string;
  line1: string;
  line2: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  // Track scroll through this section: 0 = entering bottom, 1 = leaving top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Three depth layers, three speeds.
  const ghostX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-12%"]);
  const ghostScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1.35]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  const midY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "-30%"]);
  // Z-space settle: headline starts pushed back + slightly larger, settles forward as it centers.
  const midScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.14, 1, 0.96]);
  const midPersp = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [8, 0, -6]); // rotateX deg
  const midOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  const foreY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["60%", "-60%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "118vh",
        minHeight: "760px",
        backgroundColor: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
      }}
    >
      {/* Soft radial glow center, for depth */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "min(120vw, 1400px)", height: "min(120vw, 1400px)",
          background: "radial-gradient(ellipse at center, rgba(168,136,90,0.05) 0%, transparent 62%)",
          pointerEvents: "none",
        }}
      />

      {/* ── BACKGROUND LAYER — ghosted oversized word ── */}
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          x: ghostX,
          scale: ghostScale,
          opacity: ghostOpacity,
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(8rem, 28vw, 30rem)",
          color: "#A8885A",
          whiteSpace: "nowrap",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          userSelect: "none",
          willChange: "transform, opacity",
        }}
      >
        {ghost}
      </motion.span>

      {/* ── MID LAYER — the headline, Z-space settle ── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          y: midY,
          scale: midScale,
          rotateX: midPersp,
          opacity: midOpacity,
          textAlign: "center",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
          padding: "0 clamp(1.5rem, 6vw, 4rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 9vw, 9rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--text-loud)",
          }}
        >
          <span style={{ display: "block" }}>{line1}</span>
          <span style={{ display: "block", fontStyle: "italic", color: "#A8885A" }}>{line2}</span>
        </h2>
      </motion.div>

      {/* ── FOREGROUND LAYER — small label + rule, fastest ── */}
      {label && (
        <motion.div
          style={{
            position: "absolute",
            bottom: "clamp(3rem, 8vh, 7rem)",
            left: "50%",
            x: "-50%",
            y: foreY,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            willChange: "transform",
          }}
        >
          <div style={{ width: "30px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
          <span
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
          <div style={{ width: "30px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
        </motion.div>
      )}
    </section>
  );
}

// SSR-safe reduced-motion check
function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const h = () => setReduce(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return reduce;
}