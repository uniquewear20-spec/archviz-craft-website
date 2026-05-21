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

      {/* Dark overlay — matches iCreate depth */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* ── CENTERED CONTENT — iCreate style ── */}
      {mounted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

          {/* Main headline */}
          <motion.h1
            className="font-serif text-white font-light leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 7vw, 7rem)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The Power Of
            <br />
            3D Visualisation
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-sans text-white/75 font-light mt-5 tracking-wide"
            style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Presenting new developments before they&apos;re built
          </motion.p>

          {/* CTA button — matches iCreate */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 text-white font-sans text-sm font-light tracking-[0.12em] px-8 py-4 transition-all duration-500 backdrop-blur-sm"
            >
              See our work
              <span className="text-lg">›</span>
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
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}