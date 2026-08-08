"use client";
import { useState, useEffect } from "react";

// ── Dummy avatar images (replace with actuals) ──────────────────────────────
const AVATARS = [
  "https://i.pravatar.cc/48?img=1",
  "https://i.pravatar.cc/48?img=2",
  "https://i.pravatar.cc/48?img=3",
  "https://i.pravatar.cc/48?img=4",
  "https://i.pravatar.cc/48?img=5",
];

// ── Dummy device mock-up screenshots (replace with actuals) ─────────────────
const MOCKUP_LEFT_MAIN = "/home/hero/dashboard3.jpg";
const MOCKUP_LEFT_CARD1 = "/home/hero/analytics2.jpg";
const MOCKUP_LEFT_CARD2 = "/home/hero/marketing.jpg";
const MOCKUP_RIGHT_PHONE =
  "https://placehold.co/180x320/ea580c/ffffff?text=Mobile+App";
const MOCKUP_RIGHT_BADGE =
  "https://placehold.co/160x90/f97316/ffffff?text=InnovateBrand";

// ── Floating tag data ────────────────────────────────────────────────────────
const FLOAT_TAGS = [
  { id: 1, label: "UI/UX Design", color: "bg-[#F8EAD5] text-[#5B3700]" },
  { id: 2, label: "Branding", color: "bg-amber-100 text-amber-700" },
  { id: 3, label: "Web Dev", color: "bg-sky-100 text-sky-700" },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [count, setCount] = useState(530);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Simulate a live counter for the "clients satisfied" badge
  useEffect(() => {
    const t = setInterval(() => {
      setCount((n) => (n < 540 ? n + 1 : n));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  // Responsive device detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger entrance animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100vh] sm:min-h-[110vh] w-full overflow-hidden bg-[#e8ecf4] flex items-center font-sans">
      {/* ── Soft background blobs ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-20 sm:-top-32 -left-20 sm:-left-32 h-[280px] sm:h-[340px] md:h-[420px] w-[280px] sm:w-[340px] md:w-[420px] rounded-full bg-[#C57A00]/30 blur-[80px] sm:blur-[100px]" />
        <div className="absolute top-1/3 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[240px] sm:h-[280px] md:h-[340px] w-[360px] sm:w-[480px] md:w-[640px] rounded-full bg-[#FFAA00]/20 blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        <div className="absolute -bottom-16 sm:-bottom-24 right-0 h-[240px] sm:h-[300px] md:h-[360px] w-[240px] sm:w-[300px] md:w-[360px] rounded-full bg-orange-300/25 blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 lg:gap-4 items-center min-h-[80vh]">
          {/* ════════════════════════════════════════
              LEFT - Device Mock-ups Cluster
          ════════════════════════════════════════ */}
          <div
            className={`relative flex items-center justify-center lg:justify-end h-[280px] sm:h-[340px] md:h-[400px] lg:h-[520px] order-2 lg:order-1 mt-8 lg:mt-0 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Main card */}
            <div className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 w-[200px] sm:w-[260px] md:w-[300px] lg:w-[330px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/60 animate-float-slow">
              <img
                src={MOCKUP_LEFT_MAIN}
                alt="Dashboard mockup"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating mini-card 1 - top-right overlap */}
            <div
              className="absolute right-2 sm:right-4 md:right-8 lg:right-0 top-4 sm:top-6 md:top-8 w-[100px] sm:w-[130px] md:w-[145px] lg:w-[155px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-white/70 rotate-2 animate-float-medium"
              style={{ animationDelay: "0.5s" }}
            >
              <img
                src={MOCKUP_LEFT_CARD1}
                alt="Analytics card"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating mini-card 2 - bottom-left overlap */}
            <div className="absolute left-2 sm:left-4 md:left-8 lg:left-4 bottom-3 sm:bottom-4 md:bottom-8 w-[90px] sm:w-[120px] md:w-[135px] lg:w-[145px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-white/70 -rotate-3 animate-float-fast">
              <img
                src={MOCKUP_LEFT_CARD2}
                alt="Campaign card"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Pill tags - hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:block">
              {FLOAT_TAGS.map((tag, i) => (
                <span
                  key={tag.id}
                  className={`absolute text-[10px] sm:text-[11px] font-semibold px-2 sm:px-3 py-1 rounded-full shadow ${tag.color} animate-float-tag opacity-0`}
                  style={{
                    top: `${20 + i * 28}%`,
                    left: i % 2 === 0 ? "4%" : "auto",
                    right: i % 2 !== 0 ? "2%" : "auto",
                    animationDelay: `${0.4 + i * 0.15}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            {/* Mobile-specific simplified tags */}
            <div className="block sm:hidden">
              {FLOAT_TAGS.slice(0, 2).map((tag, i) => (
                <span
                  key={tag.id}
                  className={`absolute text-[9px] font-semibold px-2 py-0.5 rounded-full shadow ${tag.color} animate-float-tag opacity-0`}
                  style={{
                    top: `${25 + i * 30}%`,
                    right: "5%",
                    animationDelay: `${0.4 + i * 0.15}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              CENTER - Hero Copy
          ════════════════════════════════════════ */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[380px] sm:max-w-[440px] md:max-w-[480px] mx-auto lg:mx-0 lg:px-6 xl:px-10 order-1 lg:order-2">
            {/* Eyebrow badge */}
           

            {/* Headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-gray-900 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
            >
              More{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#5B3700]"> Leads . </span>
                <span
                  className="absolute inset-x-0 bottom-0.5 sm:bottom-1 h-2 sm:h-3 rounded-sm bg-[#C57A00]/50 -z-0 animate-underline-reveal"
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              More Sales
              <br />
              <span className="text-gray-800">More</span>
              <br />
              <span className="bg-gradient-to-r from-[#5B3700] via-[#C57A00] to-[#FFAA00] bg-clip-text text-transparent">
                Growth .
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className={`mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-[280px] sm:max-w-sm px-2 sm:px-0 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Everything you need to grow. From generating qualified leads to
              building high-converting websites, we create digital marketing
              systems that help businesses scale faster.
            </p>

            {/* CTA row */}
        
            {/* Stats strip */}
            <div
              className={`mt-6 sm:mt-10 flex items-center gap-4 sm:gap-6 md:gap-8 divide-x divide-gray-300/60 transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: "5+", label: "Years experience" },
                { value: "160+", label: "Projects delivered" },
                { value: "5L+", label: "Leads Generated" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`${i !== 0 ? "pl-4 sm:pl-6 md:pl-8" : ""} flex flex-col`}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-[9px] sm:text-[11px] md:text-xs text-gray-400 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT - Phone mock-up
          ════════════════════════════════════════ */}
          <div
            className={`relative flex items-center justify-center lg:justify-start h-[240px] sm:h-[300px] md:h-[380px] lg:h-[520px] order-3 mt-8 lg:mt-0 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Orange gradient blob behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="h-[180px] sm:h-[240px] md:h-[280px] lg:h-[320px] w-[140px] sm:w-[180px] md:w-[210px] lg:w-[240px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] shadow-xl sm:shadow-2xl opacity-90"
                style={{
                  backgroundImage: "url('/home/hero/tab2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* Phone frame */}
            <div className="relative z-10 w-[110px] sm:w-[140px] md:w-[170px] lg:w-[190px] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl sm:shadow-2xl border-3 sm:border-4 border-white/80 animate-float-slow">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
              >
                <source src="/home/hero/v1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Brand badge card - floating top-left */}
            <div className="absolute left-0 sm:left-1 md:left-2 lg:-left-2 top-4 sm:top-2 md:top-1 lg:-top-12 z-20 w-[110px] sm:w-[130px] md:w-[145px] lg:w-[158px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-white/60 bg-white animate-float-medium">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
              >
                <source src="/home/hero/web.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white">
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-800 truncate">
                  InnovateBrand Studio
                </p>
                <p className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-400">
                  Podcast · Season 3
                </p>
              </div>
            </div>

            {/* Small floating notification chip */}
            <div className="absolute right-1 sm:right-2 bottom-8 sm:bottom-10 md:bottom-14 z-20 flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-white shadow-lg border border-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 animate-float-fast">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-gray-700">
                New project live!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#6d28d9 1px,transparent 1px),linear-gradient(90deg,#6d28d9 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── CSS Animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        
        /* Floating animations for images and videos */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes floatTag {
          0% { 
            opacity: 0;
            transform: translateY(0px); 
          }
          10% {
            opacity: 1;
          }
          50% { 
            transform: translateY(-5px); 
          }
          100% { 
            opacity: 1;
            transform: translateY(0px); 
          }
        }
        
        @keyframes underlineReveal {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes counterPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: floatMedium 3.2s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: floatFast 2.8s ease-in-out infinite;
        }
        
        .animate-float-tag {
          animation: floatTag 2.8s ease-in-out infinite;
        }
        
        .animate-underline-reveal {
          animation: underlineReveal 0.5s ease-out 0.55s forwards;
        }
        
        .animate-counter-pop {
          animation: counterPop 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
}
