"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { FiArrowUpRight, FiEye, FiX } from "react-icons/fi";

/* ── accent palette (matching site) ── */
const ACCENTS = ["#7c3aed", "#4f46e5", "#0ea5e9", "#06b6d4", "#a855f7"];

/* ── data ── */
const categories = [
  "All","Web Development","Graphic Design",
  "Digital Marketing","Video Editing","SEO Marketing","UI/UX Design",
];

const projects = [
  { id:1, title:"Luxury E-Commerce Platform",  category:"Web Development",   image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", size:"large",  description:"A fully responsive e-commerce platform with advanced filtering and payment integration." },
  { id:2, title:"Brand Identity System",        category:"Graphic Design",    image:"https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop", size:"small",  description:"Complete brand identity including logo, typography, and visual guidelines." },
  { id:3, title:"FinTech Mobile App",           category:"UI/UX Design",      image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop", size:"tall",   description:"User-centered design for a financial technology mobile application." },
  { id:4, title:"Social Media Campaign",        category:"Digital Marketing", image:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop", size:"small",  description:"Multi-platform social media campaign with viral content strategy." },
  { id:5, title:"Corporate Website Redesign",   category:"Web Development",   image:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop", size:"wide",   description:"Modern corporate website with dynamic content management system." },
  { id:6, title:"Product Launch Video",         category:"Video Editing",     image:"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop", size:"small",  description:"Cinematic product launch video with motion graphics and sound design." },
  { id:7, title:"SEO Optimization Campaign",    category:"SEO Marketing",     image:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=600&fit=crop", size:"small",  description:"Comprehensive SEO strategy resulting in 200% organic traffic increase." },
  { id:8, title:"Analytics Dashboard",          category:"Web Development",   image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", size:"large",  description:"Real-time analytics dashboard with interactive data visualization." },
  { id:9, title:"Restaurant Branding",          category:"Graphic Design",    image:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=600&fit=crop", size:"small",  description:"Complete branding package for a high-end restaurant chain." },
];

/* ── per-char accent seeding (deterministic) ── */
function getAccent(ci, seed) {
  const h = ((ci * 2654435761 + seed) >>> 0);
  return h % 10 < 3 ? ACCENTS[h % ACCENTS.length] : null;
}

/* ── colored proximity heading ── */
function ProximityHeading({ text }) {
  const ref = useRef(null);

  /* pre-compute which chars get an accent so it's stable */
  const chars = React.useMemo(() => {
    let ci = 0;
    return text.split("").map((ch, i) => {
      const isLetter = /[a-zA-Z]/.test(ch);
      const accent   = isLetter ? getAccent(ci, 77) : null;
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
        const r    = s.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        const t    = Math.max(0, 1 - dist / 130);
        const base = s.dataset.accent || "rgba(13,13,13,0.82)";
        s.style.fontWeight = Math.round(400 + t * 500);
        s.style.color      = t > 0.45 ? base : `rgba(13,13,13,${0.38 + t * 0.44})`;
      });
    };
    const onLeave = () => {
      spans.forEach((s) => {
        s.style.fontWeight = "600";
        s.style.color      = s.dataset.accent || "rgba(13,13,13,0.82)";
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <h2
      ref={ref}
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

/* ── bento size helpers ── */
function gridSpan(size) {
  switch (size) {
    case "large": return { gridColumn: "span 2", gridRow: "span 2" };
    case "wide":  return { gridColumn: "span 2" };
    case "tall":  return { gridRow: "span 2" };
    default:      return {};
  }
}
function minH(size) {
  if (size === "tall" || size === "large") return "320px";
  return "160px";
}

/* ── project card ── */
function Card({ project, index, onClick }) {
  const [hov, setHov] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(project)}
      style={{
        ...gridSpan(project.size),
        position: "relative",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        minHeight: minH(project.size),
        background: "#fff",
        border: hov ? `1.5px solid ${accent}55` : "1.5px solid #efefef",
        boxShadow: hov
          ? `0 16px 40px ${accent}18, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "border-color 0.28s ease, box-shadow 0.28s ease",
        willChange: "transform",
        transform: hov ? "translateY(-5px) scale(1.012)" : "translateY(0) scale(1)",
        transitionProperty: "transform, border-color, box-shadow",
        transitionDuration: "0.28s",
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px", zIndex: 3,
        background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.25s ease",
      }} />

      {/* image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          transform: hov ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          display: "block",
        }}
      />

      {/* gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,${hov ? 0.72 : 0.18}) 100%)`,
        transition: "background 0.35s ease",
      }} />

      {/* eye icon */}
      <div style={{
        position: "absolute", top: "12px", right: "12px",
        width: "30px", height: "30px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        opacity: hov ? 1 : 0,
        transform: hov ? "scale(1)" : "scale(0.75)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        zIndex: 4,
      }}>
        <FiEye size={13} color={accent} />
      </div>

      {/* info */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "14px 16px",
        transform: hov ? "translateY(0)" : "translateY(10px)",
        opacity: hov ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
        zIndex: 4,
      }}>
        <span style={{
          display: "inline-block",
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.9)",
          background: `${accent}bb`,
          backdropFilter: "blur(12px)",
          padding: "3px 9px", borderRadius: "100px",
          marginBottom: "6px",
        }}>
          {project.category}
        </span>
        <div style={{
          fontSize: "13px", fontWeight: 700,
          color: "#fff", lineHeight: 1.3,
          marginBottom: "4px",
          fontFamily: "'Sora', sans-serif",
        }}>
          {project.title}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "3px",
          fontSize: "11px", color: "rgba(255,255,255,0.75)", fontWeight: 500,
        }}>
          View Details <FiArrowUpRight size={11} />
        </div>
      </div>
    </div>
  );
}

/* ── modal ── */
function Modal({ project, onClose }) {
  const accent = ACCENTS[project.id % ACCENTS.length];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "18px",
          maxWidth: "680px", width: "100%",
          maxHeight: "88vh", overflow: "auto",
          position: "relative",
          border: `1.5px solid ${accent}30`,
          boxShadow: `0 32px 80px ${accent}18, 0 8px 24px rgba(0,0,0,0.12)`,
          animation: "slideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* top accent stripe */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, ${accent}, ${accent}50)`,
          borderRadius: "18px 18px 0 0",
        }} />

        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "14px", right: "14px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "rgba(0,0,0,0.08)", border: "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease", zIndex: 5,
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
        >
          <FiX size={15} color="#333" />
        </button>

        <img
          src={project.image} alt={project.title}
          style={{ width: "100%", height: "280px", objectFit: "cover" }}
        />

        <div style={{ padding: "24px 28px 28px" }}>
          <span style={{
            display: "inline-block",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accent,
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
            padding: "4px 12px", borderRadius: "100px",
            marginBottom: "12px",
          }}>
            {project.category}
          </span>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "22px", fontWeight: 800,
            color: "#0d0d0d", margin: "0 0 10px", lineHeight: 1.25,
          }}>
            {project.title}
          </h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "14px", color: "#777",
            lineHeight: 1.75, margin: "0 0 22px",
          }}>
            {project.description}
          </p>
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "11px 22px",
              background: `linear-gradient(135deg, ${accent}, ${ACCENTS[(project.id + 1) % ACCENTS.length]})`,
              color: "#fff", border: "none",
              borderRadius: "10px",
              fontSize: "13px", fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 6px 20px ${accent}35`,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            View Full Project <FiArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── main ── */
export default function S6() {
  const [active, setActive]   = useState("All");
  const [modal,  setModal]    = useState(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const list = active === "All" ? projects : projects.filter(p => p.category === active);
    setVisible(list);
  }, [active]);

  return (
    <section style={{
      background: "linear-gradient(160deg, #fafafa 0%, #f3f0ff 45%, #eef6ff 100%)",
      padding: "clamp(52px, 8vw, 90px) 0 clamp(52px, 8vw, 90px)",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap');

        .s6-wrap *, .s6-wrap *::before, .s6-wrap *::after { box-sizing: border-box; margin: 0; }

        .s6-tab {
          padding: 7px 16px;
          background: transparent;
          color: #888;
          border: 1.5px solid transparent;
          border-radius: 100px;
          font-family: 'Sora', sans-serif;
          font-size: 12px; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          transition: all 0.22s ease;
          letter-spacing: 0.01em;
        }
        .s6-tab:hover { color: #333; background: rgba(0,0,0,0.05); }
        .s6-tab.act   { background: #0d0d0d; color: #fff; font-weight: 600; }

        .s6-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(155px, auto);
          gap: clamp(10px, 1.4vw, 16px);
        }
        @media (max-width: 1100px) { .s6-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .s6-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: minmax(140px, auto); } }
        @media (max-width: 480px)  { .s6-grid { grid-template-columns: 1fr; } }

        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes fadeCard { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }

        .s6-card-enter { animation: fadeCard 0.38s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ambient orbs */}
      <div style={{ position:"absolute", top:"-120px", right:"-120px", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 68%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-80px", left:"-80px",  width:"320px", height:"320px", borderRadius:"50%", background:"radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 68%)", pointerEvents:"none" }} />

      <div className="s6-wrap" style={{ maxWidth:"1300px", margin:"0 auto", padding:"0 clamp(16px, 4vw, 48px)", position:"relative", zIndex:1 }}>

        {/* header */}
        <div style={{ textAlign:"center", marginBottom:"clamp(28px, 4vw, 44px)" }}>
          {/* eyebrow pill */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"7px",
            background:"linear-gradient(135deg, #7c3aed, #4f46e5)",
            color:"#fff",
            fontFamily:"'Sora', sans-serif", fontWeight:600,
            fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
            padding:"6px 16px", borderRadius:"100px",
            marginBottom:"20px",
            boxShadow:"0 4px 18px rgba(124,58,237,0.28)",
          }}>
            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.65)", display:"inline-block" }} />
            Our Portfolio
          </div>

          <ProximityHeading text="Work We're Proud Of" />

          <p style={{
            fontFamily:"'Open Sans', sans-serif",
            fontSize:"clamp(13px, 1.3vw, 15px)", color:"#999",
            margin:"10px auto 0", maxWidth:"440px", lineHeight:1.75,
          }}>
            Crafted with precision - a curated selection of projects across design, development, and marketing.
          </p>
        </div>

        {/* filter tabs */}
        <div style={{
          display:"flex", justifyContent:"center",
          gap:"6px", flexWrap:"wrap",
          marginBottom:"clamp(24px, 4vw, 40px)",
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`s6-tab${active === cat ? " act" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* bento grid */}
        <div className="s6-grid">
          {visible.map((project, i) => (
            <div
              key={project.id}
              className="s6-card-enter"
              style={{ animationDelay: `${i * 0.05}s`, ...gridSpan(project.size) }}
            >
              <Card project={project} index={i} onClick={setModal} />
            </div>
          ))}
        </div>
      </div>

      {/* modal */}
      {modal && <Modal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}