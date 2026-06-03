"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

// ══════════════════════════════════════════════════════════════════════════
// EDITORIAL SPREAD — a category presented like an oversized architecture book.
//
// • Opens with a full-bleed cinematic statement render + huge category title.
// • Each subsequent render enters as its own near-full-screen "page": a slow
//   parallax rise, a long crossfade, an editorial caption that drifts in.
// • No slider chrome, no thumbnails — image, space, scroll, reveal.
// • A curated set of hero pages; the rest live behind "View the full series".
// • Click any render → full-screen Lightbox for inspection.
// • prefers-reduced-motion → static, no parallax.
//
// Drop-in: replaces <EditorialGallery> for a section. Same slides data shape.
// ══════════════════════════════════════════════════════════════════════════

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SOFT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface SpreadSlide { src: string; title: string; desc: string; }

export default function EditorialSpread({
  slides,
  index,        // section number, e.g. "01"
  kicker,       // small label, e.g. "Selected Work · Private Sanctuaries"
  title,        // big title, e.g. "Bedrooms"
  statement,    // one editorial line under the title
  heroCount = 7 // how many full pages to show before "view full series"
}: {
  slides: SpreadSlide[];
  index: string;
  kicker: string;
  title: string;
  statement: string;
  heroCount?: number;
}) {
  const pages = slides.slice(0, Math.min(heroCount, slides.length));
  const opener = pages[0];
  const rest = pages.slice(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section style={{ position: "relative", backgroundColor: "var(--bg)" }}>
      {/* ── OPENING SPREAD — full-bleed statement render + title overlay ── */}
      <OpeningPage
        slide={opener}
        index={index}
        kicker={kicker}
        title={title}
        statement={statement}
        onOpen={() => setLightbox(0)}
      />

      {/* ── INTERIOR PAGES — each render as its own near-full-screen page ── */}
      {rest.map((s, i) => (
        <SpreadPage
          key={i}
          slide={s}
          pageNo={i + 2}
          total={pages.length}
          align={i % 2 === 0 ? "left" : "right"}
          onOpen={() => setLightbox(i + 1)}
        />
      ))}

      {/* ── CLOSING — quiet "full series" invitation ── */}
      <div style={{ textAlign: "center", padding: "clamp(4rem,8vw,8rem) clamp(2rem,7vw,8rem)" }}>
        <a href="/work"
          style={{ display: "inline-flex", alignItems: "center", gap: "1rem", fontFamily: "var(--font-dm),sans-serif", fontSize: "0.66rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-loud)", textDecoration: "none", border: "1px solid var(--border)", padding: "1.05rem 2.9rem", transition: "all 0.4s ease", fontWeight: 400 }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "#A8885A"; el.style.borderColor = "#A8885A"; el.style.color = "var(--bg)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-loud)"; }}>
          View the full {title} series <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "currentColor" }} />
        </a>
      </div>

      <SpreadLightbox
        slides={pages}
        openIndex={lightbox}
        setOpenIndex={setLightbox}
      />
    </section>
  );
}

// ── Opening page: full-bleed render, slow zoom, title set large over it ──────
function OpeningPage({ slide, index, kicker, title, statement, onOpen }: {
  slide: SpreadSlide; index: string; kicker: string; title: string; statement: string; onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} style={{ position: "relative", height: "100vh", minHeight: "640px", overflow: "hidden", backgroundColor: "var(--bg)" }}>
      <motion.div style={{ position: "absolute", inset: "-6%", y, scale: imgScale, willChange: "transform" }}>
        <motion.img
          src={slide.src} alt={slide.title}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.0, ease: EASE }}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </motion.div>

      {/* Cinematic darkening so type reads */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,19,12,0.5) 0%, rgba(26,19,12,0.25) 40%, rgba(26,19,12,0.8) 100%)" }} />

      {/* Title block */}
      <motion.div
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(3rem,7vw,7rem) clamp(2rem,7vw,8rem)", opacity: overlayOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.6rem" }}>
            <span style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(1.4rem,2vw,2rem)", fontWeight: 200, color: "rgba(168,136,90,0.85)", lineHeight: 1 }}>{index}</span>
            <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(168,136,90,0.6)" }} />
            <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.66rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(236,227,213,0.6)", fontWeight: 300 }}>{kicker}</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, fontSize: "clamp(3.5rem,9vw,8rem)", color: "#F3ECE0", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>
          <p style={{ fontFamily: "var(--font-cormorant),serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem,2.2vw,2rem)", color: "rgba(168,136,90,0.9)", lineHeight: 1.3, marginTop: "1rem", maxWidth: "30ch" }}>{statement}</p>
        </motion.div>
      </motion.div>

      {/* Expand affordance */}
      <button onClick={onOpen} aria-label={`Open ${slide.title} full screen`}
        style={{ position: "absolute", top: "clamp(2rem,4vw,3rem)", right: "clamp(2rem,4vw,3rem)", display: "flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: "none", cursor: "pointer", opacity: 0.75 }}>
        <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(236,227,213,0.8)", fontWeight: 400 }}>Expand</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(236,227,213,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
      </button>
    </div>
  );
}

