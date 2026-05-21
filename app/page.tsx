"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AnimatedTestimonials from "./components/ui/circular-testimonials";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#A8885A";

const bedroomTestimonials = [
  {
    quote:
      "The morning light in our master suite looked like a photograph, not a render.",
    name: "Sarah Jenkins",
    designation: "Principal, Jenkins Howe Interiors — London",
    src: "/images/gallery/bedrooms/elegant-master-bedroom1.png",
  },
  {
    quote:
      "Their visualizations became the investment deck. Three anchor investors cited the imagery specifically.",
    name: "Marcello Rossi",
    designation: "Development Director, Rossi Hospitality Group — Dubai",
    src: "/images/gallery/bedrooms/elegant-master-bedroom3.png",
  },
  {
    quote: "Indistinguishable from photography of a completed space.",
    name: "Elena Rodriguez",
    designation: "Founder, Studio Elara — Abu Dhabi",
    src: "/images/gallery/bedrooms/elegant-master-bedroom5.png",
  },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#080808", color: "#F0EBE3" }}
    >
      <Nav scrolled={false} />
      <Hero />

      {/* ── BEDROOM SECTION ── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingTop: "clamp(6rem, 10vw, 10rem)", paddingBottom: "clamp(6rem, 10vw, 10rem)" }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mb-20"
        >
          {/* Gold label */}
          <span
            className="block font-sans font-light tracking-[0.45em] uppercase mb-8"
            style={{
              fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)",
              color: GOLD,
              letterSpacing: "0.45em",
            }}
          >
            01. BEDROOMS — PRIVATE SANCTUARIES
          </span>

          {/* Massive italic serif headline */}
          <h2
            className="font-serif italic font-extralight leading-[1.05]"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.2rem)",
              color: "#F0EBE3",
              maxWidth: "900px",
              letterSpacing: "-0.01em",
            }}
          >
            Each bedroom is a study in controlled absence — where light enters
            not to illuminate, but to reveal.
          </h2>

          {/* Thin rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="origin-left mt-10"
            style={{
              height: "1px",
              width: "clamp(80px, 12vw, 160px)",
              backgroundColor: GOLD,
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* Circular Testimonials carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
        >
          <AnimatedTestimonials
            testimonials={bedroomTestimonials}
            autoplay={true}
            colors={{
              name: "#F0EBE3",
              designation: "#A8885A",
              testimony: "#9A948E",
              arrowBackground: "#1C1916",
              arrowForeground: "#F0EBE3",
              arrowHoverBackground: "#A8885A",
            }}
          />
        </motion.div>

        {/* View portfolio CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-4 font-sans font-light tracking-[0.35em] uppercase group"
            style={{
              fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)",
              color: GOLD,
            }}
          >
            <span
              style={{
                borderBottom: "1px solid #A8885A",
                paddingBottom: "2px",
                transition: "opacity 0.3s ease",
              }}
              className="group-hover:opacity-60"
            >
              View Full Portfolio
            </span>
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                backgroundColor: GOLD,
                transition: "width 0.4s ease",
              }}
              className="group-hover:w-12"
            />
          </a>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-8 md:px-16 lg:px-24 py-10 flex items-center justify-between"
        style={{ borderTop: "1px solid #1A1714" }}
      >
        <a
          href="/work"
          className="font-sans font-light tracking-[0.3em] uppercase"
          style={{ fontSize: "0.6rem", color: "#3A342E" }}
        >
          View Portfolio
        </a>

        <p
          className="font-sans font-light tracking-wide"
          style={{ fontSize: "0.6rem", color: "#2A2520" }}
        >
          {new Date().getFullYear()} Archviz Craft Dubai
        </p>
      </footer>
    </div>
  );
}