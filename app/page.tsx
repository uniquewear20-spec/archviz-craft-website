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
      // ✦ Was: bg-black — now warm cream to match the page
      className="fixed inset-0 bg-page z-[200] flex flex-col items-center justify-center"
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
          width={72}
          height={72}
          className="object-contain opacity-70"
          priority
        />
        {/* ✦ Was: text-white/40 — now ink/tertiary color */}
        <p className="font-sans text-[9px] tracking-[0.36em] uppercase text-ink-faint font-light">
          Archviz Craft
        </p>
        {/* ✦ Was: bg-white/20 — now border color */}
        <motion.div
          className="h-px bg-border-strong origin-left"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Hairline divider ──────────────────────────────────────────────────────────
function Hairline() {
  return (
    <motion.div
      // ✦ Was: bg-white/8 — now warm border
      className="h-px bg-border mx-6 md:mx-16 lg:mx-24"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE }}
      style={{ originX: 0 }}
    />
  );
}

// ── Section reveal ────────────────────────────────────────────────────────────
function SectionReveal({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
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
      {/* Loader */}
      <AnimatePresence>
        {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Scroll progress bar — ✦ Was: bg-white/25 — now gold accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-gold z-[60] origin-left"
        style={{ scaleX: progressBar }}
      />

      <motion.div
        ref={mainRef}
        // ✦ Was: bg-[#0a0a08] — now warm cream page background
        className="bg-page min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {/* Nav — pass scrolled + light theme flag */}
        <Nav scrolled={scrolled} />

        {/* 1 — Hero slideshow */}
        <Hero />

        {/* 2 — About / Studio */}
        <Hairline />
        <SectionReveal id="studio">
          <About />
        </SectionReveal>

        {/* 3 — Services / Process */}
        <Hairline />
        <SectionReveal id="process">
          <Services />
        </SectionReveal>

        {/* 4 — Contact */}
        <Hairline />
        <SectionReveal id="contact">
          <Contact />
        </SectionReveal>

        {/* Footer */}
        <motion.footer
          // ✦ Was: border-white/8 — now warm border
          className="border-t border-border px-6 md:px-16 lg:px-24 py-10"
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
                width={36}
                height={36}
                // ✦ Was: opacity-50 on dark — adjusted for light bg
                className="object-contain opacity-40"
              />
              {/* ✦ Was: text-white/25 — now ink/faint */}
              <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-ink-faint font-light">
                Archviz Craft
              </span>
            </div>

            <nav className="flex items-center gap-8">
              {["Studio", "Process", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  // ✦ Was: text-white/20 hover:text-white/50
                  className="font-sans text-[9px] tracking-[0.16em] uppercase text-ink-faint hover:text-gold font-light transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* ✦ Was: text-white/15 — now ink/faint */}
            <p className="font-sans text-[9px] text-ink-faint font-light tracking-wide">
              © {new Date().getFullYear()} Archviz Craft · Dubai
            </p>
          </div>
        </motion.footer>
      </motion.div>
    </>
  );
}