"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ══════════════════════════════════════════════════════════════════════════
// HERO — four stills with very slow Ken Burns motion, then a motion clip last.
// Sequence: img1 (slow zoom-in) → img2 (slow zoom-out) → img3 (slow drift L)
//           → img4 (slow drift R + zoom) → video → loop back to img1.
// Each still holds ~8.5s. Gentle crossfades. Video plays once, then advances.
// Muted throughout. Title overlaid, still.
// ══════════════════════════════════════════════════════════════════════════

type Slide =
  | { type: "image"; src: string; from: any; to: any }
  | { type: "video"; src: string };

const IMG_MS = 8500;          // each still holds ~8.5s — very slow
const CROSSFADE_S = 1.8;      // dissolve duration
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Each image gets its own slow camera move. Values are subtle on purpose.
const SLIDES: Slide[] = [
  { type: "image", src: "/images/hero/hero-1.jpg", from: { scale: 1.0, x: "0%", y: "0%" },   to: { scale: 1.12, x: "0%", y: "-1.5%" } },   // slow zoom-in, gentle rise
  { type: "image", src: "/images/hero/hero-2.jpg", from: { scale: 1.12, x: "0%", y: "0%" },  to: { scale: 1.0, x: "0%", y: "0%" } },        // slow zoom-out
  { type: "image", src: "/images/hero/hero-3.jpg", from: { scale: 1.08, x: "-2.5%", y: "0%" }, to: { scale: 1.08, x: "2.5%", y: "0%" } },   // sideways drift L→R
  { type: "image", src: "/images/hero/hero-4.jpg", from: { scale: 1.04, x: "2%", y: "0%" },  to: { scale: 1.14, x: "-2%", y: "-1%" } },     // drift R→L + slow zoom-in
  { type: "video", src: "/images/hero/hero-5.mp4" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const h = () => setReduce(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  const advance = useCallback(() => {
    setIndex(p => (p + 1) % SLIDES.length);
  }, []);

  // Drive timing. Images advance on a timer; the video advances when it ends.
  useEffect(() => {
    if (reduce) return;
    const current = SLIDES[index];
    if (timerRef.current) clearTimeout(timerRef.current);

    if (current.type === "image") {
      timerRef.current = setTimeout(advance, IMG_MS);
    }
    // for video, onEnded handles the advance (see <video> below)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, reduce, advance]);

  const current = SLIDES[index];

  return (
    <section
      style={{
        position: "relative", width: "100%", height: "100vh",
        minHeight: "640px", overflow: "hidden", backgroundColor: "#1A130C",
      }}
    >
      {/* Slide layer */}
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
            {current.type === "image" ? (
              <motion.div
                initial={reduce ? current.to : current.from}
                animate={current.to}
                transition={{ duration: (IMG_MS + CROSSFADE_S * 1000) / 1000, ease: "linear" }}
                style={{
                  position: "absolute", inset: "-4%",
                  backgroundImage: `url('${current.src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  willChange: "transform",
                }}
              />
            ) : (
              <div style={{ position: "absolute", inset: "-3%" }}>
                <video
                  ref={videoRef}
                  src={current.src}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={advance}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic grade */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(to bottom, rgba(26,19,12,0.5) 0%, rgba(26,19,12,0.32) 42%, rgba(26,19,12,0.82) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 11, background: "radial-gradient(ellipse at center, transparent 36%, rgba(26,19,12,0.55) 100%)" }} />

      {/* Content */}
      {mounted && (
        <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(1.5rem,6vw,4rem)" }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "clamp(2rem,4vw,3rem)" }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#A8885A", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "clamp(8px,0.85vw,10px)", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(236,227,213,0.6)", fontWeight: 300 }}>
              Architectural Visualization · Dubai
            </span>
          </motion.div>

          <h1 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, lineHeight: 0.96, margin: 0, letterSpacing: "-0.015em" }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block", color: "#F3ECE0", fontSize: "clamp(3.4rem,11vw,10rem)", fontWeight: 300 }}
                initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.4, delay: 0.55, ease: EASE }}>
                Unbuilt.
              </motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden", marginTop: "0.02em" }}>
              <motion.span style={{ display: "block", fontStyle: "italic", fontWeight: 300, color: "#A8885A", fontSize: "clamp(3.4rem,11vw,10rem)" }}
                initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.4, delay: 0.95, ease: EASE }}>
                Made undeniable.
              </motion.span>
            </span>
          </h1>

          <motion.div style={{ marginTop: "clamp(2rem,3.5vw,2.8rem)", height: "1px", width: "64px", backgroundColor: "#A8885A", opacity: 0.65, transformOrigin: "center" }}
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 0.65 }} transition={{ duration: 1.0, delay: 1.5, ease: EASE }} />

          <motion.p style={{ fontFamily: "var(--font-dm),sans-serif", color: "rgba(236,227,213,0.64)", fontWeight: 300, letterSpacing: "0.05em", marginTop: "clamp(1.4rem,2.5vw,1.8rem)", maxWidth: "34rem", fontSize: "clamp(0.82rem,1.3vw,1rem)", lineHeight: 1.75 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.7, ease: EASE }}>
            A luxury visualization atelier rendering ambitious architecture with cinematic precision — long before the first stone is laid.
          </motion.p>

          <motion.div style={{ marginTop: "clamp(2.5rem,4vw,3.2rem)" }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 1.95, ease: EASE }}>
            <HeroCTA />
          </motion.div>
        </div>
      )}

      {/* Slide progress ticks — bottom-left */}
      {mounted && (
        <div style={{ position: "absolute", bottom: "2.6rem", left: "clamp(1.6rem,4vw,3.5rem)", zIndex: 20, display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {SLIDES.map((_, i) => (
            <div key={i} style={{ width: i === index ? "26px" : "10px", height: "2px", backgroundColor: i === index ? "#A8885A" : "rgba(236,227,213,0.25)", transition: "width 0.5s ease, background-color 0.5s ease" }} />
          ))}
        </div>
      )}

      {/* Scroll cue — bottom-right */}
      {mounted && (
        <motion.div style={{ position: "absolute", bottom: "2.4rem", right: "clamp(1.6rem,3vw,2.8rem)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.7rem" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1.0 }}>
          <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(236,227,213,0.34)", fontWeight: 300, writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(168,136,90,0.65), transparent)", animation: "scrollline 2.4s ease-in-out infinite" }} />
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
    <a href="#bedrooms" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.95rem", fontFamily: "var(--font-dm),sans-serif",
        color: hovered ? "#1A130C" : "#F3ECE0", fontWeight: 300, letterSpacing: "0.2em", fontSize: "clamp(9px,0.9vw,11px)",
        textTransform: "uppercase", padding: "1.05rem 2.9rem",
        backgroundColor: hovered ? "#A8885A" : "transparent", border: "1px solid rgba(168,136,90,0.55)",
        textDecoration: "none", transition: "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease",
        borderColor: hovered ? "#A8885A" : "rgba(168,136,90,0.55)",
      }}>
      View the Work
      <span style={{ display: "inline-block", width: "22px", height: "1px", backgroundColor: "currentColor", transition: "transform 0.4s ease", transform: hovered ? "translateX(5px)" : "translateX(0)" }} />
    </a>
  );
}