"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    id: "lead-generation",
    number: "01",
    title: "Lead Generation",
    tagline: "MORE QUALIFIED LEADS. MORE REVENUE.",
    description:
"Build a predictable sales pipeline with high-quality leads generated through targeted campaigns, strategic funnels, and conversion-focused marketing designed to grow your business consistently.",
    accent: "#7C3AED",
    lightBg: "#F5F0FF",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="4"
          y="10"
          width="40"
          height="28"
          rx="4"
          fill="#EDE9FE"
          stroke="#7C3AED"
          strokeWidth="1.5"
        />
        <path d="M4 18h40" stroke="#7C3AED" strokeWidth="1.5" />
        <circle cx="10" cy="14" r="1.5" fill="#7C3AED" />
        <circle cx="15" cy="14" r="1.5" fill="#A78BFA" />
        <path
          d="M12 28l6-6 5 5 7-8 6 6"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    subServices: [
      { name: "Google Lead Generation", slug: "lead-generation" },
      { name: "Meta Lead Generation", slug: "lead-generation" },
      { name: "Landing Page Funnels", slug: "lead-generation" },
      { name: "CRM Integration & Lead Tracking", slug: "lead-generation" },
    ],
  },
  {
    id: "seo",
    number: "02",
    title: "SEO",
    tagline: "RANK HIGHER. GET FOUND. GROW ORGANICALLY.",
    description:
      "Increase your online visibility and attract customers actively searching for your products or services. Our SEO strategies improve rankings, drive targeted traffic, and deliver sustainable long-term growth.",
    accent: "#0EA5E9",
    lightBg: "#F0F9FF",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle
          cx="22"
          cy="22"
          r="14"
          fill="#E0F2FE"
          stroke="#0EA5E9"
          strokeWidth="1.5"
        />
        <path
          d="M32 32l8 8"
          stroke="#0EA5E9"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 22h8M22 18v8"
          stroke="#0EA5E9"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    subServices: [
      { name: "Technical SEO", slug: "seo" },
      { name: "Keyword Research", slug: "seo" },
      { name: "On-Page SEO", slug: "seo" },
      { name: "Off-Page SEO & Link Building", slug: "seo" },
    ],
  },
  {
    id: "web-development",
    number: "03",
    title: "Web Development",
    tagline: "WEBSITES THAT CONVERT. VISITORS INTO CUSTOMERS.",
    description:
      "We build fast, modern, and conversion-focused websites that not only look exceptional but also generate enquiries, improve user experience, and help your business grow online.",
    accent: "#059669",
    lightBg: "#ECFDF5",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="4"
          y="8"
          width="40"
          height="32"
          rx="4"
          fill="#D1FAE5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <path d="M4 16h40" stroke="#059669" strokeWidth="1.5" />
        <path
          d="M16 26l-4 4 4 4M32 26l4 4-4 4"
          stroke="#059669"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 24l4 8"
          stroke="#059669"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    subServices: [
      { name: "Business Websites", slug: "web-development" },
      { name: "E-Commerce Stores", slug: "web-development" },
      { name: "Landing Pages", slug: "web-development" },
      { name: "Website Maintenance & Support", slug: "web-development" },
    ],
  },
  {
    id: "digital-marketing",
    number: "04",
    title: "Digital Marketing",
    tagline: "Growth at scale",
    description:
      "Data-driven campaigns engineered to capture attention, convert prospects, and compound your brand authority across every digital channel.",
    accent: "#DC2626",
    lightBg: "#FFF1F2",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle
          cx="18"
          cy="16"
          r="5"
          fill="#FFE4E6"
          stroke="#DC2626"
          strokeWidth="1.5"
        />
        <circle
          cx="30"
          cy="16"
          r="5"
          fill="#FFE4E6"
          stroke="#DC2626"
          strokeWidth="1.5"
        />
        <circle
          cx="24"
          cy="30"
          r="6"
          fill="#FFE4E6"
          stroke="#DC2626"
          strokeWidth="1.5"
        />
        <path
          d="M18 21L24 24M30 21L24 24"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 12V8M24 40V36"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill="#DC2626" />
      </svg>
    ),
    subServices: [
      { name: "Google Ads Management", slug: "digital-marketing" },
      { name: "Meta Advertising", slug: "digital-marketing" },
      { name: "Social Media Growth", slug: "digital-marketing" },
      { name: "Marketing Analytics", slug: "digital-marketing" },
    ],
  },
  
  {
    id: "ai-automation",
    number: "06",
    title: "AI Automation",
    tagline: "Work smarter, scale faster",
    description:
      "Intelligent systems that eliminate repetitive tasks, qualify leads automatically, and surface insights that power your strategic decisions.",
    accent: "#7C3AED",
    lightBg: "#F5F3FF",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="12"
          y="8"
          width="24"
          height="20"
          rx="4"
          fill="#EDE9FE"
          stroke="#7C3AED"
          strokeWidth="1.5"
        />
        <path
          d="M20 28v6M28 28v6M16 34h16"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="19" cy="18" r="2.5" fill="#7C3AED" opacity="0.4" />
        <circle cx="29" cy="18" r="2.5" fill="#7C3AED" opacity="0.4" />
        <path
          d="M19 22.5c1.3 1 3.4 1 5 0"
          stroke="#7C3AED"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    subServices: [
      { name: "AI Chatbots", slug: "ai-automation" },
      { name: "Workflow Automation", slug: "ai-automation" },
      { name: "AI Lead Generation", slug: "ai-automation" },
      { name: "Business Intelligence", slug: "ai-automation" },
    ],
  },
];

