"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely in browser context
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   EXTENDED PREMIUM DATA STRUCTURE
───────────────────────────────────────────────────────────── */
const servicesData = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subServices: [
      {
        sub_title: "Media Planning & Buying",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
            headline: "Google Ads",
            para: "Run high-intent Google campaigns with smart bidding and keyword-targeted ad placements.",
            gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
          },
          {
            img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
            headline: "Meta Ads",
            para: "Unlock growth on Facebook, Instagram, and WhatsApp using conversion-led segmentation.",
            gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)"
          },
          {
            img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
            headline: "Native Ads",
            para: "Use native ad placements for low-cost customer acquisition with contextual targeting.",
            gradient: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)"
          },
          {
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
            headline: "Marketplace Ads",
            para: "Promote your products on Amazon, eBay & more with automated product push tools.",
            gradient: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)"
          }
        ]
      },
      {
        sub_title: "AI-Powered SEO",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?auto=format&fit=crop&w=600&q=80",
            headline: "Technical SEO Optimization",
            para: "Enhance crawlability, indexation speed, and architecture metrics using algorithmic models.",
            gradient: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
          },
          {
            img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
            headline: "Semantic Content Architecture",
            para: "Rank for competitive industry core vectors through structured thematic authority maps.",
            gradient: "linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)"
          }
        ]
      },
      {
        sub_title: "Strategic Social Growth",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1611605698335-8b15d27e83f9?auto=format&fit=crop&w=600&q=80",
            headline: "Viral Asset Generation",
            para: "Produce high-retention content optimized directly for native algorithmic distribution channels.",
            gradient: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)"
          }
        ]
      }
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    subServices: [
      {
        sub_title: "Enterprise Solutions",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
            headline: "Headless Commerce Architectures",
            para: "Decouple frontend delivery layers using Next.js for sub-second, composable loading states.",
            gradient: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)"
          },
          {
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            headline: "Custom Engine Software",
            para: "Develop highly secure, auto-scaling backend databases tailored to intense enterprise workflows.",
            gradient: "linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)"
          }
        ]
      }
    ]
  }
];

