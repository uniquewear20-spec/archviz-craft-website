"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const slides = [
  { id: 1, src: "/hero-1.png", label: "Meridian Residence", category: "Residential" },
  { id: 2, src: "/hero-2.png", label: "Solstice Tower", category: "Commercial" },
  { id: 3, src: "/hero-3.png", label: "The Atrium", category: "Interior" },
  { id: 4, src: "/hero-4.png", label: "Coastal Pavilion", category: "Landscape" },
  { id: 5, src: "/hero-5.png", label: "Void House", category: "Residential" },
];

const SLIDE_DURATION = 7000;
const EASE: [number, number, number, number] = [0.25, 0.1, 0.0, 1.0];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#0a0a08] overflow-hidden">

      {/* ── IMAGE SLIDESHOW ── */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={slides[index].id}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          >
            {/* Ken Burns wrapper — must have explicit w/h */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.15 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].label}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center center" }}
              />
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/85 via-[#0a0a08]/20 to-[#0a0a08]/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a08]/55 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CONTENT ── */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-between px-6 md:px-16 lg:px-24 pt-28 pb-10 md:pt-36 md:pb-12"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Top */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.8 }}
          >
            <div className="h-px w-8 bg-stone-600" />
            <p className="text-white/40 text-[9px] tracking-[0.35em] uppercase font-light font-sans">
              Architectural Visualisation Studio · Dubai
            </p>
          </motion.div>

          {/* Middle */}
          <div className="flex flex-col gap-6 max-w-5xl">
            <motion.p
              className="font-sans text-[9px] tracking-[0.28em] uppercase text-stone-500 font-light"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: EASE, delay: 1.0 }}
            >
              Est. Dubai · UAE
            </motion.p>

            <motion.h1
              className="font-serif font-light leading-[1.02] tracking-tight text-white"
              style={{ fontSize: "clamp(2.8rem, 8vw, 8.5rem)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.0, ease: EASE, delay: 1.1 }}
            >
              Where Architecture
              <br />
              <span className="text-white/45 italic">Meets Vision</span>
            </motion.h1>

            <motion.div
              className="w-px bg-white/12"
              initial={{ height: 0 }}
              animate={{ height: 44 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1.9 }}
            />

            <motion.p
              className="text-white/28 text-[10px] tracking-[0.28em] uppercase font-light font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 2.1 }}
            >
              Light · Geometry · Atmosphere
            </motion.p>

            <motion.div
              className="flex items-center gap-6 mt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 2.3 }}
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

          {/* Bottom bar */}
          <div className="flex items-end justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
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
                  className="relative h-px overflow-hidden transition-all duration-700 cursor-pointer"
                  style={{ width: i === index ? 36 : 16 }}
                >
                  <span className="absolute inset-0 bg-white/15" />
                  {i === index && (
                    <motion.span
                      className="absolute inset-0 bg-white/60"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </button>
              ))}
              <p className="font-sans text-[9px] text-stone-600 tracking-widest ml-2 font-light">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          className="w-px bg-gradient-to-b from-transparent to-stone-600"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          transition={{ duration: 1.0, delay: 3.2 }}
        />
      </div>
    </section>
  );
}