"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category =
  | "all"
  | "exterior"
  | "interior"
  | "masterplan"
  | "animation"
  | "panorama";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: Exclude<Category, "all">;
  title?: string;
  project?: string; // project name for hover label
  aspect: "portrait" | "landscape" | "square";
  featured?: boolean; // featured items get larger grid cells
}

// ── Category labels ───────────────────────────────────────────────────────────
const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all",        label: "All Work"        },
  { key: "exterior",   label: "Exterior"        },
  { key: "interior",   label: "Interior"        },
  { key: "masterplan", label: "Masterplan"      },
  { key: "animation",  label: "Animation"       },
  { key: "panorama",   label: "360° Panorama"   },
];

// ── Sample data structure — replace with your actual images ───────────────────
// Map each of your 60+ images here.
// Tip: keep images in /public/images/{category}/{project-slug}/{filename}
const GALLERY_ITEMS: GalleryItem[] = [
  // EXTERIOR
  { id: "ext-01", src: "/images/exterior/villa-palm/hero.jpg",      alt: "Palm Jumeirah Villa — Exterior",      category: "exterior",   aspect: "landscape", project: "Palm Jumeirah Villa",     featured: true  },
  { id: "ext-02", src: "/images/exterior/downtown-tower/dusk.jpg",  alt: "Downtown Tower — Dusk",               category: "exterior",   aspect: "portrait",  project: "Downtown Tower"                           },
  { id: "ext-03", src: "/images/exterior/villa-palm/courtyard.jpg", alt: "Palm Jumeirah Villa — Courtyard",     category: "exterior",   aspect: "square",    project: "Palm Jumeirah Villa"                      },
  { id: "ext-04", src: "/images/exterior/marina-res/facade.jpg",    alt: "Marina Residence — Facade",           category: "exterior",   aspect: "landscape", project: "Marina Residence"                         },
  { id: "ext-05", src: "/images/exterior/golf-estate/aerial.jpg",   alt: "Golf Estate — Aerial View",           category: "exterior",   aspect: "landscape", project: "Golf Estate",             featured: true  },

  // INTERIOR
  { id: "int-01", src: "/images/interior/villa-palm/living.jpg",    alt: "Palm Jumeirah Villa — Living Room",   category: "interior",   aspect: "landscape", project: "Palm Jumeirah Villa",     featured: true  },
  { id: "int-02", src: "/images/interior/villa-palm/master.jpg",    alt: "Palm Jumeirah Villa — Master Suite",  category: "interior",   aspect: "portrait",  project: "Palm Jumeirah Villa"                      },
  { id: "int-03", src: "/images/interior/penthouse-difc/lounge.jpg",alt: "DIFC Penthouse — Lounge",             category: "interior",   aspect: "landscape", project: "DIFC Penthouse"                           },
  { id: "int-04", src: "/images/interior/penthouse-difc/kitchen.jpg",alt: "DIFC Penthouse — Kitchen",           category: "interior",   aspect: "square",    project: "DIFC Penthouse"                           },
  { id: "int-05", src: "/images/interior/beach-villa/bathroom.jpg", alt: "Beach Villa — Bathroom",              category: "interior",   aspect: "portrait",  project: "Beach Villa"                              },
  { id: "int-06", src: "/images/interior/mall-lobby/atrium.jpg",    alt: "Mall Lobby — Atrium",                 category: "interior",   aspect: "landscape", project: "Retail Atrium",           featured: true  },

  // MASTERPLAN
  { id: "mp-01",  src: "/images/masterplan/golf-estate/plan.jpg",   alt: "Golf Estate — Masterplan",            category: "masterplan", aspect: "landscape", project: "Golf Estate",             featured: true  },
  { id: "mp-02",  src: "/images/masterplan/coastal-dev/aerial.jpg", alt: "Coastal Development — Aerial",        category: "masterplan", aspect: "landscape", project: "Coastal Development"                      },
  { id: "mp-03",  src: "/images/masterplan/urban-mix/overview.jpg", alt: "Urban Mixed-Use — Overview",          category: "masterplan", aspect: "portrait",  project: "Urban Mixed-Use Hub"                      },

  // ANIMATION (use poster frame as thumbnail)
  { id: "anim-01",src: "/images/animation/villa-palm/poster.jpg",   alt: "Palm Jumeirah Villa — Walkthrough",   category: "animation",  aspect: "landscape", project: "Villa Walkthrough",       featured: true  },
  { id: "anim-02",src: "/images/animation/downtown-tower/poster.jpg",alt: "Downtown Tower — Flythrough",        category: "animation",  aspect: "landscape", project: "Tower Flythrough"                         },

  // PANORAMA (always landscape)
  { id: "pan-01", src: "/images/panorama/villa-palm/360.jpg",       alt: "Palm Jumeirah Villa — 360° View",     category: "panorama",   aspect: "landscape", project: "Villa 360°",              featured: true  },
  { id: "pan-02", src: "/images/panorama/penthouse-difc/360.jpg",   alt: "DIFC Penthouse — 360° View",          category: "panorama",   aspect: "landscape", project: "Penthouse 360°"                           },
];