// ── Interior page: render + drifting caption, alternating composition ────────
function SpreadPage({ slide, pageNo, total, align, onOpen }: {
  slide: SpreadSlide; pageNo: number; total: number; align: "left" | "right"; onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);
  const capY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "-40%"]);

  return (
    <div ref={ref} style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", padding: "clamp(4rem,8vw,9rem) clamp(2rem,7vw,8rem)", backgroundColor: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", display: "flex", flexDirection: align === "right" ? "row-reverse" : "row", alignItems: "center", gap: "clamp(2rem,5vw,6rem)", flexWrap: "wrap" }} className="spread-row">
        {/* Image */}
        <button onClick={onOpen} aria-label={`Open ${slide.title} full screen`}
          className="spread-img-btn"
          style={{ flex: "1 1 600px", position: "relative", border: "none", padding: 0, background: "var(--bg-subtle)", cursor: "zoom-in", overflow: "hidden", aspectRatio: "4 / 3", minWidth: 0 }}>
          <motion.div style={{ position: "absolute", inset: "-8%", y: imgY, willChange: "transform" }}>
            <motion.img
              src={slide.src} alt={slide.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.6, ease: EASE }}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </motion.div>
          <div aria-hidden style={{ position: "absolute", inset: 0, border: "1px solid rgba(168,136,90,0.12)", pointerEvents: "none" }} />
        </button>

        {/* Caption */}
        <motion.div style={{ flex: "1 1 320px", y: capY, minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.4rem" }}>
              <span style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.5rem", fontWeight: 200, color: "var(--text-loud)" }}>{String(pageNo).padStart(2, "0")}</span>
              <div style={{ width: "26px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
              <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--text-muted)", fontWeight: 300 }}>{String(total).padStart(2, "0")}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "var(--text-loud)", lineHeight: 1.12, letterSpacing: "-0.01em", marginBottom: "1.3rem" }}>{slide.title}</h3>
            <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.92rem,1.15vw,1.02rem)", color: "var(--text-soft)", lineHeight: 1.9, maxWidth: "42ch" }}>{slide.desc}</p>
          </motion.div>
        </motion.div>
      </div>

      <style>{`@media(max-width:860px){.spread-row{flex-direction:column!important}.spread-img-btn{flex:1 1 100%!important;width:100%;aspect-ratio:4/3}}`}</style>
    </div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function SpreadLightbox({ slides, openIndex, setOpenIndex }: {
  slides: SpreadSlide[]; openIndex: number | null; setOpenIndex: (i: number | null) => void;
}) {
  const open = openIndex !== null;
  const n = slides.length;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowRight") setOpenIndex(((openIndex ?? 0) + 1) % n);
      else if (e.key === "ArrowLeft") setOpenIndex(((openIndex ?? 0) - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, openIndex, n, setOpenIndex]);

  if (typeof document === "undefined") return null;
  const current = open ? slides[openIndex as number] : null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE_SOFT }}
          onClick={() => setOpenIndex(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, backgroundColor: "rgba(20,15,10,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(1.5rem,5vw,4rem)" }}>
          <button onClick={(e) => { e.stopPropagation(); setOpenIndex(null); }} aria-label="Close" style={{ position: "absolute", top: "clamp(1.2rem,3vw,2.2rem)", right: "clamp(1.2rem,3vw,2.2rem)", width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(168,136,90,0.45)", background: "transparent", color: "var(--text-loud)", cursor: "pointer", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
            <AnimatePresence mode="wait">
              <motion.img key={openIndex} src={current.src} alt={current.title}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: EASE_SOFT }}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }} />
            </AnimatePresence>
            <button onClick={(e) => { e.stopPropagation(); setOpenIndex(((openIndex ?? 0) - 1 + n) % n); }} aria-label="Previous" style={lbArrow("left")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setOpenIndex(((openIndex ?? 0) + 1) % n); }} aria-label="Next" style={lbArrow("right")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
          <div onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0, textAlign: "center", maxWidth: "640px", marginTop: "clamp(1.2rem,2.5vw,2rem)" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, fontSize: "clamp(1.3rem,2vw,1.9rem)", color: "var(--text-loud)", lineHeight: 1.2, marginBottom: "0.7rem" }}>{current.title}</h3>
            <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.82rem,1vw,0.92rem)", color: "rgba(236,227,213,0.62)", lineHeight: 1.75 }}>{current.desc}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function lbArrow(side: "left" | "right"): React.CSSProperties {
  return { position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: "clamp(0.5rem,2vw,1.5rem)", width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(168,136,90,0.45)", background: "transparent", color: "var(--text-loud)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties;
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