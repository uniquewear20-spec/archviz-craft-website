"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav";

const skills = ["Unreal Engine","3ds Max","Corona Renderer","V-Ray","Advanced Lighting","Material Composition","Cinematic Animation","Photorealistic Rendering"];

export default function StudioPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808", color: "#F0EBE3" }}>
      <Nav scrolled={true} />
      <div style={{ paddingTop: "100px" }}>
        <section className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "90vh" }}>
          <div className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
            <Image src="/images/wasim-akram.jpg" alt="Wasim Akram" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" style={{ objectPosition: "center 10%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #080808 0%, transparent 60%)" }} />
            <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-32" style={{ background: "linear-gradient(to left, #080808 0%, transparent 100%)" }} />
            <div className="absolute bottom-10 left-8 z-10">
              <span className="font-sans font-light tracking-[0.44em] uppercase" style={{ fontSize: "0.6rem", color: "#A8885A" }}>The Studio</span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
              <h1 className="font-serif font-extralight leading-none" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", color: "#F0EBE3" }}>Wasim</h1>
              <h1 className="font-serif font-extralight leading-none italic" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", color: "#A8885A" }}>Akram</h1>
            </motion.div>
            <motion.p
              className="font-sans font-light uppercase mt-5 mb-2"
              style={{ fontSize: "0.68rem", color: "#6B6560", letterSpacing: "0.12em" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.45 }}
            >Senior 3D Visualizer &amp; Interior Designer</motion.p>
            <div className="mb-8 mt-6" style={{ height: "1px", backgroundColor: "#A8885A", width: "48px" }} />
            <motion.p
              className="font-sans font-light leading-relaxed mb-10"
              style={{ fontSize: "clamp(0.85rem,1.1vw,0.95rem)", color: "#9A948E", maxWidth: "520px" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.7 }}
            >Senior 3D Visualizer and Interior Designer with over 12 years of global experience, including 4+ years in the high-end UAE market. I specialize in crafting photorealistic architectural visualizations and cinematic animations for luxury villas, commercial spaces, and large-scale apartments.</motion.p>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.85 }}
            >
              {skills.map((s) => (
                <span key={s} className="font-sans font-light px-3 py-1.5 uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.14em", border: "1px solid #2A2520", color: "#6B6560" }}>{s}</span>
              ))}
            </motion.div>
          </div>
        </section>
        <motion.section
          className="px-8 md:px-16 lg:px-24 py-24"
          style={{ borderTop: "1px solid #1C1916" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans font-light uppercase block mb-8" style={{ fontSize: "0.6rem", color: "#A8885A", letterSpacing: "0.44em" }}>Philosophy</span>
            <blockquote className="font-serif font-extralight leading-snug italic" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "#F0EBE3" }}>Architecture exists first in the imagination. My role is to make that vision undeniable before a single foundation is poured.</blockquote>
          </div>
        </motion.section>
      </div>
      <footer className="px-8 md:px-16 lg:px-24 py-8 flex items-center justify-between" style={{ borderTop: "1px solid #1C1916" }}>
        <a href="/" className="font-sans font-light uppercase" style={{ fontSize: "0.6rem", color: "#4A4540", letterSpacing: "0.3em" }}>Back to Home</a>
        <p className="font-sans font-light" style={{ fontSize: "0.6rem", color: "#2A2520" }}>{new Date().getFullYear()} Archviz Craft Dubai</p>
      </footer>
    </div>
  );
}
