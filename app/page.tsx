"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { portfolioImages } from "./data/gallery";
const EASE = [0.16, 1, 0.3, 1];
const GOLD = "#A8885A";
export default function HomePage() {
  const bedroomImages = portfolioImages.filter((img) => img.category === "bedrooms");
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808", color: "#F0EBE3" }}>
      <Nav scrolled={false} />
      <Hero />
      <section className="px-8 md:px-16 lg:px-24 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mb-14">
          <span className="font-sans text-[9px] tracking-[0.5em] uppercase font-light block mb-4" style={{ color: GOLD }}>01. Bedrooms — Private Sanctuaries</span>
          <p className="font-serif fonextralight italic leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "#71717a", maxWidth: "560px" }}>Each bedroom is a study in controlled absence — where light enters not to illuminate, but to reveal.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bedroomImages.map((img, i) => (
            <motion.div key={img.src} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }} className="group relative overflow-hidden bg-zinc-900" style={{ aspectRatio: "4/5" }}>
              <Image src={img.src} alt="Luxury Bedroom" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <a href="/work" className="font-sans text-[10px] tracking-[0.3em] uppercase font-light" style={{ color: GOLD, borderBottom: "1px solid #A8885A", paddingBottom: "2px" }}>View Full Portfolio</a>
        </div>
      </section>
      <footer className="px-8 md:px-16 lg:px-24 py-8 flex items-center justify-between" style={{ borderTop: "1px solid #1C1916" }}>
        <a href="/work" className="font-sans text-[9px] tracking-[0.28em] uppercase font-light" style={{ color: "#4A4540" }}>View Portfolio</a>
        <p className="font-sans text-[9px] font-light tracking-wide" style={{ color: "#2A2520" }}>{new Date().getFullYear()} Archviz Craft Dubai</p>
      </footer>
    </div>
  );
}