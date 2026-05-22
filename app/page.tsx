"use client";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SOFT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: "120", suffix: "+", label: "Projects Delivered" },
  { value: "14",  suffix: "",  label: "Countries" },
  { value: "9",   suffix: "",  label: "Years of Practice" },
  { value: "40",  suffix: "+", label: "Awards & Recognition" },
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

const TESTIMONIALS_VILLAS = [
  {
    quote: "The exterior render communicated the full weight of the site — the topography, the light at that latitude, the relationship between structure and landscape. Our planning committee approved the scheme on the first submission.",
    name: "David Chipperfield", role: "Principal", company: "David Chipperfield Architects, London",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "They rendered the villa as it will actually be experienced — from the arrival court, from the pool terrace, from the guest wing looking across the estate. Not architecture as object, but architecture as sequence of spaces.",
    name: "Fatima Al Rashid", role: "Development Director", company: "DAMAC Properties, Dubai",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "The renders sold the land before we had completed the design. Three clients purchased plots based solely on the visualisations. The quality of light, the material language, the sense of enclosure — all precisely communicated.",
    name: "Alessandro Ferretti", role: "Creative Director", company: "Studio Ferretti, Milan",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
  },
];

const TESTIMONIALS_WASHROOMS = [
  {
    quote: "The spa suite render stopped our board meeting. Nobody spoke for thirty seconds. The light quality, the steam atmosphere, the way materials read wet against dry — this is a level of craft I had not encountered in visualisation before.",
    name: "Nour El Hassan", role: "VP of Design", company: "Six Senses Hotels & Resorts",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "Washroom renders are typically the weakest element of any presentation. Ours became the hero image of the entire project. The stone selection, the fixture scale, the quality of diffused light — clients asked for prints.",
    name: "Yuki Tanaka", role: "Senior Designer", company: "Super Potato, Tokyo",
    img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "We commissioned renders for a master bathroom where the brief was silence. The render they delivered communicated acoustic as a spatial quality — the depth of the stone, the absorption of the textiles, the stillness of standing water.",
    name: "Lucia Marchetti", role: "Interior Director", company: "Marchetti Studio, Florence",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&crop=face",
  },
];

// ── All Testimonials (for final marquee section) ───────────────────────────
const ALL_TESTIMONIALS = [
  ...TESTIMONIALS_BEDROOMS,
  ...TESTIMONIALS_KITCHENS,
  ...TESTIMONIALS_LIVING,
  ...TESTIMONIALS_VILLAS,
  ...TESTIMONIALS_WASHROOMS,
];

// ── Portfolio slides ───────────────────────────────────────────────────────
interface PortfolioSlide { src: string; title: string; desc: string; }

// BEDROOMS — 8 slides (elegant-master-bedroom8 removed; slides 1-7 + 9)
const BEDROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg", title: "Master Suite · Neutral Palette",     desc: "Warm oak tones, cove lighting, and floor-to-ceiling curtains. Rendered at golden hour — the moment a suite transitions from functional to emotional." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom2.jpg", title: "Guest Suite · Mineral Restraint",    desc: "Clean lines, pendant lighting, and layered textiles. The restraint here is deliberate — every absence is considered." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg", title: "Primary Bedroom · Classical Detail", desc: "Boiserie panelling, botanical pendant lights, and a wave-form headboard in stone linen. Architecture as sleeping ritual." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom4.jpg", title: "Study Retreat · Northern Light",     desc: "Built-in shelving, herringbone floor, soft northern diffusion through sheer curtains — the room breathes." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg", title: "Grand Suite · Serene Atmosphere",    desc: "Sculptural headboard, dual pendant drops, and silk bedding rendered in full depth. Stillness made architectural." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom6.jpg", title: "Corridor Suite · Deep Perspective",  desc: "Long-axis composition revealing layered spaces — study, dressing, and sleeping zone — in a single frame." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom7.jpg", title: "Bedside Detail · Dusk Render",       desc: "Tulip pendants, dark oak nightstand, marble slab top. Rendered at dusk — the hour when rooms acquire atmosphere." },
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

const VILLA_EXTERIOR_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior1.jpg", title: "Hillside Villa · Golden Hour",         desc: "The render was commissioned at the precise solar angle that communicates the relationship between roof overhang and shaded terrace. Architecture as climate response made visible." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior2.jpg", title: "Desert Compound · Dawn Light",         desc: "Mass and void at their most elemental. The render studies how desert light at dawn reveals the weight of a wall — the line between inhabited and sky." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior3.jpg", title: "Coastal Residence · Sea Prospect",     desc: "Approach sequence and pool terrace in one frame — the composition communicates the hierarchy of outdoor spaces before the architecture is entered." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior4.jpg", title: "Estate · Arrival Court",               desc: "The arrival court as a formal gesture — the architecture of reception rendered before a guest steps from a vehicle. Scale, symmetry, and material in one composed frame." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior5.jpg", title: "Garden Villa · Landscape Integration", desc: "The structure disappears into planting — the render communicates a building that has learned to belong to its site. A decade of landscape maturity simulated in light and texture." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior6.jpg", title: "Contemporary Villa · Night Study",     desc: "Interior warmth against exterior darkness — the evening render as a study in the relationship between private comfort and the public face of a residence." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior7.jpg", title: "Pool Pavilion · Reflected Light",      desc: "Still water as a secondary architecture — doubling the building, extending the sky. The pool render as a study in the multiplication of space through reflection." },
];

const WASHROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/washrooms/premium-suite-bathroom1.jpg", title: "Master Spa · Stone and Steam",        desc: "The washroom rendered as a thermal sequence — cold stone, warm water, diffused steam light. Every material chosen for its performance across a spectrum of temperature and humidity." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom2.jpg", title: "Freestanding Bath · Meridian Light",  desc: "The freestanding bath as a sculptural object — rendered in the quality of light that communicates why it was specified. The composition is about the object in space, not the room." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom3.jpg", title: "Wet Room · Linear Precision",         desc: "The wet room as a study in linear drainage, controlled humidity, and the performance of stone under water. A space designed to be experienced, not merely to be clean." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom4.jpg", title: "Double Vanity · Morning Ritual",       desc: "Two basins, one composition — the render captures the social dimension of a shared morning ritual. Mirror scale, lighting position, and counter depth all calibrated to the human figure at 07:00." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom5.jpg", title: "Suite Bathroom · Candlelit Evening",  desc: "The bathroom at its most atmospheric — when overhead light is extinguished and ambient warmth takes over. The render studies a space designed for two lighting conditions, not one." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom6.jpg", title: "Powder Room · Compressed Luxury",     desc: "A room of four square metres rendered as a study in material concentration — where restraint of space demands excess of craft. The powder room as a jewel box." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom7.jpg", title: "Spa Hammam · Thermal Sequence",       desc: "Hot room, cold plunge, and rest area rendered as a complete thermal journey. The architecture of water at its most deliberate — where the programme IS the architecture." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom8.jpg", title: "Open Bath · Garden Prospect",         desc: "The bath positioned for the view — the render captures the relationship between private nakedness and the natural world beyond glass. Vulnerability as architectural intention." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom9.jpg", title: "Monolith Vanity · Dark Marble",       desc: "A single slab of bookmatched marble as a vanity surface — the render communicates material weight, vein continuity, and the craftsmanship of a joint that disappears." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom10.jpg", title: "Suite En-Suite · Oblique Light",     desc: "Oblique natural light revealing texture in stone — the render argues that material selection is inseparable from the direction of light it will receive throughout a day." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom11.jpg", title: "Japanese Soaking Bath · Stillness",  desc: "The ofuro as a meditation on still water — the render communicates a bathing culture where preparation, entry, and contemplation are each distinct architectural moments." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom12.jpg", title: "Midnight Suite · Dramatic Contrast",  desc: "Dark stone against white ceramic, deep shadow against point source light — the render studies a washroom designed to perform at the hour when most design falls silent." },
];

// ══════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ══════════════════════════════════════════════════════════════════════════

function useRevealInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

