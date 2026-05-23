"use client";

// ══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS MARQUEE — adapted for ArchViz Craft
// Two opposite-scrolling rows of clean cards. Restyled from the light/Poppins
// source into Cormorant + DM Sans, gold accents, dark cinematic palette.
// Pauses on hover. Faces use object-fit:cover on a small circular avatar only
// (never on architectural renders). Full light/dark support.
// Drop in: app/components/TestimonialsMarquee.tsx
// ══════════════════════════════════════════════════════════════════════════

import React, { useMemo } from "react";

export interface MarqueeTestimonial {
  quote: string;
  name: string;
  designation: string; // "Role · Company"
  src: string;
}

function GoldVerify() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden>
      <path d="M12 2l2.4 1.8 3 .1.9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3 .1L12 22l-2.4-1.8-3-.1-.9-2.9L3.3 15.4l.9-2.9-.9-2.9 2.4-1.8.9-2.9 3-.1z" fill="#A8885A" opacity="0.9" />
      <path d="M9.5 12.2l1.8 1.8 3.4-3.6" stroke="#0A0806" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function Card({ card }: { card: MarqueeTestimonial }) {
  return (
    <div className="tm-card">
      <div className="tm-card-head">
        <div className="tm-avatar">
          <img src={card.src} alt={card.name} draggable={false} />
        </div>
        <div className="tm-meta">
          <div className="tm-name-row">
            <span className="tm-name">{card.name}</span>
            <GoldVerify />
          </div>
          <span className="tm-desig">{card.designation}</span>
        </div>
      </div>
      <div className="tm-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="9" height="9" viewBox="0 0 14 14" fill="#A8885A" opacity="0.5">
            <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5z" />
          </svg>
        ))}
      </div>
      <p className="tm-quote">&ldquo;{card.quote}&rdquo;</p>
    </div>
  );
}

function Row({ data, reverse = false, speed = 60 }: { data: MarqueeTestimonial[]; reverse?: boolean; speed?: number; }) {
  const doubled = useMemo(() => [...data, ...data], [data]);
  return (
    <div className="tm-row-wrap">
      <div className="tm-fade tm-fade-left" />
      <div className="tm-track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {doubled.map((c, i) => <Card key={i} card={c} />)}
      </div>
      <div className="tm-fade tm-fade-right" />
    </div>
  );
}

export default function TestimonialsMarquee({
  row1,
  row2,
}: {
  row1: MarqueeTestimonial[];
  row2: MarqueeTestimonial[];
}) {
  return (
    <div className="tm-root">
      <Row data={row1} reverse={false} speed={64} />
      <Row data={row2} reverse={true} speed={58} />

      <style>{`
        .tm-root {
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 1.6vw, 1.5rem);
          width: 100%;
        }
        .tm-row-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .tm-fade {
          pointer-events: none;
          position: absolute;
          top: 0;
          height: 100%;
          width: clamp(60px, 10vw, 160px);
          z-index: 2;
        }
        .tm-fade-left  { left: 0;  background: linear-gradient(to right, var(--bg), transparent); }
        .tm-fade-right { right: 0; background: linear-gradient(to left,  var(--bg), transparent); }
        .tm-track {
          display: flex;
          width: max-content;
          animation-name: tm-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .tm-row-wrap:hover .tm-track { animation-play-state: paused; }
        @keyframes tm-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tm-card {
          flex-shrink: 0;
          width: clamp(300px, 30vw, 384px);
          margin-right: clamp(1rem, 1.6vw, 1.5rem);
          padding: clamp(1.6rem, 2.2vw, 2.1rem);
          background-color: rgba(255,255,255,0.018);
          border: 1px solid rgba(168,136,90,0.10);
          transition: background-color 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
        }
        .tm-card:hover {
          background-color: rgba(168,136,90,0.05);
          border-color: rgba(168,136,90,0.26);
          transform: translateY(-3px);
        }
        .tm-card-head {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .tm-avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(168,136,90,0.22);
        }
        .tm-avatar img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(35%);
          display: block;
        }
        .tm-meta { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .tm-name-row { display: flex; align-items: center; gap: 0.4rem; }
        .tm-name {
          font-family: var(--font-cormorant), serif;
          font-weight: 400;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: var(--text-loud);
          letter-spacing: 0.005em;
          line-height: 1.1;
        }
        .tm-desig {
          font-family: var(--font-dm), sans-serif;
          font-weight: 400;
          font-size: clamp(0.6rem, 0.8vw, 0.68rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 250px;
        }
        .tm-stars { display: flex; gap: 0.22rem; margin-bottom: 1rem; }
        .tm-quote {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(0.95rem, 1.25vw, 1.12rem);
          color: var(--text-soft);
          line-height: 1.6;
          letter-spacing: -0.003em;
          margin: 0;
          /* clamp to 5 lines so cards stay even height without truncating mid-thought */
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Light-mode contrast */
        :root.light-mode .tm-card { background-color: rgba(26,20,16,0.015); border-color: rgba(168,136,90,0.18); }
        :root.light-mode .tm-card:hover { background-color: rgba(168,136,90,0.06); }
        :root.light-mode .tm-name  { color: #1a1410; }
        :root.light-mode .tm-quote { color: #2a2018; }
        :root.light-mode .tm-desig { color: #6a5d4f; }

        @media (max-width: 600px) {
          .tm-card { width: 80vw; }
        }
      `}</style>
    </div>
  );
}