/* ── FLOATING STAT CHIP ── */
function StatChip({ children, className }) {
  return (
    <div
      className={`absolute bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 border border-white/80 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

/* ── SERVICE CARD ── */
function ServiceCard({ svc, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const loadGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: (index % 3) * 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    };
    loadGsap();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="opacity-0 relative bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col group cursor-default"
      style={{
        boxShadow: hovered
          ? `0 24px 60px -10px ${svc.accent}22, 0 8px 24px -6px rgba(0,0,0,0.06)`
          : "0 4px 24px -4px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
        transition:
          "box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Card top gradient band */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${svc.accent}, ${svc.accent}88)`,
        }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Number + icon row */}
        <div className="flex items-start justify-between mb-5">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: svc.accent, fontFamily: "'DM Mono', monospace" }}
          >
            {svc.number}
          </span>
          <div
            className="w-12 h-12 rounded-2xl p-2.5 flex-shrink-0"
            style={{ background: svc.lightBg }}
          >
            {svc.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-black text-gray-900 mb-1 leading-tight"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {svc.title}
        </h3>

        {/* Tagline */}
        <p
          className="text-xs font-semibold tracking-wider uppercase mb-4"
          style={{ color: svc.accent, fontFamily: "'DM Mono', monospace" }}
        >
          {svc.tagline}
        </p>

        {/* Description */}
        <p
          className="text-sm text-gray-500 leading-relaxed mb-6 flex-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {svc.description}
        </p>

        {/* Sub-services */}
        <div className="border-t border-gray-100 pt-5">
          <p
            className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Included Services
          </p>
          <ul className="flex flex-col gap-2">
            {svc.subServices.map((sub, idx) => (
              <li key={`${svc.id}-${idx}`}>
                <Link
                  href={`/services/${sub.slug}`}
                  className="group/link flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: hovered ? svc.lightBg : "#F3F4F6",
                    }}
                  >
                    <svg
                      className="w-2.5 h-2.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M2 5h6M5 2l3 3-3 3"
                        stroke={svc.accent}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="group-hover/link:underline underline-offset-2">
                    {sub.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── HERO FLOATING MOCKUP ── */
function FloatingCard({ className, delay, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const load = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay,
        },
      );
      gsap.to(el, {
        y: "+=10",
        duration: 3 + delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay * 0.5,
      });
    };
    load();
  }, [delay]);
  return (
    <div ref={ref} className={`opacity-0 absolute ${className}`}>
      {children}
    </div>
  );
}

