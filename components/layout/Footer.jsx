"use client";

import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Montserrat:wght@700;800;900&display=swap');

        .site-footer * {
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .footer-heading {
          font-family: 'Montserrat', sans-serif;
        }

        /* Luxury Underline Interaction for Links */
        .footer-link {
          position: relative;
          color: #666666;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s ease;
          display: inline-block;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #0A0A0A;
          transform-origin: bottom right;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-link:hover {
          color: #0A0A0A;
        }
        .footer-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        /* High-End Input Styling */
        .footer-input {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 100px;
          padding: 14px 24px;
          padding-right: 56px;
          font-size: 14px;
          color: #0A0A0A;
          outline: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-input:focus {
          border-color: rgba(0, 0, 0, 0.8);
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.02);
        }

        /* Social Node Hover System */
        .social-node {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555555;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .social-node:hover {
          background-color: #0A0A0A;
          color: #FFFFFF;
          border-color: #0A0A0A;
          transform: translateY(-2px);
        }
      `}</style>

      <footer className="site-footer w-full bg-[#FAFAFA] border-t border-gray-200/60 pt-16 pb-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* ── TOP SECTION: MASONRY GRID LAYOUT ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8 pb-12">
            
            {/* Column 1: Brand & Intel Capture (Spans 5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <h3 className="footer-heading text-xl font-black tracking-tighter text-[#0A0A0A] uppercase select-none">
                  Digital<span className="text-gray-400">.</span>Stag
                </h3>
                <p className="text-sm text-gray-400 mt-3 max-w-sm leading-relaxed font-medium">
                  Architecture for elite digital platforms. We transform data metrics into hyper-optimized frontend interfaces.
                </p>
              </div>

              {/* Intelligence Stream Input Subscription Block */}
              <div className="max-w-sm w-full">
                <span className="text-[11px] font-bold tracking-widest text-[#0A0A0A] uppercase block mb-2.5">
                  Subscribe to Intelligence
                </span>
                
                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="relative w-full flex items-center">
                    <input 
                      type="email" 
                      required
                      placeholder="Enter corporate email" 
                      className="footer-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      aria-label="Subscribe Button"
                      className="absolute right-2 w-10 h-10 rounded-full bg-[#0A0A0A] hover:bg-gray-800 text-white flex items-center justify-center transition-all duration-200"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </button>
                  </form>
                ) : (
                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-xl transition-all duration-300">
                    Transmission confirmed. Welcome to the workspace system loop.
                  </div>
                )}
              </div>
            </div>

            {/* Column 2: Our Services Link Directory (Spans 3 Columns) */}
            <div className="lg:col-span-3 lg:col-start-7 flex flex-col gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase block">
                Services
              </span>
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                <li><a href="/services/digital-marketing" className="footer-link">Digital Marketing</a></li>
                <li><a href="/services/seo" className="footer-link">SEO</a></li>
                <li><a href="/services/web-development" className="footer-link">Web Development</a></li>
                <li><a href="/services/video-editing" className="footer-link">Video Editing</a></li>
                <li><a href="/services/graphic-designing" className="footer-link">Graphic Design</a></li>
                <li><a href="/services/lead-generation" className="footer-link">Lead Generation</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate Studio Links (Spans 2 Columns) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase block">
                Company
              </span>
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/about" className="footer-link">About Us</a></li>
                <li><a href="/services" className="footer-link">All Services</a></li>
                <li><a href="/contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            {/* Column 4: Legal Protocols (Spans 2 Columns) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase block">
                Protocols
              </span>
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                <li><a href="#" className="footer-link">Privacy Parameters</a></li>
                <li><a href="#" className="footer-link">Terms of Utility</a></li>
                <li><a href="#" className="footer-link">Security Matrix</a></li>
              </ul>
            </div>

          </div>

          {/* ── CENTRAL SEGMENTATION BAR ── */}
          <div className="w-full h-[1px] bg-gray-200/60 my-2" />

          {/* ── BOTTOM SECTION: UTILITY & SOCIAL NODES ── */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
            
            {/* Copyright Frame */}
            <span className="text-xs font-medium text-gray-400">
              &copy; {new Date().getFullYear()} Digital Stag. All operational parameters secured.
            </span>

            {/* Social Network Node Index */}
        {/* Social Network Node Index */}
<div className="flex items-center gap-3">
  
  {/* Instagram */}
  <a
    href="https://www.instagram.com/digitalstagofficial?igsh=YTVuNjE1NnYyMHcw"
    target="_blank"
    rel="noopener noreferrer"
    className="social-node"
    aria-label="Instagram"
  >
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 1.25a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5A3.5 3.5 0 1015.5 12 3.5 3.5 0 0012 8.5z" />
    </svg>
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/1ELYGuVP5v/"
    target="_blank"
    rel="noopener noreferrer"
    className="social-node"
    aria-label="Facebook"
  >
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z"/>
    </svg>
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919354683813"
    target="_blank"
    rel="noopener noreferrer"
    className="social-node"
    aria-label="WhatsApp"
  >
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.52 2 2.05 6.46 2.05 11.98c0 1.77.46 3.5 1.34 5.02L2 22l5.15-1.35a9.9 9.9 0 004.89 1.25h.01c5.51 0 9.98-4.47 9.98-9.99C22.03 6.47 17.56 2 12.04 2zm5.82 14.13c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.14-.95-.31-1.64-.61-2.88-1.25-4.75-4.16-4.89-4.35-.14-.19-1.17-1.55-1.17-2.95s.73-2.08.99-2.36c.26-.28.56-.35.75-.35.19 0 .38 0 .55.01.17.01.4-.06.62.47.24.58.81 1.99.88 2.13.07.14.12.31.02.5-.1.19-.15.31-.3.47-.14.16-.3.35-.43.47-.14.14-.28.29-.12.57.17.28.74 1.22 1.59 1.98 1.1.98 2.03 1.28 2.31 1.42.28.14.45.12.62-.07.17-.19.71-.83.9-1.12.19-.28.38-.24.64-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.7-.17 1.38z"/>
    </svg>
  </a>

</div>

          </div>

        </div>
      </footer>
    </>
  );
}