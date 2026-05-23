"use client";

// ══════════════════════════════════════════════════════════════════════════
// CIRCULAR TESTIMONIALS — adapted for ArchViz Craft
// 3D-stacked image fan + word-blur quote reveal.
// Rewired from hardcoded colors to CSS variables, Cormorant + DM Sans,
// gold #A8885A accents, and full light/dark support.
// Drop in: app/components/CircularTestimonials.tsx
// ══════════════════════════════════════════════════════════════════════════

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface CircularTestimonial {
  quote: string;
  name: string;
  designation: string; // "Role · Company"
  src: string;
}

interface Props {
  testimonials: CircularTestimonial[];
  autoplay?: boolean;
  /** Visual label above the carousel, e.g. "Client Record" */
  eyebrow?: string;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 56;
  const maxGap = 80;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export default function CircularTestimonials({
  testimonials,
  autoplay = true,
  eyebrow = "Client Record",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [paused, setPaused] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const len = useMemo(() => testimonials.length, [testimonials]);
  const active = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  // Responsive gap
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay (pauses on hover)
  useEffect(() => {
    if (autoplay && !paused) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((p) => (p + 1) % len);
      }, 5800);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, paused, len]);

  const next = useCallback(() => {
    setActiveIndex((p) => (p + 1) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  const prev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + len) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  function imageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const stick = gap * 0.7;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + len) % len === index;
    const isRight = (activeIndex + 1) % len === index;
    const base: React.CSSProperties = {
      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s cubic-bezier(0.16,1,0.3,1)",
    };
    if (isActive)
      return { ...base, zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)" };
    if (isLeft)
      return { ...base, zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${stick}px) scale(0.84) rotateY(14deg)` };
    if (isRight)
      return { ...base, zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${stick}px) scale(0.84) rotateY(-14deg)` };
    return { ...base, zIndex: 1, opacity: 0, pointerEvents: "none", transform: "scale(0.78)" };
  }

  return (
    <div
      className="ct-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {eyebrow && (
        <div className="ct-eyebrow">
          <div className="ct-eyebrow-rule" />
          <span>{eyebrow}</span>
        </div>
      )}

      <div className="ct-grid">
        {/* ── Image fan ── */}
        <div className="ct-images" ref={imageContainerRef}>
          {testimonials.map((t, i) => (
            <img
              key={t.src + i}
              src={t.src}
              alt={t.name}
              className="ct-image"
              draggable={false}
              style={imageStyle(i)}
            />
          ))}
        </div>

        {/* ── Content ── */}
        <div className="ct-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {/* Stars */}
              <div className="ct-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="9" height="9" viewBox="0 0 14 14" fill="#A8885A" opacity="0.55">
                    <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
                  </svg>
                ))}
              </div>

              <blockquote className="ct-quote">
                &ldquo;
                {active.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${activeIndex}-${i}`}
                    initial={{ filter: "blur(7px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut", delay: 0.018 * i }}
                    style={{ display: "inline-block", marginRight: "0.28em" }}
                  >
                    {word}
                  </motion.span>
                ))}
                &rdquo;
              </blockquote>

              <div className="ct-rule" />

              <div className="ct-author">
                <p className="ct-name">{active.name}</p>
                <p className="ct-desig">{active.designation}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="ct-nav">
            <button
              className="ct-arrow"
              onClick={prev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              style={{
                backgroundColor: hoverPrev ? "#A8885A" : "transparent",
                borderColor: hoverPrev ? "#A8885A" : "var(--border)",
                color: hoverPrev ? "var(--bg)" : "var(--text-mid)",
              }}
            >
              ←
            </button>
            <button
              className="ct-arrow"
              onClick={next}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              style={{
                backgroundColor: hoverNext ? "#A8885A" : "transparent",
                borderColor: hoverNext ? "#A8885A" : "var(--border)",
                color: hoverNext ? "var(--bg)" : "var(--text-mid)",
              }}
            >
              →
            </button>

            <div className="ct-counter">
              <span className="ct-counter-active">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="ct-counter-sep">/</span>
              <span className="ct-counter-total">{String(len).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ct-root {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }
        .ct-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
        }
        .ct-eyebrow-rule {
          width: 28px; height: 1px;
          background-color: #A8885A; opacity: 0.6;
        }
        .ct-eyebrow span {
          font-family: var(--font-dm), sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #A8885A;
          font-weight: 400;
        }
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 7rem);
          align-items: center;
        }
        .ct-images {
          position: relative;
          width: 100%;
          height: clamp(300px, 34vw, 420px);
          perspective: 1100px;
        }
        .ct-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
          filter: grayscale(28%);
          box-shadow: 0 24px 60px -18px rgba(0,0,0,0.55);
          user-select: none;
        }
        .ct-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: clamp(300px, 34vw, 420px);
        }
        .ct-stars {
          display: flex;
          gap: 0.28rem;
          margin-bottom: 1.5rem;
        }
        .ct-quote {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.25rem, 2vw, 1.75rem);
          color: var(--text-loud);
          line-height: 1.5;
          letter-spacing: -0.005em;
          margin: 0 0 1.8rem 0;
        }
        .ct-rule {
          width: 28px; height: 1px;
          background-color: #A8885A; opacity: 0.5;
          margin-bottom: 1.4rem;
        }
        .ct-name {
          font-family: var(--font-cormorant), serif;
          font-weight: 400;
          font-size: clamp(1.15rem, 1.6vw, 1.5rem);
          color: var(--text-loud);
          letter-spacing: 0.01em;
          line-height: 1.2;
        }
        .ct-desig {
          font-family: var(--font-dm), sans-serif;
          font-weight: 400;
          font-size: clamp(0.72rem, 0.95vw, 0.82rem);
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 0.55rem;
        }
        .ct-nav {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: clamp(2.5rem, 4vw, 3.5rem);
        }
        .ct-arrow {
          width: 46px; height: 46px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease;
          flex-shrink: 0;
        }
        .ct-counter {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          margin-left: 0.6rem;
        }
        .ct-counter-active {
          font-family: var(--font-cormorant), serif;
          font-weight: 300;
          font-size: 1.4rem;
          color: var(--text-loud);
          line-height: 1;
        }
        .ct-counter-sep { color: var(--border-mid); font-size: 0.9rem; }
        .ct-counter-total {
          font-family: var(--font-dm), sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--text-muted);
        }

        /* Light-mode contrast fixes */
        :root.light-mode .ct-quote { color: #1a1410; }
        :root.light-mode .ct-name  { color: #1a1410; }
        :root.light-mode .ct-desig { color: #6a5d4f; }

        @media (max-width: 900px) {
          .ct-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .ct-images { height: clamp(280px, 60vw, 380px); max-width: 460px; margin: 0 auto; }
          .ct-content { min-height: 0; text-align: left; }
        }
      `}</style>
    </div>
  );
}