/* ── ROOT PAGE ── */
export default function ServicesPage() {
  const heroTitleRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Hero stagger
      gsap.fromTo(
        [
          heroBadgeRef.current,
          heroTitleRef.current,
          heroSubRef.current,
          heroBtnsRef.current,
        ],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Section title
      if (sectionTitleRef.current) {
        gsap.fromTo(
          sectionTitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionTitleRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        .services-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F8F7FF;
          overflow-x: hidden;
        }

        /* Subtle linen texture */
        .texture-bg {
          background-color: #F8F7FF;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E"),
            radial-gradient(ellipse 80% 60% at 20% 0%, #EDE9FE 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 10%, #E0F2FE 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 100%, #F0FDF4 0%, transparent 50%);
        }

        .hero-blob-1 {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, #DDD6FE 0%, transparent 70%);
          top: -200px; left: -200px;
          opacity: 0.5;
          pointer-events: none;
          filter: blur(40px);
        }
        .hero-blob-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, #BAE6FD 0%, transparent 70%);
          top: -100px; right: -100px;
          opacity: 0.4;
          pointer-events: none;
          filter: blur(40px);
        }

        .pill-btn-primary {
          background: #7C3AED;
          color: white;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 0.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(124,58,237,0.3);
        }
        .pill-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(124,58,237,0.4);
        }
        .pill-btn-outline {
          background: white;
          color: #374151;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          font-weight: 500;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 0.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          border: 1.5px solid #E5E7EB;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .pill-btn-outline:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .mockup-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px -10px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.9);
        }

        .marquee-wrap { overflow: hidden; }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
      `}</style>

      <div className="services-root">
        {/* ══════════════════════════════
            HERO SECTION
        ══════════════════════════════ */}
        <section className="texture-bg relative min-h-screen flex items-center overflow-hidden">
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
              {/* LEFT - Text */}
              <div className="flex flex-col items-start">
                {/* Badge */}
                <div ref={heroBadgeRef}></div>

                {/* Heading */}
                <h1
                  ref={heroTitleRef}
                  className="opacity-0 text-gray-900 leading-[0.92] mb-6 text-3xl lg:text-6xl"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Turn Clicks
                  <br />
                  <span style={{ color: "#7C3AED" }}>Into Customers</span>
                  <br />
                </h1>

                {/* Subtext */}
                <p
                  ref={heroSubRef}
                  className="opacity-0 text-gray-500 mb-8 max-w-md leading-relaxed"
                  style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
                >
                  Your business deserves more than just traffic. We build
                  complete digital growth systems from lead generation and
                  conversion-focused websites to performance marketing that help
                  you generate more enquiries, close more sales, and scale with
                  confidence.
                </p>

                {/* Buttons + social proof */}
                <div
                  ref={heroBtnsRef}
                  className="opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap"
                >
                  <a href="#services" className="pill-btn-primary">
                    Explore Services
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a href="/contact" className="pill-btn-outline">
                    Free Consultation
                  </a>

                  {/* Social proof */}
                </div>
              </div>

              {/* RIGHT - Floating mockups */}
              <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] hidden sm:block">
                {/* Main big mockup */}
                <FloatingCard
                  className="top-8 left-1/2 -translate-x-1/2 w-72 lg:w-80"
                  delay={0.3}
                >
                  <div className="mockup-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm bg-purple-500" />
                      </div>
                      <div>
                        <div className="h-2.5 w-24 bg-gray-200 rounded-full" />
                        <div className="h-2 w-16 bg-gray-100 rounded-full mt-1" />
                      </div>
                    </div>
                    <div className="h-28 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 mb-3 flex items-center justify-center">
                      <svg viewBox="0 0 120 80" className="w-28 h-20">
                        <path
                          d="M10 60 Q30 20 50 40 Q70 55 90 25 Q100 15 110 30"
                          stroke="#7C3AED"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 70 Q30 35 50 50 Q70 65 90 40 Q100 30 110 45"
                          stroke="#A78BFA"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["+28%", "4.8k", "92%"].map((v, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-lg p-2 text-center"
                        >
                          <p className="text-xs font-bold text-purple-600">
                            {v}
                          </p>
                          <p className="text-[9px] text-gray-400 mt-0.5">
                            {["Growth", "Leads", "Score"][i]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingCard>

                {/* Floating chip - UI/UX */}
                <FloatingCard className="top-4 left-0 lg:-left-8" delay={0.6}>
                  <div className="mockup-card px-3.5 py-2.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                        <rect
                          x="2"
                          y="4"
                          width="16"
                          height="12"
                          rx="2"
                          stroke="#0EA5E9"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M6 9h8M6 12h5"
                          stroke="#0EA5E9"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      UI/UX Design
                    </span>
                  </div>
                </FloatingCard>

                {/* Floating chip - Web Dev */}
                <FloatingCard
                  className="top-1/3 right-0 lg:-right-4"
                  delay={0.8}
                >
                  <div className="mockup-card px-3.5 py-2.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                        <path
                          d="M4 7l-3 3 3 3M16 7l3 3-3 3M12 4l-4 12"
                          stroke="#059669"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      Web Dev
                    </span>
                  </div>
                </FloatingCard>

                {/* Floating chip - Branding */}
                <FloatingCard
                  className="bottom-16 left-0 lg:-left-4"
                  delay={1.0}
                >
                  <div className="mockup-card px-3.5 py-2.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                        <circle
                          cx="10"
                          cy="10"
                          r="7"
                          stroke="#D97706"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M10 6v4l3 2"
                          stroke="#D97706"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      Branding
                    </span>
                  </div>
                </FloatingCard>

                {/* New project live chip */}
                <FloatingCard
                  className="bottom-8 right-0 lg:-right-4"
                  delay={1.1}
                >
                  <div className="mockup-card px-3.5 py-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
                    <span className="text-xs font-semibold text-gray-700">
                      New project live!
                    </span>
                  </div>
                </FloatingCard>

                {/* Stats card bottom center */}
                <FloatingCard
                  className="bottom-0 left-1/2 -translate-x-1/2 w-56"
                  delay={0.9}
                >
                  <div className="mockup-card p-3.5">
                    <p
                      className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      This month
                    </p>
                    {[
                      { label: "Campaigns Live", val: "12", w: "75%" },
                      { label: "Avg. ROAS", val: "4.2x", w: "60%" },
                      { label: "Client Retention", val: "96%", w: "90%" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between mb-2"
                      >
                        <span className="text-[10px] text-gray-500">
                          {row.label}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: row.w }}
                            />
                          </div>
                          <span
                            className="text-[10px] font-bold text-purple-600"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {row.val}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </FloatingCard>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            MARQUEE
        ══════════════════════════════ */}
        <div className="border-y border-gray-200/60 bg-white/60 backdrop-blur-sm py-4 marquee-wrap">
          <div className="marquee-inner">
            {[...Array(3)].map((_, gi) =>
              services.map((s) => (
                <span
                  key={`${s.id}-${gi}`}
                  className="text-sm font-semibold tracking-widest uppercase text-gray-300 px-8 flex items-center gap-6"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {s.title}
                  <span className="text-purple-300">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        {/* ══════════════════════════════
            SERVICES GRID
        ══════════════════════════════ */}
        <section
          id="services"
          className="texture-bg py-24 lg:py-32 px-6 sm:px-10 lg:px-16"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Section heading */}
            <div
              ref={sectionTitleRef}
              className="opacity-0 text-center mb-16 lg:mb-20"
            >
              <p
                className="text-xs font-bold tracking-widest uppercase text-purple-500 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What we offer
              </p>
              <h2
                className="text-gray-900 font-black leading-tight mb-4"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                }}
              >
                Digital solutions built for
                <br />
                <span style={{ color: "#7C3AED" }}> real business growth</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
                Whether you're looking to generate qualified leads, build a
                high-converting website, improve your online presence, or scale
                with paid advertising, our strategies are designed to deliver
                measurable results.{" "}
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {services.map((svc, i) => (
                <ServiceCard key={svc.id} svc={svc} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CTA BAND
        ══════════════════════════════ */}
        <section
          className="relative bg-fixed overflow-hidden py-24 px-6 sm:px-10 lg:px-16"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Background */}
          {/* <div className="absolute inset-0 bg-fixed bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" /> */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p
              className="text-purple-200 text-xs font-bold tracking-widest uppercase mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Ready to grow?
            </p>
            <h2
              className="text-white font-black leading-tight mb-6 text-[20px] md:text-[2rem]"
              style={{
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Let's build something remarkable together
            </h2>
            <p className="text-purple-200 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free strategy call. No hard sell - just a genuine
              conversation about what's possible for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-bold text-sm px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                Start a Project
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="#7C3AED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="tel:+9354683813"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a9 9 0 006 6v-1a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1A13 13 0 012 3z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
