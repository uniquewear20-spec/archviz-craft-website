"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GalleryItem from "./GalleryItem";

const projects = [
  {
    src: "/images/gallery/01.jpg",
    title: "Meridian Residence",
    category: "Residential",
  },
  {
    src: "/images/gallery/02.jpg",
    title: "Solstice Tower",
    category: "Commercial",
  },
  {
    src: "/images/gallery/03.jpg",
    title: "The Atrium",
    category: "Interior",
  },
  {
    src: "/images/gallery/04.jpg",
    title: "Coastal Pavilion",
    category: "Landscape",
  },
  {
    src: "/images/gallery/05.jpg",
    title: "Void House",
    category: "Residential",
  },
  {
    src: "/images/gallery/06.jpg",
    title: "Cultural Centre",
    category: "Civic",
  },
  {
    src: "/images/gallery/07.jpg",
    title: "Ember Terrace",
    category: "Hospitality",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a08] py-28 md:py-40 px-6 md:px-12 lg:px-20 xl:px-28"
    >
      {/* Section header */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-stone-500 font-sans font-light mb-5">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl text-stone-100 font-light leading-[1.1] tracking-tight">
            Selected
            <br />
            <em className="not-italic text-stone-400">Works</em>
          </h2>
        </div>

        <div className="md:max-w-[340px]">
          <p className="text-stone-500 font-sans text-sm leading-relaxed font-light tracking-wide">
            A curated selection of architectural visualisations spanning residential,
            commercial, and civic commissions across three continents.
          </p>
          <div className="mt-6 flex items-center gap-3 group cursor-pointer">
            <span className="text-stone-400 font-sans text-xs tracking-[0.16em] uppercase font-light group-hover:text-stone-200 transition-colors duration-300">
              View all projects
            </span>
            <div className="h-px w-10 bg-stone-600 group-hover:w-16 group-hover:bg-stone-400 transition-all duration-500" />
          </div>
        </div>
      </motion.div>

      {/* ── EDITORIAL GRID ── */}
      {/*
        Layout philosophy:
        Row 1: Large hero (8 cols) | Tall portrait (4 cols)
        Row 2: Inset portrait (3 cols) | Wide landscape (9 cols)
        Row 3: Medium square (5 cols) | Medium landscape (7 cols)
        Row 4: Full-width cinematic
      */}

      {/* Desktop asymmetric grid */}
      <div className="hidden md:grid grid-cols-12 gap-3 lg:gap-4">

        {/* Row 1 — hero piece + portrait */}
        <div className="col-span-8 h-[520px] lg:h-[600px] xl:h-[660px]">
          <GalleryItem {...projects[0]} index={0} className="h-full" priority />
        </div>
        <div className="col-span-4 h-[520px] lg:h-[600px] xl:h-[660px]">
          <GalleryItem {...projects[1]} index={1} className="h-full" />
        </div>

        {/* Breathing space between rows */}
        <div className="col-span-12 h-1" />

        {/* Row 2 — inset portrait + wide landscape */}
        <div className="col-start-1 col-span-4 h-[420px] lg:h-[480px]">
          <GalleryItem {...projects[2]} index={2} className="h-full" />
        </div>
        <div className="col-span-8 h-[420px] lg:h-[480px]">
          <GalleryItem {...projects[3]} index={3} className="h-full" />
        </div>

        {/* Breathing space */}
        <div className="col-span-12 h-1" />

        {/* Row 3 — medium + wide */}
        <div className="col-span-5 h-[380px] lg:h-[440px]">
          <GalleryItem {...projects[4]} index={4} className="h-full" />
        </div>
        <div className="col-span-7 h-[380px] lg:h-[440px]">
          <GalleryItem {...projects[5]} index={5} className="h-full" />
        </div>

        {/* Breathing space */}
        <div className="col-span-12 h-1" />

        {/* Row 4 — cinematic full-width */}
        <div className="col-span-12 h-[320px] lg:h-[380px] xl:h-[440px]">
          <GalleryItem {...projects[6]} index={6} className="h-full" />
        </div>
      </div>

      {/* Mobile stacked layout */}
      <div className="md:hidden flex flex-col gap-3">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`w-full ${
              i === 0
                ? "h-[70vw]"
                : i % 3 === 0
                ? "h-[85vw]"
                : "h-[60vw]"
            }`}
          >
            <GalleryItem
              {...project}
              index={i}
              className="h-full"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Bottom counter / editorial footnote */}
      <motion.div
        className="mt-20 md:mt-28 flex items-center justify-between border-t border-stone-800/60 pt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <p className="text-stone-600 font-sans text-[10px] tracking-[0.22em] uppercase font-light">
          Archviz Craft — Selected Works
        </p>
        <p className="text-stone-600 font-sans text-[10px] tracking-[0.18em] font-light">
          {String(projects.length).padStart(2, "0")} Projects
        </p>
      </motion.div>
    </section>
  );
}