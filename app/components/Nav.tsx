"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = ["Work", "Studio", "Process", "Contact"];

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-600 ${
          scrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/8"
            : "bg-transparent"
        }`}
      />

      {/* Logo — bigger, cleaner */}
      <a href="#" className="relative z-10 flex items-center gap-3">
        <Image
          src="/logo-avc.png"
          alt="Archviz Craft"
          width={56}
          height={56}
          className="object-contain drop-shadow-lg"
          priority
        />
        <span className="hidden lg:block font-sans text-white/80 text-xs tracking-[0.24em] uppercase font-light">
          Archviz Craft
        </span>
      </a>

      {/* Desktop nav */}
      <nav className="relative z-10 hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-sans text-white/70 hover:text-white text-sm font-light tracking-[0.1em] transition-colors duration-300"
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          className="font-sans text-sm font-light tracking-[0.1em] text-white/80 hover:text-white border border-white/30 hover:border-white px-6 py-2.5 transition-all duration-400"
        >
          Enquire
        </a>
      </nav>

      {/* Mobile hamburger */}
      <div className="relative z-10 md:hidden flex flex-col gap-1.5 cursor-pointer p-1">
        <span className="w-6 h-px bg-white/70" />
        <span className="w-4 h-px bg-white/70" />
        <span className="w-5 h-px bg-white/70" />
      </div>
    </motion.header>
  );
}