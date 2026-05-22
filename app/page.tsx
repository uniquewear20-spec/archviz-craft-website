"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STATS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "14",   label: "Countries" },
  { value: "9",    label: "Years of Practice" },
  { value: "40+",  label: "Awards & Recognition" },
];

const TESTIMONIALS = [
  {
    quote: "The lighting studies they produced were more considered than anything we had seen from a visualisation studio. Material gradients, shadow depth, the quality of reflected light off stone — technically, the work is exceptional.",
    name: "Priya Mehta",
    role: "Design Principal",
    company: "Foster + Partners, London",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "We pre-sold 14 units from renders alone. The spatial atmosphere they created communicated something photography of completed projects rarely achieves. Investors weren't looking at images — they were already inside the building.",
    name: "Khalid Al Mansoori",
    role: "Managing Director",
    company: "Mansoori Capital Developments, Dubai",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "They understand how a room feels, not just how it looks. The light quality in our master suite visualisation was indistinguishable from a completed space. The hospitality intelligence here is genuinely rare.",
    name: "Isabelle Fournier",
    role: "Founder",
    company: "Atelier Fournier, Paris",
    img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&crop=face",
  },
];

const SERVICES = [
  { n: "01", title: "Architectural Visualisation", desc: "Still renders of unbuilt architecture. Every frame a considered composition of light, material, and space." },
  { n: "02", title: "Interior Rendering",           desc: "Spatial storytelling for interior concepts. We render atmosphere, not just furniture." },
  { n: "03", title: "Walkthrough Animation",        desc: "Cinematic fly-throughs and walkthrough films that immerse clients in the unbuilt project." },
  { n: "04", title: "360° Panoramic Views",         desc: "Immersive spherical renders for VR headsets, web viewers, and real estate presentations." },
  { n: "05", title: "Concept Design",               desc: "Early-stage design exploration. We help architects visualise possibilities before CAD is finalised." },
  { n: "06", title: "Brand Imagery",                desc: "Hero images for marketing suites, brochures, hoardings, and luxury real estate campaigns." },
];

const BEDROOM_SLIDES = [
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg", title: "Master Suite · Neutral Palette",     desc: "Warm oak tones, cove lighting, and floor-to-ceiling curtains. Rendered at golden hour." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom2.jpg", title: "Guest Suite · Minimal Luxury",       desc: "Clean lines, pendant lighting, and layered textiles. Focus on material contrast." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg", title: "Primary Bedroom · Classical Detail",  desc: "Boiserie panelling, botanical pendant lights, and a wave-form headboard in stone linen." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom4.jpg", title: "Study Retreat · Monochrome Interior", desc: "Built-in shelving, herringbone floor, and soft northern light through sheer curtains." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg", title: "Grand Bedroom · Serene Atmosphere",   desc: "Sculptural headboard, dual pendant drops, and silk bedding rendered in full depth." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom6.jpg", title: "Corridor Suite · Deep Perspective",   desc: "Long-axis composition revealing layered spaces — study, dressing, and sleeping zone." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom7.jpg", title: "Bedside Detail · Soft Focus",         desc: "Tulip pendants, dark oak nightstand, and marble slab top. Rendered at dusk." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom8.jpg", title: "Morning Light Suite · Open Plan",     desc: "Sheer curtains diffusing daylight, ring chandelier, and a floating bed platform." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom9.jpg", title: "Evening Suite · Warm Render",         desc: "Leather headboard, cylinder pendant, and ambient wall light — cinematic shadow play." },
];

// ── Utility ────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function GoldLine({ width = "48px", delay = 0 }: { width?: string; delay?: number }) {
  return (
    <motion.div
      style={{ height: "1px", width, backgroundColor: "var(--gold)", opacity: 0.55 }}
      initial={{ scaleX: 0, transformOrigin: "left" }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}

function CountUp({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    const suffix = target.match(/[^0-9.]+$/)?.[0] ?? "";
    const dur = 1600; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(ease * num)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target]);

  return <span ref={ref}>{display}</span>;
}

