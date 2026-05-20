"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.0, 1.0];
const navLinks = ["Work", "Studio", "Process", "Contact"];

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-5 md:py-6"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease: LUXURY_EASE, delay: 0.4 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 border-b border-white/5"
        animate={{
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          backgroundColor: scrolled
            ? "rgba(10, 10, 8, 0.85)"
            : "transparent",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.a
        href="#"
        className="relative z-10 flex items-center gap-3 group"
        whileHover={{ opacity: 0.75 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/logo-avc.png"
          alt="Arch Viz Craft"
          width={44}
          height={44}
          className="object-contain"
          priority
        />
        <span className="hidden lg:block text-stone-400 font-sans text-[9px] tracking-[0.28em] uppercase font-light">
          Arch Viz Craft
        </span>
      </motion.a>

      {/* Desktop Nav */}
      <nav className="relative z-10 hidden md:flex items-center gap-10">
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative text-stone-500 hover:text-stone-200 font-sans text-[9px] uppercase tracking-[0.2em] font-light transition-colors duration-400 group"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6 + i * 0.08,
              ease: LUXURY_EASE,
            }}
          >
            {link}
            {/* Underline hover */}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-400 group-hover:w-full transition-all duration-500" />
          </motion.a>
        ))}

        {/* CTA */}
        <motion.a
          href="#contact"
          className="relative z-10 border border-stone-700 hover:border-stone-400 text-stone-400 hover:text-stone-200 font-sans text-[9px] uppercase tracking-[0.2em] font-light px-5 py-2 transition-all duration-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: LUXURY_EASE }}
          whileHover={{ scale: 1.02 }}
        >
          Enquire
        </motion.a>
      </nav>

      {/* Mobile menu icon */}
      <div className="relative z-10 md:hidden flex flex-col gap-[5px] cursor-pointer group">
        <span className="w-6 h-px bg-stone-400 group-hover:bg-stone-200 transition-colors duration-300" />
        <span className="w-4 h-px bg-stone-400 group-hover:bg-stone-200 transition-colors duration-300" />
      </div>
    </motion.header>
  );
}