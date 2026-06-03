"use client";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import FeatureBlocks from "./components/FeatureBlocks";
import { SocialRow, FloatingContact } from "./components/SocialContact";
import TestimonialsMarquee, { MarqueeTestimonial } from "./components/TestimonialsMarquee";
import EditorialSpread from "./components/EditorialSpread";

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

// ── Testimonials (designation = "Role · Company") ────────────────────────────
const TESTIMONIALS_BEDROOMS: MarqueeTestimonial[] = [
  { quote: "The lighting studies they produced were more considered than anything we had seen from a visualisation studio. Material gradients, shadow depth, the quality of reflected light off stone — technically, the work is exceptional.", name: "Priya Mehta", designation: "Design Principal · Foster + Partners", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { quote: "We pre-sold 14 units from renders alone. The spatial atmosphere they created communicated something photography of completed projects rarely achieves. Investors weren't looking at images — they were already inside the building.", name: "Khalid Al Mansoori", designation: "Managing Director · Mansoori Capital", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" },
  { quote: "They understand how a room feels, not just how it looks. The light quality in our master suite visualisation was indistinguishable from a completed space. The hospitality intelligence here is genuinely rare.", name: "Isabelle Fournier", designation: "Founder · Atelier Fournier, Paris", src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop&crop=face" },
];
const TESTIMONIALS_KITCHENS: MarqueeTestimonial[] = [
  { quote: "The operational intelligence embedded in their kitchen renders is unlike anything I've encountered. They understood service flow, mise en place zones, the way brigade movement shapes a space. This wasn't a render — it was a functioning concept.", name: "Marco Benedetti", designation: "Executive Chef & Partner · Benedetti Group", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { quote: "When we brought this to our client board, three members asked when the photography was taken. That's not a compliment — it's an architectural argument won before a single tile was laid.", name: "Hana Yoshida", designation: "Senior Interior Architect · Yabu Pushelberg", src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  { quote: "Our client wanted to feel the kitchen before committing to the investment. The light at 07:30, the warmth of the stone against morning sun — they approved the full specification within 48 hours of receiving the renders.", name: "Rania Al-Farsi", designation: "Project Director · Aldar Properties", src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face" },
];
const TESTIMONIALS_LIVING: MarqueeTestimonial[] = [
  { quote: "The salon render captured precisely the quality of light we experience at that latitude — the way afternoon sun diffuses across limestone, the shadow weight of a deep cornice. It reads as a place, not a projection.", name: "Thomas Brecker", designation: "Principal Architect · Snøhetta, Oslo", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { quote: "Our buyers don't purchase square footage — they purchase a way of living. These visualisations communicated the social register of the space with a confidence we hadn't seen outside the finest architectural photography.", name: "Celeste Moreau", designation: "Head of Luxury Residential · Savills, Paris", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { quote: "The circulation logic, the conversation zones, the way the furniture composition guides movement through the space — whoever briefed this team understood hospitality design at its most sophisticated level.", name: "Omar Kassem", designation: "Chief Design Officer · FIVE Hotels & Resorts", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
];
const TESTIMONIALS_VILLAS: MarqueeTestimonial[] = [
  { quote: "The exterior render communicated the full weight of the site — the topography, the light at that latitude, the relationship between structure and landscape. Our planning committee approved the scheme on the first submission.", name: "David Hartmann", designation: "Principal · Hartmann Architects, London", src: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face" },
  { quote: "They rendered the villa as it will actually be experienced — from the arrival court, from the pool terrace, from the guest wing looking across the estate. Not architecture as object, but architecture as sequence of spaces.", name: "Fatima Al Rashid", designation: "Development Director · DAMAC Properties", src: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face" },
  { quote: "The renders sold the land before we had completed the design. Three clients purchased plots based solely on the visualisations. The quality of light, the material language, the sense of enclosure — all precisely communicated.", name: "Alessandro Ferretti", designation: "Creative Director · Studio Ferretti, Milan", src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
];
const TESTIMONIALS_WASHROOMS: MarqueeTestimonial[] = [
  { quote: "The spa suite render stopped our board meeting. Nobody spoke for thirty seconds. The light quality, the steam atmosphere, the way materials read wet against dry — this is a level of craft I had not encountered in visualisation before.", name: "Nour El Hassan", designation: "VP of Design · Six Senses Resorts", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { quote: "Washroom renders are typically the weakest element of any presentation. Ours became the hero image of the entire project. The stone selection, the fixture scale, the quality of diffused light — clients asked for prints.", name: "Yuki Tanaka", designation: "Senior Designer · Super Potato, Tokyo", src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face" },
  { quote: "We commissioned renders for a master bathroom where the brief was silence. The render they delivered communicated acoustic as a spatial quality — the depth of the stone, the absorption of the textiles, the stillness of standing water.", name: "Lucia Marchetti", designation: "Interior Director · Marchetti Studio, Florence", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face" },
];

const ALL_TESTIMONIALS: MarqueeTestimonial[] = [
  ...TESTIMONIALS_BEDROOMS, ...TESTIMONIALS_KITCHENS, ...TESTIMONIALS_LIVING, ...TESTIMONIALS_VILLAS, ...TESTIMONIALS_WASHROOMS,
];

// ── Portfolio slides ───────────────────────────────────────────────────────
interface PortfolioSlide { src: string; title: string; desc: string; }

const BEDROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg",  title: "Master Suite · Neutral Palette",   desc: "Warm oak tones, cove lighting, and floor-to-ceiling curtains. Rendered at golden hour — the moment a suite transitions from functional to emotional." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom2.jpg",  title: "Guest Suite · Mineral Restraint",   desc: "Clean lines, pendant lighting, and layered textiles. The restraint here is deliberate — every absence is considered." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg",  title: "Primary Bedroom · Classical Detail", desc: "Boiserie panelling, botanical pendant lights, and a wave-form headboard in stone linen. Architecture as sleeping ritual." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom4.jpg",  title: "Study Retreat · Northern Light",     desc: "Built-in shelving, herringbone floor, soft northern diffusion through sheer curtains — the room breathes." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg",  title: "Grand Suite · Serene Atmosphere",    desc: "Sculptural headboard, dual pendant drops, and silk bedding rendered in full depth. Stillness made architectural." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom6.jpg",  title: "Corridor Suite · Deep Perspective",  desc: "Long-axis composition revealing layered spaces — study, dressing, and sleeping zone — in a single frame." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom9.jpg",  title: "Evening Suite · Cinematic Shadow",   desc: "Leather headboard, cylinder pendant, ambient wall light — the render studies shadow as a spatial material." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom10.jpg", title: "Dawn Suite · Soft Diffusion",        desc: "First light across linen and pale oak. The render captures the quiet hour before a room is occupied." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom11.jpg", title: "Panelled Suite · Tonal Depth",       desc: "Floor-to-ceiling joinery in warm walnut, lit to reveal grain and shadow as architectural texture." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom13.jpg", title: "Dressing Suite · Mirrored Light",    desc: "The dressing zone rendered as ceremony — mirrored surfaces multiplying a single source of warm light." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom14.jpg", title: "Canopy Bedroom · Vertical Drama",    desc: "A four-poster reinterpreted in slender bronze. The render studies how vertical line reshapes a low room." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom15.jpg", title: "Terrace Suite · Borrowed Landscape", desc: "Glazing dissolves the wall between suite and terrace — interior and view rendered as one continuous space." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom17.jpg", title: "Reading Suite · Warm Enclosure",     desc: "A bedroom built around a single deep armchair and lamp — intimacy rendered through the smallest gesture." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom18.jpg", title: "Pavilion Bedroom · Open Plan",       desc: "The suite as pavilion — sleeping, bathing, and dressing zones flowing without partition, rendered in full light." },
  { src: "/images/portfolio/bedrooms/elegant-master-bedroom19.jpg", title: "Nocturne Suite · Low Light Study",   desc: "The bedroom rendered at its most private hour — point sources of warm light against deep, absorbing shadow." },
];

const KITCHEN_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen1.jpg",  title: "Chef's Kitchen · Brigade Composition", desc: "Designed for choreography. The island proportions reflect service flow — three simultaneous workstations without spatial collision." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen2.jpg",  title: "Culinary Suite · Dawn Render",          desc: "Rendered at first light, when countertops hold the warmth of the day ahead. Marble veining selected for how it reads at breakfast." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen3.jpg",  title: "Private Kitchen · Obsidian and Oak",    desc: "The tension between dark lacquered cabinetry and warm oak grain communicates a kitchen that operates in two registers." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen4.jpg",  title: "Island Kitchen · Negative Space",       desc: "Where most kitchens accumulate, this one subtracts. Every surface is a decision about absence." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen5.jpg",  title: "Open-Plan Kitchen · Social Geometry",   desc: "The kitchen as drawing room. Seating integrated at the island allows conversation without interrupting preparation." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen6.jpg",  title: "Bespoke Pantry · Storage as Ritual",    desc: "Full-height shelving with pull-out spice drawers and concealed appliance bays." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen7.jpg",  title: "Galley Kitchen · Linear Precision",     desc: "The galley form — unsentimentally professional. Two parallel runs at correct working heights." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen8.jpg",  title: "Kitchen-Dining · Transitional Moment",  desc: "The frame captures the moment of invitation — when a meal prepared becomes a meal offered." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen9.jpg",  title: "Evening Kitchen · Candlelight Study",   desc: "An uncommon render — the kitchen at evening, when ambient lighting takes over from task." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen10.jpg", title: "Peninsula Kitchen · Lateral Light",     desc: "Lateral window light across stone work surfaces — a study in how natural illumination affects material perception." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen11.jpg", title: "Marble Kitchen · Veined Continuity",    desc: "Bookmatched stone carried from splashback to island — the render communicates material weight and vein continuity." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen12.jpg", title: "Show Kitchen · Theatrical Scale",       desc: "A kitchen scaled for performance — generous clearances and a hero island rendered for an audience." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen13.jpg", title: "Scullery · Working Backstage",          desc: "The concealed scullery behind the show kitchen — function rendered with the same care as display." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen14.jpg", title: "Breakfast Kitchen · Morning Warmth",    desc: "Soft east light across timber and brass — the kitchen rendered at its most domestic and inviting hour." },
  { src: "/images/portfolio/kitchens/luxury-chef-kitchen15.jpg", title: "Grand Dining Kitchen · Ceremonial Scale", desc: "Hospitality at its most elevated register — a kitchen and dining hall designed for the experience before the meal." },
];

const LIVING_SPACE_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/living-spaces/luxury-modern-salon1.jpg",   title: "Grand Salon · Afternoon Study",    desc: "The afternoon render was chosen deliberately — when lateral light creates the longest shadows and most legible spatial depth." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon2.jpg",   title: "Drawing Room · Conversation Zones", desc: "Three distinct seating configurations within a single room, each with its own acoustic quality and sightline logic." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon3.jpg",   title: "Salon · Vertical Emphasis",        desc: "The double-height ceiling transformed from architectural feature to spatial experience through furniture scale calibration." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon4.jpg",   title: "Living Suite · Material Warmth",    desc: "Linen, limewash, travertine. The palette was built to perform at dusk — when a room either becomes warm or reveals its indifference." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon5.jpg",   title: "Open Living · Threshold Moments",   desc: "The render captures the threshold between reception and living — how a guest moves, pauses, orients." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon6.jpg",   title: "Lounge · Layered Neutrals",        desc: "Tonal layering across textile and stone — a room composed almost entirely in the space between two close colours." },
  { src: "/images/portfolio/living-spaces/luxury-modern-salon7.jpg",   title: "Salon · Sculptural Seating",       desc: "Furniture treated as sculpture — the render isolates form and shadow before colour enters the conversation." },
  { src: "/images/portfolio/living-spaces/luxury-dining-room2.jpg",    title: "Dining Room · Evening Atmosphere", desc: "Rendered at the hour when a dining room must perform. The warm tungsten of pendants against cooled daylight." },
  { src: "/images/portfolio/living-spaces/elegant-bedroom-hallway.jpg",title: "Gallery Hall · Processional Light", desc: "The connecting hall rendered as an event in itself — a measured sequence of light, art, and threshold." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon1.jpg", title: "Marble Entry · First Impression",  desc: "An arrival sequence rendered with the same attention given to a hotel lobby." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon2.jpg", title: "Entryway · Axial Composition",     desc: "The long axis of arrival — a composition that communicates architectural intention within three seconds of entry." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon3.jpg", title: "Foyer · Material Hierarchy",       desc: "Marble, brass, and deep-pile textile — a material hierarchy that communicates the register of a residence." },
  { src: "/images/portfolio/living-spaces/marble-entryway-salon4.jpg", title: "Reception Hall · Scale and Silence", desc: "The render was commissioned specifically to communicate silence — the architectural quality most difficult to convey." },
  { src: "/images/portfolio/living-spaces/luxury-wardrobe-closet1.jpg",title: "Dressing Room · Ordered Luxury",   desc: "Full-height joinery, integrated lighting, and a central island — storage rendered as a private gallery." },
  { src: "/images/portfolio/living-spaces/luxury-wardrobe-closet2.jpg",title: "Walk-In Wardrobe · Warm Display",  desc: "Backlit shelving and brushed metal — the wardrobe rendered to present a collection, not merely contain it." },
];

const VILLA_EXTERIOR_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior1.jpg", title: "Hillside Villa · Golden Hour",          desc: "The render was commissioned at the precise solar angle that communicates the relationship between roof overhang and shaded terrace." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior2.jpg", title: "Desert Compound · Dawn Light",          desc: "Mass and void at their most elemental. The render studies how desert light at dawn reveals the weight of a wall." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior3.jpg", title: "Coastal Residence · Sea Prospect",      desc: "Approach sequence and pool terrace in one frame — the composition communicates the hierarchy of outdoor spaces." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior4.jpg", title: "Estate · Arrival Court",                desc: "The arrival court as a formal gesture — the architecture of reception rendered before a guest steps from a vehicle." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior5.jpg", title: "Garden Villa · Landscape Integration",  desc: "The structure disappears into planting — a building that has learned to belong to its site." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior6.jpg", title: "Contemporary Villa · Night Study",      desc: "Interior warmth against exterior darkness — the evening render as a study in private comfort and the public face of a residence." },
  { src: "/images/portfolio/villas-exteriors/luxury-villa-exterior7.jpg", title: "Pool Pavilion · Reflected Light",       desc: "Still water as a secondary architecture — doubling the building, extending the sky." },
];

const WASHROOM_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/washrooms/premium-suite-bathroom1.jpg",  title: "Master Spa · Stone and Steam",       desc: "The washroom rendered as a thermal sequence — cold stone, warm water, diffused steam light." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom2.jpg",  title: "Freestanding Bath · Meridian Light", desc: "The freestanding bath as a sculptural object rendered in the quality of light that communicates why it was specified." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom3.jpg",  title: "Wet Room · Linear Precision",        desc: "The wet room as a study in linear drainage, controlled humidity, and the performance of stone under water." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom4.jpg",  title: "Double Vanity · Morning Ritual",     desc: "Two basins, one composition — the render captures the social dimension of a shared morning ritual." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom5.jpg",  title: "Suite Bathroom · Candlelit Evening", desc: "The bathroom at its most atmospheric — when overhead light is extinguished and ambient warmth takes over." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom6.jpg",  title: "Powder Room · Compressed Luxury",    desc: "A room of four square metres rendered as a study in material concentration." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom7.jpg",  title: "Spa Hammam · Thermal Sequence",      desc: "Hot room, cold plunge, and rest area rendered as a complete thermal journey." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom8.jpg",  title: "Open Bath · Garden Prospect",        desc: "The bath positioned for the view — vulnerability as architectural intention." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom9.jpg",  title: "Monolith Vanity · Dark Marble",      desc: "A single slab of bookmatched marble — the render communicates material weight and vein continuity." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom10.jpg", title: "Suite En-Suite · Oblique Light",     desc: "Oblique natural light revealing texture in stone — material selection is inseparable from the direction of light." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom11.jpg", title: "Japanese Soaking Bath · Stillness",  desc: "The ofuro as a meditation on still water — preparation, entry, and contemplation as distinct architectural moments." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom12.jpg", title: "Midnight Suite · Dramatic Contrast", desc: "Dark stone against white ceramic, deep shadow against point source light." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom13.jpg", title: "Twin Vanity · Symmetrical Calm",     desc: "A perfectly mirrored composition — the render uses symmetry to communicate order and repose." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom14.jpg", title: "Shower Suite · Rain and Stone",      desc: "A walk-in rainfall enclosure rendered to show water as a moving, light-catching material." },
  { src: "/images/portfolio/washrooms/premium-suite-bathroom15.jpg", title: "Spa Retreat · Warm Minimalism",      desc: "Pared-back surfaces and concealed lighting — the most restrained washroom, rendered for serenity." },
];

// ══════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ══════════════════════════════════════════════════════════════════════════

function useRevealInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

function Reveal({ children, delay = 0, y = 36, className = "", style }: {
  children: React.ReactNode; delay?: number; y?: number;
  className?: string; style?: React.CSSProperties;
}) {
  const { ref, isInView } = useRevealInView();
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

function GoldRule({ delay = 0, width = "48px" }: { delay?: number; width?: string }) {
  const { ref, isInView } = useRevealInView();
  return (
    <motion.div ref={ref}
      style={{ height: "1px", width, backgroundColor: "#A8885A", transformOrigin: "left" }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
      transition={{ duration: 1.4, ease: EASE, delay }} />
  );
}

// Reusable eyebrow label — single source of truth for the gold section labels.
// Locked to one tracking value (0.34em) site-wide for editorial consistency.
function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: "30px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
      <p style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.66rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "#A8885A", fontWeight: 400 }}>{children}</p>
      {center && <div style={{ width: "30px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />}
    </div>
  );
}

function CountUp({ target, suffix }: { target: string; suffix: string }) {
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
    const num = parseFloat(target); if (isNaN(num)) { setDisplay(target); return; }
    const dur = 2000; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setDisplay(`${Math.round((1 - Math.pow(1 - p, 4)) * num)}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ══════════════════════════════════════════════════════════════════════════
// STATS + MANIFESTO  — tightened vertical rhythm
// ══════════════════════════════════════════════════════════════════════════
function StatsManifesto() {
  return (
    <section style={{ backgroundColor: "var(--bg)", paddingTop: "clamp(5rem,8vw,9rem)", paddingBottom: "clamp(5rem,8vw,9rem)", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(2rem,7vw,8rem)" }}>
        <Reveal delay={0}>
          <div style={{ marginBottom: "clamp(2rem,3vw,2.8rem)" }}>
            <Eyebrow>The Practice</Eyebrow>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)", marginBottom: "clamp(2.5rem,4vw,4.5rem)" }} className="stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div style={{ padding: "clamp(1.6rem,2.4vw,2.4rem) clamp(1.6rem,2.2vw,2.6rem)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "6px", height: "6px", borderTop: "1px solid rgba(168,136,90,0.3)", borderRight: "1px solid rgba(168,136,90,0.3)" }} />
                <p style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontSize: "clamp(3rem,5.5vw,5.5rem)", color: "var(--text-loud)", lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.02em" }}><CountUp target={s.value} suffix={s.suffix} /></p>
                <div style={{ width: "24px", height: "1px", backgroundColor: "#A8885A", opacity: 0.5, marginBottom: "0.9rem" }} />
                <p style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-soft)", fontWeight: 400 }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,8rem)", alignItems: "start" }} className="manifesto-grid">
          <Reveal delay={0.05}>
            <div style={{ marginBottom: "2rem" }}><Eyebrow>Studio Manifesto</Eyebrow></div>
            <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(2.2rem,4vw,4rem)", color: "var(--text-loud)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>
              We render architecture<br />through the lens of<br /><span style={{ color: "var(--text-mid)" }}>hospitality.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ paddingTop: "clamp(1rem,2vw,2rem)" }}>
              <GoldRule delay={0.25} width="40px" />
              <div style={{ marginTop: "2rem" }}>
                <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem,1.3vw,1.05rem)", color: "var(--text-soft)", lineHeight: 1.9, marginBottom: "1.6rem" }}>Architecture speaks before it is inhabited. Our work exists in that threshold — the moment between conception and construction — where light, material, and proportion must tell the full story of a space not yet built.</p>
                <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem,1.3vw,1.05rem)", color: "var(--text-muted)", lineHeight: 1.9 }}>Nine years of practice. One hundred and twenty projects. Every image a deliberate act of persuasion — crafted with cinematic precision, informed by genuine hospitality intelligence.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}.manifesto-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}@media(max-width:540px){.stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION HEADER — tightened top/bottom padding for better section rhythm
// ══════════════════════════════════════════════════════════════════════════
function SectionHeader({ index, label, headline, subheadline, body }: {
  index: string; label: string; headline: string; subheadline?: string; body?: string;
}) {
  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(4rem,6vw,6rem) clamp(2rem,7vw,8rem) clamp(2.5rem,3.5vw,3.5rem)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(3rem,6vw,8rem)" }} className="section-header-grid">
        <Reveal delay={0}>
          <div style={{ paddingTop: "0.4rem", flexShrink: 0 }}>
            <p style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontSize: "clamp(3rem,6vw,6rem)", color: "rgba(168,136,90,0.16)", lineHeight: 1, letterSpacing: "-0.02em", userSelect: "none" }}>{index}</p>
          </div>
        </Reveal>
        <div style={{ flex: 1 }}>
          <Reveal delay={0.05}>
            <div style={{ marginBottom: "1.6rem" }}><Eyebrow>{label}</Eyebrow></div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(2.1rem,4.5vw,4.8rem)", color: "var(--text-loud)", lineHeight: 1.06, letterSpacing: "-0.01em", maxWidth: "820px" }}>
              {headline}
              {subheadline && <span style={{ display: "block", color: "var(--text-mid)", fontStyle: "normal" }}>{subheadline}</span>}
            </h2>
          </Reveal>
          {body && (
            <Reveal delay={0.18}>
              <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem,1.2vw,1rem)", color: "var(--text-soft)", lineHeight: 1.9, maxWidth: "540px", marginTop: "1.8rem" }}>{body}</p>
            </Reveal>
          )}
          <div style={{ marginTop: "2rem" }}><GoldRule delay={0.28} width="clamp(60px,10vw,120px)" /></div>
        </div>
      </div>
      <style>{`.section-header-grid{flex-direction:row}@media(max-width:640px){.section-header-grid{flex-direction:column!important;gap:1.5rem!important}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// EDITORIAL GALLERY — drop-in rebuild
//
// • Image panel locked to a fixed frame so swapping/adding images never shifts
//   the layout (the core Change-2 problem).
// • objectFit: contain on espresso matting — the whole render is always
//   visible, never cropped; letterboxing reads as intentional gallery matting.
// • Subtle 3D depth transition (perspective + rotateY + scale), GPU-only,
//   with a prefers-reduced-motion fallback to a flat fade.
// • Click the main image → full-screen Lightbox with backdrop blur,
//   fade+scale entry, ← → / Esc keyboard nav, caption alongside.
// • Thumbnail strip uses contain on --bg-subtle so thumbs stay uniform.
// ══════════════════════════════════════════════════════════════════════════
// COVERFLOW GALLERY — 3D carousel.
// Center image large & flat-on; the two neighbours on each side recede in
// perspective (rotateY + translateZ + scale + dim), casting depth shadows on
// the espresso ground. Click center (or "Expand") → full-screen Lightbox.
// Drag / arrows / thumbnails to navigate. prefers-reduced-motion → flat fade.
// ══════════════════════════════════════════════════════════════════════════
// EDITORIAL GALLERY — refined split (one side image, one side caption).
// The luxury-house pattern (Apple / Rolex / Prada): one large, fully-visible
// render on espresso matting, a quiet caption opposite, alternating L/R per
// section. Motion is cinematic and restrained — a slow cross-dissolve with a
// breath of scale, a hairline gold system, and word-by-word caption reveal.
// Full uncropped image (contain). Click image → full-screen Lightbox.
// prefers-reduced-motion → instant, no transform.
// ══════════════════════════════════════════════════════════════════════════
function EditorialGallery({ slides, activeSlide, setActiveSlide, flip = false }: {
  slides: PortfolioSlide[];
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  flip?: boolean;
}) {
  const n = slides.length;
  const current = slides[activeSlide];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const prev = () => setActiveSlide(p => (p - 1 + n) % n);
  const next = () => setActiveSlide(p => (p + 1) % n);

  const imgInit  = reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 };
  const imgAnim  = reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 };
  const imgExit  = reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 };

  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.35fr 1fr",
        minHeight: "clamp(440px,52vw,680px)",
        direction: flip ? "rtl" : "ltr",
      }} className="editorial-grid">

        {/* ── Image side — full uncropped render, espresso matting ── */}
        <div style={{ position: "relative", overflow: "hidden", direction: "ltr", backgroundColor: "var(--bg)" }}>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open ${current.title} full screen`}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              padding: "clamp(1.5rem,3vw,3.5rem)", border: "none", background: "var(--bg)",
              cursor: "zoom-in", overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeSlide}
                  src={current.src}
                  alt={current.title}
                  initial={imgInit}
                  animate={imgAnim}
                  exit={imgExit}
                  transition={{ duration: 1.4, ease: EASE }}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "contain", objectPosition: "center",
                    display: "block", willChange: "transform, opacity",
                  }}
                />
              </AnimatePresence>
            </div>
          </button>

          {/* Hairline frame inset */}
          <div aria-hidden style={{ position: "absolute", inset: "clamp(1.5rem,3vw,3.5rem)", border: "1px solid rgba(168,136,90,0.14)", pointerEvents: "none" }} />

          {/* Counter — bottom left */}
          <div style={{ position: "absolute", bottom: "clamp(1.6rem,3vw,2.6rem)", left: "clamp(1.6rem,3vw,2.6rem)", display: "flex", alignItems: "center", gap: "0.7rem", zIndex: 4, pointerEvents: "none" }}>
            <span style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.7rem", fontWeight: 200, color: "var(--text-loud)", lineHeight: 1 }}>{String(activeSlide + 1).padStart(2, "0")}</span>
            <div style={{ width: "22px", height: "1px", backgroundColor: "rgba(168,136,90,0.5)" }} />
            <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", color: "var(--text-muted)", fontWeight: 300 }}>{String(n).padStart(2, "0")}</span>
          </div>

          {/* Expand hint — top right */}
          <div style={{ position: "absolute", top: "clamp(1.6rem,3vw,2.6rem)", right: "clamp(1.6rem,3vw,2.6rem)", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 4, pointerEvents: "none", opacity: 0.7 }}>
            <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-mid)", fontWeight: 400 }}>Expand</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
          </div>
        </div>

        {/* ── Caption side ── */}
        <div style={{
          backgroundColor: "var(--bg)",
          borderLeft: flip ? "none" : "1px solid var(--border)",
          borderRight: flip ? "1px solid var(--border)" : "none",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "clamp(3rem,5vw,5.5rem) clamp(2.2rem,4.5vw,5rem)",
          direction: "ltr",
        }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6rem" }}>
              <div style={{ width: "26px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6 }} />
              <h3 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, fontSize: "clamp(1.6rem,2.6vw,2.5rem)", color: "var(--text-loud)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>{current.title}</h3>
              <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem,1.1vw,1rem)", color: "var(--text-soft)", lineHeight: 1.9 }}>
                {current.desc.split(" ").map((word, wi) => (
                  <motion.span key={`${activeSlide}-${wi}`}
                    initial={reduceMotion ? { opacity: 1 } : { filter: "blur(6px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.18 + 0.014 * wi }}
                    style={{ display: "inline-block", marginRight: "0.26em" }}>{word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div>
            <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "1.6rem", position: "relative" }}>
              <motion.div style={{ position: "absolute", top: 0, left: 0, height: "100%", backgroundColor: "#A8885A", transformOrigin: "left" }}
                animate={{ scaleX: (activeSlide + 1) / n }}
                transition={{ duration: 0.7, ease: EASE_SOFT }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <ArrowButton onClick={prev} direction="prev" />
                <ArrowButton onClick={next} direction="next" />
              </div>
              <a href="/work"
                style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#A8885A", textDecoration: "none", borderBottom: "1px solid rgba(168,136,90,0.3)", paddingBottom: "2px", transition: "opacity 0.3s", fontWeight: 400 }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}>View All →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail strip — uniform contain framing */}
      <div style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)", padding: "1rem clamp(2rem,7vw,8rem)", display: "flex", gap: "0.4rem", overflowX: "auto", scrollbarWidth: "none" }}>
        {slides.map((s, i) => (
          <button key={i} onClick={() => setActiveSlide(i)} title={s.title} aria-label={`View ${s.title}`}
            style={{ flexShrink: 0, width: "clamp(48px,5.5vw,68px)", aspectRatio: "3/2", padding: 0, border: `1.5px solid ${i === activeSlide ? "#A8885A" : "transparent"}`, opacity: i === activeSlide ? 1 : 0.28, cursor: "pointer", background: "var(--bg-subtle)", overflow: "hidden", transition: "all 0.3s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = i === activeSlide ? "1" : "0.28"; }}>
            <img src={s.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
          </button>
        ))}
      </div>

      <Lightbox open={lightboxOpen} slides={slides} index={activeSlide} setIndex={setActiveSlide} onClose={() => setLightboxOpen(false)} />

      <style>{`.editorial-grid{grid-template-columns:1.35fr 1fr!important}@media(max-width:860px){.editorial-grid{grid-template-columns:1fr!important;direction:ltr!important;min-height:0!important}.editorial-grid>div:first-child{min-height:clamp(320px,75vw,460px)}}`}</style>
    </div>
  );
}

// ── Full-screen lightbox ────────────────────────────────────────────────────
// Backdrop blur, fade+scale entry, ← → / Esc keyboard nav, caption alongside.
function Lightbox({ open, slides, index, setIndex, onClose }: {
  open: boolean;
  slides: PortfolioSlide[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  const n = slides.length;
  const current = slides[index];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIndex(p => (p + 1) % n);
      else if (e.key === "ArrowLeft") setIndex(p => (p - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, n, onClose, setIndex]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_SOFT }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            backgroundColor: "rgba(20,15,10,0.82)",
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "clamp(1.5rem,5vw,4rem)",
          }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close full screen view"
            style={{
              position: "absolute", top: "clamp(1.2rem,3vw,2.2rem)", right: "clamp(1.2rem,3vw,2.2rem)",
              width: "44px", height: "44px", borderRadius: "50%",
              border: "1px solid rgba(168,136,90,0.45)", background: "transparent",
              color: "var(--text-loud)", cursor: "pointer", zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.3s, background-color 0.3s",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "#A8885A"; el.style.backgroundColor = "rgba(168,136,90,0.12)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(168,136,90,0.45)"; el.style.backgroundColor = "transparent"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={current.src}
                alt={current.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE_SOFT }}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
              />
            </AnimatePresence>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setIndex(p => (p - 1 + n) % n); }}
              aria-label="Previous image"
              style={lightboxArrowStyle("left")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#A8885A"; e.currentTarget.style.backgroundColor = "rgba(168,136,90,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(168,136,90,0.45)"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIndex(p => (p + 1) % n); }}
              aria-label="Next image"
              style={lightboxArrowStyle("right")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#A8885A"; e.currentTarget.style.backgroundColor = "rgba(168,136,90,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(168,136,90,0.45)"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          {/* Caption */}
          <div onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0, textAlign: "center", maxWidth: "640px", marginTop: "clamp(1.2rem,2.5vw,2rem)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", justifyContent: "center", marginBottom: "0.9rem" }}>
              <span style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.3rem", fontWeight: 200, color: "rgba(255,255,255,0.92)", lineHeight: 1 }}>{String(index + 1).padStart(2, "0")}</span>
              <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.28)" }} />
              <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{String(n).padStart(2, "0")}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, fontSize: "clamp(1.3rem,2vw,1.9rem)", color: "var(--text-loud)", lineHeight: 1.2, marginBottom: "0.7rem" }}>{current.title}</h3>
            <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.82rem,1vw,0.92rem)", color: "rgba(236,227,213,0.62)", lineHeight: 1.75 }}>{current.desc}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function lightboxArrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: "clamp(0.5rem,2vw,1.5rem)",
    width: "46px", height: "46px", borderRadius: "50%",
    border: "1px solid rgba(168,136,90,0.45)", background: "transparent",
    color: "var(--text-loud)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "border-color 0.3s, background-color 0.3s",
  };
}

function ArrowButton({ onClick, direction }: { onClick: () => void; direction: "prev" | "next" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} aria-label={direction === "prev" ? "Previous image" : "Next image"}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${hovered ? "#A8885A" : "var(--border)"}`, borderRadius: "50%", backgroundColor: hovered ? "#A8885A" : "transparent", color: hovered ? "var(--bg)" : "var(--text-mid)", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.3s ease", flexShrink: 0 }}>
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SERVICES — tightened header padding
// ══════════════════════════════════════════════════════════════════════════
function ServicesSection() {
  return (
    <section style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(2rem,7vw,8rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,8rem)", alignItems: "end", padding: "clamp(5rem,8vw,9rem) 0 clamp(3rem,4.5vw,5rem)", borderBottom: "1px solid var(--border)" }} className="services-header">
          <Reveal>
            <div style={{ marginBottom: "1.6rem" }}><Eyebrow>What We Deliver</Eyebrow></div>
            <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(2.5rem,5vw,5rem)", color: "var(--text-loud)", lineHeight: 1.0, letterSpacing: "-0.01em" }}>Services</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.92rem,1.2vw,1rem)", color: "var(--text-soft)", lineHeight: 1.85, maxWidth: "440px" }}>Full-spectrum visualisation for architecture and real estate. Every deliverable a considered composition — technically precise, atmospherically intentional, commercially decisive.</p>
          </Reveal>
        </div>
        <div>{SERVICES.map((svc, i) => <ServiceRow key={svc.n} svc={svc} delay={i * 0.06} />)}</div>
      </div>
      <style>{`.services-header{grid-template-columns:1fr 1fr!important}@media(max-width:700px){.services-header{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function ServiceRow({ svc, delay }: { svc: typeof SERVICES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 40px", gap: "clamp(1rem,3vw,4rem)", alignItems: "center", padding: "clamp(1.8rem,3vw,2.8rem) 0", borderBottom: "1px solid var(--border)", cursor: "default", transition: "background-color 0.4s ease", backgroundColor: hovered ? "rgba(168,136,90,0.025)" : "transparent" }} className="service-row">
        <span style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.16em", color: hovered ? "#A8885A" : "var(--text-muted)", fontWeight: 400, transition: "color 0.4s" }}>{svc.n}</span>
        <h3 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 300, fontSize: "clamp(1.25rem,2vw,1.85rem)", color: hovered ? "var(--text-loud)" : "var(--text-mid)", transition: "color 0.4s", letterSpacing: "-0.01em" }}>{svc.title}</h3>
        <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.85rem,1.1vw,0.92rem)", color: hovered ? "var(--text-soft)" : "var(--text-muted)", lineHeight: 1.8, transition: "color 0.4s" }}>{svc.desc}</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.span animate={{ x: hovered ? 6 : 0, color: hovered ? "#A8885A" : "var(--text-muted)" }} transition={{ duration: 0.35, ease: EASE_SOFT }} style={{ fontSize: "0.95rem", display: "block" }}>→</motion.span>
        </div>
      </div>
      <style>{`.service-row{grid-template-columns:80px 1fr 1fr 40px!important}@media(max-width:900px){.service-row{grid-template-columns:60px 1fr!important}.service-row p{display:none}}@media(max-width:540px){.service-row{grid-template-columns:1fr!important}.service-row span:first-child{display:none}}`}</style>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "clamp(440px,58vw,680px)" }} className="about-grid">
          <div style={{ padding: "clamp(4.5rem,7.5vw,8.5rem) clamp(2rem,7vw,8rem)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "-2rem", right: "-1rem", fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(12rem,18vw,22rem)", fontWeight: 200, fontStyle: "italic", color: "rgba(168,136,90,0.045)", lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em" }}>A</div>
            <Reveal>
              <div style={{ marginBottom: "2rem" }}><Eyebrow>The Studio</Eyebrow></div>
              <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontSize: "clamp(2rem,4.5vw,4.5rem)", color: "var(--text-loud)", lineHeight: 1.08, letterSpacing: "-0.01em", marginBottom: "2rem" }}>Architecture Rendered<br />with <em style={{ fontStyle: "italic", color: "var(--text-mid)" }}>Hospitality Intelligence.</em></h2>
              <GoldRule delay={0.2} width="40px" />
            </Reveal>
          </div>
          <div style={{ padding: "clamp(4.5rem,7.5vw,8.5rem) clamp(2rem,7vw,8rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal delay={0.1}>
              <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem,1.3vw,1.05rem)", color: "var(--text-soft)", lineHeight: 1.9, marginBottom: "1.8rem" }}>ArchViz Craft is a luxury architectural visualisation studio serving architects, developers, and interior designers across the Gulf and beyond. We bring nine years of regional expertise and a hospitality-trained eye to every project.</p>
              <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem,1.3vw,1.05rem)", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "3rem" }}>Every image is a deliberate composition. We do not document architecture — we argue for it. Fourteen countries. A hundred and twenty projects. One consistent standard.</p>
              <a href="/studio"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-dm),sans-serif", fontSize: "0.66rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-loud)", textDecoration: "none", borderBottom: "1px solid var(--border-mid)", paddingBottom: "3px", transition: "color 0.35s, border-color 0.35s", fontWeight: 400 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#A8885A"; el.style.borderBottomColor = "#A8885A"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-loud)"; el.style.borderBottomColor = "var(--border-mid)"; }}>
                Meet the Studio <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "currentColor" }} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`.about-grid{grid-template-columns:1fr 1fr!important}@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "clamp(500px,62vw,740px)" }} className="contact-grid">
          <div style={{ padding: "clamp(4.5rem,7.5vw,9rem) clamp(2rem,7vw,8rem)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Reveal>
              <div style={{ marginBottom: "2rem" }}><Eyebrow>Begin a Project</Eyebrow></div>
              <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontSize: "clamp(2.5rem,5vw,5.5rem)", color: "var(--text-loud)", lineHeight: 1.0, letterSpacing: "-0.02em" }}>Let us render<br /><em style={{ fontStyle: "italic", color: "var(--text-mid)" }}>your vision.</em></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "3rem" }}>
                {[
                  { label: "WhatsApp", value: "+971 52 278 3784", href: "https://wa.me/971522783784" },
                  { label: "Email", value: "archvizcraft.in@gmail.com", href: "mailto:archvizcraft.in@gmail.com" },
                  { label: "Location", value: "By Appointment · Dubai", href: undefined },
                ].map(item => (
                  <div key={item.label}>
                    <p style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 400, marginBottom: "0.6rem" }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(1.2rem,1.8vw,1.6rem)", fontWeight: 300, color: "var(--text-mid)", textDecoration: "none", transition: "color 0.35s", display: "block" }} onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-loud)"; }} onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}>{item.value}</a>
                      : <p style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(1.2rem,1.8vw,1.6rem)", fontWeight: 300, color: "var(--text-mid)" }}>{item.value}</p>}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div style={{ padding: "clamp(4.5rem,7.5vw,9rem) clamp(2rem,7vw,8rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                <div style={{ width: "36px", height: "1px", backgroundColor: "#A8885A", opacity: 0.6, marginBottom: "2rem" }} />
                <h3 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "var(--text-loud)", lineHeight: 1.2 }}>Thank you. We will be<br />in touch shortly.</h3>
              </motion.div>
            ) : (
              <Reveal delay={0.08}>
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
                  {(["name", "email"] as const).map(field => (
                    <div key={field}>
                      <label style={{ display: "block", fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 400, marginBottom: "0.75rem" }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <input type={field === "email" ? "email" : "text"} required value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                        style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--border)", padding: "0.6rem 0", fontSize: "1rem", color: "var(--text-loud)", outline: "none", fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, transition: "border-color 0.3s" }}
                        onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "#A8885A"; }}
                        onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--border)"; }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 400, marginBottom: "0.75rem" }}>Project Brief</label>
                    <textarea rows={4} required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--border)", padding: "0.6rem 0", fontSize: "1rem", color: "var(--text-loud)", outline: "none", resize: "none", fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, transition: "border-color 0.3s" }}
                      onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "#A8885A"; }}
                      onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = "var(--border)"; }} />
                  </div>
                  <SubmitButton />
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
      <style>{`.contact-grid{grid-template-columns:1fr 1fr!important}@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function SubmitButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button type="submit" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "1rem", padding: "0.95rem 2.6rem", backgroundColor: hovered ? "#A8885A" : "transparent", border: `1px solid ${hovered ? "#A8885A" : "var(--border)"}`, color: hovered ? "var(--bg)" : "var(--text-loud)", fontFamily: "var(--font-dm),sans-serif", fontSize: "0.66rem", letterSpacing: "0.26em", textTransform: "uppercase", fontWeight: 400, cursor: "pointer", transition: "all 0.4s ease" }}>
      Send Enquiry
      <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "currentColor", transition: "transform 0.35s ease", transform: hovered ? "translateX(4px)" : "translateX(0)" }} />
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CLOSING TESTIMONIALS — full marquee across ALL clients, split into two rows.
// ══════════════════════════════════════════════════════════════════════════
function ClosingTestimonials() {
  const half = Math.ceil(ALL_TESTIMONIALS.length / 2);
  return (
    <section style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)", paddingTop: "clamp(5rem,8vw,9rem)", paddingBottom: "clamp(5rem,8vw,9rem)", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "560px", height: "560px", background: "radial-gradient(ellipse at center, rgba(168,136,90,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 clamp(2rem,7vw,8rem)", marginBottom: "clamp(3rem,5vw,5rem)", textAlign: "center" }}>
        <Reveal delay={0}>
          <div style={{ marginBottom: "1.6rem", display: "flex", justifyContent: "center" }}><Eyebrow center>Client Voices</Eyebrow></div>
          <h2 style={{ fontFamily: "var(--font-cormorant),serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(2.2rem,4.5vw,5rem)", color: "var(--text-loud)", lineHeight: 1.06, letterSpacing: "-0.01em" }}>
            What architects <span style={{ color: "var(--text-mid)", fontStyle: "normal" }}>& developers say.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-dm),sans-serif", fontWeight: 300, fontSize: "clamp(0.92rem,1.2vw,1rem)", color: "var(--text-soft)", lineHeight: 1.85, maxWidth: "560px", margin: "1.8rem auto 0" }}>Across five continents, the studios and developers who choose ArchViz Craft return for the same reason: our work is indistinguishable from the finest architectural photography of finished spaces — made before construction begins.</p>
        </Reveal>
      </div>

      {/* Full marquee */}
      <TestimonialsMarquee row1={ALL_TESTIMONIALS.slice(0, half)} row2={ALL_TESTIMONIALS.slice(half)} />

      {/* CTA */}
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(3.5rem,5.5vw,5.5rem) clamp(2rem,7vw,8rem) 0", display: "flex", justifyContent: "center" }}>
        <Reveal delay={0.1}>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", justifyContent: "center", marginBottom: "1.8rem" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: "#A8885A", opacity: 0.3 }} />
              <p style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 400 }}>{ALL_TESTIMONIALS.length} verified client testimonials</p>
              <div style={{ width: "32px", height: "1px", backgroundColor: "#A8885A", opacity: 0.3 }} />
            </div>
            <a href="/#contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "1rem", fontFamily: "var(--font-dm),sans-serif", fontSize: "0.66rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-loud)", textDecoration: "none", border: "1px solid var(--border)", padding: "1.05rem 2.9rem", transition: "all 0.4s ease", fontWeight: 400 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "#A8885A"; el.style.borderColor = "#A8885A"; el.style.color = "var(--bg)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-loud)"; }}>
              Begin a Project <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "currentColor" }} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)", padding: "clamp(2.5rem,4vw,4rem) clamp(2rem,7vw,8rem)" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          {[{ label: "View Portfolio", href: "/work" }, { label: "The Studio", href: "/studio" }, { label: "Contact", href: "/#follow" }].map((link, i) => (
            <span key={link.label} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {i > 0 && <span style={{ color: "var(--border)", fontSize: "7px" }}>·</span>}
              <a href={link.href} style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none", fontWeight: 400, transition: "color 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#A8885A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}>{link.label}</a>
            </span>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-dm),sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--text-muted)", fontWeight: 300 }}>© {new Date().getFullYear()} ArchViz Craft · Dubai</p>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [activeBedroomSlide,  setActiveBedroomSlide]  = useState(0);
  const [activeKitchenSlide,  setActiveKitchenSlide]  = useState(0);
  const [activeLivingSlide,   setActiveLivingSlide]   = useState(0);
  const [activeVillaSlide,    setActiveVillaSlide]    = useState(0);
  const [activeWashroomSlide, setActiveWashroomSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveBedroomSlide(p => (p + 1) % BEDROOM_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-loud)" }}>
      {/* Film grain */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.028]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      {/* ── HERO (untouched) ── */}
      <Nav scrolled={false} />
      <Hero />

      <FeatureBlocks />

      <StatsManifesto />

      {/* 01 · BEDROOMS — EDITORIAL SPREAD (sample of new direction) */}
      <section id="bedrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <EditorialSpread
          slides={BEDROOM_SLIDES}
          index="01"
          kicker="Selected Work · Private Sanctuaries"
          title="Bedrooms"
          statement="The private suite, before the walls exist."
          heroCount={7}
        />
      </section>

      {/* 02 · KITCHENS — image RIGHT, caption LEFT */}
      <section id="kitchens" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader index="02" label="Culinary Theaters" headline="Where service intelligence" subheadline="becomes spatial architecture." body="A kitchen is not a room — it is an operational system. We render culinary spaces from a position of genuine hospitality knowledge: service flow, brigade movement, mise en place logic, and the psychology of the guest threshold." />
        <EditorialGallery slides={KITCHEN_SLIDES} activeSlide={activeKitchenSlide} setActiveSlide={setActiveKitchenSlide} flip={true} />
      </section>

      {/* 03 · LIVING SPACES — image LEFT, caption RIGHT */}
      <section id="living-spaces" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader index="03" label="Social Landscapes" headline="The living room as statement" subheadline="of how you receive the world." body="Every living space communicates a social register before a guest sits down. We render arrival sequences, conversation geometries, sightline hierarchies, and the emotional temperature of a room at its intended hour of use." />
        <EditorialGallery slides={LIVING_SPACE_SLIDES} activeSlide={activeLivingSlide} setActiveSlide={setActiveLivingSlide} flip={false} />
      </section>

      {/* 04 · WASHROOMS — image RIGHT, caption LEFT */}
      <section id="washrooms" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader index="04" label="Spa & Washrooms" headline="Where material craft" subheadline="becomes a private ceremony." body="The finest washrooms are not cleaned — they are entered. We render spa suites, hammams, and master bathrooms with the same hospitality intelligence applied to a five-star arrival sequence." />
        <EditorialGallery slides={WASHROOM_SLIDES} activeSlide={activeWashroomSlide} setActiveSlide={setActiveWashroomSlide} flip={true} />
      </section>

      {/* 05 · VILLAS & EXTERIORS — image LEFT, caption RIGHT */}
      <section id="villas-exteriors" style={{ borderBottom: "1px solid var(--border)" }}>
        <SectionHeader index="05" label="Villas & Exteriors" headline="Architecture in landscape," subheadline="before the first stone is laid." body="The exterior render is the most complex visualisation we produce — site topography, seasonal light, material ageing, landscape maturity, and the psychology of arrival all rendered in a single frame." />
        <EditorialGallery slides={VILLA_EXTERIOR_SLIDES} activeSlide={activeVillaSlide} setActiveSlide={setActiveVillaSlide} flip={false} />
      </section>

      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <ClosingTestimonials />
      <SocialRow />
      <Footer />
      <FloatingContact />
    </div>
  );
}