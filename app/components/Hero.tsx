"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { id: 1, src: "/hero-1.png", effect: "zoom-in" },
  { id: 2, src: "/hero-2.png", effect: "zoom-out" },
  { id: 3, src: "/hero-3.png", effect: "slide-right" },
  { id: 4, src: "/hero-4.png", effect: "slide-left" },
  { id: 5, src: "/hero-5.png", effect: "zoom-in" },
];

const SLIDE_DURATION = 6000;

function getMotionProps(effect: string) {
  switch (effect) {
    case "zoom-in":
      return { initial: { scale: 1.0, x: 0 }, animate: { scale: 1.08, x: 0 } };
    case "zoom-out":
      return { initial: { scale: 1.1, x: 0 }, animate: { scale: 1.0, x: 0 } };
    case "slide-right":
      return { initial: { scale: 1.05, x: "-3%" }, animate: { scale: 1.05, x: "0%" } };
    case "slide-left":
      return { initial: { scale: 1.05, x: "3%" }, animate: { scale: 1.05, x: "0%" } };
    default:
      return { initial: { scale: 1.0, x: 0 }, animate: { scale: 1.06, x: 0 } };
  }
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(
      () => setIndex((p) => (p + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];
  const motionProps = getMotionProps(slide.effect);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">

      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt="Archviz Craft"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 z-10" />

      {mounted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

          {/* Eyebrow tag */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8885A] animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-white/50 font-light">
              By Appointment Only · Dubai
            </span>
          </motion.div>

          {/* Headline — line 1: large, white, bold serif */}
          <motion.h1
            className="font-serif font-bold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-white">The Power of Architectural</span>
            {/* Line 2: gold italic, same large size — matches Zenith's second line treatment */}
            <span
              className="block font-serif font-bold italic"
              style={{ color: "#A8885A", fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Visualization
            </span>
          </motion.h1>

          {/* Subtitle — centred, no side decorators, matches Zenith's clean subtitle */}
          <motion.p
            className="font-sans text-white/70 font-light tracking-wide mt-6 max-w-xl"
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Bringing visionary developments to life before construction begins
          </motion.p>

          {/* Hairline divider below subtitle */}
          <motion.div
            className="mt-6 h-px w-16"
            style={{ backgroundColor: "#A8885A" }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* CTA — moved further down with extra top margin */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 font-sans text-white font-light tracking-[0.12em] text-sm px-10 py-4 transition-all duration-300"
              style={{ backgroundColor: "#A8885A" }}
              onMouseEnter={function(e) {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#8C6E42";
              }}
              onMouseLeave={function(e) {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#A8885A";
              }}
            >
              See our work
              <span className="text-lg font-light">&#8250;</span>
            </a>
          </motion.div>

          {/* Slide dots */}
          <motion.div
            className="absolute bottom-10 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {slides.map(function(_, i) {
              return (
                <button
                  key={i}
                  onClick={function() { setIndex(i); }}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? "24px" : "6px",
                    height: "6px",
                    backgroundColor: i === index ? "#A8885A" : "rgba(255,255,255,0.3)",
                  }}
                />
              );
            })}
          </motion.div>

        </div>
      )}
    </section>
  );
}