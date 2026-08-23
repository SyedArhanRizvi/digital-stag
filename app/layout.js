"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import CallNowModal from "@/components/layout/CallNowModal";
import { TbSeo } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { IoAnalytics, IoShareSocialOutline } from "react-icons/io5";
import { FaPhotoVideo } from "react-icons/fa";
import { MdAutoMode, MdOutlineGraphicEq } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PillNav from "@/components/layout/Navbar";
import gsap from "gsap";
import logo from "../public/logo/logo5.png";
import { GrBusinessService } from "react-icons/gr";
import EnquiryForm from "@/components/popup/EnquiryForm";

/* ─── fonts ───────────────────────────────────────────────────── */
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ─── services data (shared) ──────────────────────────────────── */
const SERVICES = [
  {
    label: "SEO",
    href: "/services/seo",
    icon: <TbSeo />,
    desc: "Rank higher, grow faster",
  },
  {
    label: "Web Development",
    href: "/services/web-development",
    icon: <CgWebsite />,
    desc: "Beautiful, blazing-fast sites",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    icon: <IoAnalytics />,
    desc: "Results-driven campaigns",
  },

  {
    label: "Lead Generation",
    href: "/services/lead-generation",
    icon: <GrBusinessService />,
    desc: "Organic leads generation for your growth",
  },
  {
    label: "AI Automation",
    href: "/services/ai-automation",
    icon: <IoShareSocialOutline />,
    desc: "Build and engage your audience",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

/* ═══════════════════════════════════════════════════════════════
   MOBILE FULL-SCREEN DRAWER
═══════════════════════════════════════════════════════════════ */
function MobileDrawer({ isOpen, onClose, onCallNowClick }) {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef([]);
  const closeRef = useRef(null);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const items = itemsRef.current.filter(Boolean);
    const closeBtn = closeRef.current;

    if (!drawer) return;

    if (isOpen) {
      gsap.set(drawer, { display: "flex" });
      // overlay fade in
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" },
      );
      // panel slide in from right
      gsap.fromTo(
        panel,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.45, ease: "power4.out" },
      );
      // stagger links
      gsap.fromTo(
        items,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.2,
        },
      );
      // close button spin-in
      if (closeBtn)
        gsap.fromTo(
          closeBtn,
          { rotation: -90, scale: 0, opacity: 0 },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            delay: 0.3,
          },
        );
    } else {
      gsap.to(panel, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(drawer, { display: "none" });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={drawerRef}
      className="fixed inset-0 z-[9999] hidden"
      style={{ display: "none" }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel - WHITE BACKGROUND */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] flex flex-col bg-white"
        style={{
          borderLeft: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <img
            src="/logo/logo6.png"
            alt="Digital Stag"
            className="h-8 w-auto"
          />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-0 transition-colors bg-gray-100 hover:bg-gray-200"
          >
            {/* Close SVG - Dark color */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <div
              key={link.href}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
            >
              {link.hasDropdown ? (
                <>
                  <div className="flex items-center gap-1">
                    {/* Text part - redirects to /services */}
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="flex-1 text-left flex items-center px-4 py-3.5 rounded-2xl text-gray-900 font-semibold text-lg tracking-wide no-underline transition-colors hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                    {/* Chevron button - toggles dropdown */}
                    <button
                      className="w-11 h-11 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSvcOpen((v) => !v);
                      }}
                      aria-label={
                        svcOpen ? "Close services menu" : "Open services menu"
                      }
                    >
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        className="transition-transform duration-300"
                        style={{
                          transform: svcOpen ? "rotate(180deg)" : "rotate(0)",
                        }}
                      >
                        <path
                          d="M1 1l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {svcOpen && (
                    <div className="mt-1 ml-2 flex flex-col gap-0.5 pl-2 border-l border-gray-200">
                      {SERVICES.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline group transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span className="text-xl w-7 text-center text-gray-700 group-hover:text-gray-900">
                            {svc.icon}
                          </span>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">
                              {svc.label}
                            </div>
                            <div className="text-xs text-gray-400">
                              {svc.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-4 py-3.5 rounded-2xl text-gray-900 font-semibold text-lg tracking-wide no-underline transition-colors hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="px-6 pb-8 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              onClose();
              onCallNowClick();
            }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-base no-underline transition-all border-0 cursor-pointer bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98]"
          >
            {/* Phone SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 012 2.22 2 2 0 013.68 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN NAVBAR SHELL
═══════════════════════════════════════════════════════════════ */
function SiteNav({ onCallNowClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll shadow effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Animate hamburger lines ↔ X */
  useEffect(() => {
    const btn = hamburgerRef.current;
    if (!btn) return;
    const lines = btn.querySelectorAll(".hb-line");
    if (mobileOpen) {
      gsap.to(lines[0], {
        rotation: 45,
        y: 4,
        duration: 0.3,
        ease: "power3.out",
        transformOrigin: "center",
      });
      gsap.to(lines[1], {
        rotation: -45,
        y: -4,
        duration: 0.3,
        ease: "power3.out",
        transformOrigin: "center",
      });
    } else {
      gsap.to(lines[0], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(lines[1], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, [mobileOpen]);

  return (
    <>
      {/* ── Sticky bar ── */}
      <header
        ref={navbarRef}
        className="fixed top-0 bg-white left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 2px 20px rgba(0,0,0,0.06)"
            : "0 2px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            {/* ── LEFT: logo (always visible) ── */}
            <Link
              href="/"
              className="flex-shrink-0 no-underline"
              aria-label="Digital Stag Home"
            >
              <img
                src="/logo/logo6.png"
                alt="Digital Stag"
                className="h-9 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Fallback text logo if image missing */}
              <span
                className="font-black text-xl tracking-tight hidden"
                style={{ color: "#0a0a0a" }}
              >
                Digital<span style={{ color: "#6366f1" }}>Stag</span>
              </span>
            </Link>

            {/* ── CENTRE: PillNav (hidden on < 1024 px) ── */}
            <div className="hidden lg:flex items-center">
              <PillNav
                logo={logo.src}
                logoAlt="Company Logo"
                items={NAV_LINKS}
                activeHref="/"
                ease="power2.easeOut"
                baseColor="#000000"
                pillColor="#ffffff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#000000"
                initialLoadAnimation={false}
              />
            </div>

            {/* ── RIGHT: Call Now + hamburger ── */}
            <div className="flex items-center gap-3">
              {/* Call Now - visible on all breakpoints */}
              <button
                onClick={onCallNowClick}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold no-underline transition-all duration-200 border-0 cursor-pointer"
                style={{
                  background: "#0a0a0a",
                  color: "#fff",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#333";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0a0a0a";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {/* Phone icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 012 2.22 2 2 0 013.68 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Call Now
              </button>

              {/* Hamburger - visible on < 1024 px */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="lg:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer border-0 transition-colors"
                style={{ background: "#0a0a0a" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#333";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0a0a0a";
                }}
              >
                <span className="hb-line block w-4 h-[1.5px] rounded-full bg-white origin-center" />
                <span className="hb-line block w-4 h-[1.5px] rounded-full bg-white origin-center" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile drawer ── */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onCallNowClick={onCallNowClick}
      />

      {/* ── Spacer so content doesn't hide under navbar ── */}
      <div style={{ height: "68px" }} aria-hidden="true" />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT LAYOUT
═══════════════════════════════════════════════════════════════ */

export default function RootLayout({ children }) {
  const [callNowOpen, setCallNowOpen] = useState(false);

  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`min-h-full flex flex-col ${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <SiteNav onCallNowClick={() => setCallNowOpen(true)} />
        <EnquiryForm />
        <CallNowModal
          isOpen={callNowOpen}
          onClose={() => setCallNowOpen(false)}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
