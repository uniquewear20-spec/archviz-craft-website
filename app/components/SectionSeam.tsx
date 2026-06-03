"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════════
// SECTION SEAM — connective tissue between portfolio chapters.
//
// Instead of a hard divider line + big symmetric gap (which reads "stop, then
// restart"), this is a short transitional passage that one chapter flows into
// and the next emerges from. A faint vertical gradient breathes the espresso
// darker at the seam and lifts again, a hairline thread runs through with a
// chapter cue ("Chapter II · Kitchens") that drifts on scroll, and a single
// gold node marks the join. The eye is carried forward, never parked.
//
// Usage between two categories:
//   <SectionSeam fromChapter="I" toChapter="II" toName="Kitchens" />
// ══════════════════════════════════════════════════════════════════════════


export default function SectionSeam({
  toChapter,
  toName,
}: {
  toChapter: string;
  toName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Thread draws through as you pass; label drifts; node pulses into view.
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 1]);
  const labelY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["60%", "-60%"]);
  const labelOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 1, 0]);
  const nodeScale = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "relative",
        height: "clamp(10rem, 22vh, 18rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // gradient bleed: lifts from the chapter above, deepens, lifts to the next
        background:
          "linear-gradient(to bottom, transparent 0%, rgba(20,15,10,0.55) 50%, transparent 100%)",
      }}
    >
      {/* The running thread */}
      <motion.div
        style={{
          width: "1px",
          height: "100%",
          position: "absolute",
          top: 0,
          background: "linear-gradient(to bottom, transparent, rgba(168,136,90,0.5) 50%, transparent)",
          scaleY: lineScale,
          transformOrigin: "top",
        }}
      />

      {/* Gold node at the join */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          backgroundColor: "#A8885A",
          transform: "translateY(-50%)",
          scale: nodeScale,
          boxShadow: "0 0 18px rgba(168,136,90,0.5)",
        }}
      />

      {/* Chapter cue, drifting */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          y: labelY,
          opacity: labelOpacity,
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",
          paddingLeft: "3rem",
          marginTop: "-0.6rem",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontFamily: "var(--font-cormorant),serif", fontStyle: "italic", fontWeight: 200, fontSize: "1.1rem", color: "rgba(168,136,90,0.85)" }}>
          Chapter {toChapter}
        </span>
        <span style={{ width: "18px", height: "1px", backgroundColor: "rgba(168,136,90,0.45)" }} />
        <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 400 }}>
          {toName}
        </span>
      </motion.div>
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