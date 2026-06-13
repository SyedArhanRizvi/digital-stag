"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

const servicesData = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subServices: [
      {
        sub_title: "Digital Marketing Services",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75&auto=format",
            headline: "Google Ads Management",
            para: "Drive qualified leads through high-converting Google Ads campaigns, smart bidding strategies, audience targeting, and continuous performance optimization.",
            gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=75&auto=format",
            headline: "Meta Advertising",
            para: "Generate consistent customer acquisition using Facebook and Instagram ads with advanced audience segmentation and creative testing.",
            gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&q=75&auto=format",
            headline: "Social Media Growth",
            para: "Build strong brand visibility through strategic content planning, engagement campaigns, and platform-specific growth initiatives.",
            gradient: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75&auto=format",
            headline: "Marketing Analytics",
            para: "Track campaign performance with detailed reporting, conversion insights, customer behavior analysis, and ROI-focused improvements.",
            gradient: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
          },
        ],
      },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    subServices: [
      {
        sub_title: "Search Engine Optimization",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=600&q=75&auto=format",
            headline: "Technical SEO",
            para: "Improve website performance through crawl optimization, indexing enhancements, structured data implementation, and site health monitoring.",
            gradient: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=75&auto=format",
            headline: "Keyword Research",
            para: "Identify profitable search opportunities using competitor analysis, search intent mapping, and data-driven keyword strategies.",
            gradient: "linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75&auto=format",
            headline: "Content SEO",
            para: "Create optimized content structures that improve rankings, increase organic visibility, and attract qualified website traffic.",
            gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&q=75&auto=format",
            headline: "Link Building",
            para: "Strengthen domain authority through quality backlink acquisition, outreach campaigns, and long-term authority development.",
            gradient: "linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)",
          },
        ],
      },
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    subServices: [
      {
        sub_title: "Website Development",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=75&auto=format",
            headline: "Business Websites",
            para: "Develop modern and responsive business websites designed for performance, engagement, and long-term digital growth.",
            gradient: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=75&auto=format",
            headline: "E-Commerce Stores",
            para: "Build scalable online stores with secure payments, product management systems, and seamless customer experiences.",
            gradient: "linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75&auto=format",
            headline: "Custom Web Apps",
            para: "Create tailored web applications with advanced functionality, secure architecture, and optimized user workflows.",
            gradient: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=75&auto=format",
            headline: "Website Maintenance",
            para: "Ensure continuous performance through updates, security monitoring, bug fixes, and technical support services.",
            gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
          },
        ],
      },
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    subServices: [
      {
        sub_title: "Professional Video Production",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=75&auto=format",
            headline: "Reels & Shorts Editing",
            para: "Produce engaging short-form videos with dynamic transitions, captions, sound design, and audience retention techniques.",
            gradient: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=75&auto=format",
            headline: "YouTube Video Editing",
            para: "Create polished long-form content featuring professional cuts, motion graphics, and storytelling enhancements.",
            gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=75",
            headline: "Corporate Videos",
            para: "Develop impactful business presentations with branded visuals, clean editing, and professional production standards.",
            gradient: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75&auto=format",
            headline: "Motion Graphics",
            para: "Enhance visual communication using animated graphics, kinetic typography, and engaging visual storytelling elements.",
            gradient: "linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)",
          },
        ],
      },
    ],
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    subServices: [
      {
        sub_title: "Creative Design Services",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=75&auto=format",
            headline: "Logo Design",
            para: "Craft memorable brand identities through unique logo concepts, strategic design systems, and visual consistency.",
            gradient: "linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=600&q=75&auto=format",
            headline: "Social Media Creatives",
            para: "Design engaging visual assets that improve brand recognition, audience interaction, and campaign effectiveness.",
            gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=75",
            headline: "Branding Materials",
            para: "Develop professional marketing materials including brochures, business cards, and brand communication assets.",
            gradient: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=75&auto=format",
            headline: "UI/UX Design",
            para: "Create intuitive digital experiences through user-centered interfaces, wireframes, and conversion-focused layouts.",
            gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
          },
        ],
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    subServices: [
      {
        sub_title: "AI Business Automation",
        cards: [
          {
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=75&auto=format",
            headline: "AI Chatbots",
            para: "Automate customer interactions using intelligent chatbots that provide instant support and lead qualification.",
            gradient: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=75&auto=format",
            headline: "Workflow Automation",
            para: "Reduce manual tasks through automated workflows that streamline operations and improve business efficiency.",
            gradient: "linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=75&auto=format",
            headline: "AI Lead Generation",
            para: "Capture and nurture prospects using AI-powered systems that optimize outreach and conversion processes.",
            gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
          },
          {
            img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=75&auto=format",
            headline: "Business Intelligence",
            para: "Leverage AI-driven analytics to uncover actionable insights, forecast trends, and support strategic decisions.",
            gradient: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)",
          },
        ],
      },
    ],
  },
];

