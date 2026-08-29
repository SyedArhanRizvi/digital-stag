"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Dummy data (replace with actual content) ──────────────────────────────
const TEAM_IMAGES = [
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=12",
  "https://i.pravatar.cc/100?img=13",
  "https://i.pravatar.cc/100?img=14",
]

const STATS = [
  { value: "160+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Team Members" },
  { value: "90%", label: "Client Retention" },
]

const VALUES = [
  { 
    title: "Innovation First",
    description: "Staying Ahead of the Digital Curve",
    icon: "✦"
  },
  { 
    title: "Client-Centric",
    description: "Every Decision Backed by Insights",
    icon: "♡"
  },
  { 
    title: "Excellence",
    description: "Marketing That Delivers Impact",
    icon: "◆"
  },
]

function S1() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)
  const decorativeCircleRef = useRef(null)
  const floatingElementsRef = useRef([])

  useEffect(() => {
    // Master timeline for entrance animations
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 1.2 
      }
    })

    // Animate decorative elements
    tl.fromTo(
      decorativeCircleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 1.5, ease: "elastic.out(1, 0.5)" }
    )

    // Animate floating elements
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { 
            y: 60, 
            opacity: 0,
            rotation: index % 2 === 0 ? -15 : 15
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1,
            delay: 0.3 + index * 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        )

        // Continuous floating animation
        gsap.to(el, {
          y: -12,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3,
        })
      }
    })

    // Animate main content
    tl.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      subtextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
      "-=0.4"
    )
    .fromTo(
      statsRef.current.children,
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.5"
    )
    .fromTo(
      teamRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    )

    // Animate values with stagger
    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.children,
        { 
          y: 50, 
          opacity: 0,
          rotateX: 15
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 85%",
          }
        }
      )
    }

    // Parallax effect on scroll
    gsap.to(decorativeCircleRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#e8ecf4] flex items-center"
    >
      {/* ── Animated Background Elements ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-20 left-10 w-72 h-72 bg-[#C57A00]/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFAA00]/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#C57A00]/20 to-[#FFAA00]/20 rounded-full blur-3xl" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative circle */}
        <div 
          ref={decorativeCircleRef}
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#C57A00]/40 rounded-full"
        >
          <div className="absolute inset-4 border border-[#C57A00]/30 rounded-full" />
          <div className="absolute inset-8 border border-[#C57A00]/20 rounded-full" />
        </div>
      </div>

      {/* ── Floating Decorative Elements ── */}
      {[
        { icon: "●", color: "text-[#C57A00]/60", size: "text-2xl", position: "top-32 left-[15%]" },
        { icon: "◆", color: "text-[#FFAA00]/40", size: "text-xl", position: "top-48 right-[20%]" },
        { icon: "▲", color: "text-orange-400/50", size: "text-lg", position: "bottom-32 left-[25%]" },
        { icon: "■", color: "text-[#C57A00]/30", size: "text-3xl", position: "bottom-48 right-[15%]" },
        { icon: "✦", color: "text-[#5B3700]/50", size: "text-xl", position: "top-[60%] right-[30%]" },
      ].map((item, index) => (
        <div
          key={index}
          ref={el => floatingElementsRef.current[index] = el}
          className={`absolute ${item.position} ${item.color} ${item.size} opacity-0`}
        >
          {item.icon}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
        

          {/* ── Main Heading ── */}
          <h1 
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-[1.15] mb-6 sm:mb-8 opacity-0 text-gray-900"
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
          >
            <span>We're Not Your </span>
            <br className="sm:hidden" />
            <span>Typical Marketing  </span>
            
            <span className="bg-gradient-to-r from-[#5B3700] via-[#C57A00] to-[#FFAA00] bg-clip-text text-transparent">
           Agency
            </span>
          </h1>

          {/* ── Subtitle ── */}
          <p 
            ref={subtextRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed opacity-0 px-4 sm:px-0"
          >
          At Digital Stag, we believe great marketing is more than running ads-it's about building sustainable business growth. By combining strategy, creativity, technology, and data, we help brands attract the right audience, strengthen their online presence, and achieve measurable results.
Whether you're a startup building your first digital footprint or an established business looking to scale, we're here to help you grow with confidence.

          </p>

          {/* ── CTA Buttons ── */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20 opacity-0 w-full sm:w-auto px-4 sm:px-0">
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-full text-sm sm:text-base transition-all duration-300 hover:shadow-[0_8px_30px_rgba(91,55,0,0.35)] hover:scale-105 active:scale-95 w-full sm:w-auto">
              <span className="relative z-10 flex items-center gap-2">
                Discover Our Work
                <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#C57A00] text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
            <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-white hover:border-[#C57A00] hover:shadow-lg hover:scale-105 active:scale-95 w-full sm:w-auto">
              Meet the Team
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* ── Stats Grid ── */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0"
          >
            {STATS.map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:bg-white hover:border-[#C57A00] hover:shadow-lg hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8EAD5]/60 to-[#FFE19A]/50 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5B3700] mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Core Values ── */}
          <div 
            ref={valuesRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-4 sm:px-0"
          >
            {VALUES.map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:bg-white hover:border-[#C57A00] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-[#5B3700] group-hover:scale-110 transition-transform duration-300 inline-block">
                  {value.icon}
                </div>
                <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#e8ecf4] to-transparent pointer-events-none" />

      {/* ── Custom Animations ── */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default S1