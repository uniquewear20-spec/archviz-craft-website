"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

// ── Tokens ─────────────────────────────────────────────────────────────────
const GOLD = "#A8885A";
const GOLD_L = "#C4A882";
const INK = "#080808";
const CREAM = "#F0EBE3";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Data ───────────────────────────────────────────────────────────────────
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
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom2.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom4.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom6.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom7.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom8.jpg" },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom9.jpg" },
];

// ── Utility components ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
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
      style={{ height: "1px", width, backgroundColor: GOLD, opacity: 0.55 }}
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
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? "";
    const dur = 1600; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(`${prefix}${Math.round(ease * num)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target]);

  return <span ref={ref}>{display}</span>;
}

// ── BedroomCircular — self-contained, uses plain img tags ─────────────────
interface BedroomCircularProps {
  slides: { src: string }[];
  testimonials: { quote: string; name: string; role: string; company: string; img: string }[];
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  activeTestimonial: number;
  setActiveTestimonial: React.Dispatch<React.SetStateAction<number>>;
}

function BedroomCircular({
  slides, testimonials, activeSlide, setActiveSlide, activeTestimonial, setActiveTestimonial,
}: BedroomCircularProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    function measure() {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const n = slides.length;

  function getImgStyle(i: number): React.CSSProperties {
    const gap = Math.min(80, containerWidth * 0.13);
    const stickUp = gap * 0.8;
    const isActive = i === activeSlide;
    const isLeft  = i === (activeSlide - 1 + n) % n;
    const isRight = i === (activeSlide + 1) % n;
    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto",
      transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  function prev() {
    setActiveSlide(p => (p - 1 + n) % n);
    setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length);
  }
  function next() {
    setActiveSlide(p => (p + 1) % n);
    setActiveTestimonial(p => (p + 1) % testimonials.length);
  }

  const t = testimonials[activeTestimonial];

  return (
    <div style={{ width: "100%", padding: "0 0 2rem 0" }}>

      {/* ── Main grid: image stack LEFT + quote RIGHT ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        padding: "0 clamp(2rem,6vw,6rem)",
        marginBottom: "3rem",
      }}
        className="flex-col-mobile"
      >
        {/* LEFT — image stack with perspective */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(320px,40vw,520px)",
            perspective: "1000px",
          }}
        >
          {slides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={`Bedroom render ${i + 1}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                ...getImgStyle(i),
              }}
            />
          ))}
        </div>

        {/* RIGHT — name, designation, quote, arrows */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "320px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p
                className="font-serif"
                style={{ fontSize: "clamp(1.4rem,2.2vw,2rem)", color: CREAM, fontWeight: 300, marginBottom: "0.25rem" }}
              >
                {t.name}
              </p>
              <p
                className="font-sans font-light uppercase"
                style={{ fontSize: "0.6rem", color: GOLD, letterSpacing: "0.22em", marginBottom: "2rem" }}
              >
                {t.role} · {t.company}
              </p>
              {/* Word-by-word blur reveal exactly like the prompt */}
              <p className="font-serif italic" style={{ lineHeight: 1.8, color: "#6B6560", fontSize: "clamp(0.95rem,1.5vw,1.2rem)" }}>
                {`"${t.quote}"`.split(" ").map((word, wi) => (
                  <motion.span
                    key={wi}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * wi }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrow buttons — styled like the prompt */}
          <div style={{ display: "flex", gap: "1rem", paddingTop: "2.5rem" }}>
            {[prev, next].map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                aria-label={i === 0 ? "Previous" : "Next"}
                style={{
                  width: "46px", height: "46px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: GOLD,
                  color: "#080808",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C4A882"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = GOLD; }}
              >
                {i === 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FULL-BLEED active image ── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(400px,55vw,700px)", overflow: "hidden" }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={activeSlide}
            src={slides[activeSlide].src}
            alt="Featured bedroom"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }}
          />
        </AnimatePresence>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />
        {/* Counter */}
        <span
          className="font-sans font-light"
          style={{
            position: "absolute", bottom: "1.5rem", right: "clamp(2rem,6vw,6rem)",
            fontSize: "0.55rem", color: "#3A342E", letterSpacing: "0.2em",
          }}
        >
          {String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── THUMBNAIL STRIP — all 9 ── */}
      <div style={{
        padding: "1.2rem clamp(2rem,6vw,6rem)",
        borderTop: "1px solid #0E0C0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => { setActiveSlide(i); }}
              style={{
                width: "clamp(56px,8vw,88px)",
                aspectRatio: "3/2",
                padding: 0,
                border: i === activeSlide ? `1px solid ${GOLD}` : "1px solid transparent",
                opacity: i === activeSlide ? 1 : 0.3,
                cursor: "pointer",
                background: "none",
                overflow: "hidden",
                transition: "all 0.4s ease",
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = i === activeSlide ? "1" : "0.3"; }}
            >
              <img
                src={slide.src}
                alt={`Bedroom ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
        <a
          href="/work"
          className="font-sans font-light uppercase"
          style={{
            fontSize: "0.55rem", color: GOLD, letterSpacing: "0.3em",
            textDecoration: "none", whiteSpace: "nowrap",
            borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
            transition: "opacity 0.3s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          View Full Portfolio →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flex-col-mobile { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Auto-advance bedroom slides
  useEffect(() => {
    const t = setInterval(() => setActiveSlide(p => (p + 1) % BEDROOM_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: INK, color: CREAM, fontFamily: "var(--font-cormorant), serif" }}>

      {/* Grain overlay — fixed, subtle */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <Nav scrolled={false} />

      {/* ── HERO — untouched ─────────────────────────────────────────────── */}
      <Hero />

      {/* ── METRICS STRIP ────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #141210", borderBottom: "1px solid #141210" }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className="flex flex-col items-start px-10 py-14"
                style={{ borderRight: i < 3 ? "1px solid #141210" : "none" }}
              >
                <p
                  className="font-serif font-extralight leading-none mb-3"
                  style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", color: CREAM }}
                >
                  <CountUp target={s.value} />
                </p>
                <p
                  className="font-sans font-light uppercase"
                  style={{ fontSize: "0.58rem", letterSpacing: "0.28em", color: "#3A342E" }}
                >
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(8rem,12vw,13rem)",
          paddingBottom: "clamp(8rem,12vw,13rem)",
          borderBottom: "1px solid #141210",
        }}
      >
        <Reveal className="max-w-5xl mx-auto text-center">
          <p className="font-sans font-light uppercase mb-10" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.52em" }}>
            Studio Manifesto
          </p>
          <blockquote
            className="font-serif font-extralight italic leading-[1.3]"
            style={{ fontSize: "clamp(1.7rem,3.5vw,3.2rem)", color: CREAM }}
          >
            We render architecture through the lens of hospitality —<br />
            understanding how spaces are inhabited, not just how they appear.
          </blockquote>
          <div className="flex justify-center mt-14">
            <GoldLine width="40px" delay={0.4} />
          </div>
        </Reveal>
      </section>

      {/* ── BEDROOM SHOWCASE ─────────────────────────────────────────────── */}
      <section id="bedrooms" style={{ borderBottom: "1px solid #141210" }}>

        {/* Section header */}
        <div className="px-8 md:px-16 lg:px-24 pt-20 pb-16">
          <Reveal>
            <p className="font-sans font-light uppercase mb-5" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.52em" }}>
              01 · Selected Work — Private Sanctuaries
            </p>
            <h2
              className="font-serif font-extralight italic"
              style={{ fontSize: "clamp(2rem,4.5vw,4.5rem)", color: CREAM, maxWidth: "780px", lineHeight: 1.05 }}
            >
              The private suite,<br />before the walls exist.
            </h2>
          </Reveal>
          <div className="mt-10">
            <GoldLine width="clamp(80px,12vw,140px)" delay={0.3} />
          </div>
        </div>

        {/* ── CIRCULAR TESTIMONIALS — exact component pattern ── */}
        <BedroomCircular
          slides={BEDROOM_SLIDES}
          testimonials={TESTIMONIALS}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          activeTestimonial={activeTestimonial}
          setActiveTestimonial={setActiveTestimonial}
        />

      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(7rem,11vw,12rem)",
          paddingBottom: "clamp(7rem,11vw,12rem)",
          borderBottom: "1px solid #141210",
        }}
      >
        <Reveal className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.52em" }}>
              What We Do
            </p>
            <h2
              className="font-serif font-extralight italic"
              style={{ fontSize: "clamp(2rem,4vw,4.2rem)", color: CREAM }}
            >
              Services
            </h2>
          </div>
          <p
            className="font-sans font-light leading-relaxed"
            style={{ fontSize: "0.85rem", color: "#3A342E", maxWidth: "280px", lineHeight: 1.9 }}
          >
            Full-spectrum visualisation for architecture and real estate. Every deliverable a considered composition.
          </p>
        </Reveal>

        <div style={{ borderTop: "1px solid #141210" }}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.n} delay={i * 0.05}>
              <div
                className="group py-9 md:py-11 grid md:grid-cols-12 gap-4 md:gap-0 cursor-default"
                style={{ borderBottom: "1px solid #141210" }}
              >
                <span className="md:col-span-1 font-sans font-light pt-1" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#1E1A16" }}>
                  {svc.n}
                </span>
                <h3
                  className="md:col-span-5 font-serif font-light transition-colors duration-500"
                  style={{ fontSize: "clamp(1.1rem,2vw,1.65rem)", color: "#4A4540" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLHeadingElement).style.color = CREAM; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLHeadingElement).style.color = "#4A4540"; }}
                >
                  {svc.title}
                </h3>
                <p
                  className="md:col-span-5 font-sans font-light leading-relaxed transition-colors duration-500"
                  style={{ fontSize: "0.85rem", color: "#1E1A16", lineHeight: 1.85 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLParagraphElement).style.color = "#4A4540"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLParagraphElement).style.color = "#1E1A16"; }}
                >
                  {svc.desc}
                </p>
                <div className="md:col-span-1 flex justify-end items-start">
                  <span
                    className="font-sans text-sm transition-all duration-500 inline-block group-hover:translate-x-1"
                    style={{ color: "#1E1A16" }}
                  >
                    →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(7rem,11vw,12rem)",
          paddingBottom: "clamp(7rem,11vw,12rem)",
          borderBottom: "1px solid #141210",
        }}
      >
        <div className="grid md:grid-cols-12 gap-12 md:gap-0">
          {/* Left */}
          <div className="md:col-span-7 md:pr-20">
            <Reveal>
              <p className="font-sans font-light uppercase mb-8" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.52em" }}>
                The Studio
              </p>
              <h2
                className="font-serif font-extralight leading-[1.1]"
                style={{ fontSize: "clamp(1.8rem,4vw,4rem)", color: CREAM }}
              >
                Architecture Rendered with{" "}
                <em className="italic" style={{ color: "#4A4540" }}>Hospitality Intelligence.</em>
              </h2>
            </Reveal>
          </div>

          {/* Right */}
          <div className="md:col-span-5 md:pt-14">
            <Reveal delay={0.15}>
              <div style={{ borderLeft: "1px solid #141210", paddingLeft: "2rem" }}>
                <p className="font-sans font-light leading-relaxed mb-6" style={{ fontSize: "0.9rem", color: "#3A342E", lineHeight: 1.9 }}>
                  ArchViz Craft is a luxury architectural visualisation studio serving architects, developers, and interior designers across the Gulf and beyond. We bring 9 years of regional expertise and a hospitality-trained eye to every project.
                </p>
                <p className="font-sans font-light leading-relaxed mb-10" style={{ fontSize: "0.9rem", color: "#1E1A16", lineHeight: 1.9 }}>
                  Every image is a deliberate composition. Visualisation is not documentation. It is persuasion.
                </p>
                <a
                  href="/studio"
                  className="inline-flex items-center gap-3 font-sans font-light uppercase transition-opacity duration-300 hover:opacity-50"
                  style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.38em", textDecoration: "none" }}
                >
                  <span style={{ borderBottom: "1px solid #A8885A", paddingBottom: "2px" }}>Meet the Studio</span>
                  <span style={{ display: "inline-block", width: "22px", height: "1px", backgroundColor: GOLD }} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS GRID ────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(7rem,11vw,12rem)",
          paddingBottom: "clamp(7rem,11vw,12rem)",
          borderBottom: "1px solid #141210",
        }}
      >
        <Reveal className="mb-20">
          <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.52em" }}>
            The Record
          </p>
          <h2
            className="font-serif font-extralight"
            style={{ fontSize: "clamp(2rem,4vw,4rem)", color: CREAM }}
          >
            Results that speak<br />
            <em className="italic" style={{ color: "#4A4540" }}>before we do.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "#141210" }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className="flex flex-col h-full p-10 md:p-12"
                style={{ background: INK }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="10" height="10" viewBox="0 0 14 14" fill={GOLD} opacity="0.55">
                      <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="font-serif italic font-light flex-1 mb-10"
                  style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)", color: "#6B6560", lineHeight: 1.7 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop: "1px solid #141210", paddingTop: "1.5rem" }} className="flex items-center gap-4">
                  <div
                    className="rounded-full overflow-hidden shrink-0"
                    style={{ width: "38px", height: "38px", border: `1px solid ${GOLD}25` }}
                  >
                    <img
                      src={t.img}
                      alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(60%)" }}
                    />
                  </div>
                  <div>
                    <p className="font-sans font-light" style={{ fontSize: "0.72rem", color: CREAM, letterSpacing: "0.05em" }}>
                      {t.name}
                    </p>
                    <p className="font-sans font-light" style={{ fontSize: "0.6rem", color: "#2A2520", letterSpacing: "0.08em" }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(7rem,11vw,12rem)",
          paddingBottom: "clamp(7rem,11vw,12rem)",
          borderBottom: "1px solid #141210",
        }}
      >
        <Reveal className="mb-20">
          <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.52em" }}>
            Get In Touch
          </p>
          <h2
            className="font-serif font-extralight"
            style={{ fontSize: "clamp(2rem,5vw,5rem)", color: CREAM }}
          >
            Begin a project<br />
            <em className="italic" style={{ color: "#4A4540" }}>with us.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-16 md:gap-0">
          {/* Left — contact details */}
          <div className="md:col-span-4 md:pr-12 space-y-14">
            <Reveal>
              <div>
                <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "#1E1A16" }}>
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/971500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif transition-colors duration-500 block"
                  style={{ fontSize: "1.2rem", color: "#4A4540", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = CREAM; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A4540"; }}
                >
                  +971 50 000 0000
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "#1E1A16" }}>
                  Email
                </p>
                <a
                  href="mailto:studio@archvizcraft.com"
                  className="font-serif transition-colors duration-500 block"
                  style={{ fontSize: "1.2rem", color: "#4A4540", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = CREAM; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A4540"; }}
                >
                  studio@archvizcraft.com
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "#1E1A16" }}>
                  Location
                </p>
                <p className="font-serif" style={{ fontSize: "1.2rem", color: "#4A4540" }}>
                  By Appointment · Dubai
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1} className="md:col-span-8">
            <div className="md:pl-16" style={{ borderLeft: "1px solid #141210" }}>
            {contactSubmitted ? (
              <div className="py-20">
                <h3 className="font-serif font-extralight italic" style={{ fontSize: "2rem", color: CREAM }}>
                  Thank you. We&rsquo;ll be in touch shortly.
                </h3>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }}
                className="space-y-8"
              >
                {(["name", "email"] as const).map(field => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    required
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "transparent",
                      borderBottom: "1px solid #141210",
                      padding: "0.75rem 0",
                      fontSize: "0.9rem",
                      color: CREAM,
                      outline: "none",
                      fontFamily: "var(--font-dm), sans-serif",
                      fontWeight: 300,
                    }}
                    onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "#2A2520"; }}
                    onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "#141210"; }}
                  />
                ))}
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your project"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{
                    width: "100%",
                    background: "transparent",
                    borderBottom: "1px solid #141210",
                    padding: "0.75rem 0",
                    fontSize: "0.9rem",
                    color: CREAM,
                    outline: "none",
                    resize: "none",
                    fontFamily: "var(--font-dm), sans-serif",
                    fontWeight: 300,
                  }}
                  onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "#2A2520"; }}
                  onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "#141210"; }}
                />
                <button
                  type="submit"
                  className="font-sans font-light uppercase tracking-widest transition-all duration-500"
                  style={{
                    fontSize: "0.6rem",
                    color: "#4A4540",
                    border: "1px solid #141210",
                    padding: "1rem 2.5rem",
                    background: "transparent",
                    cursor: "pointer",
                    letterSpacing: "0.3em",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = CREAM;
                    el.style.borderColor = "#2A2520";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "#4A4540";
                    el.style.borderColor = "#141210";
                  }}
                >
                  Send Enquiry
                </button>
              </form>
            )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-16 lg:px-24 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: "1px solid #141210" }}
      >
        <div className="flex items-center gap-6">
          <a
            href="/work"
            className="font-sans font-light uppercase transition-colors duration-300"
            style={{ fontSize: "0.55rem", color: "#1E1A16", letterSpacing: "0.28em", textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1E1A16"; }}
          >
            View Portfolio
          </a>
          <span style={{ color: "#141210", fontSize: "8px" }}>·</span>
          <a
            href="/studio"
            className="font-sans font-light uppercase transition-colors duration-300"
            style={{ fontSize: "0.55rem", color: "#1E1A16", letterSpacing: "0.28em", textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1E1A16"; }}
          >
            The Studio
          </a>
          <span style={{ color: "#141210", fontSize: "8px" }}>·</span>
          <a
            href="/#contact"
            className="font-sans font-light uppercase transition-colors duration-300"
            style={{ fontSize: "0.55rem", color: "#1E1A16", letterSpacing: "0.28em", textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1E1A16"; }}
          >
            Contact
          </a>
        </div>
        <p className="font-sans font-light" style={{ fontSize: "0.55rem", color: "#141210", letterSpacing: "0.14em" }}>
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>
    </div>
  );
}