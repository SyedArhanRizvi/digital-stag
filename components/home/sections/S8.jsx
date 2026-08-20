"use client"

import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";

/* ── accent palette ── */
const ACCENTS = ["#5B3700", "#C57A00", "#FFAA00", "#5B3700", "#C57A00"];

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
          ? (el.dataset.accent || "#5B3700") 
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
        fontSize: "clamp(1.5rem, 4vw, 3.6rem)",
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
    name: "Mansi Panday",
    role: "Marketing Consultant",
    rating: 5,
    text: "Exceptional campaign management and detailed reporting helped us achieve measurable business growth.",
    image: "https://i.pinimg.com/736x/0e/8a/08/0e8a08b2b2cecc9a79f9d2489e2e6a76.jpg",
    pos: {
      top: "50%",
      left: "50%",
      size: "clamp(120px, 12vw, 160px)"
    },
  },

  {
    id: 2,
    name: "Rahul",
    role: "Director, RC Realtors",
    rating: 5,
    text: "The team understood our business goals from day one. Their Google Ads strategy significantly improved the quality of our inquiries, and the reporting was transparent throughout the campaign. Highly professional and easy to work with.",
    image: "https://i.pinimg.com/1200x/a0/18/3e/a0183e01ba50404f0796597c57e7f320.jpg",
    pos: {
      top: "35%",
      left: "31%",
      size: "clamp(50px, 7vw, 90px)"
    },
  },

  {
    id: 3,
    name: "Amit Verma",
    role: "Owner, Urban Furnishings",
    rating: 5,
    text: "Their SEO strategy helped us improve our search visibility within a few months. The team was proactive, responsive, and always focused on delivering measurable results. We couldn't be happier with the partnership.",
    image: "https://i.pinimg.com/736x/59/81/4a/59814a7da0068901825d51c059864c5b.jpg",
    pos: {
      top: "45%",
      left: "14%",
      size: "clamp(55px, 8vw, 100px)"
    },
  },

  {
    id: 4,
    name: "Neha Kapoor",
    role: "Marketing Head, Elite Edu Services",
    rating: 5,
    text: "Working with Digital Stag has been a great experience. Their Meta Ads campaigns generated quality leads, and the landing page they designed significantly improved our conversion rates. I highly recommend their services.",
    image: "https://i.pinimg.com/736x/93/81/a5/9381a5c582e3c3abd539286451d914fb.jpg",
    pos: {
      top: "70%",
      left: "9%",
      size: "clamp(45px, 6vw, 85px)"
    },
  },

  {
    id: 5,
    name: "Priya Mehta",
    role: "Founder, Bloom Wellness Studio",
    rating: 5, 
    text: "From building our website to managing our social media campaigns, everything was handled with great attention to detail. Our online presence has improved tremendously, and we've seen consistent growth in customer engagement.",
    image: "https://i.pinimg.com/1200x/0a/92/cb/0a92cbef5fc9e68a9f5586121ebfca9d.jpg",
    pos: {
      top: "62%",
      left: "27%",
      size: "clamp(40px, 5vw, 75px)"
    },
  },

  {
    id: 6,
    name: "Ananya Singh",
    role: "Interior Designer",
    rating: 5,
    text: "Professional communication, creative execution, and timely delivery exceeded our expectations completely.",
    image: "https://i.pinimg.com/1200x/fd/61/17/fd611756381e7d3c7a37ea63d41554da.jpg",
    pos: {
      top: "42%",
      left: "73%",
      size: "clamp(45px, 6vw, 80px)"
    },
  },

  {
    id: 7,
    name: "Vikram Malhotra",
    role: "Real Estate Developer",
    rating: 5,
    text: "Their automation solutions streamlined our lead management process and improved operational efficiency.",
    image: "https://i.pinimg.com/1200x/94/d1/6a/94d16aae96c4f1f5145e4ed588411d3f.jpg",
    pos: {
      top: "33%",
      left: "91%",
      size: "clamp(50px, 6vw, 85px)"
    },
  },

  {
    id: 8,
    name: "Sneha Patel",
    role: "Content Creator",
    rating: 5,
    text: "Video editing quality was outstanding. The final content looked polished, engaging, and highly professional.",
    image: "https://i.pinimg.com/1200x/13/7d/d9/137dd9f454e3017b5f21df318f52a4c4.jpg",
    pos: {
      top: "57%",
      left: "86%",
      size: "clamp(55px, 8vw, 105px)"
    },
  },

  {
    id: 9,
    name: "Arjun Nair",
    role: "Technology Consultant",
    rating: 5,
    text: "AI automation implementation reduced repetitive tasks and helped our team focus on strategic work.",
    image: "https://i.pinimg.com/1200x/be/96/4a/be964af4ea2a357b7cfe3101174b1546.jpg",
    pos: {
      top: "69%",
      left: "71%",
      size: "clamp(50px, 7vw, 90px)"
    },
  },
];

