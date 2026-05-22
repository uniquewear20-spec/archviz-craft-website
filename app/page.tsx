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

// ── Portfolio slides ───────────────────────────────────────────────────────
interface PortfolioSlide { src: string; title: string; desc: string; }

const BEDROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg", title: "Master Suite · Neutral Palette",     desc: "Warm oak tones, cove lighting, and floor-to-ceiling curtains. Rendered at golden hour." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom2.jpg", title: "Guest Suite · Mineral Restraint",    desc: "Clean lines, pendant lighting, and layered textiles. The restraint here is deliberate." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg", title: "Primary Bedroom · Classical Detail", desc: "Boiserie panelling, botanical pendant lights, and a wave-form headboard in stone linen." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom4.jpg", title: "Study Retreat · Northern Light",     desc: "Built-in shelving, herringbone floor, soft northern diffusion through sheer curtains." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg", title: "Grand Suite · Serene Atmosphere",    desc: "Sculptural headboard, dual pendant drops, and silk bedding rendered in full depth." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom6.jpg", title: "Corridor Suite · Deep Perspective",  desc: "Long-axis composition revealing layered spaces — study, dressing, and sleeping zone." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom7.jpg", title: "Bedside Detail · Dusk Render",       desc: "Tulip pendants, dark oak nightstand, marble slab top. Rendered at dusk." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom8.jpg", title: "Morning Light Suite · Open Plan",    desc: "Sheer curtains diffusing daylight, ring chandelier, floating bed platform." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom9.jpg", title: "Evening Suite · Cinematic Shadow",   desc: "Leather headboard, cylinder pendant, ambient wall light — shadow as spatial material." },
];

const KITCHEN_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen1.jpg",  title: "Chef's Kitchen · Brigade Composition", desc: "Designed for choreography. Island proportions reflect service flow — three simultaneous workstations without spatial collision." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen2.jpg",  title: "Culinary Suite · Dawn Render",          desc: "Rendered at first light, when countertops hold the warmth of the day ahead." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen3.jpg",  title: "Private Kitchen · Obsidian and Oak",    desc: "Dark lacquered cabinetry against warm oak grain — a kitchen that operates in two registers." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen4.jpg",  title: "Island Kitchen · Negative Space",       desc: "Where most kitchens accumulate, this one subtracts. Every surface a decision about absence." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen5.jpg",  title: "Open-Plan Kitchen · Social Geometry",   desc: "The kitchen as drawing room. Seating integrated at the island — hospitality in domestic form." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen6.jpg",  title: "Bespoke Pantry · Storage as Ritual",    desc: "Full-height shelving, concealed appliance bays. A kitchen that respects operational intelligence." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen7.jpg",  title: "Galley Kitchen · Linear Precision",     desc: "Two parallel runs at correct working heights. Task lighting as a secondary architecture." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen8.jpg",  title: "Kitchen-Dining · Transitional Moment",  desc: "The frame captures the moment when a meal prepared becomes a meal offered." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen9.jpg",  title: "Evening Kitchen · Candlelight Study",   desc: "The kitchen at evening — ambient lighting taking over from task. A room that has earned its warmth." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen10.jpg", title: "Peninsula Kitchen · Lateral Light",     desc: "Lateral window light across stone work surfaces — how natural illumination shapes material perception." },
  { src: "/images/portfolio/kitchens/grand-dining-hall.jpg",     title: "Grand Dining Hall · Ceremonial Scale",  desc: "Hospitality at its most elevated register. Arrival, orientation, the weight of being received." },
];

