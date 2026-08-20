"use client"

import React, { useState } from 'react'

// Dummy luxury/minimal corporate client logos using image references
const clientLogos = [
  { id: 1, name: "DXP REALTORS", img: "/clients/cl1.jpeg" },
  { id: 2, name: "RRR PVT LTD", img: "/clients/cl2.jpeg"  },
  { id: 3, name: "DST REALTORS", img: "/clients/cl3.jpeg"  },
  { id: 4, name: "JAIN REALTORS", img: "/clients/cl4.jpeg"  },
  { id: 5, name: "SG ORCHARD", img: "/clients/cl5.jpeg"  },
  { id: 6, name: "DUPLEX ESTATES", img: "/clients/cl6.jpeg"  },
  { id: 7, name: "RATAN PEARLS", img: "/clients/cl7.jpeg"  }
];

export default function S7() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section 
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fafafa] overflow-hidden select-none"
      style={{
        // Premium fine grid backdrop
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
        
        {/* ── LEFT COLUMN: INTRODUCTION ── */}
        <div className="flex flex-col items-start max-w-md lg:max-w-none">
          {/* Subtle Orange/Purple Line Accent */}
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
          We have been in the industry for over 5 years, working with clients across diverse industries, from Real Estate and Education to Event Management. This diverse experience has given us valuable insights into what works, allowing us to create data-driven strategies that deliver measurable results and maximize ROI. 

          </p>
        </div>

        {/* ── RIGHT COLUMN: LOGO GRID ── */}
        <div className="logo-grid">
          {clientLogos.map((logo) => {
            const isHovered = hoveredId === logo.id;
            return (
              <div
                key={logo.id}
                onMouseEnter={() => setHoveredId(logo.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col items-center justify-center bg-white border border-black/[0.04] rounded-xl p-6 h-32 transition-all duration-300 cursor-pointer"
             
              >
                {/* Micro Gradient Top Border Layer triggered on hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, #6D28D9, #ff8f43)",
                    opacity: isHovered ? 1 : 0
                  }}
                />

                {/* Client Logo Image Container */}
                <div 
                  className="w-full h-14 flex items-center justify-center mb-3 transition-transform duration-300 overflow-hidden"
                  style={{
                    transform: isHovered ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  <img 
                    src={logo.img} 
                    alt={`${logo.name} logo`} 
                    className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                  
                  />
                </div>

                {/* Text Title */}
                <span 
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-center transition-colors duration-300 line-clamp-1"
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