export default function S8() {
  const [activeId, setActiveId] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const activeData = testimonialsData.find((item) => item.id === activeId) || testimonialsData[0];
  
  const containerRef = useRef(null);
  const textCardRef = useRef(null);
  const auraRef = useRef(null);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive avatar positions based on screen width
  const getResponsivePositions = (pos, width) => {
    if (width < 640) {
      // Mobile: Adjust positions to be more compact and avoid overflow
      const mobileAdjustments = {
        top: parseFloat(pos.top) * 0.85, // Move slightly up
        left: Math.min(Math.max(parseFloat(pos.left), 8), 92), // Keep within bounds
      };
      return {
        top: `${mobileAdjustments.top}%`,
        left: `${mobileAdjustments.left}%`,
      };
    } else if (width < 1024) {
      // Tablet: Slight adjustments
      return {
        top: pos.top,
        left: Math.min(Math.max(parseFloat(pos.left), 5), 95),
      };
    }
    // Desktop: Original positions
    return {
      top: pos.top,
      left: pos.left,
    };
  };

  useEffect(() => {
    const avatars = containerRef.current?.querySelectorAll(".orbit-avatar");
    if (!avatars) return;
    
    avatars.forEach((avatar, index) => {
      const randomX = 8 + Math.random() * 10; // Reduced movement for smaller screens
      const randomY = 8 + Math.random() * 10;
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
      className="relative w-full min-h-screen bg-[#fafafa] flex flex-col justify-between py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 overflow-hidden select-none"
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
      <div className="relative z-10 text-center max-w-3xl mx-auto mt-2 sm:mt-4 px-2 sm:px-4">
        <ProximityHeading text="What Our Customers Say" />
        <p className="text-[#737373] text-xs sm:text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed px-2 mt-2 sm:mt-3 pointer-events-none">
         See how our customers share their real experiences with ShopEase and why they continue to trust us for their everyday shopping needs.
        </p>
      </div>

      {/* ── ORBITAL AVATARS ── */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{
          // Responsive padding for avatar area
          padding: windowWidth < 640 ? '60px 20px' : windowWidth < 1024 ? '80px 40px' : '0px',
        }}
      >
        {testimonialsData.map((item) => {
          const isActive = item.id === activeId;
          const responsivePos = getResponsivePositions(item.pos, windowWidth);
          
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="orbit-avatar absolute flex items-center justify-center cursor-pointer transition-all duration-500 ease-out"
              style={{
                top: responsivePos.top,
                left: responsivePos.left,
                width: item.pos.size,
                height: item.pos.size,
                maxWidth: windowWidth < 640 ? '80px' : 'none',
                maxHeight: windowWidth < 640 ? '80px' : 'none',
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
                  <div className="absolute -inset-4 sm:-inset-5 md:-inset-6 bg-[radial-gradient(circle,_rgba(242,92,5,0.12)_0%,_transparent_70%)] rounded-full animate-pulse pointer-events-none" />
                </>
              )}

              <div
                className={`w-full h-full rounded-full p-[2px] sm:p-[3px] transition-all duration-500 relative ${
                  isActive 
                    ? "bg-gradient-to-tr from-[#f25c05] to-[#ff8f43] shadow-[0_10px_30px_rgba(242,92,5,0.3)] sm:shadow-[0_15px_40px_rgba(242,92,5,0.3)] scale-105 sm:scale-110" 
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
      <div className="relative z-30 w-full max-w-[95%] sm:max-w-lg md:max-w-xl mx-auto mt-auto mb-4 sm:mb-6 px-2 sm:px-4">
        <div
          ref={textCardRef}
          className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-4 sm:p-6 md:p-8 text-center relative"
        >
          <span className="absolute top-2 sm:top-4 left-4 sm:left-6 text-3xl sm:text-4xl md:text-5xl font-serif text-[#f25c05] opacity-20 leading-none select-none">
            &ldquo;
          </span>

          <p className="text-[#404040] text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-3 sm:mb-4 italic px-2 sm:px-0">
            &ldquo;{activeData.text}&rdquo;
          </p>

          <h4 className="text-[#0a0a0a] font-bold text-sm sm:text-base tracking-tight">
            {activeData.name}
          </h4>
          <p className="text-[#a3a3a3] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">
            {activeData.role}
          </p>

          <div className="flex items-center justify-center gap-0.5">
            {[...Array(5)].map((_, idx) => (
              <svg
                key={idx}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
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