"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#A8885A";

const bedroomSlides = [
  { src: "/images/gallery/bedrooms/elegant-master-bedroom1.png", quote: "The morning light in our master suite looked like a photograph, not a render.", author: "Sarah Jenkins", role: "Principal, Jenkins Howe Interiors — London" },
  { src: "/images/gallery/bedrooms/elegant-master-bedroom3.png", quote: "Their visualizations became the investment deck. Three anchor investors cited the imagery specifically.", author: "Marcello Rossi", role: "Development Director, Rossi Hospitality Group — Dubai" },
  { src: "/images/gallery/bedrooms/elegant-master-bedroom5.png", quote: "Indistinguishable from photography of a completed space.", author: "Elena Rodriguez", role: "Founder, Studio Elara — Abu Dhabi" },
];

export default function HomePage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % bedroomSlides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const prev = () => setActive((p) => (p - 1 + bedroomSlides.length) % bedroomSlides.length);
  const next = () => setActive((p) => (p + 1) % bedroomSlides.length);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808", color: "#F0EBE3" }}>
      <Nav scrolled={false} />
      <Hero />
      <section className="px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(6rem,10vw,10rem)", paddingBottom: "clamp(6rem,10vw,10rem)" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1 }} className="mb-16">
          <span className="block font-sans font-light uppercase mb-6" style={{ fontSize: "clamp(0.6rem,0.9vw,0.75rem)", color: GOLD, letterSpacing: "0.45em" }}>01. BEDROOMS — PRIVATE SANCTUARIES</span>
          <h2 className="font-serif italic font-extralight leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,4.2rem)", color: "#F0EBE3", maxWidth: "900px" }}>Each bedroom is a study in controlled absence — where light enters not to illuminate, but to reveal.</h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} className="origin-left mt-10" style={{ height: "1px", width: "clamp(80px,12vw,160px)", backgroundColor: GOLD, opacity: 0.5 }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.15 }} className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "75vh" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 1.0 }} className="absolute inset-0">
              <Image src={bedroomSlides[active].src} alt="Luxury Bedroom" fill sizes="100vw" className="object-cover" priority />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div key={active + "-quote"} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.7 }}>
                <p className="font-serif italic font-light mb-3" style={{ fontSize: "clamp(1rem,2vw,1.5rem)", color: "#F0EBE3", maxWidth: "680px", lineHeight: 1.4 }}>“{bedroomSlides[active].quote}”</p>
                <p className="font-sans font-light" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: GOLD }}>— {bedroomSlides[active].author}, {bedroomSlides[active].role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-8 right-10 flex gap-3">
            <button onClick={prev} className="flex items-center justify-center" style={{ width: "44px", height: "44px", border: "1px solid rgba(168,136,90,0.4)", color: "#F0EBE3", backgroundColor: "rgba(28,25,22,0.7)", fontSize: "1rem", cursor: "pointer" }}>←</button>
            <button onClick={next} className="flex items-center justify-center" style={{ width: "44px", height: "44px", border: "1px solid rgba(168,136,90,0.4)", color: "#F0EBE3", backgroundColor: "rgba(28,25,22,0.7)", fontSize: "1rem", cursor: "pointer" }}>→</button>
          </div>
          <div className="absolute top-6 right-10 flex gap-2">
            {bedroomSlides.map((_, i) => (<button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "24px" : "6px", height: "2px", backgroundColor: i === active ? GOLD : "rgba(240,235,227,0.3)", transition: "all 0.4s ease", border: "none", padding: 0, cursor: "pointer" }} />))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-16">
          <a href="/work" className="inline-flex items-center gap-4 font-sans font-light tracking-[0.35em] uppercase" style={{ fontSize: "clamp(0.6rem,0.85vw,0.72rem)", color: GOLD }}>
            <span style={{ borderBottom: "1px solid #A8885A", paddingBottom: "2px" }}>View Full Portfolio</span>
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: GOLD }} />
          </a>
        </motion.div>
      </section>
      <footer className="px-8 md:px-16 lg:px-24 py-10 flex items-center justify-between" style={{ borderTop: "1px solid #1A1714" }}>
        <a href="/work" className="font-sans font-light tracking-[0.3em] uppercase" style={{ fontSize: "0.6rem", color: "#3A342E" }}>View Portfolio</a>
        <p className="font-sans font-light tracking-wide" style={{ fontSize: "0.6rem", color: "#2A2520" }}>{new Date().getFullYear()} Archviz Craft Dubai</p>
      </footer>
    </div>
  );
}
