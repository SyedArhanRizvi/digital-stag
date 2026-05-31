"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { FiArrowUpRight, FiEye, FiX, FiFilter, FiGrid } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── accent palette ── */
const ACCENTS = ["#7c3aed", "#4f46e5", "#0ea5e9", "#06b6d4", "#a855f7"];

/* ── data ── */
const categories = [
  "All",
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Video Editing",
  "SEO Marketing",
  "UI/UX Design",
];

const projects = [
  {
    id: 1,
    title: "Luxury E-Commerce Platform",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    size: "large",
    description:
      "A fully responsive e-commerce platform with advanced filtering and payment integration.",
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Graphic Design",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop",
    size: "small",
    description:
      "Complete brand identity including logo, typography, and visual guidelines.",
  },
  {
    id: 3,
    title: "FinTech Mobile App",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop",
    size: "tall",
    description:
      "User-centered design for a financial technology mobile application.",
  },
  {
    id: 4,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
    size: "small",
    description:
      "Multi-platform social media campaign with viral content strategy.",
  },
  {
    id: 5,
    title: "Corporate Website Redesign",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    size: "wide",
    description:
      "Modern corporate website with dynamic content management system.",
  },
  {
    id: 6,
    title: "Product Launch Video",
    category: "Video Editing",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop",
    size: "small",
    description:
      "Cinematic product launch video with motion graphics and sound design.",
  },
  {
    id: 7,
    title: "SEO Optimization Campaign",
    category: "SEO Marketing",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=600&fit=crop",
    size: "small",
    description:
      "Comprehensive SEO strategy resulting in 200% organic traffic increase.",
  },
  {
    id: 8,
    title: "Analytics Dashboard",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    size: "large",
    description:
      "Real-time analytics dashboard with interactive data visualization.",
  },
  {
    id: 9,
    title: "Restaurant Branding",
    category: "Graphic Design",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=600&fit=crop",
    size: "small",
    description: "Complete branding package for a high-end restaurant chain.",
  },
];

/* ── per-char accent seeding ── */
function getAccent(ci, seed) {
  const h = (ci * 2654435761 + seed) >>> 0;
  return h % 10 < 3 ? ACCENTS[h % ACCENTS.length] : null;
}

/* ── proximity heading ── */
function ProximityHeading({ text }) {
  const ref = useRef(null);

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
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".pc");

    const onMove = (e) => {
      spans.forEach((s) => {
        const r = s.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (r.left + r.width / 2),
          e.clientY - (r.top + r.height / 2)
        );
        const t = Math.max(0, 1 - dist / 130);
        const base = s.dataset.accent || "rgba(13,13,13,0.82)";
        s.style.fontWeight = Math.round(400 + t * 500);
        s.style.color =
          t > 0.45 ? base : `rgba(13,13,13,${0.38 + t * 0.44})`;
      });
    };
    const onLeave = () => {
      spans.forEach((s) => {
        s.style.fontWeight = "600";
        s.style.color = s.dataset.accent || "rgba(13,13,13,0.82)";
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <h2
      ref={ref}
      className="proximity-heading"
    >
      {chars.map(({ ch, accent, i }) => (
        <span
          key={i}
          className="pc"
          data-accent={accent || ""}
          style={{
            display: "inline-block",
            color: accent || "rgba(13,13,13,0.82)",
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

/* ── Project Card ── */
function Card({ project, index, onClick }) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const accent = ACCENTS[index % ACCENTS.length];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation
    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50px",
          toggleActions: "play none none none",
        },
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(overlayRef.current, {
        background: `linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.8) 100%)`,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow: `0 20px 50px ${accent}20, 0 4px 12px rgba(0,0,0,0.08)`,
        borderColor: `${accent}40`,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(overlayRef.current, {
        background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.15) 100%)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, {
        y: 15,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        borderColor: "#efefef",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [accent, index]);

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(project)}
      className="project-card"
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        minHeight: project.size === "tall" || project.size === "large" ? "320px" : "200px",
        height: "100%",
        background: "#fff",
        border: "1.5px solid #efefef",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* Image */}
      <img
        ref={imageRef}
        src={project.image}
        alt={project.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.15) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 20px",
          zIndex: 3,
          opacity: 0,
          transform: "translateY(15px)",
        }}
      >
        {/* Category Badge */}
        <span
          style={{
            display: "inline-block",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            background: `${accent}cc`,
            backdropFilter: "blur(12px)",
            padding: "4px 12px",
            borderRadius: "100px",
            marginBottom: "10px",
            border: `1px solid ${accent}30`,
          }}
        >
          {project.category}
        </span>
        
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(14px, 1.3vw, 16px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            marginBottom: "6px",
          }}
        >
          {project.title}
        </h3>
        
        {/* View Link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.85)",
            fontWeight: 500,
          }}
        >
          View Project <FiArrowUpRight size={12} />
        </div>
      </div>

      {/* Eye Icon - Top Right */}
      <div
        className="eye-icon"
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          opacity: 0,
          transform: "scale(0.75)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          zIndex: 4,
        }}
      >
        <FiEye size={14} color={accent} />
      </div>
    </div>
  );
}

