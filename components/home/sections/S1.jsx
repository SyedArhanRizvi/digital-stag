"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Dummy avatar images (replace with actuals) ──────────────────────────────
const AVATARS = [
  "https://i.pravatar.cc/48?img=1",
  "https://i.pravatar.cc/48?img=2",
  "https://i.pravatar.cc/48?img=3",
  "https://i.pravatar.cc/48?img=4",
  "https://i.pravatar.cc/48?img=5",
];

// ── Dummy device mock-up screenshots (replace with actuals) ─────────────────
const MOCKUP_LEFT_MAIN =
  "/home/hero/dashboard3.jpg";
const MOCKUP_LEFT_CARD1 =
  "/home/hero/analytics2.jpg";
const MOCKUP_LEFT_CARD2 =
  "/home/hero/marketing.jpg";
const MOCKUP_RIGHT_PHONE =
  "https://placehold.co/180x320/ea580c/ffffff?text=Mobile+App";
const MOCKUP_RIGHT_BADGE =
  "https://placehold.co/160x90/f97316/ffffff?text=InnovateBrand";

// ── Floating tag data ────────────────────────────────────────────────────────
const FLOAT_TAGS = [
  { id: 1, label: "UI/UX Design", color: "bg-violet-100 text-violet-700" },
  { id: 2, label: "Branding", color: "bg-amber-100 text-amber-700" },
  { id: 3, label: "Web Dev", color: "bg-sky-100 text-sky-700" },
];

// ── Variants ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
});

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

