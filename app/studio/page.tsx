"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav";

const EASE_ENTER = [0.16, 1, 0.3, 1];
const skills = ["Unreal Engine","3ds Max","Corona Renderer","V-Ray","Advanced Lighting","Material Composition","Cinematic Animation","Photorealistic Rendering"];
const stats = [{value:"12+",label:"Years Experience"},{value:"4+",label:"Years in UAE"},{value:"200+",label:"Projects Delivered"},{value:"3",label:"Continents"}];

export default function StudioPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: "#080808", color: "#F0EBE3" }}>
      <Nav scrolled={true} />
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
          <motion.div className="absolute inset-0 group" style={{ y: imgY }}>
            <Image src="/images/wasim-akram.jpg" alt="Wasim Akram" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0" style={{ objectPosition: "center 10%" }} />
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20" style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }} />
            <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-32 z-20" style={{ background: "linear-gradient(to left, #080808 0%, transparent 100%)" }} />
          </motion.div>
          <motion.div className="absolute bottom-10 left-8 z-30" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, delay: 0.3 }}>
            <span className="font-sans text-[9px] tracking-[0.44em] uppercase font-light" style={{ color: "#A8885A" }}>The Studio</span>
          </motion.div>
        </div>
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-24 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
            <h1 className="font-serif font-extralight leading-[1.0] tracking-tight mb-1" style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: "#F0EBE3" }}>Wasim</h1>
            <h1 className="font-serif font-extralight leading-[1.0] tracking-tight" style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: "#A8885A", fontStyle: "italic" }}>Akram</h1>
          </motion.div>
          <motion.p className="font-sans font-light tracking-[0.12em] uppercase mt-5 mb-8" style={{ fontSize: "0.68rem", color: "#6B6560" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.45 }}>Senior 3D Visualizer and Interior Designer</motion.p>
          <motion.div className="mb-10 origin-left" style={{ height: "1px", backgroundColor: "#A8885A", width: "48px" }} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
          <motion.p className="font-sans font-light leading-[1.85] mb-12" style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", color: "#9A948E", maxWidth: "520px" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.7 }}>Senior 3D Visualizer and Interior Designer with over 12 years of global experience, including 4+ years in the high-end UAE market. I specialize in crafting photorealistic architectural visualizations and cinematic animations for luxury villas, commercial spaces, and large-scale apartments.</motion.p>
          <motion.div className="flex flex-wrap gap-2 mb-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.85 }}>
            {skills.map((skill) => (
              <span key={skill} className="font-sans text-[9px] tracking-[0.14em] uppercase font-light px-3 py-1.5" style={{ border: "1px solid #2A2520", color: "#6B6560" }}>{skill}</span>
            ))}
          </motion.div>
          <motion.div className="grid grid-cols-4 gap-4" style={{ borderTop: "1px solid #1C1916", paddingTop: "2rem" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 1.0 }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-serif font-extralight" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#A8885A" }}>{value}</span>
                <span className="font-sans font-light tracking-[0.12em] uppercase" style={{ fontSize: "0.6rem", color: "#4A4540" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <motion.section className="px-8 md:px-16 lg:px-24 py-24" style={{ borderTop: "1px solid #1C1916" }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans text-[9px] tracking-[0.44em] uppercase font-light block mb-8" style={{ color: "#A8885A" }}>Philosophy</span>
          <blockquote className="font-serif font-extralight leading-[1.4] italic" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#F0EBE3" }}>Architecture exists first in the imagination. My role is to make that vision undeniable before a single foundation is poured.</blockquote>
        </div>
      </motion.section>
      <footer className="px-8 md:px-16 lg:px-24 py-8 flex items-center justify-between" style={{ borderTop: "1px solid #1C1916" }}>
        <a href="/" className="font-sans text-[9px] tracking-[0.28em] uppercase font-light" style={{ color: "#4A4540" }}>Back to Home</a>
        <p className="font-sans text-[9px] font-light tracking-wide" style={{ color: "#2A2520" }}>{new Date().getFullYear()} Archviz Craft Dubai</p>
      </footer>
    </div>
  );
}