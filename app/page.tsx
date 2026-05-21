"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#A8885A";

// ── Bedroom showcase slides ────────────────────────────────────────────────────
const bedroomSlides = [
  {
    src: "/images/portfolio/bedrooms/elegant-master-bedroom1.jpg",
    quote:
      "The lighting studies they produced were more considered than anything we had seen from a visualisation studio. Material gradients, shadow depth, the quality of reflected light off stone — technically, the work is exceptional.",
    author: "Priya Mehta",
    role: "Design Principal · Foster + Partners, London",
  },
  {
    src: "/images/portfolio/bedrooms/elegant-master-bedroom3.jpg",
    quote:
      "We pre-sold 14 units from renders alone. The spatial atmosphere they created communicated something photography of completed projects rarely achieves. Investors weren't looking at images — they were already inside the building.",
    author: "Khalid Al Mansoori",
    role: "Managing Director · Mansoori Capital Developments, Dubai",
  },
  {
    src: "/images/portfolio/bedrooms/elegant-master-bedroom5.jpg",
    quote:
      "They understand how a room feels, not just how it looks. The hospitality intelligence here is genuinely rare.",
    author: "Isabelle Fournier",
    role: "Founder · Atelier Fournier, Paris",
  },
];

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    number: "01",
    title: "Architectural Visualisation",
    description:
      "Still renders of unbuilt architecture. Every frame a considered composition of light, material, and space.",
  },
  {
    number: "02",
    title: "Interior Rendering",
    description:
      "Spatial storytelling for interior concepts. We render atmosphere, not just furniture.",
  },
  {
    number: "03",
    title: "Walkthrough Animation",
    description:
      "Cinematic fly-throughs and walkthrough films that immerse clients in the unbuilt project.",
  },
  {
    number: "04",
    title: "360° Panoramic Views",
    description:
      "Immersive spherical renders for VR headsets, web viewers, and real estate presentations.",
  },
  {
    number: "05",
    title: "Concept Design",
    description:
      "Early-stage design exploration. We help architects and developers visualise possibilities before CAD is finalised.",
  },
  {
    number: "06",
    title: "Brand Imagery",
    description:
      "Hero images for marketing suites, brochures, hoardings, and luxury real estate campaigns.",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "14",   label: "Countries" },
  { value: "9",    label: "Years of Practice" },
  { value: "40+",  label: "Awards & Recognition" },
];