// ── Theme Toggle — completely isolated fixed element ───────────────────────
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("archviz-theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);
    applyTheme(dark);

    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function applyTheme(dark: boolean) {
    const root = document.documentElement;
    root.classList.toggle("light-mode", !dark);
    root.classList.toggle("dark-mode", dark);
    localStorage.setItem("archviz-theme", dark ? "dark" : "light");
  }

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
  }

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 50,
        padding: "1.6rem clamp(2.5rem, 5vw, 5rem) 0",
        opacity: atTop ? 1 : 0,
        pointerEvents: atTop ? "auto" : "none",
        transition: "opacity 0.4s",
      }}
    >
      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "4px 0",
          color: "rgba(255,255,255,0.4)",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#A8885A"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
      >
        {/* Track */}
        <div style={{
          position: "relative",
          width: "30px",
          height: "16px",
          borderRadius: "8px",
          border: `1px solid ${isDark ? "#2A2520" : "#C4A882"}`,
          backgroundColor: isDark ? "#0E0C0A" : "#F0EBE3",
          transition: "background-color 0.4s ease, border-color 0.4s ease",
          flexShrink: 0,
        }}>
          <div style={{
            position: "absolute",
            top: "2px",
            left: isDark ? "16px" : "2px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#A8885A",
            transition: "left 0.35s cubic-bezier(0.4,2,0.3,1)",
          }} />
        </div>
        {/* Icon */}
        <span style={{ fontSize: "11px", lineHeight: 1 }}>
          {isDark ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2"  x2="12" y2="5"  />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
              <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="2"  y1="12" x2="5"  y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
              <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}

// ── Bedroom Circular ───────────────────────────────────────────────────────
interface BedroomSlide { src: string; title: string; desc: string; }

