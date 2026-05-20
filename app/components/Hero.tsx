"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    src: "/hero-1.png",
    label: "Meridian Residence",
    category: "Residential",
    motion: { scale: [1, 1.15] as number[], x: [0, -20] as number[] },
  },
  {
    id: 2,
    src: "/hero-2.png",
    label: "Solstice Tower",
    category: "Commercial",
    motion: { scale: [1.15, 1] as number[], y: [-20, 0] as number[] },
  },
  {
    id: 3,
    src: "/hero-3.png",
    label: "The Atrium",
    category: "Interior",
    motion: { x: [-40, 40] as number[] },
  },
  {
    id: 4,
    src: "/hero-4.png",
    label: "Coastal Pavilion",
    category: "Landscape",
    motion: { scale: [1.05, 1.12] as number[], y: [10, -10] as number[] },
  },
  {
    id: 5,
    src: "/hero-5.png",
    label: "Void House",
    category: "Residential",
    motion: { scale: [1.1, 1] as number[], x: [20, 0] as number[] },
  },
];

const SLIDE_DURATION = 7000;
const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.0, 1.0];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#0a0a08] overflow-hidden">

      {/* ── SLIDESHOW ── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
  animate={slides[index].motion}
  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
  transition={{
                duration: SLIDE_DURATION / 1000,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={slides[index].src}
                alt={slides[index].label}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/80 via-[#0a0a08]/15 to-[#0a0a08]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a08]/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-between h-screen px-6 md:px-16 lg:px-24 py-32 md:py-40"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Top label */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: LUXURY_EASE, delay: 1.0 }}
        >
          <div className="h-px w-8 bg-stone-600" />
          <p className="text-white/40 text-[9px] tracking-[0.35em] uppercase font-light font-sans">
            Architectural Visualisation Studio
          </p>
        </motion.div>

        {/* Center headline */}
        <div>
          <motion.p
            className="font-sans text-[9px] tracking-[0.28em] uppercase text-stone-500 font-light mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: LUXURY_EASE, delay: 1.1 }}
          >
            Dubai · UAE
          </motion.p>

          <motion.h1
            className="font-serif font-light leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(3.2rem, 9vw, 9rem)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.0, ease: LUXURY_EASE, delay: 1.2 }}
          >
            Where Architecture
            <br />
            <em className="not-italic text-white/50">Meets Vision</em>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            className="w-px bg-white/15 my-8"
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 1.4, ease: LUXURY_EASE, delay: 2.0 }}
          />

          {/* Tagline */}
          <motion.p
            className="text-white/30 text-[10px] tracking-[0.28em] uppercase font-light font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: LUXURY_EASE, delay: 2.2 }}
          >
            Light · Geometry · Atmosphere
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 2.4 }}
          >
            <a
              href="#work"
              className="font-sans text-[9px] tracking-[0.22em] uppercase text-stone-200 border border-stone-600 hover:border-stone-300 hover:text-white px-8 py-3 transition-all duration-500"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="font-sans text-[9px] tracking-[0.22em] uppercase text-stone-500 hover:text-stone-300 transition-colors duration-300 flex items-center gap-3"
            >
              Start a Project
              <div className="h-px w-8 bg-stone-700" />
            </a>
          </motion.div>
        </div>

        {/* Bottom bar — slide info + progress */}
        <div className="flex items-end justify-between">

          {/* Current slide label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="flex flex-col gap-1"
            >
              <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-stone-600 font-light">
                {slides[index].category}
              </p>
              <p className="font-serif text-stone-400 text-sm font-light tracking-wide">
                {slides[index].label}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicators + counter */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="relative h-px overflow-hidden transition-all duration-700"
                style={{ width: i === index ? 36 : 16 }}
              >
                <span className="absolute inset-0 bg-white/15" />
                {i === index && (
                  <motion.span
                    className="absolute inset-0 bg-white/60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: SLIDE_DURATION / 1000,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}

            <p className="font-sans text-[9px] text-stone-600 tracking-widest ml-2 font-light">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 3.0 }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-stone-700 animate-pulse" />
      </motion.div>
    </section>
  );
}