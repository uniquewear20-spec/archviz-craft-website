"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { id: 1, src: "/hero-1.png" },
  { id: 2, src: "/hero-2.png" },
  { id: 3, src: "/hero-3.png" },
  { id: 4, src: "/hero-4.png" },
  { id: 5, src: "/hero-5.png" },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setIndex((p) => (p + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">

      {/* ── BACKGROUND SLIDESHOW ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[index].id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          >
            <Image
              src={slides[index].src}
              alt="Archviz Craft"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* ── CONTENT ── */}
      {mounted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

          {/* Status pill — like Zenith's "By application only" */}
          <motion.div
            className="flex items-center gap-2 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8885A] animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-white/50 font-light">
              By Appointment Only · Dubai
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-serif text-white font-light leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            The Power Of
            <br />
            <span style={{ color: "#A8885A", fontStyle: "italic" }}>
              3D Visualisation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-sans text-white/60 font-light mt-6 tracking-wide max-w-md"
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Presenting new developments before they&apos;re built
          </motion.p>

          {/* CTAs — Zenith style: filled gold + ghost */}
          <motion.div
            className="mt-12 flex items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-400"
              style={{ backgroundColor: "#A8885A", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8C6E42")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#A8885A")}
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
            >
              Enquire Now →
            </a>
          </motion.div>

          {/* Slide dots */}
          <motion.div
            className="absolute bottom-10 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-6 h-1.5"
                    : "w-1.5 h-1.5 hover:bg-white/60"
                }`}
                style={{
                  backgroundColor: i === index ? "#A8885A" : "rgba(255,255,255,0.3)"
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}