"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

// ── Luxury page-level motion config ──────────────────────────────────────────
const EASE_LUXURY = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_ENTER = [0.16, 1, 0.3, 1] as const;

// ── Section divider — architectural hairline ──────────────────────────────────
function Hairline({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px bg-stone-800/50 mx-6 md:mx-12 lg:mx-20 xl:mx-28"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: EASE_LUXURY }}
      style={{ originX: 0 }}
    />
  );
}

// ── Section wrapper — staggered reveal ───────────────────────────────────────
interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

function SectionReveal({ children, id, className = "", delay = 0 }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, delay, ease: EASE_ENTER }}
    >
      {children}
    </motion.section>
  );
}

// ── Loader — one-shot cinematic entrance ─────────────────────────────────────
function PageLoader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a08] z-[100] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.9, delay: 1.4, ease: EASE_LUXURY }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_ENTER }}
      >
        {/* Logo mark */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="0" y="0" width="16" height="36" fill="#d6d3c8" fillOpacity="0.7" />
          <rect x="20" y="12" width="16" height="24" fill="#d6d3c8" fillOpacity="0.3" />
        </svg>
        <p className="text-stone-500 font-sans text-[10px] tracking-[0.32em] uppercase font-light">
          Archviz Craft
        </p>
        {/* Progress line */}
        <motion.div
          className="h-px bg-stone-700 w-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: EASE_LUXURY }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll listener for nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global scroll progress for ambient motion
  const { scrollYProgress } = useScroll({ target: mainRef });
  const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* One-shot page loader */}
      <AnimatePresence>
        {!loaded && (
          <PageLoader onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Scroll progress bar — architectural detail */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-stone-400/30 z-50 origin-left"
        style={{ scaleX: progressBarScaleX }}
      />

      <motion.main
        ref={mainRef}
        className="bg-[#0a0a08] min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Navigation */}
        <Nav scrolled={scrolled} />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE_ENTER }}
        >
          <Hero />
        </motion.div>

        {/* ── GALLERY ──────────────────────────────────────────────── */}
        <Hairline delay={0.1} />
        <SectionReveal id="work" delay={0.05}>
          <Gallery />
        </SectionReveal>

        {/* ── ABOUT / STUDIO ───────────────────────────────────────── */}
        <Hairline />
        <SectionReveal id="studio" delay={0.05}>
          <About />
        </SectionReveal>

        {/* ── SERVICES / PROCESS ───────────────────────────────────── */}
        <Hairline />
        <SectionReveal id="process" delay={0.05}>
          <Services />
        </SectionReveal>

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <Hairline />
        <SectionReveal id="contact" delay={0.05}>
          <Contact />
        </SectionReveal>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <motion.footer
          className="border-t border-stone-800/50 px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand mark */}
            <div className="flex items-center gap-4">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
                <rect x="0" y="0" width="16" height="36" fill="#57534e" />
                <rect x="20" y="12" width="16" height="24" fill="#57534e" fillOpacity="0.5" />
              </svg>
              <span className="text-stone-600 font-sans text-[10px] tracking-[0.28em] uppercase font-light">
                Archviz Craft
              </span>
            </div>

            {/* Footer nav */}
            <nav className="flex items-center gap-8">
              {["Work", "Studio", "Process", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-stone-600 hover:text-stone-300 font-sans text-[10px] tracking-[0.18em] uppercase font-light transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Colophon */}
            <p className="text-stone-700 font-sans text-[10px] tracking-wide font-light">
              © {new Date().getFullYear()} Archviz Craft
            </p>
          </div>
        </motion.footer>
      </motion.main>
    </>
  );
}