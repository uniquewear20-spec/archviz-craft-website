"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Work",    href: "/#bedrooms" },
  { label: "Studio",  href: "/studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav({ scrolled }: { scrolled: boolean }) {
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      {/* Logo — always fixed top-left */}
      <div className="fixed top-0 left-0 z-50 px-10 md:px-16 lg:px-20 py-3">
        <Link href="/">
          <Image src="/logo-avc.png" alt="Archviz Craft" width={100} height={100} className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" priority />
        </Link>
      </div>
      {/* Nav links — only visible at top */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center py-6"
        animate={{ opacity: atTop ? 1 : 0, pointerEvents: atTop ? "auto" : "none" }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-8 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="font-sans text-white text-[11px] font-light tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#A8885A]">
              {label}
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
