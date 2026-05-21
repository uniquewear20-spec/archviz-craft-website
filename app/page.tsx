"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";
import { portfolioImages } from "./data/gallery";

const GOLD = "#C5A059";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Category = "all" | "bedrooms" | "kitchens" | "living-spaces" | "villas-exteriors" | "washrooms";

const filters: { label: string; value: Category }[] = [
  { label: "All",           value: "all" },
  { label: "Bedrooms",      value: "bedrooms" },
  { label: "Kitchens",      value: "kitchens" },
  { label: "Living Spaces", value: "living-spaces" },
  { label: "Villas",        value: "villas-exteriors" },
  { label: "Washrooms",     value: "washrooms" },
];

const editorials: Record<string, { title: string; brief: string }> = {
  bedrooms: {
    title: "PRIVATE SANCTUARIES",
    brief: "Crafting intimate retreats through soft lighting, tactile materials, and spatial calm.",
  },
  kitchens: {
    title: "CULINARY ARCHITECTURE",
    brief: "Where precision engineering meets aesthetic mastery — kitchens designed to perform and inspire.",
  },
  "living-spaces": {
    title: "LIVING IN LUXURY",
    brief: "Open-plan compositions that balance grandeur with warmth, inviting life into every corner.",
  },
  "villas-exteriors": {
    title: "ARCHITECTURAL LANDMARKS",
    brief: "Defining skylines and coastlines — exterior visualizations that command presence before a single brick is laid.",
  },
  washrooms: {
    title: "RITUAL SPACES",
    brief: "Marble, light, and stillness — bathrooms elevated to the level of personal ceremony.",
  },
};

function toTitle(src: string): string {
  const filename = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  return filename
    .replace(/[-_]/g, " ")
    .replace(/(\d+)$/, " $1")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function ImageCard({ src, index }: { src: string; index: number }) {
  const title = toTitle(src);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
      className="group relative overflow-hidden bg-zinc-900 cursor-pointer"
      style={{ aspectRatio: "4/3" }}
    >
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 60%)" }}
      >
        <p
          className="font-sans text-[10px] tracking-[0.28em] uppercase font-light"
          style={{ color: GOLD }}
        >
          {title}
        </p>
      </div>
      <div className="absolute inset-0 border border-transparent group-hover:border-[#C5A05940] transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}

function EditorialDivider({ category }: { category: string }) {
  const ed = editorials[category];
  if (!ed) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="col-span-full py-16 flex flex-col gap-3"
      style={{ borderTop: "1px solid #1a1a1a" }}
    >
      <span
        className="font-sans text-[9px] tracking-[0.5em] uppercase font-light"
        style={{ color: GOLD }}
      >
        {ed.title}
      </span>
      <p
        className="font-serif font-extralight italic leading-relaxed"
        style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "#71717a", maxWidth: "560px" }}
      >
        {ed.brief}
      </p>
    </motion.div>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<Category>("all");

  const grouped = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const img of portfolioImages) {
      if (!map[img.category]) map[img.category] = [];
      map[img.category].push(img.src);
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return [];
    return portfolioImages
      .filter((img: { category: string; src: string }) => img.category === active)
      .map((img: { category: string; src: string }) => img.src);
  }, [active]);

  const categoryOrder = ["bedrooms", "kitchens", "living-spaces", "villas-exteriors", "washrooms"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#000000", color: "#F0EBE3" }}>
      <Nav scrolled={true} />

      <div className="pt-40 pb-6 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <span
            className="font-sans text-[9px] tracking-[0.5em] uppercase font-light block mb-4"
            style={{ color: GOLD }}
          >
            Selected Works
          </span>
          <h1
            className="font-serif font-extralight leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#F0EBE3" }}
          >
            The Portfolio
          </h1>
        </motion.div>
      </div>

      <div
        className="sticky top-0 z-40 px-8 md:px-16 lg:px-24 py-5 flex items-center gap-6 md:gap-10 overflow-x-auto"
        style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #111" }}
      >
        {filters.map(({ label, value }) => {
          const isActive = active === value;
          return (
            <button
              key={value}
              onClick={() => setActive(value)}
              className="font-sans text-[10px] tracking-[0.28em] uppercase font-light whitespace-nowrap transition-all duration-300 pb-0.5"
              style={{
                color: isActive ? GOLD : "#52525b",
                borderBottom: isActive ? `1px solid ${GOLD}` : "1px solid transparent",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="px-8 md:px-16 lg:px-24 pb-32 pt-12">
        <AnimatePresence mode="wait">

          {active === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {categoryOrder.map((cat) => {
                const imgs = grouped[cat] ?? [];
                if (imgs.length === 0) return null;
                return [
                  <EditorialDivider key={`divider-${cat}`} category={cat} />,
                  ...imgs.map((src: string, i: number) => (
                    <ImageCard key={src} src={src} index={i} />
                  )),
                ];
              })}
            </motion.div>
          )}

          {active !== "all" && (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div className="col-span-full pb-10">
                {editorials[active] && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex flex-col gap-2"
                  >
                    <span
                      className="font-sans text-[9px] tracking-[0.5em] uppercase font-light"
                      style={{ color: GOLD }}
                    >
                      {editorials[active].title}
                    </span>
                    <p
                      className="font-serif font-extralight italic"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#71717a", maxWidth: "520px" }}
                    >
                      {editorials[active].brief}
                    </p>
                  </motion.div>
                )}
              </div>

              {filtered.map((src: string, i: number) => (
                <ImageCard key={src} src={src} index={i} />
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <footer
        className="px-8 md:px-16 lg:px-24 py-8 flex items-center justify-between"
        style={{ borderTop: "1px solid #111" }}
      >
        <Link
          href="/"
          className="font-sans text-[9px] tracking-[0.28em] uppercase font-light transition-colors duration-300 hover:text-[#C5A059]"
          style={{ color: "#3f3f46" }}
        >
          ← Back to Home
        </Link>
        <p className="font-sans text-[9px] font-light tracking-wide" style={{ color: "#27272a" }}>
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>
    </div>
  );
}