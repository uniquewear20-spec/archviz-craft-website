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