"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = ["Work", "Studio", "Process", "Contact"];

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      />

      <div className="relative z-10 flex items-center justify-between px-10 md:px-16 lg:px-20 py-4">

        <a href="#" className="flex-shrink-0">
          <Image
            src="/logo-avc.png"
            alt="Archviz Craft"
            width={140}
            height={140}
            className="object-contain drop-shadow-lg"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-10 lg:gap-14">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-sans text-white text-[13px] font-light tracking-[0.16em] uppercase transition-colors duration-300 hover:text-[#A8885A]"
            >
              {link}
            </a>
          ))}

          <a
            href="#contact"
            className="font-sans text-[13px] font-light tracking-[0.14em] uppercase text-white px-7 py-3 transition-all duration-300"
            style={{ backgroundColor: "#A8885A" } as React.CSSProperties}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.backgroundColor = "#8C6E42";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.backgroundColor = "#A8885A";
            }}
          >
            Enquire
          </a>
        </nav>

        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1">
          <span className="w-6 h-px bg-white" />
          <span className="w-4 h-px bg-white" />
          <span className="w-5 h-px bg-white" />
        </div>

      </div>
    </motion.header>
  );
}