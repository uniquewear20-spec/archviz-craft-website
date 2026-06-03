"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════════
// CATEGORY TITLE — a dimensional reveal for each portfolio section header.
//
// As the section scrolls into view, the big title doesn't just fade: it
// settles forward out of Z-space (starts pushed back + larger with a slight
// perspective tilt, lands level and centered), while a vast ghosted word
// drifts behind it at a slower speed for depth. The eyebrow + index + rule
// rise in the foreground. Architectural, restrained, scroll-linked.
//
// Drop-in replacement for the old <SectionHeader>: same props.
// ══════════════════════════════════════════════════════════════════════════

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CategoryTitle({
  index,
  label,
  headline,
  subheadline,
  body,
  ghost,
}: {
  index: string;
  label: string;
  headline: string;
  subheadline?: string;
  body?: string;
  ghost?: string; // big faint backdrop word; defaults to first word of label
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Z-space settle for the headline
  const titleScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const titleRotX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["22%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.7, 1]);

  // Ghost backdrop drifts slower
  const ghostX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "6%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.04, 0.05]);

  const ghostWord = ghost ?? label.split(" ")[0].toUpperCase();

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(4.5rem,7vw,7.5rem) clamp(2rem,7vw,8rem) clamp(2.5rem,3.5vw,3.5rem)",
        perspective: "1200px",
        overflow: "hidden",
      }}
    >
      {/* Ghost backdrop word */}
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          top: "-0.15em",
          left: "clamp(1rem,4vw,4rem)",
          x: ghostX,
          opacity: ghostOpacity,
          fontFamily: "var(--font-cormorant),serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(6rem,16vw,16rem)",
          lineHeight: 1,
          color: "#A8885A",
          whiteSpace: "nowrap",
          letterSpacing: "-0.03em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {ghostWord}
      </motion.span>

      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "clamp(3rem,6vw,8rem)" }} className="cat-title-grid">
        {/* Index numeral */}
        <motion.div
          style={{ paddingTop: "0.4rem", flexShrink: 0 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <p style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontSize: "clamp(3rem,6vw,6rem)", color: "rgba(168,136,90,0.18)", lineHeight: 1, letterSpacing: "-0.02em", userSelect: "none" }}>{index}</p>
        </motion.div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Eyebrow */}
          <motion.div
            style={{ marginBottom: "1.6rem", display: "flex", alignItems: "center", gap: "0.7rem" }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          >
            <span style={{ width: "24px", height: "1px", backgroundColor: "#A8885A", opacity: 0.55, display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 400 }}>{label}</span>
          </motion.div>

          {/* Headline — Z-space settle */}
          <motion.h2
            style={{
              fontFamily: "var(--font-cormorant),serif",
              fontWeight: 200,
              fontStyle: "italic",
              fontSize: "clamp(2.1rem,4.5vw,4.8rem)",
              color: "var(--text-loud)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              maxWidth: "820px",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              scale: titleScale,
              rotateX: titleRotX,
              y: titleY,
              opacity: titleOpacity,
              willChange: "transform, opacity",
              margin: 0,
            }}
          >
            {headline}
            {subheadline && <span style={{ display: "block", color: "var(--text-mid)", fontStyle: "normal" }}>{subheadline}</span>}
          </motion.h2>

          {/* Body */}
          {body && (
            <motion.p
              style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem,1.2vw,1rem)", color: "var(--text-soft)", lineHeight: 1.9, maxWidth: "540px", marginTop: "1.8rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
            >
              {body}
            </motion.p>
          )}

          {/* Gold rule */}
          <motion.div
            style={{ marginTop: "2rem", height: "1px", width: "clamp(60px,10vw,120px)", backgroundColor: "#A8885A", opacity: 0.5, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
          />
        </div>
      </div>

      <style>{`.cat-title-grid{flex-direction:row}@media(max-width:640px){.cat-title-grid{flex-direction:column!important;gap:1.5rem!important}}`}</style>
    </div>
  );
}

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