const EASE_ENTER: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Aspect ratio helper ───────────────────────────────────────────────────────
function aspectClass(aspect: GalleryItem["aspect"], featured?: boolean) {
  // Featured landscape items span 2 columns on md+
  if (featured && aspect === "landscape") return "md:col-span-2 aspect-[16/9]";
  if (aspect === "portrait")  return "aspect-[3/4]";
  if (aspect === "landscape") return "aspect-[16/9]";
  return "aspect-square";
}

// ── Single gallery card ───────────────────────────────────────────────────────
function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden bg-surface cursor-pointer group ${aspectClass(item.aspect, item.featured)}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_ENTER }}
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-ink/30 flex flex-col justify-end p-5 md:p-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Category pill */}
        <span className="font-sans text-[9px] tracking-[0.24em] uppercase text-gold mb-2">
          {CATEGORIES.find(c => c.key === item.category)?.label}
        </span>
        {/* Project name */}
        {item.project && (
          <p className="font-serif text-lg font-light text-page leading-tight">
            {item.project}
          </p>
        )}
        {/* View indicator */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="h-px w-6 bg-gold" />
          <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-gold/80">
            View
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Gallery component ────────────────────────────────────────────────────
export default function Gallery() {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === active);

  return (
    <section id="portfolio" className="px-6 md:px-16 lg:px-24 py-section">

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
        <div>
          <p className="heading-sm text-ink-faint mb-4">Selected Projects</p>
          <h2 className="font-serif text-display-lg font-light text-ink leading-[1.05]">
            The Work
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`
                font-sans text-[9px] tracking-[0.18em] uppercase font-light
                transition-colors duration-300 pb-1 border-b
                ${active === key
                  ? "text-gold border-gold"
                  : "text-ink-faint border-transparent hover:text-ink hover:border-border-strong"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Responsive masonry-style grid ─────────────────────────────────── */}
      {/*
        Layout logic:
        - Mobile:  1 column, full width
        - Tablet:  2 columns, featured items span both
        - Desktop: 3 columns, featured landscape items span 2 cols
        
        The `featured` flag on certain items causes md:col-span-2, creating
        a natural editorial rhythm without a true masonry JS library.
        For true masonry (different row heights), consider 'react-masonry-css'
        or CSS column-count as an alternative.
      */}
      <motion.div
        layout
        className="
          grid gap-3 md:gap-4
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="font-serif text-xl text-ink-faint font-light italic">
            No projects in this category yet.
          </p>
        </div>
      )}

      {/* Load more / Enquiry CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-20">
        <a href="#contact" className="btn-accent">
          Enquire About a Project
        </a>
        <a href="#contact" className="btn-ghost">
          View All Credentials →
        </a>
      </div>
    </section>
  );
}