/* ── Modal ── */
function Modal({ project, onClose }) {
  const modalRef = useRef(null);
  const accent = ACCENTS[project.id % ACCENTS.length];

  useEffect(() => {
    // Animate modal entrance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="modal-overlay"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="modal-content"
        style={{
          background: "#fff",
          borderRadius: "20px",
          maxWidth: "700px",
          width: "95%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          border: `1.5px solid ${accent}25`,
          boxShadow: `0 40px 100px ${accent}15, 0 10px 30px rgba(0,0,0,0.15)`,
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "4px",
            background: `linear-gradient(90deg, ${accent}, ${ACCENTS[(project.id + 1) % ACCENTS.length]})`,
            borderRadius: "20px 20px 0 0",
          }}
        />

        <button
          onClick={onClose}
          className="modal-close-btn"
        >
          <FiX size={16} />
        </button>

        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "clamp(200px, 30vw, 300px)",
            objectFit: "cover",
          }}
        />

        <div style={{ padding: "28px 32px 32px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accent,
              background: `${accent}10`,
              border: `1px solid ${accent}25`,
              padding: "5px 14px",
              borderRadius: "100px",
              marginBottom: "16px",
            }}
          >
            {project.category}
          </span>
          
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 800,
              color: "#0d0d0d",
              margin: "0 0 12px",
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </h2>
          
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "15px",
              color: "#666",
              lineHeight: 1.8,
              margin: "0 0 24px",
            }}
          >
            {project.description}
          </p>
          
          <button
            className="modal-cta-btn"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${ACCENTS[(project.id + 1) % ACCENTS.length]})`,
            }}
          >
            View Full Project <FiArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function S6() {
  const [active, setActive] = useState("All");
  const [modal, setModal] = useState(null);
  const [visible, setVisible] = useState([]);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const list =
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active);
    setVisible(list);
  }, [active]);

  useEffect(() => {
    // Header animations
    gsap.fromTo(
      headerRef.current?.children || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=80px",
        },
      }
    );

    // Filter tabs animation
    gsap.fromTo(
      filtersRef.current?.children || [],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top bottom-=60px",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portfolio-section"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap');

        .portfolio-section {
          background: linear-gradient(165deg, #fafafa 0%, #f3f0ff 50%, #eef6ff 100%);
          padding: clamp(60px, 10vw, 100px) 0;
          position: relative;
          overflow: hidden;
        }

        .proximity-heading {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2rem, 4.5vw, 4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          text-align: center;
          margin: 0 0 4px;
          user-select: none;
          cursor: default;
          color: #0d0d0d;
        }

        .filter-tab {
          padding: 8px 18px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          color: #666;
          border: 1.5px solid #e5e5e5;
          border-radius: 100px;
          font-family: 'Sora', sans-serif;
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: 0.01em;
        }

        .filter-tab:hover {
          color: #333;
          background: rgba(255, 255, 255, 0.9);
          border-color: #ccc;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #0d0d0d, #1a1a2e);
          color: #fff;
          font-weight: 600;
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .project-card .eye-icon {
          opacity: 0;
          transform: scale(0.75);
        }

        .project-card:hover .eye-icon {
          opacity: 1;
          transform: scale(1);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: clamp(12px, 1.5vw, 18px);
        }

        @media (max-width: 1100px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: minmax(180px, auto);
          }
          
          .filter-tab {
            padding: 6px 14px;
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(220px, auto);
          }
          
          .proximity-heading {
            font-size: clamp(1.8rem, 6vw, 2.2rem);
          }
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          border: 1px solid #e5e5e5;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 5;
          color: #333;
        }

        .modal-close-btn:hover {
          background: #0d0d0d;
          color: #fff;
          border-color: #0d0d0d;
          transform: scale(1.05);
        }

        .modal-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }

        .modal-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        }

        /* Custom scrollbar for modal */
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.15);
          border-radius: 3px;
        }

        /* Grid span helpers */
        .grid-span-2-col {
          grid-column: span 2;
        }
        .grid-span-2-row {
          grid-row: span 2;
        }
        .grid-span-2-both {
          grid-column: span 2;
          grid-row: span 2;
        }
      `}</style>

      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(32px, 5vw, 50px)",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.12))",
              color: "#7c3aed",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "7px 18px",
              borderRadius: "100px",
              marginBottom: "24px",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#7c3aed",
                display: "inline-block",
                boxShadow: "0 0 10px rgba(124,58,237,0.5)",
              }}
            />
            Our Portfolio
          </div>

          <ProximityHeading text="Work We're Proud Of" />

          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "#888",
              margin: "14px auto 0",
              maxWidth: "500px",
              lineHeight: 1.8,
            }}
          >
            Crafted with precision — a curated selection of projects across design, development, and marketing.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          ref={filtersRef}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "clamp(28px, 4vw, 44px)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`filter-tab ${active === cat ? "active" : ""}`}
            >
              {cat === "All" && <FiGrid size={12} style={{ marginRight: "4px" }} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div ref={gridRef} className="portfolio-grid">
          {visible.map((project, index) => (
            <div
              key={project.id}
              className={
                project.size === "large"
                  ? "grid-span-2-both"
                  : project.size === "wide"
                  ? "grid-span-2-col"
                  : project.size === "tall"
                  ? "grid-span-2-row"
                  : ""
              }
            >
              <Card project={project} index={index} onClick={setModal} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && <Modal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}