// ── Floating animation (infinite loop) ──────────────────────────────────────
const floatAnim = (y = 12, duration = 3.5) => ({
  y: [0, -y, 0],
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
});

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [count, setCount] = useState(530);

  // Simulate a live counter for the "clients satisfied" badge
  useEffect(() => {
    const t = setInterval(() => {
      setCount((n) => (n < 540 ? n + 1 : n));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[120vh] w-full overflow-hidden bg-[#e8ecf4] flex items-center font-sans">
      {/* ── Soft background blobs ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-violet-300/30 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[640px] rounded-full bg-indigo-200/20 blur-[120px]" />
        <div className="absolute -bottom-24 right-0 h-[360px] w-[360px] rounded-full bg-orange-300/25 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-center min-h-[80vh]">

          {/* ════════════════════════════════════════
              LEFT - Device Mock-ups Cluster
          ════════════════════════════════════════ */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end h-[340px] sm:h-[400px] lg:h-[520px]"
            variants={fadeLeft(0.1)}
            initial="hidden"
            animate="show"
          >
            {/* Main card */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 w-[260px] sm:w-[300px] lg:w-[330px] rounded-3xl overflow-hidden shadow-2xl border border-white/60"
              animate={floatAnim(10, 4)}
            >
              <img src={MOCKUP_LEFT_MAIN} alt="Dashboard mockup" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating mini-card 1 - top-right overlap */}
            <motion.div
              className="absolute right-4 sm:right-8 lg:right-0 top-6 sm:top-8 w-[130px] sm:w-[155px] rounded-2xl overflow-hidden shadow-xl border border-white/70 rotate-2"
              animate={floatAnim(8, 3.2)}
              style={{ animationDelay: "0.5s" }}
            >
              <img src={MOCKUP_LEFT_CARD1} alt="Analytics card" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating mini-card 2 - bottom-left overlap */}
            <motion.div
              className="absolute left-4 sm:left-8 lg:left-4 bottom-4 sm:bottom-8 w-[120px] sm:w-[145px] rounded-2xl overflow-hidden shadow-xl border border-white/70 -rotate-3"
              animate={floatAnim(6, 3.8)}
            >
              <img src={MOCKUP_LEFT_CARD2} alt="Campaign card" className="w-full h-full object-cover" />
            </motion.div>

            {/* Pill tag */}
            {FLOAT_TAGS.map((tag, i) => (
              <motion.span
                key={tag.id}
                className={`absolute text-[11px] font-semibold px-3 py-1 rounded-full shadow ${tag.color}`}
                style={{
                  top: `${20 + i * 28}%`,
                  left: i % 2 === 0 ? "4%" : "auto",
                  right: i % 2 !== 0 ? "2%" : "auto",
                }}
                animate={floatAnim(5, 2.8 + i * 0.5)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.15 }}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          {/* ════════════════════════════════════════
              CENTER - Hero Copy
          ════════════════════════════════════════ */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[480px] mx-auto lg:mx-0 lg:px-8 xl:px-10">

            {/* Eyebrow badge */}
            <motion.div
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="show"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-violet-200 px-4 py-1.5 text-xs font-semibold text-violet-600 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              Award-winning Design Studio
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp(0.15)}
              initial="hidden"
              animate="show"
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-gray-900"
              style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
            >
              Empowering{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-violet-600">Brands</span>
                <motion.span
                  className="absolute inset-x-0 bottom-1 h-3 rounded-sm bg-violet-200/70 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              Through
              <br />
              <span className="text-gray-800">Innovative Design</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp(0.25)}
              initial="hidden"
              animate="show"
              className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed max-w-sm"
            >
              We empower brands with innovative design solutions, crafting distinctive
              visual identities that attract people and drive success.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={fadeUp(0.35)}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(109,40,217,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all"
              >
                Our Work
                <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.button>

              {/* Social proof pill */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow px-4 py-2.5 cursor-default"
              >
                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  {AVATARS.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="h-7 w-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                {/* Live counter badge */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={count}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs text-gray-500 hidden sm:inline">happy clients</span>
              </motion.div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeUp(0.45)}
              initial="hidden"
              animate="show"
              className="mt-10 flex items-center gap-6 sm:gap-8 divide-x divide-gray-300/60"
            >
              {[
                { value: "8+", label: "Years experience" },
                { value: "320+", label: "Projects delivered" },
                { value: "98%", label: "Client satisfaction" },
              ].map((stat, i) => (
                <div key={i} className={`${i !== 0 ? "pl-6 sm:pl-8" : ""} flex flex-col`}>
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stat.value}</span>
                  <span className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT - Phone mock-up
          ════════════════════════════════════════ */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-start h-[280px] sm:h-[380px] lg:h-[520px]"
            variants={fadeRight(0.2)}
            initial="hidden"
            animate="show"
          >
            {/* Orange gradient blob behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-[240px] w-[180px] sm:h-[320px] sm:w-[240px] rounded-[60px] shadow-2xl opacity-90" 
              style={{
                backgroundImage:"url('/home/hero/tab2.jpg')",
                backgroundSize:"cover",
                backgroundPosition:'center'
              }}
              />
            </div>

            {/* Phone frame */}
<motion.div
  className="relative z-10 w-[140px] sm:w-[170px] lg:w-[190px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/80"
  animate={floatAnim(12, 4.2)}
>
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
</motion.div>

            {/* Brand badge card - floating top-left */}
            <motion.div
              className="absolute left-0 sm:left-2 lg:-left-2 top-6 sm:top-1 lg:-top-12 z-20 w-[140px] sm:w-[158px] rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white"
              animate={floatAnim(7, 3.4)}
            >
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
              <div className="px-3 py-2 bg-white">
                <p className="text-[10px] font-bold text-gray-800 truncate">InnovateBrand Studio</p>
                <p className="text-[9px] text-gray-400">Podcast · Season 3</p>
              </div>
            </motion.div>

            {/* Small floating notification chip */}
            <motion.div
              className="absolute right-2 bottom-10 sm:bottom-14 z-20 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-gray-100 px-3 py-2"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, ...floatAnim(5, 3).y }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-gray-700">New project live!</span>
            </motion.div>
          </motion.div>
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

      {/* ── Google Fonts loader (Sora) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
      `}</style>
    </section>
  );
}