// ── Fade-up variant ────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: EASE, delay: i * 0.12 },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % bedroomSlides.length),
      5500
    );
    return () => clearInterval(t);
  }, []);

  const prev = () =>
    setActive((p) => (p - 1 + bedroomSlides.length) % bedroomSlides.length);
  const next = () =>
    setActive((p) => (p + 1) % bedroomSlides.length);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#080808", color: "#F0EBE3" }}
    >
      <Nav scrolled={false} />

      {/* ── HERO — untouched ──────────────────────────────────────────────── */}
      <Hero />

      {/* ── MANIFESTO STRIP ──────────────────────────────────────────────── */}
      <motion.section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(7rem,11vw,11rem)",
          paddingBottom: "clamp(7rem,11vw,11rem)",
          borderBottom: "1px solid #141210",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        custom={0}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="block font-sans font-light uppercase mb-10"
            style={{ fontSize: "0.6rem", color: GOLD, letterSpacing: "0.48em" }}
          >
            Studio Manifesto
          </span>
          <blockquote
            className="font-serif font-extralight italic leading-[1.35]"
            style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.8rem)",
              color: "#F0EBE3",
            }}
          >
            We render architecture through the lens of hospitality —
            understanding how spaces are inhabited, not just how they appear.
            Precision meets emotional intelligence.
          </blockquote>
          <motion.div
            className="mx-auto mt-12 origin-center"
            style={{ height: "1px", width: "48px", backgroundColor: GOLD, opacity: 0.5 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          />
        </div>
      </motion.section>

      {/* ── BEDROOM SHOWCASE ─────────────────────────────────────────────── */}
      <section
        id="bedrooms"
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(6rem,10vw,10rem)",
          paddingBottom: "clamp(6rem,10vw,10rem)",
        }}
      >
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span
            className="block font-sans font-light uppercase mb-6"
            style={{
              fontSize: "clamp(0.6rem,0.9vw,0.75rem)",
              color: GOLD,
              letterSpacing: "0.45em",
            }}
          >
            01. Selected Work — Private Sanctuaries
          </span>
          <h2
            className="font-serif italic font-extralight leading-[1.05]"
            style={{
              fontSize: "clamp(2rem,4.5vw,4.2rem)",
              color: "#F0EBE3",
              maxWidth: "860px",
            }}
          >
            The private suite, before the walls exist.
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="origin-left mt-10"
            style={{
              height: "1px",
              width: "clamp(80px,12vw,160px)",
              backgroundColor: GOLD,
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* Slideshow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", maxHeight: "75vh" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 1.0, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={bedroomSlides[active].src}
                alt="Luxury Bedroom"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "-quote"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p
                  className="font-serif italic font-light mb-3"
                  style={{
                    fontSize: "clamp(1rem,2vw,1.45rem)",
                    color: "#F0EBE3",
                    maxWidth: "680px",
                    lineHeight: 1.45,
                  }}
                >
                  &ldquo;{bedroomSlides[active].quote}&rdquo;
                </p>
                <p
                  className="font-sans font-light"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    color: GOLD,
                  }}
                >
                  — {bedroomSlides[active].author},{" "}
                  {bedroomSlides[active].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <div className="absolute bottom-8 right-10 flex gap-3">
            {[prev, next].map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                className="flex items-center justify-center transition-colors duration-300"
                style={{
                  width: "44px",
                  height: "44px",
                  border: "1px solid rgba(168,136,90,0.4)",
                  color: "#F0EBE3",
                  backgroundColor: "rgba(28,25,22,0.7)",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    GOLD)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(168,136,90,0.4)")
                }
              >
                {i === 0 ? "←" : "→"}
              </button>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute top-6 right-10 flex gap-2">
            {bedroomSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? "24px" : "6px",
                  height: "2px",
                  backgroundColor:
                    i === active ? GOLD : "rgba(240,235,227,0.3)",
                  transition: "all 0.4s ease",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="mt-16"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-4 font-sans font-light tracking-[0.35em] uppercase transition-opacity duration-300 hover:opacity-60"
            style={{
              fontSize: "clamp(0.6rem,0.85vw,0.72rem)",
              color: GOLD,
            }}
          >
            <span style={{ borderBottom: "1px solid #A8885A", paddingBottom: "2px" }}>
              View Full Portfolio
            </span>
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                backgroundColor: GOLD,
              }}
            />
          </a>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #141210", borderBottom: "1px solid #141210" }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="px-10 py-12"
              style={{
                borderRight: i < 3 ? "1px solid #141210" : "none",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <p
                className="font-serif font-extralight"
                style={{
                  fontSize: "clamp(2rem,3.5vw,3.2rem)",
                  color: "#F0EBE3",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                className="font-sans font-light mt-2"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#4A4540",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(6rem,10vw,10rem)",
          paddingBottom: "clamp(6rem,10vw,10rem)",
        }}
      >
        {/* Header */}
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <div>
            <p
              className="font-sans font-light uppercase mb-6"
              style={{ fontSize: "0.6rem", color: GOLD, letterSpacing: "0.48em" }}
            >
              What We Do
            </p>
            <h2
              className="font-serif font-extralight italic"
              style={{ fontSize: "clamp(2rem,4vw,4rem)", color: "#F0EBE3" }}
            >
              Services
            </h2>
          </div>
          <p
            className="font-sans font-light leading-relaxed"
            style={{
              fontSize: "0.85rem",
              color: "#4A4540",
              maxWidth: "300px",
              lineHeight: 1.8,
            }}
          >
            Full-spectrum visualisation for architecture and real estate.
            Every deliverable is a considered composition.
          </p>
        </motion.div>

        {/* List */}
        <div style={{ borderTop: "1px solid #141210" }}>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group py-9 md:py-10 grid md:grid-cols-12 gap-4 md:gap-0 cursor-default"
              style={{ borderBottom: "1px solid #141210" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              variants={fadeUp}
              custom={i * 0.5}
            >
              <span
                className="md:col-span-1 font-sans font-light pt-1"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "#2A2520",
                }}
              >
                {service.number}
              </span>
              <h3
                className="md:col-span-5 font-serif font-light transition-colors duration-500"
                style={{
                  fontSize: "clamp(1.2rem,2vw,1.7rem)",
                  color: "#6B6560",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLHeadingElement).style.color =
                    "#F0EBE3")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLHeadingElement).style.color =
                    "#6B6560")
                }
              >
                {service.title}
              </h3>
              <p
                className="md:col-span-5 font-sans font-light leading-relaxed transition-colors duration-500"
                style={{ fontSize: "0.85rem", color: "#2A2520", lineHeight: 1.8 }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLParagraphElement).style.color =
                    "#4A4540")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLParagraphElement).style.color =
                    "#2A2520")
                }
              >
                {service.description}
              </p>
              <div className="md:col-span-1 flex justify-end items-start">
                <span
                  className="font-sans text-sm transition-all duration-500 inline-block group-hover:translate-x-1"
                  style={{ color: "#2A2520" }}
                >
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
      <motion.section
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(6rem,10vw,10rem)",
          paddingBottom: "clamp(6rem,10vw,10rem)",
          borderTop: "1px solid #141210",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        custom={0}
      >
        <div className="grid md:grid-cols-12 gap-12 md:gap-0">
          {/* Left label + headline */}
          <div className="md:col-span-7 md:pr-20">
            <p
              className="font-sans font-light uppercase mb-8"
              style={{ fontSize: "0.6rem", color: GOLD, letterSpacing: "0.48em" }}
            >
              The Studio
            </p>
            <h2
              className="font-serif font-extralight leading-[1.1]"
              style={{
                fontSize: "clamp(1.8rem,4vw,4rem)",
                color: "#F0EBE3",
              }}
            >
              Architecture Rendered with{" "}
              <span className="italic" style={{ color: "#6B6560" }}>
                Hospitality Intelligence.
              </span>
            </h2>
          </div>

          {/* Right body copy */}
          <div
            className="md:col-span-5 md:pt-16 flex flex-col justify-between gap-8"
            style={{ paddingLeft: "0" }}
          >
            <div style={{ borderLeft: "1px solid #1C1916", paddingLeft: "2rem" }}>
              <p
                className="font-sans font-light leading-relaxed mb-6"
                style={{ fontSize: "0.9rem", color: "#4A4540", lineHeight: 1.85 }}
              >
                ArchViz Craft is a luxury architectural visualisation studio
                serving architects, developers, and interior designers across
                the Gulf and beyond. We bring 9 years of regional expertise
                and a hospitality-trained eye to every project.
              </p>
              <p
                className="font-sans font-light leading-relaxed"
                style={{ fontSize: "0.9rem", color: "#2A2520", lineHeight: 1.85 }}
              >
                Our work sits at the intersection of technical precision and
                cinematic artistry. Every image is a deliberate composition.
                Visualisation is not documentation. It is persuasion.
              </p>
            </div>
            <a
              href="/studio"
              className="inline-flex items-center gap-3 font-sans font-light tracking-[0.3em] uppercase transition-opacity duration-300 hover:opacity-60"
              style={{ fontSize: "0.6rem", color: GOLD }}
            >
              <span style={{ borderBottom: "1px solid #A8885A", paddingBottom: "2px" }}>
                Meet the Studio
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1px",
                  backgroundColor: GOLD,
                }}
              />
            </a>
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-8 md:px-16 lg:px-24"
        style={{
          paddingTop: "clamp(6rem,10vw,10rem)",
          paddingBottom: "clamp(6rem,10vw,10rem)",
          borderTop: "1px solid #141210",
        }}
      >
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <p
            className="font-sans font-light uppercase mb-6"
            style={{ fontSize: "0.6rem", color: GOLD, letterSpacing: "0.48em" }}
          >
            Get In Touch
          </p>
          <h2
            className="font-serif font-extralight"
            style={{ fontSize: "clamp(2rem,5vw,5rem)", color: "#F0EBE3" }}
          >
            Begin a project
            <br />
            <span className="italic" style={{ color: "#6B6560" }}>
              with us.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-16 md:gap-0">
          {/* Contact info */}
          <div className="md:col-span-4 md:pr-12 space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <p
                className="font-sans font-light uppercase mb-4"
                style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#2A2520" }}
              >
                WhatsApp
              </p>
              <a
                href="https://wa.me/971500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif transition-colors duration-500"
                style={{ fontSize: "1.2rem", color: "#6B6560" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE3")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#6B6560")
                }
              >
                +971 50 000 0000
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <p
                className="font-sans font-light uppercase mb-4"
                style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#2A2520" }}
              >
                Email
              </p>
              <a
                href="mailto:studio@archvizcraft.com"
                className="font-serif transition-colors duration-500"
                style={{ fontSize: "1.2rem", color: "#6B6560" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE3")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#6B6560")
                }
              >
                studio@archvizcraft.com
              </a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            className="md:col-span-8 md:pl-16"
            style={{ borderLeft: "1px solid #141210" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-16 lg:px-24 py-10 flex items-center justify-between"
        style={{ borderTop: "1px solid #141210" }}
      >
        <a
          href="/work"
          className="font-sans font-light tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ fontSize: "0.6rem", color: "#2A2520" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#2A2520")
          }
        >
          View Portfolio
        </a>
        <p
          className="font-sans font-light tracking-wide"
          style={{ fontSize: "0.6rem", color: "#1A1714" }}
        >
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>
    </div>
  );
}