/* ── PROXIMITY HEADING ── */
function ProximityHeading({ text }) {
  const headingRef = useRef(null);
  const rafRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(heading);

    const chars = heading.querySelectorAll(".prox-char");
    let charRects = [];

    const cacheRects = () => {
      charRects = Array.from(chars).map((c) => c.getBoundingClientRect());
    };
    cacheRects();

    const resizeObserver = new ResizeObserver(cacheRects);
    resizeObserver.observe(document.body);

    const onMouseMove = (e) => {
      if (!isVisibleRef.current) return;
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const mx = e.clientX;
        const my = e.clientY;
        const maxDist = 220;

        chars.forEach((char, i) => {
          const rect = charRects[i];
          if (!rect) return;
          const dx = mx - (rect.left + rect.width / 2);
          const dy = my - (rect.top + rect.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const weight =
            dist < maxDist
              ? Math.max(
                  300,
                  Math.min(900, Math.round(900 - (dist / maxDist) * 600)),
                )
              : 300;
          char.style.fontWeight = String(weight);
        });
      });
    };

    const onMouseLeave = () => {
      chars.forEach((c) => {
        c.style.fontWeight = "300";
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    heading.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      heading.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <h2
      ref={headingRef}
      className="prox-heading text-3xl lg:text-6xl tracking-tight text-[#0A0A0A] mb-6 font-light"
      aria-label={text}
    >
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className="prox-char inline-block"
            style={{
              fontWeight: 300,
              transition: "font-weight 0.2s cubic-bezier(0.16,1,0.3,1)",
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        ),
      )}
    </h2>
  );
}

/* ── CARD GRID ── */
function CardGrid({ cards, isFirstPanel }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [cards]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
      {cards.map((card, cIdx) => (
        <div
          key={card.headline}
          className="grid-card flex flex-col bg-white rounded-[24px] border border-gray-100 p-4 h-full"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.35s ease ${cIdx * 60}ms, transform 0.35s ease ${cIdx * 60}ms`,
          }}
        >
          <div
            style={{ background: card.gradient }}
            className="w-full aspect-[4/3.4] rounded-[18px] relative overflow-hidden flex items-center justify-center p-6 mb-5"
          >
            <div className="absolute inset-0 border border-white/40 rounded-[18px] pointer-events-none z-10" />
            <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md transform translate-y-3 transition-transform duration-500 hover:translate-y-1">
              <img
                src={card.img}
                alt={card.headline}
                loading={isFirstPanel && cIdx < 2 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={isFirstPanel && cIdx === 0 ? "high" : "auto"}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>
          </div>

          <div className="flex flex-col flex-grow px-2 pb-2">
            <h4 className="text-lg font-bold text-[#0A0A0A] mb-2 tracking-tight">
              {card.headline}
            </h4>
            <p className="text-sm leading-relaxed text-gray-500 mb-6 flex-grow">
              {card.para}
            </p>
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
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── SERVICE PANEL ── */
function ServicePanel({ svc, isFirst }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const panelRef = useRef(null);

  const currentCards = useMemo(
    () =>
      svc.subServices[activeIdx]
        ? svc.subServices[activeIdx].cards
        : svc.subServices[0].cards,
    [svc, activeIdx],
  );

  return (
    <div
      ref={panelRef}
      className="service-panel relative w-full min-h-screen lg:h-screen flex flex-col justify-start items-center bg-[#F9F9F9] pt-12 pb-16 lg:py-0 lg:justify-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col h-full justify-center">
        <div className="w-full mb-8 lg:mb-10">
          <ProximityHeading text={svc.title} />

          <div className="w-full border-b border-gray-200/80 pb-3 flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-4">
            {svc.subServices.map((sub, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={sub.sub_title}
                  onClick={() => setActiveIdx(idx)}
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

        <CardGrid cards={currentCards} isFirstPanel={isFirst} />
      </div>
    </div>
  );
}

/* ── ROOT COMPONENT ── */
export default function S4() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let gsapCtx = null;

    // Load GSAP immediately on mount - panels must exist in DOM before ScrollTrigger runs
    const initGsap = async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const gsap = gsapMod.gsap || gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      // Wait one frame so panels are painted before measuring
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        gsapCtx = gsap.context(() => {
          const mm = gsap.matchMedia();

          mm.add("(min-width: 1025px)", () => {
            // Use plain querySelectorAll - no TS generics
            const panels = Array.from(
              containerRef.current.querySelectorAll(".service-panel"),
            );

            panels.forEach((panel, i) => {
              // Pin every panel except the last one
              if (i === panels.length - 1) return;

              ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
              });
            });

            // Force ScrollTrigger to recalculate after setup
            ScrollTrigger.refresh();
          });
        }, containerRef);
      });
    };

    initGsap();

    return () => {
      if (gsapCtx) gsapCtx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        .prox-heading {
          font-family: 'Montserrat', sans-serif;
          user-select: none;
        }
        .s4-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #F9F9F9;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .grid-card {
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          will-change: transform;
          transition:
            transform 0.4s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .grid-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 38px rgba(0,0,0,0.06);
        }

        @media (prefers-reduced-motion: reduce) {
          .grid-card, .prox-char { transition: none !important; }
        }
      `}</style>

      <section
        ref={containerRef}
        className="s4-section relative w-full min-h-screen"
      >
        {servicesData.map((svc, idx) => (
          <ServicePanel key={svc.id} svc={svc} isFirst={idx === 0} />
        ))}
      </section>
    </>
  );
}
