"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SKILLS = [
  "Unreal Engine",
  "3ds Max",
  "Corona Renderer",
  "V-Ray",
  "Advanced Lighting",
  "Material Composition",
  "Cinematic Animation",
  "Photorealistic Rendering",
];

export default function StudioPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        color: "var(--text-loud)",
        fontFamily: "var(--font-cormorant), serif",
      }}
    >
      {/* Nav — locked, untouched */}
      <Nav scrolled={true} />

      {/* ── Main split layout ───────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}
        className="studio-grid"
      >
        {/* ── LEFT — Portrait photograph ─────────────────────────────── */}
        <div
          className="studio-photo-wrapper"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "100vh",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 1.8, ease: EASE }}
          >
            <Image
              src="/images/wasim-akram.jpg"
              alt="Wasim Akram — ArchViz Craft"
              fill
              priority
              quality={90}
              sizes="50vw"
              className="studio-photo"
              style={{
                objectFit: "cover",
                objectPosition: "center 20%",
                filter: "grayscale(100%)",
                transition: "filter 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </motion.div>

          {/* Right-edge fade into background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 60%, var(--bg) 100%)",
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background:
                "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
              zIndex: 2,
            }}
          />

          {/* Studio label — bottom left */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "clamp(2rem,4vw,3.5rem)",
              left: "clamp(2rem,4vw,3.5rem)",
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: EASE }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "clamp(8px,0.75vw,10px)",
                letterSpacing: "0.44em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 300,
              }}
            >
              The Studio
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT — Content ────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding:
              "clamp(6rem,10vw,9rem) clamp(3rem,6vw,6rem) clamp(4rem,6vw,6rem) clamp(3rem,5vw,5rem)",
            position: "relative",
          }}
        >
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
          >
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(3rem,5.5vw,5rem)",
                  color: "var(--text-loud)",
                  letterSpacing: "-0.01em",
                }}
              >
                Wasim
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(3rem,5.5vw,5rem)",
                  color: "var(--gold)",
                  fontStyle: "italic",
                  letterSpacing: "-0.01em",
                }}
              >
                Akram
              </span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.p
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              fontSize: "clamp(9px,0.8vw,11px)",
              color: "var(--text-mid)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 300,
              marginTop: "1.4rem",
              marginBottom: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: EASE }}
          >
            Senior 3D Visualizer &amp; Interior Designer
          </motion.p>

          {/* Gold rule */}
          <motion.div
            style={{
              height: "1px",
              width: "48px",
              backgroundColor: "var(--gold)",
              marginTop: "2rem",
              marginBottom: "2rem",
              opacity: 0.65,
            }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          />

          {/* Description */}
          <motion.p
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              fontSize: "clamp(0.82rem,1.1vw,0.92rem)",
              color: "var(--text-soft)",
              lineHeight: 1.95,
              fontWeight: 300,
              maxWidth: "480px",
              marginBottom: "2.5rem",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
          >
            Senior 3D Visualizer &amp; Interior Designer with over 12 years of
            global experience, including 4+ years in the high-end UAE market.
            I specialize in crafting photorealistic architectural visualizations
            and cinematic animations for luxury villas, commercial spaces, and
            large-scale apartments.
            <br />
            <br />
            I bridge the gap between technical precision and artistic
            storytelling using a powerful tech stack including Unreal Engine,
            3ds Max, Corona, and V-Ray. My expertise lies in advanced lighting,
            material composition, and creating immersive environments that bring
            unbuilt architecture to life.
          </motion.p>

          {/* Skill tags */}
          <motion.div
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.85, ease: EASE }}
          >
            {SKILLS.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: "var(--font-dm), sans-serif",
                  fontSize: "clamp(8px,0.7vw,9px)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  color: "var(--text-mid)",
                  border: "1px solid var(--border)",
                  padding: "0.4rem 0.85rem",
                  transition: "color 0.35s ease, border-color 0.35s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.color = "var(--gold)";
                  el.style.borderColor = "rgba(168,136,90,0.3)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.color = "var(--text-mid)";
                  el.style.borderColor = "var(--border)";
                }}
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Back link */}
          <motion.div
            style={{ marginTop: "clamp(3rem,5vw,4.5rem)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.0, ease: EASE }}
          >
            <a
              href="/"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "clamp(8px,0.75vw,10px)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 300,
                color: "var(--text-mid)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                transition: "color 0.35s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}
            >
              <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "currentColor" }} />
              Back to Home
            </a>
          </motion.div>
        </div>
      </div>

      {/* Philosophy section */}
      <motion.section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "clamp(5rem,8vw,8rem) clamp(2rem,6vw,6rem)",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-dm), sans-serif",
              fontSize: "clamp(8px,0.75vw,10px)",
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 300,
              marginBottom: "2.5rem",
            }}
          >
            Philosophy
          </span>
          <blockquote
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(1.4rem,2.8vw,2.2rem)",
              color: "var(--text-loud)",
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            Architecture exists first in the imagination.
            <br />
            My role is to make that vision undeniable
            <br />
            before a single foundation is poured.
          </blockquote>
          <div
            style={{
              height: "1px",
              width: "40px",
              backgroundColor: "var(--gold)",
              opacity: 0.5,
              margin: "2.5rem auto 0",
            }}
          />
        </div>
      </motion.section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem clamp(2rem,6vw,6rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontSize: "clamp(8px,0.75vw,10px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 300,
            color: "var(--text-mid)",
            textDecoration: "none",
            transition: "color 0.35s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-mid)"; }}
        >
          Back to Home
        </a>
        <p
          style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontSize: "clamp(8px,0.75vw,10px)",
            color: "var(--text-muted)",
            letterSpacing: "0.14em",
            fontWeight: 300,
          }}
        >
          © {new Date().getFullYear()} Archviz Craft · Dubai
        </p>
      </footer>

      <style>{`
        .studio-photo-wrapper:hover .studio-photo { filter: grayscale(0%) !important; }
        @media (max-width: 768px) {
          .studio-grid {
            grid-template-columns: 1fr !important;
          }
          .studio-grid > div:first-child {
            min-height: 60vh !important;
          }
        }
      `}</style>
    </div>
  );
}