const LIVING_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/living-spaces/luxury-modern-salon1.jpg",     title: "Grand Salon · Afternoon Study",     desc: "Afternoon render chosen deliberately — lateral light creates the longest shadows and deepest spatial legibility." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon2.jpg",     title: "Drawing Room · Conversation Zones",  desc: "Three distinct seating configurations, each with its own acoustic quality and sightline logic." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon3.jpg",     title: "Salon · Vertical Emphasis",          desc: "Double-height ceiling transformed through furniture scale calibration. Proportion as the primary luxury." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon4.jpg",     title: "Living Suite · Material Warmth",     desc: "Linen, limewash, travertine. A palette built to perform at dusk." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon5.jpg",     title: "Open Living · Threshold Moments",    desc: "The render captures the threshold — how a guest moves, pauses, orients." },
  { src: "/images/portfolio/living-spaces/luxury-dining-room1.jpg",      title: "Formal Dining · Ceremonial Light",   desc: "Pendant scaled to the table, not the ceiling. Architectural light versus experiential light." },
  { src: "/images/portfolio/living-spaces/luxury-dining-room2.jpg",      title: "Dining Room · Evening Atmosphere",   desc: "Warm tungsten against cooled daylight — a ten-minute window that determines whether a room succeeds." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon1.jpg",   title: "Marble Entry · First Impression",    desc: "An arrival sequence rendered with the attention given to a hotel lobby." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon2.jpg",   title: "Entryway · Axial Composition",       desc: "The long axis of arrival — communicating architectural intention within three seconds of entry." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon3.jpg",   title: "Foyer · Material Hierarchy",         desc: "Marble, brass, deep-pile textile — a hierarchy that communicates register before a room is entered." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon4.jpg",   title: "Reception Hall · Scale and Silence", desc: "High ceilings, absorptive finishes, zero visual noise. The architectural quality of silence." },
  { src: "/images/portfolio/living-spaces/spiral-staircase-detail1.jpg", title: "Spiral Stair · Structural Elegance", desc: "A staircase designed to be descended. Handrail radius derived from hand scale, not convention." },
  { src: "/images/portfolio/living-spaces/spiral-staircase-detail2.jpg", title: "Stair Detail · Light and Form",      desc: "The stair as sculptural object — a circulation element that is never merely functional." },
];

const VILLA_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior1.jpg", title: "Villa Exterior · Golden Hour",        desc: "The facade at the hour it was designed for — warm tungsten emerging from the interior as daylight retreats." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior2.jpg", title: "Private Residence · Pool Terrace",    desc: "Water, stone, and landscape in calibrated proportion. The exterior as a sequence of threshold experiences." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior3.jpg", title: "Villa · Arrival Sequence",            desc: "The approach rendered as architectural narrative — how a guest reads a property before reaching the door." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior4.jpg", title: "Residential · Landscape Integration", desc: "Architecture dissolving into its site. The render argues that a villa's quality is measured at its boundary." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior5.jpg", title: "Villa · Evening Facade",              desc: "Exterior lighting as composition. Each aperture a considered decision about what is revealed after dark." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior6.jpg", title: "Estate · Aerial Perspective",         desc: "The massing render — communicating scale, site relationship, and the logic of the plan from above." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior7.jpg", title: "Villa · Material Weathering Study",   desc: "A render that considers patina — how stone, timber, and water features evolve with inhabitation." },
];

const WASHROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/washrooms/premium-suite-bathroom1.jpg",  title: "Master Bath · Stone and Water",      desc: "A bathroom designed around the experience of water. Stone selected for how it reads when wet — not merely when dry." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom2.jpg",  title: "Spa Suite · Morning Light",          desc: "The render captures the bathroom at the moment of use — morning light through obscured glass, the quality of softness." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom3.jpg",  title: "Ensuite · Freestanding Form",        desc: "Freestanding bath as sculptural centrepiece. The room organised around the ritual of bathing." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom4.jpg",  title: "Washroom · Dark Palette",            desc: "Deep charcoal stone and matte brass. A bathroom that communicates restraint as the highest luxury." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom5.jpg",  title: "Powder Room · Jewel Box",            desc: "The powder room as a single considered gesture — intensity of material appropriate to a small space." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom6.jpg",  title: "Hotel Bath · Operational Luxury",    desc: "Hospitality intelligence applied to the private bathroom. Vanity positioning, towel reach, mirror angle — all operational decisions." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom7.jpg",  title: "Suite Bathroom · Layered Light",     desc: "Three lighting circuits rendered in sequence — task, ambient, and accent — showing how a room transforms across a day." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom8.jpg",  title: "Bathroom · Natural Materials",       desc: "Unlacquered timber, honed travertine, hand-thrown ceramic. Materials chosen for how they age, not only how they appear new." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom9.jpg",  title: "Wellness Retreat · Thermal Journey", desc: "Sauna, cold plunge, steam — a bathroom as a wellness sequence. Rendered at each thermal station." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom10.jpg", title: "Master Bath · Double Vanity",        desc: "Two occupants, two rituals, one spatial logic. The double vanity rendered as a study in domestic choreography." },
];

