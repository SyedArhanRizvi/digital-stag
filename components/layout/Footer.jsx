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
            <div className="flex items-center gap-3">
              <a href="#" className="social-node" aria-label="Twitter Node">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="social-node" aria-label="LinkedIn Node">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="social-node" aria-label="GitHub Node">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>
      </footer>
    </>
  );
}