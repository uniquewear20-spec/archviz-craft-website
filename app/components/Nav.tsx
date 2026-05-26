"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBuilding, FaEnvelope, FaCogs } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Work",    href: "/#bedrooms", icon: FaBuilding },
  { label: "About",   href: "/studio",    icon: FaBed      },
  { label: "Process", href: "/#process",  icon: FaCogs     },
  { label: "Contact", href: "/#follow",   icon: FaEnvelope },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Nav({ scrolled }: { scrolled?: boolean }) {
  const [atTop, setAtTop] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read current theme so the toggle reflects/controls it.
    const saved = localStorage.getItem("archviz-theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);

    const onScroll = () => setAtTop(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function applyTheme(dark: boolean) {
    document.documentElement.classList.toggle("light-mode", !dark);
    document.documentElement.classList.toggle("dark-mode", dark);
    localStorage.setItem("archviz-theme", dark ? "dark" : "light");
  }
  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
  }

  // Bar is transparent while over the hero, solid espresso once scrolled
  // (or when a page passes scrolled=true, e.g. the studio/about page).
  const isTransparent = atTop && !scrolled;

  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        paddingTop: isTransparent ? "clamp(1.1rem,2.4vw,1.6rem)" : "0.85rem",
        paddingBottom: isTransparent ? "clamp(1.1rem,2.4vw,1.6rem)" : "0.85rem",
        paddingLeft: "clamp(1.4rem,4vw,3.5rem)",
        paddingRight: "clamp(1.4rem,4vw,3.5rem)",
        backgroundColor: isTransparent ? "transparent" : "var(--bg)",
        borderBottom: isTransparent ? "1px solid transparent" : "1px solid var(--border)",
        transition:
          "background-color 0.4s ease, border-color 0.4s ease, padding 0.4s ease",
        opacity: mounted ? 1 : 0,
      }}
    >
      {/* Logo (left) */}
      <Link href="/" style={{ display: "block", lineHeight: 0, flexShrink: 0 }}>
        <Image
          src="/logo-avc.png"
          alt="Archviz Craft"
          width={72}
          height={72}
          priority
          style={{
            objectFit: "contain",
            opacity: isTransparent ? 0.92 : 0.95,
            transition: "opacity 0.5s ease, width 0.4s ease",
            width: isTransparent ? "clamp(52px,5.5vw,72px)" : "clamp(42px,4.5vw,56px)",
            height: "auto",
          }}
        />
      </Link>

      {/* Nav links (center) */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.4rem,3.5vw,3.5rem)",
        }}
        className="avc-navlinks"
      >
        {NAV_LINKS.map(({ label, href, icon: Icon }) => (
          <NavLink key={label} href={href} label={label} Icon={Icon} solid={!isTransparent} />
        ))}
      </nav>

      {/* Theme toggle (right) */}
      {mounted && (
        <button
          onClick={toggleTheme}
          aria-label="toggle theme"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            flexShrink: 0,
            color: "rgba(236,227,213,0.5)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#A8885A"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(236,227,213,0.5)"; }}
        >
          <div
            style={{
              position: "relative",
              width: "30px",
              height: "16px",
              borderRadius: "8px",
              border: `1px solid ${isDark ? "#2A2520" : "#C4A882"}`,
              backgroundColor: isDark ? "#0E0C0A" : "#F0EBE3",
              transition: "all 0.4s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "2px",
                left: isDark ? "16px" : "2px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#A8885A",
                transition: "left 0.35s cubic-bezier(0.4,2,0.3,1)",
              }}
            />
          </div>
          <span style={{ fontSize: "11px", lineHeight: 1 }}>
            {isDark ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /><line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" /></svg>
            )}
          </span>
        </button>
      )}

      <style>{`
        @media (max-width: 640px) {
          .avc-navlinks { gap: 1rem !important; }
        }
      `}</style>
    </motion.header>
  );
}

function NavLink({
  href,
  label,
  Icon,
  solid,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
  solid: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        textDecoration: "none",
        color: hovered ? "#A8885A" : "rgba(236,227,213,0.82)",
        transition: "color 0.4s ease",
        fontFamily: "var(--font-dm), sans-serif",
        fontSize: "clamp(12px, 1.1vw, 15px)",
        fontWeight: 400,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        position: "relative",
        paddingBottom: "3px",
        textShadow: solid ? "none" : "0 1px 12px rgba(0,0,0,0.45)",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          opacity: hovered ? 0.95 : 0.6,
          transition: "opacity 0.4s ease",
          flexShrink: 0,
        }}
      >
        <Icon />
      </span>
      {label}

      <motion.span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#A8885A",
          transformOrigin: "left",
          opacity: 0.7,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
    </Link>
  );
}