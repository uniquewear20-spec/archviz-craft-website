"use client";

import { motion } from "framer-motion";

const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.0, 1.0];
const navLinks = ["Work", "Studio", "Process", "Contact"];

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease: LUXURY_EASE, delay: 0.4 }}
    >
      {/* Background Overlay */}
      <motion.div
        className="absolute inset-0 border-b border-white/5"
        animate={{
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          backgroundColor: scrolled ? "rgba(10, 10, 8, 0.8)" : "transparent",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <p className="relative z-10 text-white text-[11px] tracking-[0.3em] uppercase font-light">
        Archviz Craft
      </p>

      <nav className="relative z-10 hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-white text-[10px] uppercase tracking-widest hover:text-stone-400 transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}