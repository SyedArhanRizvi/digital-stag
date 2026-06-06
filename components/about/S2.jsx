"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Contact Information ──────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email Address",
    value: "Info@digitalstag.in",
    href: "mailto:Info@digitalstag.in",
    color: "from-violet-500 to-purple-500",
    bgGlow: "rgba(109, 40, 217, 0.15)",
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Phone Number",
    value: "+91 9354683813",
    href: "tel:+919354683813",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Office Address",
    value: "1st Floor, A-64, Sector 04, Noida",
    href: "https://maps.google.com/?q=1st+Floor+A-64+Sector+04+Noida",
    color: "from-emerald-500 to-teal-500",
    bgGlow: "rgba(16, 185, 129, 0.15)",
  },
]

const BUSINESS_INFO = [
  {
    label: "GSTIN",
    value: "09GIAPK3307J1Z9",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Working Hours",
    value: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

function S2() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])
  const businessInfoRef = useRef(null)
  const mapPlaceholderRef = useRef(null)
  const decorativeElementsRef = useRef([])

  useEffect(() => {
    // Master entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    })

    // Animate heading
    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    // Animate contact cards with stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        tl.fromTo(
          card,
          { 
            y: 80, 
            opacity: 0,
            scale: 0.9,
            rotation: index % 2 === 0 ? -2 : 2
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 0.8, 
            ease: "back.out(1.2)",
          },
          "-=0.6"
        )

        // Hover animation setup
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      }
    })

    // Animate business info section
    tl.fromTo(
      businessInfoRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Animate map placeholder
    tl.fromTo(
      mapPlaceholderRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    )

    // Animate decorative elements
    decorativeElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { 
            scale: 0, 
            opacity: 0,
            rotation: index * 90
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            delay: 0.5 + index * 0.2,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        )

        // Continuous subtle animation
        gsap.to(el, {
          y: -10,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied:', text)
    })
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#e8ecf4] py-16 sm:py-20 lg:py-24"
    >
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-300/20 to-orange-200/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Floating Decorative Elements ── */}
      {['◆', '●', '▲', '■', '✦'].map((shape, index) => (
        <div
          key={index}
          ref={el => decorativeElementsRef.current[index] = el}
          className={`absolute text-violet-400/30 text-2xl sm:text-3xl lg:text-4xl hidden sm:block ${
            index === 0 ? 'top-20 left-[10%]' :
            index === 1 ? 'top-40 right-[15%]' :
            index === 2 ? 'bottom-32 left-[20%]' :
            index === 3 ? 'bottom-20 right-[10%]' :
            'top-1/2 left-[5%]'
          }`}
        >
          {shape}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div ref={headingRef} className="opacity-0">
            <span className="inline-block px-4 py-1.5 bg-white/70 backdrop-blur-sm border border-violet-200 rounded-full text-violet-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        {/* ── Contact Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {CONTACT_INFO.map((info, index) => {
            const isExternalLink = info.href && !info.href.startsWith('mailto') && !info.href.startsWith('tel')
            
            return (
              <a
                key={index}
                href={info.href || '#'}
                ref={el => cardsRef.current[index] = el}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 cursor-pointer transition-all duration-300 hover:bg-white hover:border-violet-300 hover:shadow-xl opacity-0"
                target={isExternalLink ? '_blank' : '_self'}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: info.bgGlow }}
                />
                
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${info.color} p-[1px] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center text-violet-600 group-hover:text-violet-700 transition-colors duration-300">
                      {info.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">{info.label}</p>
                  
                  {/* Value */}
                  <p className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg group-hover:text-violet-600 transition-all duration-300 break-all">
                    {info.value}
                  </p>

                  {/* Copy button (for email and phone) */}
                  {info.href && (info.href.startsWith('mailto') || info.href.startsWith('tel')) && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        copyToClipboard(info.value)
                      }}
                      className="mt-4 sm:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-violet-50 border border-violet-200 rounded-full text-xs text-violet-600 hover:text-violet-700 hover:bg-violet-100 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      Click to copy
                    </button>
                  )}
                </div>
              </a>
            )
          })}
        </div>

        {/* ── Additional Business Info ── */}
        <div 
          ref={businessInfoRef}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 lg:mb-20 opacity-0 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {BUSINESS_INFO.map((info, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">{info.label}</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Map Placeholder ── */}
        <div 
          ref={mapPlaceholderRef}
          className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden opacity-0 shadow-sm h-[300px] sm:h-[400px] lg:h-[500px]"
        >
          <div className="w-full h-full bg-gradient-to-br from-violet-100 to-indigo-50 flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">📍</div>
            <p className="text-gray-900 font-semibold text-base sm:text-lg lg:text-xl mb-2">
              Digital Stag Studio
            </p>
            <p className="text-gray-600 text-sm sm:text-base text-center px-4">
              1st Floor, A-64, Sector 04, Noida, Uttar Pradesh
            </p>
            <a
              href="https://maps.google.com/?q=1st+Floor+A-64+Sector+04+Noida"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#e8ecf4] to-transparent pointer-events-none" />

      {/* ── Custom Animations ── */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
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

export default S2