function BedroomCircular({ slides, activeSlide, setActiveSlide }: {
  slides: BedroomSlide[];
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    function measure() { if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth); }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const n = slides.length;

  function getImgStyle(i: number): React.CSSProperties {
    const gap = Math.min(72, containerWidth * 0.12);
    const stickUp = gap * 0.8;
    const isActive = i === activeSlide;
    const isLeft   = i === (activeSlide - 1 + n) % n;
    const isRight  = i === (activeSlide + 1) % n;
    if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    if (isLeft)   return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    if (isRight)  return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  function prev() { setActiveSlide(p => (p - 1 + n) % n); }
  function next() { setActiveSlide(p => (p + 1) % n); }
  const current = slides[activeSlide];

  return (
    <div style={{ width: "100%", paddingBottom: "3rem" }}>
      <div className="bedroom-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem,5vw,5rem)",
        padding: "0 clamp(2rem,6vw,6rem) 3rem",
        alignItems: "center",
      }}>
        {/* Image stack */}
        <div ref={containerRef} style={{ position: "relative", width: "100%", height: "clamp(300px,38vw,500px)", perspective: "1000px" }}>
          {slides.map((slide, i) => (
            <img key={slide.src} src={slide.src} alt={slide.title} style={{
              position: "absolute", width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px",
              boxShadow: i === activeSlide ? "0 24px 60px rgba(0,0,0,0.65)" : "0 8px 28px rgba(0,0,0,0.4)",
              ...getImgStyle(i),
            }} />
          ))}
        </div>

        {/* Caption */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
          <p className="font-sans font-light" style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.22em" }}>
            {String(activeSlide + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div key={activeSlide} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: EASE }}>
              <h3 className="font-serif font-light" style={{ fontSize: "clamp(1.3rem,2.2vw,2rem)", color: "var(--text-loud)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                {current.title}
              </h3>
              <div style={{ width: "36px", height: "1px", backgroundColor: "var(--gold)", opacity: 0.6, marginBottom: "1.25rem" }} />
              <p className="font-sans font-light" style={{ lineHeight: 1.85, color: "var(--text-mid)", fontSize: "clamp(0.82rem,1.2vw,0.95rem)" }}>
                {current.desc.split(" ").map((word, wi) => (
                  <motion.span key={wi} initial={{ filter: "blur(8px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut", delay: 0.02 * wi }} style={{ display: "inline-block", marginRight: "0.25em" }}>
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            {[prev, next].map((fn, i) => (
              <button key={i} onClick={fn} aria-label={i === 0 ? "Previous" : "Next"} style={{
                width: "44px", height: "44px", borderRadius: "50%", border: "none",
                backgroundColor: "var(--gold)", color: "var(--bg)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "1rem", flexShrink: 0, transition: "background-color 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold-light)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--gold)"; }}
              >
                {i === 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        padding: "1.2rem clamp(2rem,6vw,6rem)",
        borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1rem", flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {slides.map((slide, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} title={slide.title} style={{
              width: "clamp(52px,7.5vw,80px)", aspectRatio: "3/2", padding: 0,
              border: i === activeSlide ? "1.5px solid var(--gold)" : "1.5px solid transparent",
              opacity: i === activeSlide ? 1 : 0.28, cursor: "pointer", background: "none",
              overflow: "hidden", transition: "all 0.35s ease", flexShrink: 0,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = i === activeSlide ? "1" : "0.28"; }}
            >
              <img src={slide.src} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
        <a href="/work" className="font-sans font-light uppercase" style={{
          fontSize: "0.55rem", color: "var(--gold)", letterSpacing: "0.3em",
          textDecoration: "none", whiteSpace: "nowrap",
          borderBottom: "1px solid var(--gold)", paddingBottom: "2px", transition: "opacity 0.3s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          View Full Portfolio →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) { .bedroom-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(p => (p + 1) % BEDROOM_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-loud)", fontFamily: "var(--font-cormorant), serif" }}>

      {/* Grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.032]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      {/* ── NAV — untouched original ── */}
      <Nav scrolled={false} />

      {/* ── THEME TOGGLE — completely isolated, no relation to Nav ── */}
      <ThemeToggle />

      {/* ── HERO — Hero component handles its own bg/images, untouched ── */}
      <Hero />

      {/* ── METRICS STRIP ──────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="metrics-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex flex-col items-start" style={{
                padding: "3.5rem clamp(1.5rem,4vw,3rem)",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}>
                <p className="font-serif font-extralight leading-none mb-3" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "var(--text-loud)" }}>
                  <CountUp target={s.value} />
                </p>
                <p className="font-sans font-light uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.28em", color: "var(--text-soft)" }}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(8rem,12vw,13rem)", paddingBottom: "clamp(8rem,12vw,13rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="max-w-5xl mx-auto text-center">
          <p className="font-sans font-light uppercase mb-10" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>
            Studio Manifesto
          </p>
          <blockquote className="font-serif font-extralight italic leading-[1.3]" style={{ fontSize: "clamp(1.7rem,3.5vw,3.2rem)", color: "var(--text-loud)" }}>
            We render architecture through the lens of hospitality —<br />
            understanding how spaces are inhabited, not just how they appear.
          </blockquote>
          <div className="flex justify-center mt-14">
            <GoldLine width="40px" delay={0.4} />
          </div>
        </Reveal>
      </section>

      {/* ── BEDROOM SHOWCASE ───────────────────────────────────────────── */}
      <section id="bedrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-8 md:px-16 lg:px-24 pt-20 pb-16" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <p className="font-sans font-light uppercase mb-5" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>
              01 · Selected Work — Private Sanctuaries
            </p>
            <h2 className="font-serif font-extralight italic" style={{ fontSize: "clamp(2rem,4.5vw,4.5rem)", color: "var(--text-loud)", maxWidth: "780px", lineHeight: 1.05 }}>
              The private suite,<br />before the walls exist.
            </h2>
          </Reveal>
          <div className="mt-10">
            <GoldLine width="clamp(80px,12vw,140px)" delay={0.3} />
          </div>
        </div>
        <BedroomCircular slides={BEDROOM_SLIDES} activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>What We Do</p>
            <h2 className="font-serif font-extralight italic" style={{ fontSize: "clamp(2rem,4vw,4.2rem)", color: "var(--text-loud)" }}>Services</h2>
          </div>
          <p className="font-sans font-light leading-relaxed" style={{ fontSize: "0.85rem", color: "var(--text-soft)", maxWidth: "280px", lineHeight: 1.9 }}>
            Full-spectrum visualisation for architecture and real estate. Every deliverable a considered composition.
          </p>
        </Reveal>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.n} delay={i * 0.05}>
              <div className="group py-9 md:py-11 grid md:grid-cols-12 gap-4 md:gap-0 cursor-default" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="md:col-span-1 font-sans font-light pt-1" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--border-mid)" }}>{svc.n}</span>
                <h3 className="md:col-span-5 font-serif font-light transition-colors duration-500" style={{ fontSize: "clamp(1.1rem,2vw,1.65rem)", color: "var(--text-mid)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--text-loud)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--text-mid)"; }}>
                  {svc.title}
                </h3>
                <p className="md:col-span-5 font-sans font-light leading-relaxed" style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.85 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLParagraphElement).style.color = "var(--text-mid)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLParagraphElement).style.color = "var(--text-muted)"; }}>
                  {svc.desc}
                </p>
                <div className="md:col-span-1 flex justify-end items-start">
                  <span className="font-sans text-sm transition-all duration-500 inline-block group-hover:translate-x-1" style={{ color: "var(--text-muted)" }}>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-0">
          <div className="md:col-span-7 md:pr-20">
            <Reveal>
              <p className="font-sans font-light uppercase mb-8" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>The Studio</p>
              <h2 className="font-serif font-extralight leading-[1.1]" style={{ fontSize: "clamp(1.8rem,4vw,4rem)", color: "var(--text-loud)" }}>
                Architecture Rendered with{" "}
                <em className="italic" style={{ color: "var(--text-mid)" }}>Hospitality Intelligence.</em>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:pt-14">
            <Reveal delay={0.15}>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "2rem" }}>
                <p className="font-sans font-light leading-relaxed mb-6" style={{ fontSize: "0.9rem", color: "var(--text-soft)", lineHeight: 1.9 }}>
                  ArchViz Craft is a luxury architectural visualisation studio serving architects, developers, and interior designers across the Gulf and beyond. We bring 9 years of regional expertise and a hospitality-trained eye to every project.
                </p>
                <p className="font-sans font-light leading-relaxed mb-10" style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                  Every image is a deliberate composition. Visualisation is not documentation. It is persuasion.
                </p>
                <a href="/studio" className="inline-flex items-center gap-3 font-sans font-light uppercase transition-opacity duration-300 hover:opacity-50" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.38em", textDecoration: "none" }}>
                  <span style={{ borderBottom: "1px solid var(--gold)", paddingBottom: "2px" }}>Meet the Studio</span>
                  <span style={{ display: "inline-block", width: "22px", height: "1px", backgroundColor: "var(--gold)" }} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="mb-20">
          <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>The Record</p>
          <h2 className="font-serif font-extralight" style={{ fontSize: "clamp(2rem,4vw,4rem)", color: "var(--text-loud)" }}>
            Results that speak<br />
            <em className="italic" style={{ color: "var(--text-mid)" }}>before we do.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="flex flex-col h-full p-10 md:p-12" style={{ background: "var(--bg)" }}>
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="10" height="10" viewBox="0 0 14 14" fill="var(--gold)" opacity="0.55">
                      <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif italic font-light flex-1 mb-10" style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)", color: "var(--text-mid)", lineHeight: 1.7 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }} className="flex items-center gap-4">
                  <div className="rounded-full overflow-hidden shrink-0" style={{ width: "38px", height: "38px", border: "1px solid rgba(168,136,90,0.15)" }}>
                    <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(60%)" }} />
                  </div>
                  <div>
                    <p className="font-sans font-light" style={{ fontSize: "0.72rem", color: "var(--text-loud)", letterSpacing: "0.05em" }}>{t.name}</p>
                    <p className="font-sans font-light" style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────── */}
      <section id="contact" className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="mb-20">
          <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>Get In Touch</p>
          <h2 className="font-serif font-extralight" style={{ fontSize: "clamp(2rem,5vw,5rem)", color: "var(--text-loud)" }}>
            Begin a project<br />
            <em className="italic" style={{ color: "var(--text-mid)" }}>with us.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-16 md:gap-0">
          <div className="md:col-span-4 md:pr-12 space-y-14">
            <Reveal>
              <div>
                <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--text-muted)" }}>WhatsApp</p>
                <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer" className="font-serif transition-colors duration-500 block" style={{ fontSize: "1.2rem", color: "var(--text-mid)", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-loud)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}>
                  +971 50 000 0000
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--text-muted)" }}>Email</p>
                <a href="mailto:studio@archvizcraft.com" className="font-serif transition-colors duration-500 block" style={{ fontSize: "1.2rem", color: "var(--text-mid)", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-loud)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}>
                  studio@archvizcraft.com
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--text-muted)" }}>Location</p>
                <p className="font-serif" style={{ fontSize: "1.2rem", color: "var(--text-mid)" }}>By Appointment · Dubai</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-8">
            <div className="md:pl-16" style={{ borderLeft: "1px solid var(--border)" }}>
              {contactSubmitted ? (
                <div className="py-20">
                  <h3 className="font-serif font-extralight italic" style={{ fontSize: "2rem", color: "var(--text-loud)" }}>
                    Thank you. We&rsquo;ll be in touch shortly.
                  </h3>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-8">
                  {(["name", "email"] as const).map(field => (
                    <input key={field} type={field === "email" ? "email" : "text"} required
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      style={{
                        width: "100%", background: "transparent",
                        borderBottom: "1px solid var(--border)", padding: "0.75rem 0",
                        fontSize: "0.9rem", color: "var(--text-loud)", outline: "none",
                        fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                      }}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--border-mid)"; }}
                      onBlur={e =>  { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--border)"; }}
                    />
                  ))}
                  <textarea rows={5} required placeholder="Tell us about your project"
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{
                      width: "100%", background: "transparent",
                      borderBottom: "1px solid var(--border)", padding: "0.75rem 0",
                      fontSize: "0.9rem", color: "var(--text-loud)", outline: "none", resize: "none",
                      fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                    }}
                    onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border-mid)"; }}
                    onBlur={e =>  { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border)"; }}
                  />
                  <button type="submit" className="font-sans font-light uppercase tracking-widest transition-all duration-500"
                    style={{ fontSize: "0.6rem", color: "var(--text-mid)", border: "1px solid var(--border)", padding: "1rem 2.5rem", background: "transparent", cursor: "pointer", letterSpacing: "0.3em" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "var(--text-loud)"; el.style.borderColor = "var(--border-mid)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "var(--text-mid)";  el.style.borderColor = "var(--border)"; }}
                  >
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 lg:px-24 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-6">
          {[
            { label: "View Portfolio", href: "/work" },
            { label: "The Studio",     href: "/studio" },
            { label: "Contact",        href: "/#contact" },
          ].map((link, i) => (
            <span key={link.label} className="flex items-center gap-6">
              {i > 0 && <span style={{ color: "var(--border)", fontSize: "8px" }}>·</span>}
              <a href={link.href} className="font-sans font-light uppercase transition-colors duration-300"
                style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.28em", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
        <p className="font-sans font-light" style={{ fontSize: "0.55rem", color: "var(--border)", letterSpacing: "0.14em" }}>
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}