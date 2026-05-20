"use client";

import { motion, Variants } from "framer-motion";

// By adding ": Variants", we explicitly tell TypeScript this is valid Framer Motion configuration
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.25, 0.1, 0, 1], 
      delay: i * 0.15 
    },
  }),
};

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "14", label: "Countries" },
  { value: "8", label: "Years of Practice" },
  { value: "40+", label: "Awards & Recognition" },
];

export default function About() {
  return (
    <section className="bg-[#0a0a08] px-6 py-24 md:px-16 md:py-36">
      <div className="max-w-7xl mx-auto">
        {/* Top label */}
        <motion.p
          className="text-[9px] tracking-[0.28em] uppercase text-stone-600 mb-16 font-light font-sans"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          The Studio
        </motion.p>

        {/* Main editorial layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-0">
          {/* Left — large serif statement */}
          <motion.div
            className="md:col-span-7 md:pr-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <h2
              className="text-stone-100 font-serif font-light leading-[1.1] tracking-[-0.01em]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
            >
              We transform architectural
              <br />
              <span className="italic text-stone-400">
                ideas into visual narratives
              </span>
              <br />
              that move people.
            </h2>
          </motion.div>

          {/* Right — body copy */}
          <motion.div
            className="md:col-span-5 md:pt-4 flex flex-col justify-between gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            <div className="space-y-5">
              <p className="text-stone-400 text-sm font-light leading-relaxed tracking-wide font-sans">
                Archviz Craft is a luxury architectural visualisation studio
                serving architects, developers, and interior designers across
                the Gulf and beyond. Our work sits at the intersection of
                technical precision and cinematic artistry.
              </p>
              <p className="text-stone-500 text-sm font-light leading-relaxed tracking-wide font-sans">
                Every image we create is a deliberate composition — considered
                light, intentional atmosphere, and geometry rendered with care.
                We believe visualisation is not documentation. It is persuasion.
              </p>
            </div>

            <div className="w-8 h-px bg-stone-700" />
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-900 mt-24 border border-stone-900">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#0a0a08] px-8 py-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 3} // Added offset to keep unique animation delays
              variants={fadeUp}
            >
              <p
                className="text-stone-100 font-serif font-light"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
              >
                {stat.value}
              </p>
              <p className="text-stone-600 text-[9px] tracking-[0.22em] uppercase font-light font-sans mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}