function Reveal({
  children, delay = 0, y = 40, className = "", style,
}: {
  children: React.ReactNode; delay?: number; y?: number;
  className?: string; style?: React.CSSProperties;
}) {
  const { ref, isInView } = useRevealInView();
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function GoldRule({ delay = 0, width = "48px" }: { delay?: number; width?: string }) {
  const { ref, isInView } = useRevealInView();
  return (
    <motion.div
      ref={ref}
      style={{ height: "1px", width, backgroundColor: "#A8885A", transformOrigin: "left" }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

function CountUp({ target, suffix }: { target: string; suffix: string }) {
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
    const num = parseFloat(target);
    if (isNaN(num)) { setDisplay(target); return; }
    const dur = 2000; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setDisplay(`${Math.round(ease * num)}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target]);

  return <span ref={ref}>{display}{suffix}</span>;
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
        onMouseEnter={e => { (e.currentTarget).style.color = "#A8885A"; }}
        onMouseLeave={e => { (e.currentTarget).style.color = "rgba(255,255,255,0.4)"; }}
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

// ══════════════════════════════════════════════════════════════════════════
// SECTION 1 — STATS + MANIFESTO
// ══════════════════════════════════════════════════════════════════════════

function StatsManifesto() {
  return (
    <section style={{
      backgroundColor: "var(--bg)",
      paddingTop: "clamp(7rem, 12vw, 13rem)",
      paddingBottom: "clamp(7rem, 12vw, 13rem)",
      borderBottom: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(2rem, 7vw, 8rem)" }}>

        <Reveal delay={0}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "clamp(5rem, 8vw, 9rem)" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
            <p style={{
              fontFamily: "var(--font-dm), sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.52em",
              textTransform: "uppercase", color: "#A8885A", fontWeight: 300,
            }}>The Practice</p>
          </div>
        </Reveal>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)",
          marginBottom: "clamp(7rem, 11vw, 13rem)",
        }} className="stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div style={{
                padding: "clamp(2.5rem, 4vw, 4.5rem) clamp(2rem, 3vw, 3.5rem)",
                borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, right: 0, width: "6px", height: "6px",
                  borderTop: "1px solid rgba(168,136,90,0.3)", borderRight: "1px solid rgba(168,136,90,0.3)",
                }} />
                <p style={{
                  fontFamily: "var(--font-cormorant), serif", fontWeight: 200,
                  fontSize: "clamp(3rem, 5.5vw, 5.5rem)", color: "var(--text-loud)",
                  lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.02em",
                }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <div style={{ width: "24px", height: "1px", backgroundColor: "#A8885A", opacity: 0.5, marginBottom: "0.9rem" }} />
                <p style={{
                  fontFamily: "var(--font-dm), sans-serif", fontSize: "0.58rem",
                  letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "var(--text-muted)", fontWeight: 300,
                }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(4rem, 7vw, 10rem)", alignItems: "start",
        }} className="manifesto-grid">
          <Reveal delay={0.05}>
            <p style={{
              fontFamily: "var(--font-dm), sans-serif", fontSize: "0.58rem",
              letterSpacing: "0.52em", textTransform: "uppercase", color: "#A8885A",
              fontWeight: 300, marginBottom: "2.5rem",
            }}>Studio Manifesto</p>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif", fontWeight: 200, fontStyle: "italic",
              fontSize: "clamp(2.2rem, 4vw, 4rem)", color: "var(--text-loud)",
              lineHeight: 1.08, letterSpacing: "-0.01em",
            }}>
              We render architecture<br />through the lens of<br />
              <span style={{ color: "var(--text-mid)" }}>hospitality.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ paddingTop: "clamp(3rem, 5vw, 5.5rem)" }}>
              <GoldRule delay={0.25} width="40px" />
              <div style={{ marginTop: "2.5rem" }}>
                <p style={{
                  fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                  fontSize: "clamp(0.88rem, 1.3vw, 1rem)", color: "var(--text-soft)",
                  lineHeight: 1.95, marginBottom: "1.8rem",
                }}>
                  Architecture speaks before it is inhabited. Our work exists in that
                  threshold — the moment between conception and construction — where
                  light, material, and proportion must tell the full story of a space not yet built.
                </p>
                <p style={{
                  fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                  fontSize: "clamp(0.88rem, 1.3vw, 1rem)", color: "var(--text-muted)", lineHeight: 1.95,
                }}>
                  Nine years of practice. One hundred and twenty projects. Every image
                  a deliberate act of persuasion — crafted with cinematic precision,
                  informed by genuine hospitality intelligence, and composed to move
                  the people who commission and commission from them.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .manifesto-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 540px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PORTFOLIO SECTION HEADER
// ══════════════════════════════════════════════════════════════════════════

function SectionHeader({
  index, label, headline, subheadline, body,
}: {
  index: string; label: string; headline: string; subheadline?: string; body?: string;
}) {
  return (
    <div style={{
      maxWidth: "1440px", margin: "0 auto",
      padding: "clamp(5rem, 9vw, 10rem) clamp(2rem, 7vw, 8rem) clamp(4rem, 6vw, 6rem)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(3rem, 6vw, 8rem)" }} className="section-header-grid">
        <Reveal delay={0}>
          <div style={{ paddingTop: "0.4rem", flexShrink: 0 }}>
            <p style={{
              fontFamily: "var(--font-cormorant), serif", fontWeight: 200,
              fontSize: "clamp(3rem, 6vw, 6rem)", color: "rgba(168,136,90,0.12)",
              lineHeight: 1, letterSpacing: "-0.02em", userSelect: "none",
            }}>{index}</p>
          </div>
        </Reveal>
        <div style={{ flex: 1 }}>
          <Reveal delay={0.05}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "28px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontSize: "0.56rem",
                letterSpacing: "0.52em", textTransform: "uppercase", color: "#A8885A", fontWeight: 300,
              }}>{label}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif", fontWeight: 200, fontStyle: "italic",
              fontSize: "clamp(2rem, 4.5vw, 4.8rem)", color: "var(--text-loud)",
              lineHeight: 1.04, letterSpacing: "-0.01em", maxWidth: "800px",
            }}>
              {headline}
              {subheadline && (
                <span style={{ display: "block", color: "var(--text-mid)", fontStyle: "normal" }}>
                  {subheadline}
                </span>
              )}
            </h2>
          </Reveal>
          {body && (
            <Reveal delay={0.18}>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)", color: "var(--text-muted)",
                lineHeight: 1.95, maxWidth: "520px", marginTop: "2rem",
              }}>{body}</p>
            </Reveal>
          )}
          <div style={{ marginTop: "2.5rem" }}>
            <GoldRule delay={0.28} width="clamp(60px, 10vw, 120px)" />
          </div>
        </div>
      </div>
      <style>{`.section-header-grid { flex-direction: row; } @media(max-width:640px){ .section-header-grid { flex-direction: column !important; gap: 1.5rem !important; } }`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PORTFOLIO VIEWER — Full-bleed cinematic layout
// Image fix: use objectFit "contain" inside a fixed-aspect container so
// compositions are never cropped. Background colour fills letterbox areas.
// ══════════════════════════════════════════════════════════════════════════

function PortfolioViewer({
  slides, activeSlide, setActiveSlide, viewAllHref = "/work",
}: {
  slides: PortfolioSlide[];
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  viewAllHref?: string;
}) {
  const n = slides.length;
  const current = slides[activeSlide];
  const prev = () => setActiveSlide(p => (p - 1 + n) % n);
  const next = () => setActiveSlide(p => (p + 1) % n);

  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        minHeight: "clamp(420px, 60vw, 720px)",
      }} className="portfolio-viewer-grid">

        {/* ── Image panel: contain so full composition is always visible ── */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#080604",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: EASE_SOFT }}
            >
              <img
                src={current.src}
                alt={current.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",    // ← KEY CHANGE: full composition always visible
                  objectPosition: "center",
                  display: "block",
                }}
              />
              {/* Very subtle vignette for cinematic depth — does not crop */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.28) 100%)",
                pointerEvents: "none",
              }} />
            </motion.div>
          </AnimatePresence>

          {/* Image counter — bottom left */}
          <div style={{
            position: "absolute", bottom: "2rem", left: "2rem",
            display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 5,
          }}>
            <span style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "2rem", fontWeight: 200, color: "rgba(255,255,255,0.9)", lineHeight: 1,
            }}>
              {String(activeSlide + 1).padStart(2, "0")}
            </span>
            <div style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.2)" }} />
            <span style={{
              fontFamily: "var(--font-dm), sans-serif", fontSize: "0.6rem",
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", fontWeight: 300,
            }}>
              {String(n).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Caption panel ── */}
        <div style={{
          backgroundColor: "var(--bg)", borderLeft: "1px solid var(--border)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "clamp(2rem, 4vw, 4rem)",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}
            >
              <div style={{ width: "28px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
              <h3 style={{
                fontFamily: "var(--font-cormorant), serif", fontWeight: 200,
                fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", color: "var(--text-loud)",
                lineHeight: 1.15, letterSpacing: "-0.01em",
              }}>{current.title}</h3>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                fontSize: "clamp(0.82rem, 1.1vw, 0.9rem)", color: "var(--text-muted)", lineHeight: 1.9,
              }}>
                {current.desc.split(" ").map((word, wi) => (
                  <motion.span
                    key={`${activeSlide}-${wi}`}
                    initial={{ filter: "blur(6px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.02 * wi }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div>
            <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2rem" }} />
            <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "1.5rem", position: "relative" }}>
              <motion.div
                style={{ position: "absolute", top: 0, left: 0, height: "100%", backgroundColor: "#A8885A", transformOrigin: "left" }}
                animate={{ scaleX: (activeSlide + 1) / n }}
                transition={{ duration: 0.6, ease: EASE_SOFT }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <ArrowButton onClick={prev} direction="prev" />
                <ArrowButton onClick={next} direction="next" />
              </div>
              <a
                href={viewAllHref}
                style={{
                  fontFamily: "var(--font-dm), sans-serif", fontSize: "0.55rem",
                  letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8885A",
                  textDecoration: "none", borderBottom: "1px solid rgba(168,136,90,0.4)",
                  paddingBottom: "2px", transition: "opacity 0.3s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                View All →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)",
        padding: "1.2rem clamp(2rem, 7vw, 8rem)",
        display: "flex", gap: "0.4rem", overflowX: "auto", scrollbarWidth: "none",
      }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            title={s.title}
            style={{
              flexShrink: 0,
              width: "clamp(52px, 7vw, 76px)",
              aspectRatio: "3/2",
              padding: 0,
              border: `1.5px solid ${i === activeSlide ? "#A8885A" : "transparent"}`,
              opacity: i === activeSlide ? 1 : 0.25,
              cursor: "pointer", background: "#080604", overflow: "hidden",
              transition: "all 0.35s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = i === activeSlide ? "1" : "0.25"; }}
          >
            <img
              src={s.src}
              alt={s.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </button>
        ))}
      </div>

      <style>{`
        .portfolio-viewer-grid { grid-template-columns: 1fr 380px !important; }
        @media (max-width: 900px) { .portfolio-viewer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function ArrowButton({ onClick, direction }: { onClick: () => void; direction: "prev" | "next" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={direction}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "42px", height: "42px",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${hovered ? "#A8885A" : "var(--border)"}`,
        borderRadius: "50%",
        backgroundColor: hovered ? "#A8885A" : "transparent",
        color: hovered ? "var(--bg)" : "var(--text-mid)",
        cursor: "pointer", fontSize: "0.9rem",
        transition: "all 0.35s ease", flexShrink: 0,
      }}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PER-SECTION TESTIMONIALS — Cinematic single-card carousel
// ══════════════════════════════════════════════════════════════════════════

function Testimonials({ testimonials }: { testimonials: typeof TESTIMONIALS_BEDROOMS }) {
  const [active, setActive] = useState(0);
  const n = testimonials.length;

  return (
    <div style={{
      backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)",
      padding: "clamp(5rem, 8vw, 9rem) clamp(2rem, 7vw, 8rem)",
    }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "200px 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "start",
        }} className="testimonials-layout">
          {/* Left: label + nav */}
          <div>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontSize: "0.55rem",
                letterSpacing: "0.5em", textTransform: "uppercase", color: "#A8885A",
                fontWeight: 300, marginBottom: "3rem",
              }}>Client Record</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "0.25rem 0", textAlign: "left",
                    }}
                  >
                    <motion.div
                      style={{ height: "1px", backgroundColor: "#A8885A", transformOrigin: "left" }}
                      animate={{ width: i === active ? "28px" : "12px", opacity: i === active ? 0.8 : 0.25 }}
                      transition={{ duration: 0.4, ease: EASE_SOFT }}
                    />
                    <span style={{
                      fontFamily: "var(--font-dm), sans-serif", fontSize: "0.58rem",
                      color: i === active ? "var(--text-loud)" : "var(--text-muted)",
                      letterSpacing: "0.05em", fontWeight: 300, transition: "color 0.35s",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "140px",
                    }}>{t.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: testimonial content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div style={{ display: "flex", gap: "0.3rem", marginBottom: "2.5rem" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 14 14" fill="#A8885A" opacity="0.6">
                    <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
                  </svg>
                ))}
              </div>
              <blockquote style={{
                fontFamily: "var(--font-cormorant), serif", fontStyle: "italic",
                fontWeight: 200, fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
                color: "var(--text-loud)", lineHeight: 1.65,
                letterSpacing: "-0.005em", marginBottom: "3rem",
              }}>
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  border: "1px solid rgba(168,136,90,0.2)",
                }}>
                  <img
                    src={testimonials[active].img}
                    alt={testimonials[active].name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(50%)" }}
                  />
                </div>
                <div>
                  <p style={{
                    fontFamily: "var(--font-dm), sans-serif", fontSize: "0.75rem",
                    color: "var(--text-loud)", fontWeight: 300, letterSpacing: "0.04em",
                  }}>{testimonials[active].name}</p>
                  <p style={{
                    fontFamily: "var(--font-dm), sans-serif", fontSize: "0.6rem",
                    color: "var(--text-muted)", fontWeight: 300,
                    letterSpacing: "0.07em", marginTop: "0.25rem",
                  }}>{testimonials[active].role} · {testimonials[active].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style>{`.testimonials-layout { grid-template-columns: 180px 1fr !important; } @media(max-width:700px){ .testimonials-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SERVICES
// ══════════════════════════════════════════════════════════════════════════

function ServicesSection() {
  return (
    <section style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(2rem, 7vw, 8rem)" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "end",
          padding: "clamp(6rem, 10vw, 11rem) 0 clamp(4rem, 6vw, 7rem)",
          borderBottom: "1px solid var(--border)",
        }} className="services-header">
          <Reveal>
            <p style={{
              fontFamily: "var(--font-dm), sans-serif", fontSize: "0.56rem",
              letterSpacing: "0.52em", textTransform: "uppercase", color: "#A8885A",
              fontWeight: 300, marginBottom: "2rem",
            }}>What We Deliver</p>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif", fontWeight: 200, fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "var(--text-loud)",
              lineHeight: 1.0, letterSpacing: "-0.01em",
            }}>Services</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{
              fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", color: "var(--text-muted)",
              lineHeight: 1.9, maxWidth: "420px",
            }}>
              Full-spectrum visualisation for architecture and real estate.
              Every deliverable a considered composition — technically precise,
              atmospherically intentional, commercially decisive.
            </p>
          </Reveal>
        </div>
        <div>
          {SERVICES.map((svc, i) => (
            <ServiceRow key={svc.n} svc={svc} delay={i * 0.06} />
          ))}
        </div>
      </div>
      <style>{`.services-header { grid-template-columns: 1fr 1fr !important; } @media(max-width:700px){ .services-header { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function ServiceRow({ svc, delay }: { svc: typeof SERVICES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid", gridTemplateColumns: "80px 1fr 1fr 40px",
          gap: "clamp(1rem, 3vw, 4rem)", alignItems: "center",
          padding: "clamp(2rem, 3.5vw, 3.2rem) 0",
          borderBottom: "1px solid var(--border)", cursor: "default",
          transition: "background-color 0.4s ease",
          backgroundColor: hovered ? "rgba(168,136,90,0.025)" : "transparent",
        }} className="service-row">
        <span style={{
          fontFamily: "var(--font-dm), sans-serif", fontSize: "0.55rem",
          letterSpacing: "0.2em", color: hovered ? "#A8885A" : "var(--border-mid)",
          fontWeight: 300, transition: "color 0.4s",
        }}>{svc.n}</span>
        <h3 style={{
          fontFamily: "var(--font-cormorant), serif", fontWeight: 200,
          fontSize: "clamp(1.1rem, 2vw, 1.75rem)",
          color: hovered ? "var(--text-loud)" : "var(--text-mid)",
          transition: "color 0.4s", letterSpacing: "-0.01em",
        }}>{svc.title}</h3>
        <p style={{
          fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
          fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
          color: hovered ? "var(--text-soft)" : "var(--text-muted)",
          lineHeight: 1.85, transition: "color 0.4s",
        }}>{svc.desc}</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.span
            animate={{ x: hovered ? 6 : 0, color: hovered ? "#A8885A" : "var(--text-muted)" }}
            transition={{ duration: 0.35, ease: EASE_SOFT }}
            style={{ fontSize: "0.9rem", display: "block" }}
          >→</motion.span>
        </div>
      </div>
      <style>{`.service-row { grid-template-columns: 80px 1fr 1fr 40px !important; } @media(max-width:900px){ .service-row { grid-template-columns: 60px 1fr !important; } .service-row p { display: none; } } @media(max-width:540px){ .service-row { grid-template-columns: 1fr !important; } .service-row span:first-child { display: none; } }`}</style>
    </Reveal>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// ABOUT
// ══════════════════════════════════════════════════════════════════════════

function AboutSection() {
  return (
    <section style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "clamp(480px, 65vw, 760px)",
        }} className="about-grid">
          <div style={{
            padding: "clamp(5rem, 9vw, 10rem) clamp(2rem, 7vw, 8rem)",
            borderRight: "1px solid var(--border)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", bottom: "-2rem", right: "-1rem",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(12rem, 18vw, 22rem)", fontWeight: 200, fontStyle: "italic",
              color: "rgba(168,136,90,0.04)", lineHeight: 1,
              userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em",
            }}>A</div>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontSize: "0.56rem",
                letterSpacing: "0.52em", textTransform: "uppercase", color: "#A8885A",
                fontWeight: 300, marginBottom: "2.5rem",
              }}>The Studio</p>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif", fontWeight: 200,
                fontSize: "clamp(2rem, 4.5vw, 4.5rem)", color: "var(--text-loud)",
                lineHeight: 1.06, letterSpacing: "-0.01em", marginBottom: "2.5rem",
              }}>
                Architecture Rendered<br />
                with <em style={{ fontStyle: "italic", color: "var(--text-mid)" }}>Hospitality Intelligence.</em>
              </h2>
              <GoldRule delay={0.2} width="40px" />
            </Reveal>
          </div>
          <div style={{
            padding: "clamp(5rem, 9vw, 10rem) clamp(2rem, 7vw, 8rem)",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <Reveal delay={0.1}>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                fontSize: "clamp(0.88rem, 1.3vw, 1rem)", color: "var(--text-soft)",
                lineHeight: 1.95, marginBottom: "2rem",
              }}>
                ArchViz Craft is a luxury architectural visualisation studio
                serving architects, developers, and interior designers across
                the Gulf and beyond. We bring nine years of regional expertise
                and a hospitality-trained eye to every project.
              </p>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                fontSize: "clamp(0.88rem, 1.3vw, 1rem)", color: "var(--text-muted)",
                lineHeight: 1.95, marginBottom: "3.5rem",
              }}>
                Every image is a deliberate composition. We do not document
                architecture — we argue for it. Fourteen countries. A hundred
                and twenty projects. One consistent standard.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <a
                  href="/studio"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.75rem",
                    fontFamily: "var(--font-dm), sans-serif", fontSize: "0.58rem",
                    letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-loud)",
                    textDecoration: "none", borderBottom: "1px solid var(--border-mid)",
                    paddingBottom: "3px", transition: "color 0.35s, border-color 0.35s", fontWeight: 300,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#A8885A";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "#A8885A";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-loud)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--border-mid)";
                  }}
                >
                  Meet the Studio
                  <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "currentColor" }} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`.about-grid { grid-template-columns: 1fr 1fr !important; } @media(max-width:768px){ .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CONTACT
// ══════════════════════════════════════════════════════════════════════════

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "clamp(540px, 70vw, 820px)",
        }} className="contact-grid">
          <div style={{
            padding: "clamp(5rem, 9vw, 11rem) clamp(2rem, 7vw, 8rem)",
            borderRight: "1px solid var(--border)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontSize: "0.56rem",
                letterSpacing: "0.52em", textTransform: "uppercase", color: "#A8885A",
                fontWeight: 300, marginBottom: "2.5rem",
              }}>Begin a Project</p>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif", fontWeight: 200,
                fontSize: "clamp(2.5rem, 5vw, 5.5rem)", color: "var(--text-loud)",
                lineHeight: 1.0, letterSpacing: "-0.02em",
              }}>
                Let us render<br />
                <em style={{ fontStyle: "italic", color: "var(--text-mid)" }}>your vision.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {[
                  { label: "WhatsApp", value: "+971 50 000 0000", href: "https://wa.me/971500000000" },
                  { label: "Email",    value: "studio@archvizcraft.com", href: "mailto:studio@archvizcraft.com" },
                  { label: "Location", value: "By Appointment · Dubai", href: undefined },
                ].map(item => (
                  <div key={item.label}>
                    <p style={{
                      fontFamily: "var(--font-dm), sans-serif", fontSize: "0.52rem",
                      letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)",
                      fontWeight: 300, marginBottom: "0.6rem",
                    }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontWeight: 200,
                        color: "var(--text-mid)", textDecoration: "none",
                        transition: "color 0.35s", display: "block",
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-loud)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}
                      >{item.value}</a>
                    ) : (
                      <p style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontWeight: 200, color: "var(--text-mid)",
                      }}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div style={{
            padding: "clamp(5rem, 9vw, 11rem) clamp(2rem, 7vw, 8rem)",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div style={{ width: "36px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6, marginBottom: "2rem" }} />
                <h3 style={{
                  fontFamily: "var(--font-cormorant), serif", fontWeight: 200, fontStyle: "italic",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--text-loud)", lineHeight: 1.2,
                }}>Thank you. We will be<br />in touch shortly.</h3>
              </motion.div>
            ) : (
              <Reveal delay={0.08}>
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  {(["name", "email"] as const).map(field => (
                    <div key={field} style={{ position: "relative" }}>
                      <label style={{
                        display: "block", fontFamily: "var(--font-dm), sans-serif",
                        fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase",
                        color: "var(--text-muted)", fontWeight: 300, marginBottom: "0.75rem",
                      }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        required
                        value={form[field]}
                        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                        style={{
                          width: "100%", background: "transparent", border: "none",
                          borderBottom: "1px solid var(--border)", padding: "0.6rem 0",
                          fontSize: "0.95rem", color: "var(--text-loud)", outline: "none",
                          fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                          transition: "border-color 0.3s",
                        }}
                        onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "#A8885A"; }}
                        onBlur={e  => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--border)"; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{
                      display: "block", fontFamily: "var(--font-dm), sans-serif",
                      fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase",
                      color: "var(--text-muted)", fontWeight: 300, marginBottom: "0.75rem",
                    }}>Project Brief</label>
                    <textarea
                      rows={4} required placeholder=""
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{
                        width: "100%", background: "transparent", border: "none",
                        borderBottom: "1px solid var(--border)", padding: "0.6rem 0",
                        fontSize: "0.95rem", color: "var(--text-loud)", outline: "none",
                        resize: "none", fontFamily: "var(--font-dm), sans-serif",
                        fontWeight: 300, transition: "border-color 0.3s",
                      }}
                      onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "#A8885A"; }}
                      onBlur={e  => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border)"; }}
                    />
                  </div>
                  <SubmitButton />
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
      <style>{`.contact-grid { grid-template-columns: 1fr 1fr !important; } @media(max-width:768px){ .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function SubmitButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "1rem",
        padding: "0.9rem 2.5rem",
        backgroundColor: hovered ? "#A8885A" : "transparent",
        border: `1px solid ${hovered ? "#A8885A" : "var(--border)"}`,
        color: hovered ? "var(--bg)" : "var(--text-loud)",
        fontFamily: "var(--font-dm), sans-serif", fontSize: "0.58rem",
        letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 300,
        cursor: "pointer", transition: "all 0.4s ease",
      }}
    >
      Send Enquiry
      <span style={{
        display: "inline-block", width: "18px", height: "1px",
        backgroundColor: "currentColor", transition: "transform 0.35s ease",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
      }} />
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PREMIUM TESTIMONIAL SECTION — Final section, marquee card layout
// Inspired by the reference: two staggered rows of cards scrolling in
// opposite directions. Dark, editorial, cinematic — matches brand aesthetic.
// ══════════════════════════════════════════════════════════════════════════

type TestimonialCard = {
  quote: string;
  name: string;
  role: string;
  company: string;
  img: string;
};

function TestimonialMarqueeCard({ card }: { card: TestimonialCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "clamp(300px, 32vw, 440px)",
        marginRight: "clamp(1.2rem, 2vw, 2rem)",
        padding: "clamp(2rem, 3vw, 3rem)",
        backgroundColor: hovered
          ? "rgba(168,136,90,0.05)"
          : "rgba(255,255,255,0.018)",
        border: `1px solid ${hovered ? "rgba(168,136,90,0.25)" : "rgba(255,255,255,0.06)"}`,
        transition: "background-color 0.5s ease, border-color 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner accent */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "20px", height: "20px",
        borderTop: "1px solid rgba(168,136,90,0.3)",
        borderLeft: "1px solid rgba(168,136,90,0.3)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Stars */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="9" height="9" viewBox="0 0 14 14" fill="#A8885A" opacity="0.55">
            <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic", fontWeight: 200,
        fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
        color: "rgba(255,255,255,0.78)",
        lineHeight: 1.7, letterSpacing: "-0.005em",
        marginBottom: "2rem",
      }}>
        &ldquo;{card.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div style={{ width: "28px", height: "1px", backgroundColor: "#A8885A", opacity: 0.4, marginBottom: "1.5rem" }} />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          overflow: "hidden", flexShrink: 0,
          border: "1px solid rgba(168,136,90,0.18)",
        }}>
          <img
            src={card.img}
            alt={card.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(60%)" }}
          />
        </div>
        <div>
          <p style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontSize: "0.72rem", color: "rgba(255,255,255,0.75)",
            fontWeight: 300, letterSpacing: "0.04em",
          }}>{card.name}</p>
          <p style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontSize: "0.56rem", color: "rgba(255,255,255,0.32)",
            fontWeight: 300, letterSpacing: "0.06em", marginTop: "0.2rem",
          }}>{card.role} · {card.company}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialMarqueeRow({
  cards,
  direction = "left",
  speed = 38,
}: {
  cards: TestimonialCard[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...cards, ...cards];

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      {/* Edge fades */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: "clamp(60px, 8vw, 140px)", height: "100%",
        background: "linear-gradient(to right, var(--bg), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, width: "clamp(60px, 8vw, 140px)", height: "100%",
        background: "linear-gradient(to left, var(--bg), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((card, i) => (
          <TestimonialMarqueeCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

function PremiumTestimonialsSection() {
  const row1 = ALL_TESTIMONIALS.slice(0, Math.ceil(ALL_TESTIMONIALS.length / 2));
  const row2 = ALL_TESTIMONIALS.slice(Math.ceil(ALL_TESTIMONIALS.length / 2));

  return (
    <section style={{
      backgroundColor: "var(--bg)",
      borderTop: "1px solid var(--border)",
      paddingTop: "clamp(7rem, 11vw, 13rem)",
      paddingBottom: "clamp(7rem, 11vw, 13rem)",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* Subtle background texture accent */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(ellipse at center, rgba(168,136,90,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Section header */}
      <div style={{
        maxWidth: "1440px", margin: "0 auto",
        padding: "0 clamp(2rem, 7vw, 8rem)",
        marginBottom: "clamp(4rem, 7vw, 8rem)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "end",
        }} className="testimonials-header-grid">
          <div>
            <Reveal delay={0}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ width: "28px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
                <p style={{
                  fontFamily: "var(--font-dm), sans-serif", fontSize: "0.56rem",
                  letterSpacing: "0.52em", textTransform: "uppercase", color: "#A8885A", fontWeight: 300,
                }}>Client Voices</p>
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif", fontWeight: 200, fontStyle: "italic",
                fontSize: "clamp(2.2rem, 4.5vw, 5rem)", color: "var(--text-loud)",
                lineHeight: 1.04, letterSpacing: "-0.01em",
              }}>
                What architects<br />
                <span style={{ color: "var(--text-mid)", fontStyle: "normal" }}>& developers say.</span>
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.12}>
              <div style={{ paddingBottom: "0.5rem" }}>
                <GoldRule delay={0.2} width="40px" />
                <p style={{
                  fontFamily: "var(--font-dm), sans-serif", fontWeight: 300,
                  fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", color: "var(--text-muted)",
                  lineHeight: 1.9, maxWidth: "420px", marginTop: "2rem",
                }}>
                  Across five continents, the studios and developers who choose ArchViz Craft
                  return for the same reason: our work is indistinguishable from the best
                  architectural photography of finished spaces — made before construction begins.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vw, 1.8rem)" }}>
        <TestimonialMarqueeRow cards={row1} direction="left" speed={50} />
        <TestimonialMarqueeRow cards={row2} direction="right" speed={44} />
      </div>

      {/* Bottom CTA */}
      <div style={{
        maxWidth: "1440px", margin: "0 auto",
        padding: "clamp(4rem, 7vw, 7rem) clamp(2rem, 7vw, 8rem) 0",
        display: "flex", justifyContent: "center",
      }}>
        <Reveal delay={0.1}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "1.5rem",
              justifyContent: "center", marginBottom: "2rem",
            }}>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#A8885A", opacity: 0.35 }} />
              <p style={{
                fontFamily: "var(--font-dm), sans-serif", fontSize: "0.56rem",
                letterSpacing: "0.4em", textTransform: "uppercase",
                color: "var(--text-muted)", fontWeight: 300,
              }}>
                {ALL_TESTIMONIALS.length} verified client testimonials
              </p>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#A8885A", opacity: 0.35 }} />
            </div>
            <a
              href="/#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "1rem",
                fontFamily: "var(--font-dm), sans-serif", fontSize: "0.58rem",
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: "var(--text-loud)", textDecoration: "none",
                border: "1px solid var(--border)", padding: "1rem 2.8rem",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#A8885A";
                el.style.borderColor = "#A8885A";
                el.style.color = "var(--bg)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "transparent";
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-loud)";
              }}
            >
              Begin a Project
              <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "currentColor" }} />
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .testimonials-header-grid { grid-template-columns: 1fr 1fr !important; }
        @media(max-width:768px) {
          .testimonials-header-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)",
      padding: "clamp(2.5rem, 4vw, 4rem) clamp(2rem, 7vw, 8rem)",
    }}>
      <div style={{
        maxWidth: "1440px", margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", gap: "2rem", flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          {[
            { label: "View Portfolio", href: "/work" },
            { label: "The Studio",     href: "/studio" },
            { label: "Contact",        href: "/#contact" },
          ].map((link, i) => (
            <span key={link.label} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {i > 0 && <span style={{ color: "var(--border)", fontSize: "7px" }}>·</span>}
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-dm), sans-serif", fontSize: "0.55rem",
                  letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-muted)",
                  textDecoration: "none", fontWeight: 300, transition: "color 0.3s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#A8885A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
        <p style={{
          fontFamily: "var(--font-dm), sans-serif", fontSize: "0.52rem",
          letterSpacing: "0.14em", color: "var(--border)", fontWeight: 300,
        }}>
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [activeBedroomSlide,      setActiveBedroomSlide]      = useState(0);
  const [activeKitchenSlide,      setActiveKitchenSlide]      = useState(0);
  const [activeLivingSlide,       setActiveLivingSlide]       = useState(0);
  const [activeVillaSlide,        setActiveVillaSlide]        = useState(0);
  const [activeWashroomSlide,     setActiveWashroomSlide]     = useState(0);

  // Auto-advance bedroom slider
  useEffect(() => {
    const t = setInterval(() => setActiveBedroomSlide(p => (p + 1) % BEDROOM_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-loud)" }}>

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* ── HERO (untouched) ── */}
      <Nav scrolled={false} />
      <ThemeToggle />
      <Hero />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 · STATS + MANIFESTO
      ══════════════════════════════════════════════════════════════════ */}
      <StatsManifesto />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 · BEDROOMS — 8 slides (elegant-master-bedroom8 removed)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="bedrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader
          index="01"
          label="Selected Work · Private Sanctuaries"
          headline="The private suite,"
          subheadline="before the walls exist."
        />
        <PortfolioViewer
          slides={BEDROOM_SLIDES}
          activeSlide={activeBedroomSlide}
          setActiveSlide={setActiveBedroomSlide}
        />
        <Testimonials testimonials={TESTIMONIALS_BEDROOMS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 · KITCHENS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="kitchens" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader
          index="02"
          label="Culinary Theaters"
          headline="Where service intelligence"
          subheadline="becomes spatial architecture."
          body="A kitchen is not a room — it is an operational system. We render culinary spaces from a position of genuine hospitality knowledge: service flow, brigade movement, mise en place logic, and the psychology of the guest threshold."
        />
        <PortfolioViewer
          slides={KITCHEN_SLIDES}
          activeSlide={activeKitchenSlide}
          setActiveSlide={setActiveKitchenSlide}
        />
        <Testimonials testimonials={TESTIMONIALS_KITCHENS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 · LIVING SPACES
      ══════════════════════════════════════════════════════════════════ */}
      <section id="living-spaces" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader
          index="03"
          label="Social Landscapes"
          headline="The living room as statement"
          subheadline="of how you receive the world."
          body="Every living space communicates a social register before a guest sits down. We render arrival sequences, conversation geometries, sightline hierarchies, and the emotional temperature of a room at its intended hour of use."
        />
        <PortfolioViewer
          slides={LIVING_SPACE_SLIDES}
          activeSlide={activeLivingSlide}
          setActiveSlide={setActiveLivingSlide}
        />
        <Testimonials testimonials={TESTIMONIALS_LIVING} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 · VILLAS & EXTERIORS — NEW CATEGORY
      ══════════════════════════════════════════════════════════════════ */}
      <section id="villas-exteriors" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader
          index="04"
          label="Villas & Exteriors"
          headline="Architecture in landscape,"
          subheadline="before the first stone is laid."
          body="The exterior render is the most complex visualisation we produce — site topography, seasonal light, material ageing, landscape maturity, and the psychology of arrival all rendered in a single frame. We treat the exterior as the architecture's first argument."
        />
        <PortfolioViewer
          slides={VILLA_EXTERIOR_SLIDES}
          activeSlide={activeVillaSlide}
          setActiveSlide={setActiveVillaSlide}
        />
        <Testimonials testimonials={TESTIMONIALS_VILLAS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 · WASHROOMS — NEW CATEGORY
      ══════════════════════════════════════════════════════════════════ */}
      <section id="washrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader
          index="05"
          label="Spa & Washrooms"
          headline="Where material craft"
          subheadline="becomes a private ceremony."
          body="The finest washrooms are not cleaned — they are entered. We render spa suites, hammams, and master bathrooms with the same hospitality intelligence applied to a five-star arrival sequence. Light, stone, water, and silence — four architectural materials most visualisation studios do not know how to render."
        />
        <PortfolioViewer
          slides={WASHROOM_SLIDES}
          activeSlide={activeWashroomSlide}
          setActiveSlide={setActiveWashroomSlide}
        />
        <Testimonials testimonials={TESTIMONIALS_WASHROOMS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 · SERVICES
      ══════════════════════════════════════════════════════════════════ */}
      <ServicesSection />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 · ABOUT
      ══════════════════════════════════════════════════════════════════ */}
      <AboutSection />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 9 · CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <ContactSection />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 10 · PREMIUM TESTIMONIALS — Final section (marquee)
      ══════════════════════════════════════════════════════════════════ */}
      <PremiumTestimonialsSection />

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}