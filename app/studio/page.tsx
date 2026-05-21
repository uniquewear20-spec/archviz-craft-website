"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav";

const EASE_ENTER: [number, number, number, number] = [0.16, 1, 0.3, 1];

const skills = [
  "Unreal Engine",
  "3ds Max",
  "Corona Renderer",
  "V-Ray",
  "Advanced Lighting",
  "Material Composition",
  "Cinematic Animation",
  "Photorealistic Rendering",
];

export default function StudioPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#080808", color: "#F0EBE3" }}
    >
      <Nav scrolled={false} />

      {/* ── Hero split ───────────────────────────────────────────── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT — Portrait (static, no parallax) */}
        <div className="relative overflow-hidden" style={{ minHeight: "100vh" }}>

          {/* Grain overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Static image — no motion wrapper, fills container cleanly */}
          <div className="absolute inset-0 group">
            <Image
              src="/images/wasim-akram.jpg"
              alt="Wasim Akram — Senior 3D Visualizer"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0"
              style={{ objectPosition: "center 10%" }}
            />

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 z-20"
              style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }}
            />

            {/* Right-edge fade — desktop only */}
            <div
              className="hidden lg:block absolute top-0 right-0 bottom-0 w-40 z-20"
              style={{ background: "linear-gradient(to left, #080808 0%, transparent 100%)" }}
            />

            {/* Top gradient — keeps nav readable */}
            <div
              className="absolute top-0 left-0 right-0 h-32 z-20"
              style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 100%)" }}
            />
          </div>

          {/* THE STUDIO label */}
          <motion.div
            className="absolute bottom-10 left-10 z-30"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: EASE_ENTER }}
          >
            <span
              className="font-sans text-[9px] tracking-[0.44em] uppercase font-light"
              style={{ color: "#A8885A" }}
            >
              The Studio
            </span>
          </motion.div>
        </div>

        {/* RIGHT — Biography, pushed further right with more padding */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 xl:px-24 py-32 lg:py-40">

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE_ENTER }}
          >
            <h1
              className="font-serif font-extralight leading-[1.0] tracking-tight mb-1"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: "#F0EBE3" }}
            >
              Wasim
            </h1>
            <h1
              className="font-serif font-extralight leading-[1.0] tracking-tight"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                color: "#A8885A",
                fontStyle: "italic",
              }}
            >
              Akram
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="font-sans font-light uppercase mt-5 mb-8"
            style={{ fontSize: "0.68rem", color: "#6B6560", letterSpacing: "0.22em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.45, ease: EASE_ENTER }}
          >
            Senior 3D Visualizer &amp; Interior Designer
          </motion.p>

          {/* Gold hairline */}
          <motion.div
            className="mb-10 origin-left"
            style={{ height: "1px", backgroundColor: "#A8885A", width: "48px" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_ENTER }}
          />

          {/* Biography */}
          <motion.p
            className="font-sans font-light leading-[1.85] mb-12"
            style={{
              fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
              color: "#9A948E",
              maxWidth: "480px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: EASE_ENTER }}
          >
            Senior 3D Visualizer &amp; Interior Designer with over 12 years of global experience,
            including 4+ years in the high-end UAE market. I specialize in crafting photorealistic
            architectural visualizations and cinematic animations for luxury villas, commercial
            spaces, and large-scale apartments. I bridge the gap between technical precision and
            artistic storytelling using a powerful tech stack including Unreal Engine, 3ds Max,
            Corona, and V-Ray. My expertise lies in advanced lighting, material composition, and
            creating immersive environments that bring unbuilt architecture to life.
          </motion.p>

          {/* Skills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.85, ease: EASE_ENTER }}
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-sans text-[9px] tracking-[0.14em] uppercase font-light px-3 py-1.5 transition-colors duration-300 cursor-default"
                style={{ border: "1px solid #2A2520", color: "#6B6560" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.borderColor = "#A8885A";
                  el.style.color = "#A8885A";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.borderColor = "#2A2520";
                  el.style.color = "#6B6560";
                }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy strip ──────────────────────────────────────── */}
      <motion.section
        className="px-8 md:px-16 lg:px-24 py-24"
        style={{ borderTop: "1px solid #1C1916" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.0, ease: EASE_ENTER }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="font-sans text-[9px] tracking-[0.44em] uppercase font-light block mb-8"
            style={{ color: "#A8885A" }}
          >
            Philosophy
          </span>
          <blockquote
            className="font-serif font-extralight leading-[1.4] italic"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#F0EBE3" }}
          >
            &ldquo;Architecture exists first in the imagination. My role is to make that vision
            undeniable — before a single foundation is poured.&rdquo;
          </blockquote>
          <div className="h-px w-10 mx-auto mt-10" style={{ backgroundColor: "#2A2520" }} />
        </div>
      </motion.section>

      {/* ── Footer strip ─────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-16 lg:px-24 py-8 flex items-center justify-between"
        style={{ borderTop: "1px solid #1C1916" }}
      >
        <a
          href="/"
          className="font-sans text-[9px] tracking-[0.28em] uppercase font-light transition-colors duration-300"
          style={{ color: "#4A4540" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#A8885A")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#4A4540")}
        >
          ← Back to Home
        </a>
        <p className="font-sans text-[9px] font-light tracking-wide" style={{ color: "#2A2520" }}>
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>
    </div>
  );
}