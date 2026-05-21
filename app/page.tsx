"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Services from "./components/Services";
import About from "./components/About";

const EASE: [number, number, number, number] = [0.83, 0, 0.17, 1];
const EASE_ENTER: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Page loader ───────────────────────────────────────────────────────────────
function PageLoader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#F5F0E8" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.0, delay: 1.6, ease: EASE }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE_ENTER }}
      >
        <Image
          src="/logo-avc.png"
          alt="Archviz Craft"
          width={90}
          height={90}
          className="object-contain"
          priority
        />
        <p className="font-sans text-[9px] tracking-[0.36em] uppercase font-light" style={{ color: "#A09890" }}>
          Archviz Craft
        </p>
        <motion.div
          className="h-px origin-left"
          style={{ backgroundColor: "#A8885A" }}
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Section reveal ────────────────────────────────────────────────────────────
function SectionReveal({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.0, ease: EASE_ENTER }}
    >
      {children}
    </motion.section>
  );
}

// ── Hairline ──────────────────────────────────────────────────────────────────
function Hairline() {
  return (
    <div
      className="mx-6 md:mx-16 lg:mx-24"
      style={{ height: "1px", backgroundColor: "#E2D9CC" }}
    />
  );
}

// ── Social links data ─────────────────────────────────────────────────────────
const socialLinks = [
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/archvizcraft/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "X (TWITTER)",
    href: "https://x.com/archvizcraft",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/archvizcraft/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "YOUTUBE",
    href: "https://youtube.com/@archvizcraft",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#F5F0E8"/>
      </svg>
    ),
  },
  {
    label: "TELEGRAM",
    href: "https://t.me/ArchVizCraft",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    label: "WHATSAPP",
    href: "https://whatsapp.com/channel/0029Vb854bd4CrfnoL4Bjd0l",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
];

// ── Floating contact buttons (bottom-right, like Zenith) ──────────────────────
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-[100] flex flex-col gap-3">
      {/* Email */}
      <a
        href="mailto:archviscraft.in@gmail.com"
        aria-label="Email"
        className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: "#A8885A" }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="2,4 12,13 22,4"/>
        </svg>
      </a>
      {/* WhatsApp */}
      <a
        href="https://wa.me/971522783784"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: mainRef });
  const progressBar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Gold scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-[60] origin-left"
        style={{ scaleX: progressBar, backgroundColor: "#A8885A" }}
      />

      {/* Floating WhatsApp + Email buttons */}
      <FloatingButtons />

      <motion.div
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Nav scrolled={scrolled} />

        {/* 1 — Hero (dark, full bleed) */}
        <Hero />

        {/* ── CREAM SECTIONS ── */}
        <div style={{ backgroundColor: "#F5F0E8" }}>

          <Hairline />
          <SectionReveal id="studio">
            <About />
          </SectionReveal>

          <Hairline />
          <SectionReveal id="process">
            <Services />
          </SectionReveal>

          <Hairline />
          <SectionReveal id="contact">
            <Contact />
          </SectionReveal>

          {/* Footer */}
          <motion.footer
            className="px-6 md:px-16 lg:px-24 py-10"
            style={{ borderTop: "1px solid #E2D9CC" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
          >
            {/* Social links row — Zenith style */}
            <div
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-8 mb-8"
              style={{ borderBottom: "1px solid #E2D9CC" }}
            >
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-[9px] tracking-[0.18em] uppercase font-light transition-colors duration-300"
                  style={{ color: "#A09890" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#A8885A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#A09890")}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            {/* Bottom row: logo · nav · copyright */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-avc.png"
                  alt="Archviz Craft"
                  width={44}
                  height={44}
                  className="object-contain opacity-60"
                />
                <span className="font-sans text-[9px] tracking-[0.28em] uppercase font-light" style={{ color: "#A09890" }}>
                  Archviz Craft
                </span>
              </div>
              <nav className="flex items-center gap-8">
                {["Studio", "Process", "Contact"].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="font-sans text-[9px] tracking-[0.16em] uppercase font-light transition-colors duration-300"
                    style={{ color: "#A09890" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#A8885A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#A09890")}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <p className="font-sans text-[9px] font-light tracking-wide" style={{ color: "#C8BFB2" }}>
                © {new Date().getFullYear()} Archviz Craft · Dubai
              </p>
            </div>
          </motion.footer>

        </div>
      </motion.div>
    </>
  );
}