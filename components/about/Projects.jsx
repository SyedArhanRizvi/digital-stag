"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Add / remove image paths here (files live in /public/projects/) ──────
const PROJECT_IMAGES = Array.from({ length: 30 }, (_, i) => `/projects/${i + 1}.jpeg`)

function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const [active, setActive] = useState(null) // index of image open in lightbox

  /* ── Entrance animations (scoped, so we never kill other triggers) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )

      const cards = gsap.utils.toArray(".project-card")
      gsap.set(cards, { opacity: 0, y: 40 })

      ScrollTrigger.batch(cards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* Images load after first paint and change the page height,
     so refresh trigger positions once each image is ready. */
  const refreshTimer = useRef(null)
  const handleImgLoad = useCallback(() => {
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(() => ScrollTrigger.refresh(), 200)
  }, [])

  /* ── Lightbox controls ── */
  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % PROJECT_IMAGES.length)),
    []
  )
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length
      ),
    []
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [active, close, next, prev])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#eef1f7] py-16 sm:py-20 lg:py-28"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-[#FFAA00]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[26rem] h-[26rem] bg-[#C57A00]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[24rem] h-[24rem] bg-[#FFAA00]/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#5B3700 1px, transparent 1px), linear-gradient(90deg, #5B3700 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#C57A00]/20 text-[#5B3700] text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C57A00]" />
            Our Portfolio
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
          >
            Our Featured{" "}
            <span className="bg-gradient-to-r from-[#5B3700] via-[#C57A00] to-[#FFAA00] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            A look at the work we've delivered. Tap any project to view it in full size.
          </p>
        </div>

        {/* ── Masonry grid: every card matches its image's own size ── */}
        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 [column-fill:_balance]"
        >
          {PROJECT_IMAGES.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Open project ${index + 1}`}
              className="project-card group relative block w-full mb-5 sm:mb-6 break-inside-avoid text-left
                         rounded-2xl bg-white p-2 sm:p-2.5 border border-white
                         shadow-[0_2px_12px_rgba(91,55,0,0.08)]
                         transition-all duration-500 ease-out
                         hover:-translate-y-1.5 hover:border-[#FFAA00]/60
                         hover:shadow-[0_18px_40px_-12px_rgba(197,122,0,0.35)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C57A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef1f7]"
            >
              {/* Image keeps its natural ratio — h-auto means nothing is cropped */}
              <div className="relative overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={src}
                  alt={`Digital Stag project ${index + 1}`}
                  title="Digital Stag"
                  loading="lazy"
                  decoding="async"
                  onLoad={handleImgLoad}
                  className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1a00]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* View chip */}
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#5B3700] shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  View
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project preview"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#140c00]/90 backdrop-blur-md p-4 sm:p-8"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous project"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C57A00] text-white flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next project"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C57A00] text-white flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Full image — fits the screen without cropping */}
          <img
            src={PROJECT_IMAGES[active]}
            alt={`Digital Stag project ${active + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] w-auto h-auto rounded-xl shadow-2xl object-contain"
          />

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90">
            {active + 1} / {PROJECT_IMAGES.length}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects