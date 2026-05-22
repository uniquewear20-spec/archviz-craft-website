"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "14",   label: "Countries" },
  { value: "9",    label: "Years of Practice" },
  { value: "40+",  label: "Awards & Recognition" },
];

// ── Services ───────────────────────────────────────────────────────────────
const SERVICES = [
  { n: "01", title: "Architectural Visualisation", desc: "Still renders of unbuilt architecture. Every frame a considered composition of light, material, and space." },
  { n: "02", title: "Interior Rendering",           desc: "Spatial storytelling for interior concepts. We render atmosphere, not just furniture." },
  { n: "03", title: "Walkthrough Animation",        desc: "Cinematic fly-throughs and walkthrough films that immerse clients in the unbuilt project." },
  { n: "04", title: "360° Panoramic Views",         desc: "Immersive spherical renders for VR headsets, web viewers, and real estate presentations." },
  { n: "05", title: "Concept Design",               desc: "Early-stage design exploration. We help architects visualise possibilities before CAD is finalised." },
  { n: "06", title: "Brand Imagery",                desc: "Hero images for marketing suites, brochures, hoardings, and luxury real estate campaigns." },
];

// ── Testimonials ───────────────────────────────────────────────────────────
const TESTIMONIALS_BEDROOMS = [
  {
    quote: "The lighting studies they produced were more considered than anything we had seen from a visualisation studio. Material gradients, shadow depth, the quality of reflected light off stone — technically, the work is exceptional.",
    name: "Priya Mehta", role: "Design Principal", company: "Foster + Partners, London",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "We pre-sold 14 units from renders alone. The spatial atmosphere they created communicated something photography of completed projects rarely achieves. Investors weren't looking at images — they were already inside the building.",
    name: "Khalid Al Mansoori", role: "Managing Director", company: "Mansoori Capital Developments, Dubai",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "They understand how a room feels, not just how it looks. The light quality in our master suite visualisation was indistinguishable from a completed space. The hospitality intelligence here is genuinely rare.",
    name: "Isabelle Fournier", role: "Founder", company: "Atelier Fournier, Paris",
    img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&crop=face",
  },
];

const TESTIMONIALS_KITCHENS = [
  {
    quote: "The operational intelligence embedded in their kitchen renders is unlike anything I've encountered. They understood service flow, mise en place zones, the way brigade movement shapes a space. This wasn't a render — it was a functioning concept.",
    name: "Marco Benedetti", role: "Executive Chef & Partner", company: "Benedetti Hospitality Group, Milan",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "When we brought this to our client board, three members asked when the photography was taken. That's not a compliment — it's an architectural argument won before a single tile was laid.",
    name: "Hana Yoshida", role: "Senior Interior Architect", company: "Yabu Pushelberg, Toronto",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "Our client wanted to feel the kitchen before committing to the investment. The light at 07:30, the warmth of the stone against morning sun — they approved the full specification within 48 hours of receiving the renders.",
    name: "Rania Al-Farsi", role: "Project Director", company: "Aldar Properties, Abu Dhabi",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face",
  },
];

const TESTIMONIALS_LIVING = [
  {
    quote: "The salon render captured precisely the quality of light we experience at that latitude — the way afternoon sun diffuses across limestone, the shadow weight of a deep cornice. It reads as a place, not a projection.",
    name: "Thomas Brecker", role: "Principal Architect", company: "Snøhetta, Oslo",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "Our buyers don't purchase square footage — they purchase a way of living. These visualisations communicated the social register of the space with a confidence we hadn't seen outside the finest architectural photography.",
    name: "Celeste Moreau", role: "Head of Luxury Residential", company: "Savills, Paris",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "The circulation logic, the conversation zones, the way the furniture composition guides movement through the space — whoever briefed this team understood hospitality design at its most sophisticated level.",
    name: "Omar Kassem", role: "Chief Design Officer", company: "FIVE Hotels & Resorts, Dubai",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  },
];

// ── Portfolio slides ───────────────────────────────────────────────────────
interface PortfolioSlide { src: string; title: string; desc: string; }

const BEDROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg", title: "Master Suite · Neutral Palette",     desc: "Warm oak tones, cove lighting, and floor-to-ceiling curtains. Rendered at golden hour — the moment a suite transitions from functional to emotional." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom2.jpg", title: "Guest Suite · Mineral Restraint",    desc: "Clean lines, pendant lighting, and layered textiles. The restraint here is deliberate — every absence is considered." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg", title: "Primary Bedroom · Classical Detail", desc: "Boiserie panelling, botanical pendant lights, and a wave-form headboard in stone linen. Architecture as sleeping ritual." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom4.jpg", title: "Study Retreat · Northern Light",     desc: "Built-in shelving, herringbone floor, soft northern diffusion through sheer curtains — the room breathes." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg", title: "Grand Suite · Serene Atmosphere",    desc: "Sculptural headboard, dual pendant drops, and silk bedding rendered in full depth. Stillness made architectural." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom6.jpg", title: "Corridor Suite · Deep Perspective",  desc: "Long-axis composition revealing layered spaces — study, dressing, and sleeping zone — in a single frame." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom7.jpg", title: "Bedside Detail · Dusk Render",       desc: "Tulip pendants, dark oak nightstand, marble slab top. Rendered at dusk — the hour when rooms acquire atmosphere." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom8.jpg", title: "Morning Light Suite · Open Plan",    desc: "Sheer curtains diffusing daylight, ring chandelier, floating bed platform. First light as architecture." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom9.jpg", title: "Evening Suite · Cinematic Shadow",   desc: "Leather headboard, cylinder pendant, ambient wall light — the render studies shadow as a spatial material." },
];

const KITCHEN_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen1.jpg",  title: "Chef's Kitchen · Brigade Composition",  desc: "Designed for choreography. The island proportions reflect service flow — three simultaneous workstations without spatial collision. Professional theatre rendered in stone and steel." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen2.jpg",  title: "Culinary Suite · Dawn Render",          desc: "Rendered at first light, when countertops hold the warmth of the day ahead. Marble veining selected for how it reads at breakfast, not merely at noon." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen3.jpg",  title: "Private Kitchen · Obsidian and Oak",    desc: "The tension between dark lacquered cabinetry and warm oak grain communicates a kitchen that operates in two registers — the formal and the lived." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen4.jpg",  title: "Island Kitchen · Negative Space",       desc: "Where most kitchens accumulate, this one subtracts. Every surface is a decision about absence. Clearance distances calibrated for a single cook who moves like a professional." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen5.jpg",  title: "Open-Plan Kitchen · Social Geometry",   desc: "The kitchen as drawing room. Seating integrated at the island allows conversation without interrupting preparation — a hospitality principle translated into domestic architecture." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen6.jpg",  title: "Bespoke Pantry · Storage as Ritual",    desc: "Full-height shelving with pull-out spice drawers and concealed appliance bays. The render communicates a kitchen that respects the operational intelligence of those who use it." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen7.jpg",  title: "Galley Kitchen · Linear Precision",     desc: "The galley form — unsentimentally professional. Two parallel runs at correct working heights, with the render capturing task lighting as a secondary architecture." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen8.jpg",  title: "Kitchen-Dining · Transitional Moment",  desc: "The frame captures the moment of invitation — when a meal prepared becomes a meal offered. Material warmth balanced against the formality of a dining setting beyond." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen9.jpg",  title: "Evening Kitchen · Candlelight Study",   desc: "An uncommon render — the kitchen at evening, when ambient lighting takes over from task. The atmosphere of a kitchen after service. A room that has earned its warmth." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen10.jpg", title: "Peninsula Kitchen · Lateral Light",     desc: "Lateral window light across stone work surfaces — a study in how natural illumination affects material perception across a working day. Rendered at three moments." },
  { src: "/images/portfolio/kitchens/grand-dining-hall.jpg",     title: "Grand Dining Hall · Ceremonial Scale",  desc: "Hospitality operating at its most elevated register. A dining hall designed for the experience before the meal — arrival, orientation, the weight of the chair as a guest is seated." },
];

const LIVING_SPACE_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/living-spaces/luxury-modern-salon1.jpg",      title: "Grand Salon · Afternoon Study",        desc: "The afternoon render was chosen deliberately — when lateral light creates the longest shadows and most legible spatial depth. A room that understands how it will actually be inhabited." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon2.jpg",      title: "Drawing Room · Conversation Zones",    desc: "Three distinct seating configurations within a single room, each with its own acoustic quality and sightline logic. Social choreography rendered before a sofa is purchased." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon3.jpg",      title: "Salon · Vertical Emphasis",            desc: "The double-height ceiling transformed from architectural feature to spatial experience through furniture scale calibration. The render argues that proportion is the primary luxury." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon4.jpg",      title: "Living Suite · Material Warmth",       desc: "Linen, limewash, travertine. The palette was built to perform at dusk — when a room either becomes warm or reveals its indifference to human presence." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon5.jpg",      title: "Open Living · Threshold Moments",      desc: "The render captures the threshold between reception and living — how a guest moves, pauses, orients. Hospitality intelligence embedded in the floor plan." },
  { src: "/images/portfolio/living-spaces/luxury-dining-room1.jpg",       title: "Formal Dining · Ceremonial Light",     desc: "Overhead pendant scaled to the table below, not the ceiling above. A dining room that understands the difference between architectural light and experiential light." },
  { src: "/images/portfolio/living-spaces/luxury-dining-room2.jpg",       title: "Dining Room · Evening Atmosphere",     desc: "Rendered at the hour when a dining room must perform. The warm tungsten of pendants against cooled daylight — a ten-minute window that determines whether a room succeeds." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon1.jpg",    title: "Marble Entry · First Impression",      desc: "An arrival sequence rendered with the same attention given to a hotel lobby. The entryway as hospitality — orientation, material quality, and the moment of being received." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon2.jpg",    title: "Entryway · Axial Composition",         desc: "The long axis of arrival — a composition that communicates architectural intention within three seconds of entry. Every element aligned to the experience of approach." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon3.jpg",    title: "Foyer · Material Hierarchy",           desc: "Marble, brass, and deep-pile textile — a material hierarchy that communicates the register of a residence before a single room is entered." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon4.jpg",    title: "Reception Hall · Scale and Silence",   desc: "The render was commissioned specifically to communicate silence — the architectural quality most difficult to convey. High ceilings, absorptive finishes, zero visual noise." },
  { src: "/images/portfolio/living-spaces/spiral-staircase-detail1.jpg",  title: "Spiral Stair · Structural Elegance",   desc: "A staircase designed to be descended — the experience of movement through space considered before the structural engineer. Handrail radius derived from hand scale, not drawing convention." },
  { src: "/images/portfolio/living-spaces/spiral-staircase-detail2.jpg",  title: "Stair Detail · Light and Form",        desc: "The render isolates the stair as a sculptural object — understanding that in a residence of this quality, a circulation element is never merely functional." },
];

// ── Utility components ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, className = "", style }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
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

// ── Theme Toggle ───────────────────────────────────────────────────────────
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

  function toggle() { const next = !isDark; setIsDark(next); applyTheme(next); }
  if (!mounted) return null;

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, zIndex: 50,
      padding: "1.6rem clamp(2.5rem, 5vw, 5rem) 0",
      opacity: atTop ? 1 : 0, pointerEvents: atTop ? "auto" : "none",
      transition: "opacity 0.4s",
    }}>
      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          background: "transparent", border: "none", cursor: "pointer",
          padding: "4px 0", color: "rgba(255,255,255,0.4)",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#A8885A"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
      >
        <div style={{
          position: "relative", width: "30px", height: "16px", borderRadius: "8px",
          border: `1px solid ${isDark ? "#2A2520" : "#C4A882"}`,
          backgroundColor: isDark ? "#0E0C0A" : "#F0EBE3",
          transition: "background-color 0.4s ease, border-color 0.4s ease", flexShrink: 0,
        }}>
          <div style={{
            position: "absolute", top: "2px", left: isDark ? "16px" : "2px",
            width: "10px", height: "10px", borderRadius: "50%",
            backgroundColor: "#A8885A", transition: "left 0.35s cubic-bezier(0.4,2,0.3,1)",
          }} />
        </div>
        <span style={{ fontSize: "11px", lineHeight: 1 }}>
          {isDark ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}

