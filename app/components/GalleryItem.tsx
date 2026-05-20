"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export interface GalleryItemProps {
  src: string;
  title: string;
  category: string;
  index: number;
  className?: string;
  priority?: boolean;
}

export default function GalleryItem({
  src,
  title,
  category,
  index,
  className = "",
  priority = false,
}: GalleryItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax-lite: image translates upward as user scrolls
  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.04]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.1,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Image container with parallax */}
      <div className="relative w-full h-full overflow-hidden rounded-[2px]">
        <motion.div
          className="absolute inset-0 w-full h-[108%] -top-[4%]"
          style={{ y: imageY, scale: imageScale }}
          transition={{ type: "spring", stiffness: 60, damping: 30 }}
        >
          <Image
            src={src}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Hover dimming overlay */}
        <motion.div
          className="absolute inset-0 bg-[#0a0a08] z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.52 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Bottom gradient — always present, fades on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/70 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />

        {/* Hover Typography Reveal */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 md:p-9">
          {/* Category — small, elegant */}
          <motion.p
            className="text-[10px] tracking-[0.22em] uppercase text-stone-400 font-light mb-3 font-sans"
            initial={{ opacity: 0, y: 14 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {category}
          </motion.p>

          {/* Title */}
          <motion.h3
            className="text-white font-serif text-xl md:text-2xl font-light leading-snug tracking-wide"
            initial={{ opacity: 0, y: 18 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {title}
          </motion.h3>

          {/* Thin divider line */}
          <motion.div
            className="h-px bg-stone-400/40 mt-4 origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Always-visible minimal label (non-hover state) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-7 md:p-9 group-hover:opacity-0 transition-opacity duration-400">
          <p className="text-stone-300 font-sans text-[11px] tracking-[0.16em] uppercase font-light">
            {category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}