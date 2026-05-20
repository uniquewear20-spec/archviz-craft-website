"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  area: string;
  aspectClass?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.0, 1.0] },
  },
};

export default function GalleryItem({
  item,
  index,
}: {
  item: GalleryItemData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 60, stiffness: 120 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const sizesProp =
    index === 0
      ? "(max-width: 767px) 100vw, 58vw"
      : index === 1
      ? "(max-width: 767px) 100vw, 42vw"
      : "(max-width: 767px) 100vw, 50vw";

  return (
    <motion.div
      style={{ gridArea: item.area }}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className="cursor-pointer group"
    >
      {/* Layer 2: Aspect-ratio anchor — plain div, never touched by motion */}
      <div
        ref={ref}
        className={`relative w-full overflow-hidden ${item.aspectClass ?? "aspect-[4/3]"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Layer 3: 3D tilt — absolute inset-0, never affects layout */}
        <motion.div
          className="absolute inset-0"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizesProp}
            className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.06]"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Hover label */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
            <p className="text-white/90 text-xs tracking-[0.2em] uppercase font-sans font-light">
              View Project →
            </p>
          </div>
        </motion.div>
      </div>

      {/* Caption */}
      <div className="pt-4 pb-2">
        <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-light font-sans">
          {item.category}
        </p>
        <h3 className="text-stone-200 text-xl font-light tracking-wide mt-1 font-serif">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}