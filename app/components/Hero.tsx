"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { id: 1, src: "/images/hero/hero-1.png", effect: "zoom-in" },
  { id: 2, src: "/images/hero/hero-2.png", effect: "zoom-out" },
  { id: 3, src: "/images/hero/hero-3.png", effect: "slide-right" },
  { id: 4, src: "/images/hero/hero-4.png", effect: "slide-left" },
  { id: 5, src: "/images/hero/hero-5.png", effect: "zoom-in" },
];

const SLIDE_DURATION = 6000;

function getMotionProps(effect: string) {
  switch (effect) {
    case "zoom-in":
      return { initial: { scale: 1.0, x: 0 }, animate: { scale: 1.08, x: 0 } };
    case "zoom-out":
      return { initial: { scale: 1.1, x: 0 }, animate: { scale: 1.0, x: 0 } };
    case "slide-right":
      return { initial: { scale: 1.05, x: "-3%" }, animate: { scale: 1.05, x: "0%" } };
    case "slide-left":
      return { initial: { scale: 1.05, x: "3%" }, animate: { scale: 1.05, x: "0%" } };
    default:
      return { initial: { scale: 1.0, x: 0 }, animate: { scale: 1.06, x: 0 } };
  }
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(
      () => setIndex((p) => (p + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];
  const motionProps = getMotionProps(slide.effect);

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt="Archviz Craft"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10 }} />

      {mounted && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 20,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 1.5rem",
        }}>

          {/* Eyebrow tag */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#A8885A", display: "inline-block",
              animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-dm), sans-serif",
              fontSize: "10px", letterSpacing: "0.32em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 300,
            }}>
              By Appointment Only · Dubai
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300, lineHeight: 1.1,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              margin: 0,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ display: "block", color: "#fff", fontWeight: 300 }}>
              The Power of Architectural
            </span>
            <span style={{
              display: "block", fontStyle: "italic", fontWeight: 300,
              color: "#A8885A", fontSize: "clamp(3rem, 8vw, 6rem)",
            }}>
              Visualization
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              color: "rgba(255,255,255,0.7)", fontWeight: 300,
              letterSpacing: "0.05em", marginTop: "1.5rem",
              maxWidth: "36rem", fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Bringing visionary developments to life before construction begins
          </motion.p>

          {/* Hairline divider */}
          <motion.div
            style={{ marginTop: "1.5rem", height: "1px", width: "64px", backgroundColor: "#A8885A" }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* CTA */}
          <motion.div
            style={{ marginTop: "3rem" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#work"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                fontFamily: "var(--font-dm), sans-serif",
                color: "#fff", fontWeight: 300, letterSpacing: "0.12em",
                fontSize: "0.875rem", padding: "1rem 2.5rem",
                backgroundColor: "#A8885A", textDecoration: "none",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#8C6E42"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#A8885A"; }}
            >
              See our work
              <span style={{ fontSize: "1.125rem", fontWeight: 300 }}>&#8250;</span>
            </a>
          </motion.div>

          {/* Slide dots */}
          <motion.div
            style={{
              position: "absolute", bottom: "2.5rem",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: i === index ? "24px" : "6px",
                  height: "6px", borderRadius: "9999px", border: "none",
                  cursor: "pointer", padding: 0,
                  backgroundColor: i === index ? "#A8885A" : "rgba(255,255,255,0.3)",
                  transition: "all 0.5s ease",
                }}
              />
            ))}
          </motion.div>

        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}