export default function S4() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRefs = useRef({});

  // Dynamic active sub-service states for each main service category
  const [activeSubTabs, setActiveSubTabs] = useState({
    "digital-marketing": 0,
    "web-development": 0
  });

  /* ─────────────────────────────────────────────────────────────
     ANIMATION EFFECT: VARIABLE PROXIMITY HEADINGS
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Split text cleanly into interactive character spans
    const text = heading.textContent || "";
    heading.innerHTML = text
      .split("")
      .map(char => (char === " " ? " " : `<span class="prox-char" style="font-weight: 300; transition: font-weight 0.25s cubic-bezier(0.16, 1, 0.3, 1);">${char}</span>`))
      .join("");

    const chars = heading.querySelectorAll(".prox-char");

    const handleMouseMove = (e) => {
      chars.forEach(char => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(Math.pow(e.clientX - charX, 2) + Math.pow(e.clientY - charY, 2));
        
        // Dynamic weight mapping based on mouse position
        const maxDist = 220;
        if (distance < maxDist) {
          const weight = Math.round(900 - (distance / maxDist) * 600);
          char.style.fontWeight = Math.max(300, Math.min(900, weight)).toString();
        } else {
          char.style.fontWeight = "300";
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach(char => { char.style.fontWeight = "300"; });
    };

    window.addEventListener("mousemove", handleMouseMove);
    heading.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (heading) heading.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  /* ─────────────────────────────────────────────────────────────
     ANIMATION EFFECT: PREMIUM GSAP STACKED CARD PINNING
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout styling matches screen sizes greater than 1024px (lg)
      mm.add("(min-width: 1025px)", () => {
        const panels = gsap.utils.toArray(".service-panel");
        
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return; // The final slide doesn't pin away

          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false, // Smoothly overlaps cards underneath
            scrub: true,
            invalidateOnRefresh: true
          });
        });
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────────────────
     TRANSITION HANDLER: TABS
  ───────────────────────────────────────────────────────────── */
  const handleTabChange = (serviceId, tabIndex) => {
    const gridElement = cardsContainerRefs.current[serviceId];
    
    if (gridElement) {
      // Elegant, snappy out-in transition sequence
      gsap.to(gridElement.querySelectorAll(".grid-card"), {
        opacity: 0,
        y: 15,
        stagger: 0.04,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveSubTabs(prev => ({ ...prev, [serviceId]: tabIndex }));
          
          // RequestAnimationFrame ensures state updates are drawn prior to entrance animations
          requestAnimationFrame(() => {
            gsap.fromTo(gridElement.querySelectorAll(".grid-card"),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: "power3.out" }
            );
          });
        }
      });
    } else {
      setActiveSubTabs(prev => ({ ...prev, [serviceId]: tabIndex }));
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,700;0,900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        
        .s4-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #F9F9F9;
        }

        /* Webkit layout settings for cleaner text rendering */
        .prox-heading {
          font-family: 'Montserrat', sans-serif;
          user-select: none;
        }

        /* Premium scrollbar behavior inside internal grids */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Elevation styling states for interactive elements */
        .grid-card {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .grid-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 38px rgba(0, 0, 0, 0.06);
        }
      `}</style>

      <section ref={containerRef} className="s4-section relative w-full min-h-screen">
        {servicesData.map((svc) => {
          const currentActiveIdx = activeSubTabs[svc.id] || 0;
          const currentSubService = svc.subServices[currentActiveIdx] || svc.subServices[0];

          return (
            <div 
              key={svc.id} 
              className="service-panel relative w-full min-h-screen lg:h-screen flex flex-col justify-start items-center bg-[#F9F9F9] pt-12 pb-16 lg:py-0 lg:justify-center"
            >
              <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col h-full justify-center">
                
                {/* ── HEADER CONTAINER ── */}
                <div className="w-full mb-8 lg:mb-10">
                  <h2 
                    ref={headingRef}
                    className="prox-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A0A0A] mb-6 font-light"
                  >
                    {svc.title}
                  </h2>

                  {/* Glassmorphic Multi-tab Navigation Bar */}
                  <div className="w-full border-b border-gray-200/80 pb-3 flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-4">
                    {svc.subServices.map((sub, idx) => {
                      const isActive = currentActiveIdx === idx;
                      return (
                        <button
                          key={sub.sub_title}
                          onClick={() => handleTabChange(svc.id, idx)}
                          className={`relative text-sm sm:text-base font-medium px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                            isActive 
                              ? "text-[#0A0A0A] bg-white shadow-sm border border-gray-200/50 font-semibold" 
                              : "text-gray-400 hover:text-gray-700 bg-transparent"
                          }`}
                        >
                          {sub.sub_title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── INTERACTIVE CARDS CONTAINER GRID ── */}
                <div 
                  ref={(el) => { if (el) cardsContainerRefs.current[svc.id] = el; }}
                  className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
                >
                  {currentSubService.cards.map((card, cIdx) => (
                    <div 
                      key={`${card.headline}-${cIdx}`}
                      className="grid-card flex flex-col bg-white rounded-[24px] border border-gray-100 p-4 h-full"
                    >
                      {/* Stylized Device Mockup / Image Block Wrapper */}
                      <div 
                        style={{ background: card.gradient }}
                        className="w-full aspect-[4/3.4] rounded-[18px] relative overflow-hidden flex items-center justify-center p-6 mb-5"
                      >
                        {/* Inline Inner Overlay Border */}
                        <div className="absolute inset-0 border border-white/40 rounded-[18px] pointer-events-none z-10" />
                        
                        {/* Layered Image Placement matching prompt screenshot concept */}
                        <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md transform translate-y-3 transition-transform duration-500 hover:translate-y-1">
                          <img 
                            src={card.img} 
                            alt={card.headline}
                            className="w-full h-full object-cover select-none"
                            draggable="false"
                          />
                        </div>
                      </div>

                      {/* Text Content Block Layout */}
                      <div className="flex flex-col flex-grow px-2 pb-2">
                        <h4 className="text-lg font-bold text-[#0A0A0A] mb-2 tracking-tight">
                          {card.headline}
                        </h4>
                        <p className="text-sm leading-relaxed text-gray-500 mb-6 flex-grow">
                          {card.para}
                        </p>
                        
                        {/* Call to Action Anchor Link with Right Vector Arrow Graphic */}
                        <a 
                          href="/contact" 
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-gray-600 transition-colors group w-fit mt-auto"
                        >
                          Contact Us
                          <svg 
                            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}