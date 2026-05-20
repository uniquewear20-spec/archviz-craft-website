"use client";

import { motion } from "framer-motion";
import GalleryItem, { type GalleryItemData } from "./GalleryItem";

const galleryItems: GalleryItemData[] = [
  {
    id: "01",
    title: "Meridian Residence",
    category: "Residential",
    src: "/hero-1.png",
    alt: "Meridian Residence",
    area: "dominant",
    aspectClass: "aspect-[16/10]",
  },
  {
    id: "02",
    title: "The Obsidian Tower",
    category: "Commercial",
    src: "/hero-2.png",
    alt: "The Obsidian Tower",
    area: "tall",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "03",
    title: "Solaris Pavilion",
    category: "Cultural",
    src: "/hero-3.png",
    alt: "Solaris Pavilion",
    area: "mid-a",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "04",
    title: "Nordic Retreat",
    category: "Interior",
    src: "/hero-4.png",
    alt: "Nordic Retreat",
    area: "mid-b",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "05",
    title: "Atlas Cultural Centre",
    category: "Civic",
    src: "/hero-5.png",
    alt: "Atlas Cultural Centre",
    area: "wide",
    aspectClass: "aspect-[21/9]",
  },
];

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0, 1] },
  },
};

export default function Gallery() {
  return (
    <section className="bg-[#0a0a08] px-6 py-24 md:px-16 md:py-36">
      <motion.div
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        <p className="text-[9px] tracking-[0.28em] uppercase text-stone-600 mb-6 font-light font-sans">
          Selected Works
        </p>
        <h2 className="text-stone-100 text-4xl md:text-6xl font-serif italic font-light">
          Visual Narratives
        </h2>
      </motion.div>

      {/* Desktop asymmetric grid */}
      <div
        className="hidden md:grid gap-5"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateAreas: `
            "dominant dominant dominant dominant dominant dominant dominant tall tall tall tall tall"
            "mid-a    mid-a    mid-a    mid-a    mid-a    mid-b    mid-b    mid-b    mid-b    mid-b    mid-b    mid-b"
            "wide     wide     wide     wide     wide     wide     wide     wide     wide     wide     wide     wide"
          `,
        }}
      >
        {galleryItems.map((item, i) => (
          <GalleryItem key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Mobile stack */}
      <div className="flex flex-col gap-8 md:hidden">
        {galleryItems.map((item, i) => (
          <GalleryItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}