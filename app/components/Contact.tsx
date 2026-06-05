"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// The "as const" here locks the array so TypeScript accepts it as a valid easing curve
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.25, 0.1, 0, 1] as const, 
    },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0a0a08] px-6 py-24 md:px-16 md:py-36">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-[9px] tracking-[0.28em] uppercase text-stone-600 mb-6 font-light font-sans">
            Get In Touch
          </p>
          <h2
            className="text-stone-100 font-serif font-light"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
          >
            Begin a project
            <br />
            <span className="italic text-stone-400">with us.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-16 md:gap-0">
          <div className="md:col-span-4 md:pr-12 space-y-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[9px] tracking-[0.2em] uppercase text-stone-600 mb-4 font-sans">WhatsApp</p>
              <a
                href="https://wa.me/971503050351"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 text-lg font-serif hover:text-white transition-colors duration-500 block"
              >
                +971 50 305 0351
              </a>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[9px] tracking-[0.2em] uppercase text-stone-600 mb-4 font-sans">Email</p>
              <a
                href="mailto:studio@archvizcraft.com"
                className="text-stone-300 text-lg font-serif hover:text-white transition-colors duration-500 block"
              >
                studio@archvizcraft.com
              </a>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-8 md:pl-16 md:border-l border-stone-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {submitted ? (
              <div className="h-full flex flex-col justify-center py-20">
                <h3 className="text-stone-100 font-serif font-light italic text-2xl">
                    Thank you. We'll be in touch shortly.
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-stone-800 py-3 text-stone-200 focus:outline-none focus:border-stone-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-stone-800 py-3 text-stone-200 focus:outline-none focus:border-stone-500"
                />
                <textarea
                  rows={5}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-transparent border-b border-stone-800 py-3 text-stone-200 focus:outline-none focus:border-stone-500 resize-none"
                />
                <button
                  type="submit"
                  className="text-[10px] tracking-[0.25em] uppercase text-stone-400 border border-stone-700 px-8 py-4 hover:text-white hover:border-stone-400 transition-all duration-700"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}