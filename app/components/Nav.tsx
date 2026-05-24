"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBuilding, FaEnvelope, FaCogs } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Work",    href: "/#bedrooms", icon: FaBuilding },
  { label: "Studio",  href: "/studio",    icon: FaBed      },
  { label: "Process", href: "/#process",  icon: FaCogs     },
  { label: "Contact", href: "/#contact",  icon: FaEnvelope },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Nav({ scrolled }: { scrolled?: boolean }) {
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setAtTop(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = atTop && !scrolled;

  return (
    <>
      {/* ── Logo — ABSOLUTE (stays in hero only, does not follow scroll) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50,
          padding: "clamp(1rem,2.5vw,1.4rem) clamp(1.8rem,4vw,3.5rem)",
          transition: "opacity 0.5s ease",
          opacity: mounted ? 1 : 0,
        }}
      >
        <Link href="/" style={{ display: "block", lineHeight: 0 }}>
          <Image
            src="/logo-avc.png"
            alt="Archviz Craft"
            width={72}
            height={72}
            priority
            style={{
              objectFit: "contain",
              opacity: isTransparent ? 0.92 : 0.78,
              transition: "opacity 0.5s ease",
              width: "clamp(52px, 5.5vw, 72px)",
              height: "auto",
            }}
          />
        </Link>
      </div>

      {/* ── Nav links — fixed top-center, fades out on scroll ── */}
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "clamp(1.4rem,2.8vw,1.8rem)",
          paddingBottom: "0.75rem",
          pointerEvents: atTop ? "auto" : "none",
        }}
        animate={{
          opacity: atTop ? 1 : 0,
          y: atTop ? 0 : -8,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1.8rem,4vw,3.5rem)",
          }}
        >
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <NavLink key={label} href={href} label={label} Icon={Icon} />
          ))}
        </div>
      </motion.nav>
    </>
  );
}

function NavLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
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
        gap: "0.42rem",
        textDecoration: "none",
        color: hovered ? "#A8885A" : "rgba(236,227,213,0.55)",
        transition: "color 0.4s ease",
        fontFamily: "var(--font-dm), sans-serif",
        fontSize: "clamp(9px, 0.9vw, 11px)",
        fontWeight: 300,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        position: "relative",
        paddingBottom: "2px",
      }}
    >
      <span
        style={{
          fontSize: "9px",
          opacity: hovered ? 0.9 : 0.45,
          transition: "opacity 0.4s ease",
          flexShrink: 0,
        }}
      >
        <Icon />
      </span>
      {label}

      {/* Underline accent */}
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