// ── Contact form as sub-component ─────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    borderBottom: "1px solid #1C1916",
    padding: "0.75rem 0",
    fontSize: "0.9rem",
    color: "#F0EBE3",
    outline: "none",
    fontFamily: "var(--font-dm), sans-serif",
    fontWeight: 300,
    letterSpacing: "0.02em",
  };

  if (submitted) {
    return (
      <div className="py-20">
        <h3
          className="font-serif font-extralight italic"
          style={{ fontSize: "1.8rem", color: "#F0EBE3" }}
        >
          Thank you. We&rsquo;ll be in touch shortly.
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input
        type="text"
        required
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
        style={inputStyle}
        onFocus={(e) =>
          ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
            "#4A4540")
        }
        onBlur={(e) =>
          ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
            "#1C1916")
        }
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
        style={inputStyle}
        onFocus={(e) =>
          ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
            "#4A4540")
        }
        onBlur={(e) =>
          ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
            "#1C1916")
        }
      />
      <textarea
        rows={5}
        required
        placeholder="Tell us about your project"
        value={formData.message}
        onChange={(e) =>
          setFormData((p) => ({ ...p, message: e.target.value }))
        }
        style={{ ...inputStyle, resize: "none" }}
        onFocus={(e) =>
          ((e.currentTarget as HTMLTextAreaElement).style.borderBottomColor =
            "#4A4540")
        }
        onBlur={(e) =>
          ((e.currentTarget as HTMLTextAreaElement).style.borderBottomColor =
            "#1C1916")
        }
      />
      <button
        type="submit"
        className="font-sans font-light tracking-[0.28em] uppercase transition-all duration-500"
        style={{
          fontSize: "0.65rem",
          color: "#6B6560",
          border: "1px solid #1C1916",
          padding: "1rem 2.5rem",
          background: "transparent",
          cursor: "pointer",
          letterSpacing: "0.28em",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "#F0EBE3";
          el.style.borderColor = "#4A4540";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "#6B6560";
          el.style.borderColor = "#1C1916";
        }}
      >
        Send Enquiry
      </button>
    </form>
  );
}