// ── Reusable Portfolio Circular Component ──────────────────────────────────
function PortfolioCircular({
  slides,
  activeSlide,
  setActiveSlide,
  viewAllHref = "/work",
}: {
  slides: PortfolioSlide[];
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  viewAllHref?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    function measure() { if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth); }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const n = slides.length;

  function getImgStyle(i: number): React.CSSProperties {
    const gap = Math.min(72, containerWidth * 0.12);
    const stickUp = gap * 0.8;
    const isActive = i === activeSlide;
    const isLeft   = i === (activeSlide - 1 + n) % n;
    const isRight  = i === (activeSlide + 1) % n;
    if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: "auto",  transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
    if (isLeft)   return { zIndex: 2, opacity: 1, pointerEvents: "auto",  transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.84) rotateY(14deg)`, transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
    if (isRight)  return { zIndex: 2, opacity: 1, pointerEvents: "auto",  transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.84) rotateY(-14deg)`, transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
  }

  function prev() { setActiveSlide(p => (p - 1 + n) % n); }
  function next() { setActiveSlide(p => (p + 1) % n); }
  const current = slides[activeSlide];

  return (
    <div style={{ width: "100%", paddingBottom: "3rem" }}>
      <div
        className="portfolio-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem,5vw,5rem)",
          padding: "0 clamp(2rem,6vw,6rem) 3rem",
          alignItems: "center",
        }}
      >
        {/* Image stack */}
        <div
          ref={containerRef}
          style={{ position: "relative", width: "100%", height: "clamp(300px,38vw,500px)", perspective: "1000px" }}
        >
          {slides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.title}
              onClick={() => setActiveSlide(i)}
              style={{
                position: "absolute", width: "100%", height: "100%",
                objectFit: "cover", borderRadius: "2px",
                boxShadow: i === activeSlide ? "0 28px 64px rgba(0,0,0,0.7)" : "0 8px 28px rgba(0,0,0,0.38)",
                cursor: i !== activeSlide ? "pointer" : "default",
                ...getImgStyle(i),
              }}
            />
          ))}
        </div>

        {/* Caption */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
          <p className="font-sans font-light" style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.22em" }}>
            {String(activeSlide + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <h3 className="font-serif font-light" style={{ fontSize: "clamp(1.3rem,2.2vw,2rem)", color: "var(--text-loud)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                {current.title}
              </h3>
              <div style={{ width: "36px", height: "1px", backgroundColor: "var(--gold)", opacity: 0.6, marginBottom: "1.25rem" }} />
              <p className="font-sans font-light" style={{ lineHeight: 1.85, color: "var(--text-mid)", fontSize: "clamp(0.82rem,1.2vw,0.95rem)" }}>
                {current.desc.split(" ").map((word, wi) => (
                  <motion.span
                    key={`${activeSlide}-${wi}`}
                    initial={{ filter: "blur(8px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.015 * wi }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            {[prev, next].map((fn, i) => (
              <NavArrow key={i} onClick={fn} direction={i === 0 ? "prev" : "next"} />
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
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              title={slide.title}
              style={{
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
        <a
          href={viewAllHref}
          className="font-sans font-light uppercase"
          style={{ fontSize: "0.55rem", color: "var(--gold)", letterSpacing: "0.3em", textDecoration: "none", whiteSpace: "nowrap", borderBottom: "1px solid var(--gold)", paddingBottom: "2px", transition: "opacity 0.3s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          View Full Portfolio →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function NavArrow({ onClick, direction }: { onClick: () => void; direction: "prev" | "next" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "44px", height: "44px", borderRadius: "50%",
        border: "1px solid var(--border-mid)",
        backgroundColor: hovered ? "var(--gold)" : "transparent",
        color: hovered ? "var(--bg)" : "var(--text-mid)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: "1rem", flexShrink: 0,
        transition: "background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease",
        borderColor: hovered ? "var(--gold)" : "var(--border-mid)",
      }}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

// ── Testimonials row ───────────────────────────────────────────────────────
function TestimonialsRow({ testimonials }: { testimonials: typeof TESTIMONIALS_BEDROOMS }) {
  return (
    <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.1}>
          <div className="flex flex-col h-full p-10 md:p-12" style={{ background: "var(--bg)" }}>
            <div className="flex gap-1 mb-8">
              {Array.from({ length: 5 }).map((_, si) => (
                <svg key={si} width="10" height="10" viewBox="0 0 14 14" fill="var(--gold)" opacity="0.55">
                  <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
                </svg>
              ))}
            </div>
            <p className="font-serif italic font-light flex-1 mb-10" style={{ fontSize: "clamp(1rem,1.5vw,1.15rem)", color: "var(--text-mid)", lineHeight: 1.75 }}>
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
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeBedroomSlide, setActiveBedroomSlide]     = useState(0);
  const [activeKitchenSlide, setActiveKitchenSlide]     = useState(0);
  const [activeLivingSlide, setActiveLivingSlide]       = useState(0);
  const [contactSubmitted, setContactSubmitted]         = useState(false);
  const [form, setForm]                                 = useState({ name: "", email: "", message: "" });

  // Auto-advance bedroom slider
  useEffect(() => {
    const t = setInterval(() => setActiveBedroomSlide(p => (p + 1) % BEDROOM_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-loud)", fontFamily: "var(--font-cormorant), serif" }}>

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <Nav scrolled={false} />
      <ThemeToggle />
      <Hero />

      {/* ── METRICS STRIP ────────────────────────────────────────────────── */}
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

      {/* ── MANIFESTO ──────────────────────────────────────────────────────── */}
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

      {/* ════════════════════════════════════════════════════════════════════
          01 · BEDROOM SHOWCASE — Private Sanctuaries
      ════════════════════════════════════════════════════════════════════ */}
      <section id="bedrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-8 md:px-16 lg:px-24 pt-20 pb-16">
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
        <PortfolioCircular
          slides={BEDROOM_SLIDES}
          activeSlide={activeBedroomSlide}
          setActiveSlide={setActiveBedroomSlide}
        />

        {/* Bedroom testimonials */}
        <div className="px-8 md:px-16 lg:px-24 pt-16 pb-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal className="mb-14">
            <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>Client Record</p>
            <h3 className="font-serif font-extralight" style={{ fontSize: "clamp(1.5rem,3vw,2.8rem)", color: "var(--text-loud)" }}>
              Results that speak<br />
              <em className="italic" style={{ color: "var(--text-mid)" }}>before we do.</em>
            </h3>
          </Reveal>
          <TestimonialsRow testimonials={TESTIMONIALS_BEDROOMS} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          02 · KITCHEN SHOWCASE — Culinary Theaters
      ════════════════════════════════════════════════════════════════════ */}
      <section id="kitchens" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-8 md:px-16 lg:px-24 pt-20 pb-16">
          <Reveal>
            <p className="font-sans font-light uppercase mb-5" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>
              02 · Culinary Theaters
            </p>
            <h2 className="font-serif font-extralight italic" style={{ fontSize: "clamp(2rem,4.5vw,4.5rem)", color: "var(--text-loud)", maxWidth: "820px", lineHeight: 1.05 }}>
              Where service intelligence<br />becomes spatial architecture.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-8" style={{ maxWidth: "540px" }}>
            <p className="font-sans font-light" style={{ fontSize: "clamp(0.82rem,1.2vw,0.92rem)", color: "var(--text-muted)", lineHeight: 1.9 }}>
              A kitchen is not a room — it is an operational system. We render culinary spaces
              from a position of genuine hospitality knowledge: service flow, brigade movement,
              mise en place logic, and the psychology of the guest threshold. The result is
              not a beautiful kitchen. It is a kitchen that communicates professional authority
              before a single brief is approved.
            </p>
          </Reveal>
          <div className="mt-10">
            <GoldLine width="clamp(80px,12vw,140px)" delay={0.3} />
          </div>
        </div>
        <PortfolioCircular
          slides={KITCHEN_SLIDES}
          activeSlide={activeKitchenSlide}
          setActiveSlide={setActiveKitchenSlide}
        />

        {/* Kitchen testimonials */}
        <div className="px-8 md:px-16 lg:px-24 pt-16 pb-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal className="mb-14">
            <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>Client Record</p>
            <h3 className="font-serif font-extralight" style={{ fontSize: "clamp(1.5rem,3vw,2.8rem)", color: "var(--text-loud)" }}>
              The kitchen approved<br />
              <em className="italic" style={{ color: "var(--text-mid)" }}>before the drawings were final.</em>
            </h3>
          </Reveal>
          <TestimonialsRow testimonials={TESTIMONIALS_KITCHENS} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          03 · LIVING SPACES SHOWCASE — Social Landscapes
      ════════════════════════════════════════════════════════════════════ */}
      <section id="living-spaces" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-8 md:px-16 lg:px-24 pt-20 pb-16">
          <Reveal>
            <p className="font-sans font-light uppercase mb-5" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>
              03 · Social Landscapes
            </p>
            <h2 className="font-serif font-extralight italic" style={{ fontSize: "clamp(2rem,4.5vw,4.5rem)", color: "var(--text-loud)", maxWidth: "820px", lineHeight: 1.05 }}>
              The living room as statement<br />of how you receive the world.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-8" style={{ maxWidth: "540px" }}>
            <p className="font-sans font-light" style={{ fontSize: "clamp(0.82rem,1.2vw,0.92rem)", color: "var(--text-muted)", lineHeight: 1.9 }}>
              Every living space communicates a social register before a guest sits down.
              We render arrival sequences, conversation geometries, sightline hierarchies,
              and the emotional temperature of a room at its intended hour of use.
              Nine years of hospitality operations inform every composition — because
              the difference between a room that impresses and one that welcomes is
              never the furniture. It is the space between it.
            </p>
          </Reveal>
          <div className="mt-10">
            <GoldLine width="clamp(80px,12vw,140px)" delay={0.3} />
          </div>
        </div>
        <PortfolioCircular
          slides={LIVING_SPACE_SLIDES}
          activeSlide={activeLivingSlide}
          setActiveSlide={setActiveLivingSlide}
        />

        {/* Living space testimonials */}
        <div className="px-8 md:px-16 lg:px-24 pt-16 pb-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal className="mb-14">
            <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>Client Record</p>
            <h3 className="font-serif font-extralight" style={{ fontSize: "clamp(1.5rem,3vw,2.8rem)", color: "var(--text-loud)" }}>
              The room felt inhabited<br />
              <em className="italic" style={{ color: "var(--text-mid)" }}>before construction began.</em>
            </h3>
          </Reveal>
          <TestimonialsRow testimonials={TESTIMONIALS_LIVING} />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
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
                <h3
                  className="md:col-span-5 font-serif font-light transition-colors duration-500"
                  style={{ fontSize: "clamp(1.1rem,2vw,1.65rem)", color: "var(--text-mid)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--text-loud)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--text-mid)"; }}
                >
                  {svc.title}
                </h3>
                <p
                  className="md:col-span-5 font-sans font-light leading-relaxed"
                  style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.85 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLParagraphElement).style.color = "var(--text-mid)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLParagraphElement).style.color = "var(--text-muted)"; }}
                >
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

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
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

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
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
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      required
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
                      onBlur={e  => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--border)"; }}
                    />
                  ))}
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your project"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{
                      width: "100%", background: "transparent",
                      borderBottom: "1px solid var(--border)", padding: "0.75rem 0",
                      fontSize: "0.9rem", color: "var(--text-loud)", outline: "none", resize: "none",
                      fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                    }}
                    onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border-mid)"; }}
                    onBlur={e  => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border)"; }}
                  />
                  <ContactSubmitButton />
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 lg:px-24 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-6">
          {[
            { label: "View Portfolio", href: "/work" },
            { label: "The Studio",     href: "/studio" },
            { label: "Contact",        href: "/#contact" },
          ].map((link, i) => (
            <span key={link.label} className="flex items-center gap-6">
              {i > 0 && <span style={{ color: "var(--border)", fontSize: "8px" }}>·</span>}
              <a
                href={link.href}
                className="font-sans font-light uppercase transition-colors duration-300"
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

function ContactSubmitButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-sans font-light uppercase tracking-widest"
      style={{
        fontSize: "0.6rem",
        color: hovered ? "var(--text-loud)" : "var(--text-mid)",
        border: `1px solid ${hovered ? "var(--border-mid)" : "var(--border)"}`,
        padding: "1rem 2.5rem",
        background: "transparent",
        cursor: "pointer",
        letterSpacing: "0.3em",
        transition: "color 0.4s ease, border-color 0.4s ease",
      }}
    >
      Send Enquiry
    </button>
  );
}