// ── ALL testimonials consolidated ─────────────────────────────────────────
const ALL_TESTIMONIALS = [
  { quote: "The lighting studies they produced were more considered than anything we had seen from a visualisation studio. Material gradients, shadow depth, the quality of reflected light off stone — technically, the work is exceptional.", name: "Priya Mehta", role: "Design Principal", company: "Foster + Partners, London", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face" },
  { quote: "We pre-sold 14 units from renders alone. The spatial atmosphere they created communicated something photography of completed projects rarely achieves. Investors weren't looking at images — they were already inside the building.", name: "Khalid Al Mansoori", role: "Managing Director", company: "Mansoori Capital Developments, Dubai", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face" },
  { quote: "The operational intelligence embedded in their kitchen renders is unlike anything I've encountered. They understood service flow, mise en place zones, the way brigade movement shapes a space.", name: "Marco Benedetti", role: "Executive Chef & Partner", company: "Benedetti Hospitality Group, Milan", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
  { quote: "They understand how a room feels, not just how it looks. The light quality in our master suite visualisation was indistinguishable from a completed space. The hospitality intelligence here is genuinely rare.", name: "Isabelle Fournier", role: "Founder", company: "Atelier Fournier, Paris", img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&crop=face" },
  { quote: "The salon render captured precisely the quality of light we experience at that latitude — the way afternoon sun diffuses across limestone. It reads as a place, not a projection.", name: "Thomas Brecker", role: "Principal Architect", company: "Snøhetta, Oslo", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face" },
  { quote: "The exterior renders communicated a sense of arrival that no site plan or elevation could achieve. Every prospective buyer who saw them placed a reservation within the same meeting.", name: "Sheikh Hamdan Al Rashid", role: "Chief Investment Officer", company: "Al Rashid Developments, Dubai", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&h=120&fit=crop&crop=face" },
  { quote: "Our buyers don't purchase square footage — they purchase a way of living. These visualisations communicated the social register of the space with a confidence we hadn't seen outside the finest architectural photography.", name: "Celeste Moreau", role: "Head of Luxury Residential", company: "Savills, Paris", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face" },
  { quote: "The bathroom renders communicated material quality at a level I had not seen before. The weight of the stone, the temperature of the brass — a client who had never visited a showroom approved the entire specification.", name: "Stefano Ricci Jr.", role: "Creative Director", company: "Ricci Interiors, Florence", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&crop=face" },
  { quote: "When we brought this to our client board, three members asked when the photography was taken. That's not a compliment — it's an architectural argument won before a single tile was laid.", name: "Hana Yoshida", role: "Senior Interior Architect", company: "Yabu Pushelberg, Toronto", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face" },
  { quote: "In twelve years of hospitality development, I have never seen bathroom renders that communicate the experience of bathing rather than the appearance of a bathroom. This team understands wellness as architecture.", name: "Dr. Amira Khalil", role: "VP Hospitality", company: "Jumeirah Group, Dubai", img: "https://images.unsplash.com/photo-1494790108755-2616b612b9bc?w=120&h=120&fit=crop&crop=face" },
  { quote: "We used their villa exterior series to secure planning permission. The renders demonstrated not just design intent but environmental sensitivity — how the building reads from the public realm at different hours.", name: "Nicolas Dupont", role: "Lead Architect", company: "Zaha Hadid Architects, London", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face" },
  { quote: "The powder room render alone sold the penthouse. A single image that communicated everything about the register of the property — without showing a single other room.", name: "James Whitmore", role: "Sales Director", company: "Knight Frank Prime, London", img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&h=120&fit=crop&crop=face" },
];

// ── Utility ────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, className = "", style }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.div className={className} style={style}
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >{children}</motion.div>
  );
}

function GoldLine({ width = "48px", delay = 0 }: { width?: string; delay?: number }) {
  return (
    <motion.div style={{ height: "1px", width, backgroundColor: "var(--gold)", opacity: 0.55 }}
      initial={{ scaleX: 0, transformOrigin: "left" }} whileInView={{ scaleX: 1 }}
      viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}

function CountUp({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!triggered) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    const suffix = target.match(/[^0-9.]+$/)?.[0] ?? "";
    const dur = 1600; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setDisplay(`${Math.round((1 - Math.pow(1 - p, 3)) * num)}${suffix}`);
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
    setIsDark(dark); applyTheme(dark);
    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function applyTheme(dark: boolean) {
    document.documentElement.classList.toggle("light-mode", !dark);
    document.documentElement.classList.toggle("dark-mode", dark);
    localStorage.setItem("archviz-theme", dark ? "dark" : "light");
  }
  function toggle() { const next = !isDark; setIsDark(next); applyTheme(next); }
  if (!mounted) return null;
  return (
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 50, padding: "1.6rem clamp(2.5rem,5vw,5rem) 0", opacity: atTop ? 1 : 0, pointerEvents: atTop ? "auto" : "none", transition: "opacity 0.4s" }}>
      <button onClick={toggle} aria-label="Toggle theme"
        style={{ display: "flex", alignItems: "center", gap: "7px", background: "transparent", border: "none", cursor: "pointer", padding: "4px 0", color: "rgba(255,255,255,0.5)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#A8885A"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"; }}
      >
        <div style={{ position: "relative", width: "30px", height: "16px", borderRadius: "8px", border: `1px solid ${isDark ? "#2A2520" : "#C4A882"}`, backgroundColor: isDark ? "#0E0C0A" : "#F0EBE3", transition: "all 0.4s", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: "2px", left: isDark ? "16px" : "2px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#A8885A", transition: "left 0.35s cubic-bezier(0.4,2,0.3,1)" }} />
        </div>
        <span style={{ fontSize: "11px", lineHeight: 1, display: "flex", alignItems: "center" }}>
          {isDark ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
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

// ── Nav Arrow ──────────────────────────────────────────────────────────────
function NavArrow({ onClick, direction }: { onClick: () => void; direction: "prev" | "next" }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} aria-label={direction === "prev" ? "Previous" : "Next"}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1px solid ${h ? "var(--gold)" : "var(--border-mid)"}`, backgroundColor: h ? "var(--gold)" : "transparent", color: h ? "var(--bg)" : "var(--text-mid)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem", flexShrink: 0, transition: "all 0.35s ease" }}
    >{direction === "prev" ? "←" : "→"}</button>
  );
}

// ── Portfolio Circular ─────────────────────────────────────────────────────
function PortfolioCircular({ slides, activeSlide, setActiveSlide, viewAllHref = "/work" }: {
  slides: PortfolioSlide[]; activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>; viewAllHref?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(600);
  useEffect(() => {
    function m() { if (containerRef.current) setCw(containerRef.current.offsetWidth); }
    m(); const ro = new ResizeObserver(m); if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);
  const n = slides.length;
  function getImgStyle(i: number): React.CSSProperties {
    const gap = Math.min(72, cw * 0.12); const su = gap * 0.8;
    const isA = i === activeSlide; const isL = i === (activeSlide - 1 + n) % n; const isR = i === (activeSlide + 1) % n;
    if (isA) return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
    if (isL) return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${su}px) scale(0.84) rotateY(14deg)`, transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
    if (isR) return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${su}px) scale(0.84) rotateY(-14deg)`, transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.85s cubic-bezier(.16,1,.3,1)" };
  }
  const current = slides[activeSlide];
  return (
    <div style={{ width: "100%", paddingBottom: "3rem" }}>
      <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", padding: "0 clamp(2rem,6vw,6rem) 3rem", alignItems: "center" }}>
        <div ref={containerRef} style={{ position: "relative", width: "100%", height: "clamp(300px,38vw,500px)", perspective: "1000px" }}>
          {slides.map((slide, i) => (
            <img key={slide.src} src={slide.src} alt={slide.title} onClick={() => setActiveSlide(i)} style={{
              position: "absolute", width: "100%", height: "100%", objectFit: "cover", borderRadius: "2px",
              boxShadow: i === activeSlide ? "0 28px 64px rgba(0,0,0,0.6)" : "0 8px 28px rgba(0,0,0,0.35)",
              cursor: i !== activeSlide ? "pointer" : "default", ...getImgStyle(i),
            }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
          <p className="font-sans font-light" style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.22em" }}>
            {String(activeSlide + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div key={activeSlide} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: EASE }}>
              <h3 className="font-serif font-light" style={{ fontSize: "clamp(1.3rem,2.2vw,2rem)", color: "var(--text-loud)", marginBottom: "0.75rem", lineHeight: 1.2 }}>{current.title}</h3>
              <div style={{ width: "36px", height: "1px", backgroundColor: "var(--gold)", opacity: 0.6, marginBottom: "1.25rem" }} />
              <p className="font-sans font-light" style={{ lineHeight: 1.85, color: "var(--text-mid)", fontSize: "clamp(0.82rem,1.2vw,0.95rem)" }}>
                {current.desc.split(" ").map((word, wi) => (
                  <motion.span key={`${activeSlide}-${wi}`} initial={{ filter: "blur(8px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut", delay: 0.015 * wi }} style={{ display: "inline-block", marginRight: "0.25em" }}>{word}</motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <NavArrow onClick={() => setActiveSlide(p => (p - 1 + n) % n)} direction="prev" />
            <NavArrow onClick={() => setActiveSlide(p => (p + 1) % n)} direction="next" />
          </div>
        </div>
      </div>
      <div style={{ padding: "1.2rem clamp(2rem,6vw,6rem)", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {slides.map((slide, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} title={slide.title} style={{ width: "clamp(42px,6vw,68px)", aspectRatio: "3/2", padding: 0, border: i === activeSlide ? "1.5px solid var(--gold)" : "1.5px solid transparent", opacity: i === activeSlide ? 1 : 0.28, cursor: "pointer", background: "none", overflow: "hidden", transition: "all 0.35s ease", flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = i === activeSlide ? "1" : "0.28"; }}
            >
              <img src={slide.src} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
        <a href={viewAllHref} className="font-sans font-light uppercase" style={{ fontSize: "0.55rem", color: "var(--gold)", letterSpacing: "0.3em", textDecoration: "none", whiteSpace: "nowrap", borderBottom: "1px solid var(--gold)", paddingBottom: "2px", transition: "opacity 0.3s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >View Full Portfolio →</a>
      </div>
      <style>{`@media (max-width: 768px) { .portfolio-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ number, eyebrow, title, body }: { number: string; eyebrow: string; title: React.ReactNode; body?: string }) {
  return (
    <div className="px-8 md:px-16 lg:px-24 pt-20 pb-16">
      <Reveal>
        <p className="font-sans font-light uppercase mb-5" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>{number} · {eyebrow}</p>
        <h2 className="font-serif font-extralight italic" style={{ fontSize: "clamp(2rem,4.5vw,4.2rem)", color: "var(--text-loud)", maxWidth: "820px", lineHeight: 1.08 }}>{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.15} style={{ maxWidth: "540px", marginTop: "1.5rem" }}>
          <p className="font-sans font-light" style={{ fontSize: "clamp(0.82rem,1.2vw,0.9rem)", color: "var(--text-muted)", lineHeight: 1.9 }}>{body}</p>
        </Reveal>
      )}
      <div style={{ marginTop: "2rem" }}><GoldLine width="clamp(80px,12vw,140px)" delay={0.3} /></div>
    </div>
  );
}

// ── Testimonial Marquee ────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: typeof ALL_TESTIMONIALS[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "clamp(300px, 32vw, 420px)",
      margin: "0 1rem",
      padding: "clamp(1.5rem,2.5vw,2.5rem)",
      border: "1px solid var(--border)",
      backgroundColor: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    }}>
      {/* Stars */}
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 5 }).map((_, si) => (
          <svg key={si} width="10" height="10" viewBox="0 0 14 14" fill="var(--gold)" opacity="0.7">
            <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
          </svg>
        ))}
      </div>
      {/* Quote */}
      <p className="font-serif italic font-light" style={{ fontSize: "clamp(0.88rem,1.2vw,1rem)", color: "var(--text-mid)", lineHeight: 1.8, flex: 1 }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      {/* Attribution */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(168,136,90,0.2)", flexShrink: 0 }}>
          <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(55%)" }} />
        </div>
        <div>
          <p className="font-sans font-light" style={{ fontSize: "0.68rem", color: "var(--text-loud)", letterSpacing: "0.05em" }}>{t.name}</p>
          <p className="font-sans font-light" style={{ fontSize: "0.56rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialMarquee() {
  // Split into two rows — alternating
  const row1 = ALL_TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const row2 = ALL_TESTIMONIALS.filter((_, i) => i % 2 === 1);

  return (
    <section style={{ borderBottom: "1px solid var(--border)", paddingTop: "clamp(6rem,10vw,10rem)", paddingBottom: "clamp(6rem,10vw,10rem)", overflow: "hidden" }}>
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 mb-16">
        <Reveal>
          <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>The Record</p>
          <h2 className="font-serif font-extralight" style={{ fontSize: "clamp(2rem,4vw,4rem)", color: "var(--text-loud)" }}>
            Results that speak<br />
            <em className="italic" style={{ color: "var(--text-mid)" }}>before we do.</em>
          </h2>
        </Reveal>
      </div>

      {/* Row 1 — left to right (standard) */}
      <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", animation: "marquee-ltr 40s linear infinite", width: "max-content" }}>
          {[...row1, ...row1].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — right to left (reverse) */}
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "marquee-rtl 40s linear infinite", width: "max-content" }}>
          {[...row2, ...row2].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [s0, ss0] = useState(0);
  const [s1, ss1] = useState(0);
  const [s2, ss2] = useState(0);
  const [s3, ss3] = useState(0);
  const [s4, ss4] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const t = setInterval(() => ss0(p => (p + 1) % BEDROOM_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-loud)", fontFamily: "var(--font-cormorant), serif" }}>
      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.032]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <Nav scrolled={false} />
      <ThemeToggle />
      <Hero />

      {/* ── METRICS ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="metrics-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex flex-col items-start" style={{ padding: "3.5rem clamp(1.5rem,4vw,3rem)", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
                <p className="font-serif font-extralight leading-none mb-3" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "var(--text-loud)" }}><CountUp target={s.value} /></p>
                <p className="font-sans font-light uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.28em", color: "var(--text-soft)" }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(8rem,12vw,13rem)", paddingBottom: "clamp(8rem,12vw,13rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="max-w-5xl mx-auto text-center">
          <p className="font-sans font-light uppercase mb-10" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>Studio Manifesto</p>
          <blockquote className="font-serif font-extralight italic leading-[1.3]" style={{ fontSize: "clamp(1.7rem,3.5vw,3.2rem)", color: "var(--text-loud)" }}>
            We render architecture through the lens of hospitality —<br />understanding how spaces are inhabited, not just how they appear.
          </blockquote>
          <div className="flex justify-center mt-14"><GoldLine width="40px" delay={0.4} /></div>
        </Reveal>
      </section>

      {/* ══ 01 BEDROOMS ══ */}
      <section id="bedrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader number="01" eyebrow="Private Sanctuaries" title={<>The private suite,<br />before the walls exist.</>} />
        <PortfolioCircular slides={BEDROOM_SLIDES} activeSlide={s0} setActiveSlide={ss0} />
      </section>

      {/* ══ 02 KITCHENS ══ */}
      <section id="kitchens" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader number="02" eyebrow="Culinary Theaters"
          title={<>Where service intelligence<br />becomes spatial architecture.</>}
          body="A kitchen is not a room — it is an operational system. We render culinary spaces from a position of genuine hospitality knowledge: service flow, brigade movement, mise en place logic, and the psychology of the guest threshold."
        />
        <PortfolioCircular slides={KITCHEN_SLIDES} activeSlide={s1} setActiveSlide={ss1} />
      </section>

      {/* ══ 03 LIVING SPACES ══ */}
      <section id="living-spaces" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader number="03" eyebrow="Social Landscapes"
          title={<>The living room as statement<br />of how you receive the world.</>}
          body="Every living space communicates a social register before a guest sits down. We render arrival sequences, conversation geometries, sightline hierarchies, and the emotional temperature of a room at its intended hour of use."
        />
        <PortfolioCircular slides={LIVING_SLIDES} activeSlide={s2} setActiveSlide={ss2} />
      </section>

      {/* ══ 04 VILLA EXTERIORS ══ */}
      <section id="villas" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader number="04" eyebrow="Villa Exteriors"
          title={<>The facade, rendered<br />at the hour it was designed for.</>}
          body="An exterior render is not a documentation of a building — it is an argument for a way of living. We render villa exteriors as arrival sequences, communicating site relationship, material quality, and the experience of approach before a foundation is poured."
        />
        <PortfolioCircular slides={VILLA_SLIDES} activeSlide={s3} setActiveSlide={ss3} />
      </section>

      {/* ══ 05 WASHROOMS ══ */}
      <section id="washrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader number="05" eyebrow="Premium Bathrooms"
          title={<>The bathroom as ritual,<br />not merely function.</>}
          body="A bathroom communicates the register of an entire residence. We render washrooms with an understanding of how water, light, and material interact — not at the moment of installation, but at the moment of use."
        />
        <PortfolioCircular slides={WASHROOM_SLIDES} activeSlide={s4} setActiveSlide={ss4} />
      </section>

      {/* ── SERVICES ── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>What We Do</p>
            <h2 className="font-serif font-extralight italic" style={{ fontSize: "clamp(2rem,4vw,4.2rem)", color: "var(--text-loud)" }}>Services</h2>
          </div>
          <p className="font-sans font-light" style={{ fontSize: "0.85rem", color: "var(--text-soft)", maxWidth: "280px", lineHeight: 1.9 }}>Full-spectrum visualisation for architecture and real estate. Every deliverable a considered composition.</p>
        </Reveal>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.n} delay={i * 0.05}>
              <div className="group py-9 md:py-11 grid md:grid-cols-12 gap-4 md:gap-0 cursor-default" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="md:col-span-1 font-sans font-light pt-1" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--border-mid)" }}>{svc.n}</span>
                <h3 className="md:col-span-5 font-serif font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.65rem)", color: "var(--text-mid)", transition: "color 0.5s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--text-loud)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--text-mid)"; }}
                >{svc.title}</h3>
                <p className="md:col-span-5 font-sans font-light" style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.85, transition: "color 0.5s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLParagraphElement).style.color = "var(--text-mid)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLParagraphElement).style.color = "var(--text-muted)"; }}
                >{svc.desc}</p>
                <div className="md:col-span-1 flex justify-end items-start">
                  <span className="font-sans text-sm inline-block group-hover:translate-x-1 transition-transform duration-500" style={{ color: "var(--text-muted)" }}>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-0">
          <div className="md:col-span-7 md:pr-20">
            <Reveal>
              <p className="font-sans font-light uppercase mb-8" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>The Studio</p>
              <h2 className="font-serif font-extralight leading-[1.1]" style={{ fontSize: "clamp(1.8rem,4vw,4rem)", color: "var(--text-loud)" }}>
                Architecture Rendered with <em className="italic" style={{ color: "var(--text-mid)" }}>Hospitality Intelligence.</em>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:pt-14">
            <Reveal delay={0.15}>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "2rem" }}>
                <p className="font-sans font-light leading-relaxed mb-6" style={{ fontSize: "0.9rem", color: "var(--text-soft)", lineHeight: 1.9 }}>ArchViz Craft is a luxury architectural visualisation studio serving architects, developers, and interior designers across the Gulf and beyond. We bring 9 years of regional expertise and a hospitality-trained eye to every project.</p>
                <p className="font-sans font-light leading-relaxed mb-10" style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.9 }}>Every image is a deliberate composition. Visualisation is not documentation. It is persuasion.</p>
                <a href="/studio" className="inline-flex items-center gap-3 font-sans font-light uppercase transition-opacity duration-300 hover:opacity-50" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.38em", textDecoration: "none" }}>
                  <span style={{ borderBottom: "1px solid var(--gold)", paddingBottom: "2px" }}>Meet the Studio</span>
                  <span style={{ display: "inline-block", width: "22px", height: "1px", backgroundColor: "var(--gold)" }} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE — single consolidated section near footer ── */}
      <TestimonialMarquee />

      {/* ── CONTACT ── */}
      <section id="contact" className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(7rem,11vw,12rem)", paddingBottom: "clamp(7rem,11vw,12rem)", borderBottom: "1px solid var(--border)" }}>
        <Reveal className="mb-20">
          <p className="font-sans font-light uppercase mb-6" style={{ fontSize: "0.58rem", color: "var(--gold)", letterSpacing: "0.52em" }}>Get In Touch</p>
          <h2 className="font-serif font-extralight" style={{ fontSize: "clamp(2rem,5vw,5rem)", color: "var(--text-loud)" }}>
            Begin a project<br /><em className="italic" style={{ color: "var(--text-mid)" }}>with us.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-16 md:gap-0">
          <div className="md:col-span-4 md:pr-12 space-y-14">
            {[
              { label: "WhatsApp", href: "https://wa.me/971500000000", text: "+971 50 000 0000", ext: true },
              { label: "Email", href: "mailto:studio@archvizcraft.com", text: "studio@archvizcraft.com", ext: false },
            ].map((item, idx) => (
              <Reveal key={item.label} delay={idx * 0.1}>
                <div>
                  <p className="font-sans font-light uppercase mb-4" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--text-muted)" }}>{item.label}</p>
                  <a href={item.href} target={item.ext ? "_blank" : undefined} rel="noopener noreferrer" className="font-serif block" style={{ fontSize: "1.2rem", color: "var(--text-mid)", textDecoration: "none", transition: "color 0.5s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-loud)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}
                  >{item.text}</a>
                </div>
              </Reveal>
            ))}
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
                  <h3 className="font-serif font-extralight italic" style={{ fontSize: "2rem", color: "var(--text-loud)" }}>Thank you. We&rsquo;ll be in touch shortly.</h3>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-8">
                  {(["name", "email"] as const).map(field => (
                    <input key={field} type={field === "email" ? "email" : "text"} required
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      style={{ width: "100%", background: "transparent", borderBottom: "1px solid var(--border)", padding: "0.75rem 0", fontSize: "0.9rem", color: "var(--text-loud)", outline: "none", fontFamily: "var(--font-dm), sans-serif", fontWeight: 300 }}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--gold)"; }}
                      onBlur={e =>  { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--border)"; }}
                    />
                  ))}
                  <textarea rows={5} required placeholder="Tell us about your project"
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: "100%", background: "transparent", borderBottom: "1px solid var(--border)", padding: "0.75rem 0", fontSize: "0.9rem", color: "var(--text-loud)", outline: "none", resize: "none", fontFamily: "var(--font-dm), sans-serif", fontWeight: 300 }}
                    onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--gold)"; }}
                    onBlur={e =>  { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border)"; }}
                  />
                  <button type="submit" className="font-sans font-light uppercase"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--text-mid)", border: "1px solid var(--border)", padding: "1rem 2.5rem", background: "transparent", cursor: "pointer", transition: "all 0.4s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "var(--gold)"; el.style.borderColor = "var(--gold)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "var(--text-mid)"; el.style.borderColor = "var(--border)"; }}
                  >Send Enquiry</button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-16 lg:px-24 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-6">
          {[{ label: "View Portfolio", href: "/work" }, { label: "The Studio", href: "/studio" }, { label: "Contact", href: "/#contact" }].map((link, i) => (
            <span key={link.label} className="flex items-center gap-6">
              {i > 0 && <span style={{ color: "var(--border)", fontSize: "8px" }}>·</span>}
              <a href={link.href} className="font-sans font-light uppercase" style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.28em", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
              >{link.label}</a>
            </span>
          ))}
        </div>
        <p className="font-sans font-light" style={{ fontSize: "0.55rem", color: "var(--border)", letterSpacing: "0.14em" }}>
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}