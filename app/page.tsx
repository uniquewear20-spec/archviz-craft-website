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
      className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center"
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
          className="object-contain"
          priority
        />
        <p className="font-sans text-[9px] tracking-[0.36em] uppercase text-white/40 font-light">
          Archviz Craft
        </p>
        <motion.div
          className="h-px bg-white/20 origin-left"
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
      className="h-px bg-white/8 mx-6 md:mx-16 lg:mx-24"
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

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-white/25 z-[60] origin-left"
        style={{ scaleX: progressBar }}
      />

      <motion.div
        ref={mainRef}
        className="bg-[#0a0a08] min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {/* Nav */}
        <Nav scrolled={scrolled} />

        {/* 1 — Hero slideshow (5 images, no duplicates anywhere else) */}
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
          className="border-t border-white/8 px-6 md:px-16 lg:px-24 py-10"
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
                className="object-contain opacity-50"
              />
              <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-white/25 font-light">
                Archviz Craft
              </span>
            </div>
            <nav className="flex items-center gap-8">
              {["Studio", "Process", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="font-sans text-[9px] tracking-[0.16em] uppercase text-white/20 hover:text-white/50 font-light transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>
            <p className="font-sans text-[9px] text-white/15 font-light tracking-wide">
              © {new Date().getFullYear()} Archviz Craft · Dubai
            </p>
          </div>
        </motion.footer>
      </motion.div>
    </>
  );
}