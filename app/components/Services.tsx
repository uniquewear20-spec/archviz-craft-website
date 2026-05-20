"use client";

import { motion } from "framer-motion";

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

export default function Services() {
  return (
    <section className="bg-[#0a0a08] px-6 py-24 md:px-16 md:py-36">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
        >
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-stone-600 mb-6 font-light font-sans">
              What We Do
            </p>
            <h2
              className="text-stone-100 font-serif font-light italic"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Services
            </h2>
          </div>
          <p className="text-stone-500 text-sm font-light max-w-xs leading-relaxed font-sans">
            Full-spectrum visualisation for the architecture and real estate industry.
          </p>
        </motion.div>

        {/* Service list */}
        <div className="border-t border-stone-900">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group border-b border-stone-900 py-8 md:py-10 grid md:grid-cols-12 gap-4 md:gap-0 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 1.1,
                ease: [0.25, 0.1, 0, 1],
                delay: i * 0.06,
              }}
            >
              <span className="md:col-span-1 text-stone-700 text-[10px] tracking-[0.2em] font-sans font-light pt-1">
                {service.number}
              </span>

              <h3
                className="md:col-span-5 text-stone-300 font-serif font-light group-hover:text-stone-100 transition-colors duration-500"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                {service.title}
              </h3>

              <p className="md:col-span-5 text-stone-500 text-sm font-light leading-relaxed font-sans group-hover:text-stone-400 transition-colors duration-500">
                {service.description}
              </p>

              <div className="md:col-span-1 flex justify-end items-start">
                <span className="text-stone-700 text-sm group-hover:text-stone-400 group-hover:translate-x-1 transition-all duration-500 inline-block">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}