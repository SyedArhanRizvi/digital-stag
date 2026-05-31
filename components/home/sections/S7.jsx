"use client"

import React, { useState } from 'react'

// Dummy luxury/minimal corporate client logos using clean SVG mock designs
const clientLogos = [
  { id: 1, name: "REAL STATE", type: "property" },
  { id: 2, name: "CREATIVE", type: "agency" },
  { id: 3, name: "BUSINESS ESTATES", type: "corporate" },
  { id: 4, name: "GLOBAL HOMES", type: "global" },
  { id: 5, name: "LUXURY HOMES", type: "luxury" },
  { id: 6, name: "DUPLEX ESTATES", type: "architecture" },
  { id: 7, name: "GREEN HOUSE", type: "eco" },
  { id: 8, name: "ALPHA DIGITAL", type: "tech" }
];

export default function S7() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section 
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fafafa] overflow-hidden select-none"
      style={{
        // Premium fine grid backdrop inspired by the first reference design
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        backgroundPosition: "center center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');
        
        .s7-container {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .s7-container {
            grid-template-columns: 320px 1fr;
            gap: 64px;
          }
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (min-width: 640px) {
          .logo-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 768px) {
          .logo-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <div className="s7-container">
        
        {/* ── LEFT COLUMN: INTRODUCTION (Taking reference from Image 2 Layout) ── */}
        <div className="flex flex-col items-start max-w-md lg:max-w-none">
          {/* Subtle Orange Line Accent from reference */}
          <div 
            className="w-8 h-[3px] mb-4 rounded-full" 
            style={{ backgroundColor: '#6D28D9' }}
          />
          
          <h2 
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0d0d0d] mb-4 leading-tight"
          >
            Our Clients
          </h2>
          
          <p 
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            className="text-sm sm:text-base text-[#737373] leading-relaxed font-normal"
          >
            We have worked with renowned names. From hotels, offices, and smart premium homes, we have collaborated with visionary clients from all corporate backgrounds.
          </p>
        </div>

        {/* ── RIGHT COLUMN: LOGO GRID (Clean, Minimalist Architecture) ── */}
        <div className="logo-grid">
          {clientLogos.map((logo) => {
            const isHovered = hoveredId === logo.id;
            return (
              <div
                key={logo.id}
                onMouseEnter={() => setHoveredId(logo.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col items-center justify-center bg-white border border-black/[0.04] rounded-xl p-6 h-32 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: isHovered 
                    ? "0 12px 30px rgba(0,0,0,0.04), 0 2px 4px rgba(242,92,5,0.05)" 
                    : "0 2px 8px rgba(0,0,0,0.01)",
                  borderColor: isHovered ? "rgba(242,92,5,0.2)" : "rgba(0,0,0,0.04)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)"
                }}
              >
                {/* Micro Gradient Top Border Layer triggered on hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, #6D28D9, #ff8f43)",
                    opacity: isHovered ? 1 : 0
                  }}
                />

                {/* Vector Minimalist SVG Dummies (Adapts cleanly dynamically to fill look) */}
                <div 
                  className="w-12 h-12 flex items-center justify-center mb-2 transition-all duration-300"
                  style={{
                    color: isHovered ? '#6D28D9' : 'rgba(13,13,13,0.45)',
                    transform: isHovered ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {logo.type === "property" && (
                      <>
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <path d="M9 22V12h6v10" />
                      </>
                    )}
                    {logo.type === "agency" && (
                      <>
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m10 10 4 4M14 10l-4 4" />
                      </>
                    )}
                    {logo.type === "corporate" && (
                      <>
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                      </>
                    )}
                    {logo.type === "global" && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                      </>
                    )}
                    {logo.type === "luxury" && (
                      <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    )}
                    {logo.type === "architecture" && (
                      <>
                        <path d="M2 22h20M6 12V2h12v10M10 22V16h4v6" />
                        <path d="M6 6h12M6 10h12" />
                      </>
                    )}
                    {logo.type === "eco" && (
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 18 11 20z" />
                    )}
                    {logo.type === "tech" && (
                      <path d="M4 14h6v8H4zm10-10h6v8h-6zm0 12h6v6h-6zM4 2h6v8H4z" />
                    )}
                  </svg>
                </div>

                {/* Text Title details matching luxury guidelines */}
                <span 
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-center transition-colors duration-300"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    letterSpacing: '0.12em',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isHovered ? '#1a1a1a' : 'rgba(13,13,13,0.65)'
                  }}
                >
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  )
}