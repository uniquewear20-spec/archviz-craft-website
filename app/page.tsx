"use client";

import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-[#0a0a08]">
      <Nav scrolled={scrolled} />
      <Hero />
      <div className="h-px bg-stone-900" />
      <section id="work">
        <Gallery />
      </section>
      <div className="h-px bg-stone-900" />
      <section id="studio">
        <About />
      </section>
      <div className="h-px bg-stone-900" />
      <section id="process">
        <Services />
      </section>
      <div className="h-px bg-stone-900" />
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}