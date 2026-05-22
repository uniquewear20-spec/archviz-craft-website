"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const GOLD = "#A8885A";

const navLinks = [
  { label: "Work",    href: "/#bedrooms" },
  { label: "Studio",  href: "/studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("archviz-theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  function applyTheme(dark: boolean) {
    const root = document.documentElement;
    root.classList.toggle("light-mode", !dark);
    root.classList.toggle("dark-mode", dark);
    localStorage.setItem("archviz-theme", dark ? "dark" : "light");
  }

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px 0",
        color: hovered ? GOLD : "rgba(255,255,255,0.4)",
        transition: "color 0.3s",
      }}
    >
      {/* Track */}
      <div style={{
        position: "relative",
        width: "30px",
        height: "16px",
        borderRadius: "8px",
        border: `1px solid ${isDark ? "#2A2520" : "#C4A882"}`,
        backgroundColor: isDark ? "#0E0C0A" : "#F0EBE3",
        transition: "background-color 0.4s ease, border-color 0.4s ease",
        flexShrink: 0,
      }}>
        <motion.div
          animate={{ x: isDark ? 14 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            position: "absolute",
            top: "2px",
            left: "2px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: GOLD,
          }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0,   scale: 1   }}
          exit={{    opacity: 0, rotate:  30,  scale: 0.7 }}
          transition={{ duration: 0.25 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Nav({ scrolled }: { scrolled: boolean }) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Logo — fixed top-LEFT ── */}
      <div className="fixed top-0 left-0 z-50 px-10 md:px-16 lg:px-20 py-3">
        <Link href="/">
          <Image
            src="/logo-avc.png"
            alt="Archviz Craft"
            width={100}
            height={100}
            className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            priority
          />
        </Link>
      </div>

      {/* ── Theme toggle — fixed top-RIGHT ── */}
      <div
        className="fixed top-0 right-0 z-50 px-10 md:px-16 lg:px-20"
        style={{
          paddingTop: "1.6rem",
          opacity: atTop ? 1 : 0,
          pointerEvents: atTop ? "auto" : "none",
          transition: "opacity 0.4s",
        }}
      >
        <ThemeToggle />
      </div>

      {/* ── Nav links — fixed top-CENTER ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center py-6"
        animate={{ opacity: atTop ? 1 : 0, pointerEvents: atTop ? "auto" : "none" }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-8 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-sans text-white text-[11px] font-light tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#A8885A]"
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
}