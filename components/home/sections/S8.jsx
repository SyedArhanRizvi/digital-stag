"use client"

import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";

/* ── accent palette ── */
const ACCENTS = ["#7c3aed", "#4f46e5", "#0ea5e9", "#06b6d4", "#a855f7"];

function getAccent(ci, seed) {
  const h = ((ci * 2654435761 + seed) >>> 0);
  return h % 10 < 3 ? ACCENTS[h % ACCENTS.length] : null;
}

/* ── PROXIMITY HEADING ── */
function ProximityHeading({ text }) {
  const containerRef = useRef(null);

  const chars = useMemo(() => {
    let ci = 0;
    return text.split("").map((ch, i) => {
      const isLetter = /[a-zA-Z]/.test(ch);
      const accent = isLetter ? getAccent(ci, 77) : null;
      if (isLetter) ci++;
      return { ch, accent, i };
    });
  }, [text]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const spans = container.querySelectorAll(".ph-char");

    const handleMouseMove = (e) => {
      spans.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const t = Math.max(0, 1 - dist / 150);
        const weight = Math.round(400 + t * 500);
        
        el.style.fontWeight = String(weight);
        el.style.color = t > 0.5 
          ? (el.dataset.accent || "#7c3aed") 
          : `rgba(13,13,13,${0.4 + t * 0.6})`;
      });
    };

    const handleMouseLeave = () => {
      spans.forEach((el) => {
        el.style.fontWeight = "600";
        el.style.color = el.dataset.accent || "#0d0d0d";
      });
    };

    // Set initial styles
    spans.forEach((el) => {
      el.style.fontWeight = "600";
      el.style.color = el.dataset.accent || "#0d0d0d";
    });

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <h2
      ref={containerRef}
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3.6rem)",
        fontWeight: 600,
        lineHeight: 1.08,
        letterSpacing: "-0.03em",
        textAlign: "center",
        margin: "0 0 4px",
        userSelect: "none",
        cursor: "default",
      }}
    >
      {chars.map(({ ch, accent, i }) => (
        <span
          key={i}
          className="ph-char"
          data-accent={accent || ""}
          style={{
            display: "inline-block",
            color: accent || "#0d0d0d",
            fontWeight: 600,
            textShadow: accent ? `0 0 20px ${accent}44` : "none",
            transition: "font-weight 0.1s ease, color 0.1s ease",
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h2>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS DATA
───────────────────────────────────────────────────────────── */
const testimonialsData = [
  {
    id: 1,
    name: "Ethan Chan",
    role: "Verified Buyer",
    rating: 5,
    text: "Great quality products and helpful customer support. Highly recommended for everyday shopping needs.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format",
    pos: { top: "50%", left: "50%", size: "clamp(120px, 12vw, 160px)" }, 
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Fashion Enthusiast",
    rating: 5,
    text: "The shipping was incredibly fast, and the packaging felt premium. Will definitely be a returning customer!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format",
    pos: { top: "35%", left: "31%", size: "clamp(70px, 7vw, 90px)" },
  },
  {
    id: 3,
    name: "Marcus Brodie",
    role: "Tech Reviewer",
    rating: 4,
    text: "Excellent curation of gadgets. Customer service helped me pick the right size instantly. 10/10.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format",
    pos: { top: "45%", left: "14%", size: "clamp(75px, 8vw, 100px)" },
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Power Shopper",
    rating: 5,
    text: "ShopEase has completely changed how I source my decor. Affordable yet incredibly chic and durable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format",
    pos: { top: "70%", left: "9%", size: "clamp(65px, 6vw, 85px)" },
  },
  {
    id: 5,
    name: "David K.",
    role: "Lifestyle Blogger",
    rating: 5,
    text: "In love with their sustainable lineup. Genuine materials, sleek UI, and crisp tracking updates.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format",
    pos: { top: "62%", left: "27%", size: "clamp(55px, 5vw, 75px)" },
  },
  {
    id: 6,
    name: "Aisha Rahman",
    role: "Interior Designer",
    rating: 5,
    text: "Unbeatable wholesale rates and unmatched premium fidelity. Highly recommended to all peers.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format",
    pos: { top: "42%", left: "73%", size: "clamp(60px, 6vw, 80px)" },
  },
  {
    id: 7,
    name: "Liam Foster",
    role: "Fitness Coach",
    rating: 4,
    text: "Sturdy products that hold up to heavy wear. Support team solved my billing query within minutes.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format",
    pos: { top: "33%", left: "91%", size: "clamp(65px, 6vw, 85px)" },
  },
  {
    id: 8,
    name: "Chloe Bennett",
    role: "Daily Creator",
    rating: 5,
    text: "Everything down to the UI flows perfectly. Hassle-free checkouts make this my absolute favorite stop.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format",
    pos: { top: "57%", left: "86%", size: "clamp(80px, 8vw, 105px)" },
  },
  {
    id: 9,
    name: "Julian Alvarez",
    role: "Regular Customer",
    rating: 5,
    text: "The returns policy is so smooth it keeps me coming back risk-free. Amazing overall lifecycle ecosystem.",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&auto=format",
    pos: { top: "69%", left: "71%", size: "clamp(70px, 7vw, 90px)" },
  },
];

export default function S8() {
  const [activeId, setActiveId] = useState(1);
  const activeData = testimonialsData.find((item) => item.id === activeId) || testimonialsData[0];
  
  const containerRef = useRef(null);
  const textCardRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    const avatars = containerRef.current?.querySelectorAll(".orbit-avatar");
    if (!avatars) return;
    
    avatars.forEach((avatar, index) => {
      const randomX = 10 + Math.random() * 15;
      const randomY = 10 + Math.random() * 15;
      const duration = 4 + Math.random() * 3;

      gsap.to(avatar, {
        x: `+=${randomX}`,
        y: `-=${randomY}`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  useEffect(() => {
    if (textCardRef.current) {
      gsap.fromTo(
        textCardRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    if (auraRef.current) {
      gsap.fromTo(
        auraRef.current,
        { scale: 0.8, opacity: 0.6 },
        { scale: 1.3, opacity: 0, duration: 2, repeat: -1, ease: "power1.out" }
      );
    }
  }, [activeId]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#fafafa] flex flex-col justify-between py-16 px-4 overflow-hidden select-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "center center",
      }}
    >
      {/* ── HEADER ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mt-4">
        <ProximityHeading text="What Our Customers Say" />
        <p className="text-[#737373] text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed px-2 mt-3 pointer-events-none">
          See how our customers share their real experiences with ShopEase and why they continue to trust us for their everyday shopping needs.
        </p>
      </div>

      {/* ── ORBITAL AVATARS ── */}
      <div className="absolute inset-0 w-full h-full my-auto flex items-center justify-center">
        {testimonialsData.map((item) => {
          const isActive = item.id === activeId;
          
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="orbit-avatar absolute flex items-center justify-center cursor-pointer transition-all duration-500 ease-out"
              style={{
                top: item.pos.top,
                left: item.pos.left,
                width: item.pos.size,
                height: item.pos.size,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 40 : 10,
              }}
            >
              {isActive && (
                <>
                  <div
                    ref={auraRef}
                    className="absolute inset-0 rounded-full border-2 border-[#f25c05]/40 pointer-events-none scale-110"
                  />
                  <div className="absolute -inset-6 bg-[radial-gradient(circle,_rgba(242,92,5,0.12)_0%,_transparent_70%)] rounded-full animate-pulse pointer-events-none" />
                </>
              )}

              <div
                className={`w-full h-full rounded-full p-[3px] transition-all duration-500 relative ${
                  isActive 
                    ? "bg-gradient-to-tr from-[#f25c05] to-[#ff8f43] shadow-[0_15px_40px_rgba(242,92,5,0.3)] scale-110" 
                    : "bg-white hover:bg-[#f25c05]/30 border border-black/5 shadow-md hover:scale-105"
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    draggable="false"
                    className={`w-full h-full object-cover pointer-events-none transition-all duration-500 ${
                      isActive ? "grayscale-0 contrast-105" : "grayscale-[20%] opacity-85 hover:opacity-100"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM CARD ── */}
      <div className="relative z-30 w-full max-w-xl mx-auto mb-6 px-4">
        <div
          ref={textCardRef}
          className="bg-white/95 backdrop-blur-md rounded-2xl border border-black/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 sm:p-8 text-center relative"
        >
          <span className="absolute top-4 left-6 text-5xl font-serif text-[#f25c05] opacity-20 leading-none select-none">
            &ldquo;
          </span>

          <p className="text-[#404040] text-sm sm:text-base font-medium leading-relaxed mb-4 italic">
            &ldquo;{activeData.text}&rdquo;
          </p>

          <h4 className="text-[#0a0a0a] font-bold text-base tracking-tight">
            {activeData.name}
          </h4>
          <p className="text-[#a3a3a3] text-xs font-semibold uppercase tracking-wider mb-3">
            {activeData.role}
          </p>

          <div className="flex items-center justify-center gap-0.5">
            {[...Array(5)].map((_, idx) => (
              <svg
                key={idx}
                className={`w-4 h-4 ${
                  idx < activeData.rating ? "text-[#f25c05]" : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}