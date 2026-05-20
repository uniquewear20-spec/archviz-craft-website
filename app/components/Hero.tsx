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
  { id: 1, src: "/hero-1.png", motion: { scale: [1, 1.15] as number[], x: [0, -20] as number[] } },
  { id: 2, src: "/hero-2.png", motion: { scale: [1.15, 1] as number[], y: [-20, 0] as number[] } },
  { id: 3, src: "/hero-3.png", motion: { x: [-40, 40] as number[] } },
  { id: 4, src: "/hero-4.png", motion: { scale: [1.05, 1.12] as number[], y: [10, -10] as number[] } },
  { id: 5, src: "/hero-5.png", motion: { scale: [1.1, 1] as number[], x: [20, 0] as number[] } },
];

const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.0, 1.0];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
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
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={slides[index].src}
                alt="Architectural Visualization"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.p
          className="text-white/40 text-[9px] tracking-[0.35em] uppercase mb-8 font-light font-sans"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: LUXURY_EASE, delay: 1.0 }}
        >
          Architectural Visualisation Studio
        </motion.p>

        <motion.h1
          className="text-white font-light leading-none tracking-[0.08em] uppercase font-serif"
          style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, ease: LUXURY_EASE, delay: 1.2 }}
        >
          Archviz
          <br />
          <span className="italic text-white/55">Craft</span>
        </motion.h1>

        <motion.div
          className="w-px bg-white/20 mt-10 mb-8"
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ duration: 1.4, ease: LUXURY_EASE, delay: 2.0 }}
        />

        <motion.p
          className="text-white/30 text-[10px] tracking-[0.28em] uppercase font-light font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: LUXURY_EASE, delay: 2.2 }}
        >
          Light · Geometry · Atmosphere
        </motion.p>

        {/* Slide indicators */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-px overflow-hidden transition-all duration-700"
              style={{ width: i === index ? 32 : 16 }}
            >
              <span className="absolute inset-0 bg-white/20" />
              {i === index && (
                <motion.span
                  className="absolute inset-0 bg-white/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 7, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}