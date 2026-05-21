"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Work",    href: "/#work" },
  { label: "Studio",  href: "/studio" },
  { label: "About",   href: "/studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={
          "absolute inset-0 transition-all duration-500 " +
          (scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10"
            : "bg-transparent")
        }
      />

      <div className="relative z-10 grid grid-cols-3 items-center px-10 md:px-16 lg:px-20 py-3">

        {/* LEFT — Logo, smaller and refined */}
        <Link href="/" className="flex-shrink-0 justify-self-start">
          <Image
            src="/logo-avc.png"
            alt="Archviz Craft"
            width={100}
            height={100}
            className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            priority
          />
        </Link>

        {/* CENTER — Nav links */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-sans text-white text-[11px] font-light tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#A8885A]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* RIGHT — spacer */}
        <div className="hidden md:block" />

        {/* Mobile hamburger */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1 justify-self-end col-start-3">
          <span className="w-6 h-px bg-white" />
          <span className="w-4 h-px bg-white" />
          <span className="w-5 h-px bg-white" />
        </div>

      </div>
    </motion.header>
  );
}