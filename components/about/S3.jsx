"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FaRocket, 
  FaChartLine, 
  FaSyncAlt, 
  FaTrophy, 
  FaLightbulb, 
  FaStar,
  FaBuilding,
  FaUsers,
  FaGlobe,
  FaAward,
  FaLaptopCode,
  FaHandshake,
  FaProjectDiagram,
  FaIndustry,
  FaMedal,
  FaChartBar,
  FaArrowRight,
} from 'react-icons/fa'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Timeline Data ──────────────────────────────────────────────────────
const TIMELINE_DATA = [
  {
    year: "2020",
    title: "The Beginning",
    subtitle: "Foundation of Digital Stag",
    description: "Started as a small team of 3 passionate designers with a vision to transform digital experiences. Our journey began in a modest co-working space with big dreams.",
    achievements: [
      { text: "First client onboarded", icon: <FaHandshake /> },
      { text: "Team of 3 members", icon: <FaUsers /> },
      { text: "Co-working space setup", icon: <FaBuilding /> }
    ],
    icon: <FaRocket />,
    color: "from-[#5B3700] via-[#C57A00] to-[#FFAA00]",
    bgColor: "rgba(91, 55, 0, 0.08)",
    borderColor: "border-[#C57A00]/50",
    dotColor: "bg-[#C57A00]",
    glowColor: "rgba(197, 122, 0, 0.3)",
    side: "left",
  },
  {
    year: "2022",
    title: "Growth Phase",
    subtitle: "Expanding Our Horizons",
    description: "Expanded to 10+ team members and moved to our own office space. Launched our first international client project and established key partnerships.",
    achievements: [
      { text: "10+ team members", icon: <FaUsers /> },
      { text: "First international client", icon: <FaGlobe /> },
      { text: "50+ projects delivered", icon: <FaProjectDiagram /> }
    ],
    icon: <FaChartLine />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "rgba(59, 130, 246, 0.08)",
    borderColor: "border-blue-200",
    dotColor: "bg-blue-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
    side: "right",
  },
  {
    year: "2023",
    title: "Digital Transformation",
    subtitle: "Adapting to New Challenges",
    description: "Pivoted to remote-first culture during global changes. Launched innovative digital solutions helping businesses adapt and thrive in the new normal.",
    achievements: [
      { text: "Remote team expansion", icon: <FaLaptopCode /> },
      { text: "160+ projects completed", icon: <FaChartBar /> },
      { text: "New service verticals", icon: <FaIndustry /> }
    ],
    icon: <FaSyncAlt />,
    color: "from-emerald-500 to-teal-500",
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "border-emerald-200",
    dotColor: "bg-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    side: "left",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    subtitle: "Award-Winning Agency",
    description: "Received multiple industry awards for design excellence. Partnered with leading brands across sectors and established ourselves as industry leaders.",
    achievements: [
      { text: "3 industry awards", icon: <FaAward /> },
      { text: "50+ enterprise clients", icon: <FaBuilding /> },
      { text: "Team of 25+ experts", icon: <FaUsers /> }
    ],
    icon: <FaTrophy />,
    color: "from-orange-500 to-red-500",
    bgColor: "rgba(249, 115, 22, 0.08)",
    borderColor: "border-orange-200",
    dotColor: "bg-orange-500",
    glowColor: "rgba(249, 115, 22, 0.3)",
    side: "right",
  },
  {
    year: "2025",
    title: "Innovation Hub",
    subtitle: "Pushing Creative Boundaries",
    description: "Built a performance-driven marketing engine focused on data, experimentation, and scalable growth. Delivered high-impact campaigns that turn audiences into measurable business results.",
    achievements: [
      { text: "Innovation lab launched", icon: <FaLightbulb /> },
      { text: "100+ total projects", icon: <FaProjectDiagram /> },
      { text: "Million+ end users", icon: <FaGlobe /> }
    ],
    icon: <FaLightbulb />,
    color: "from-[#5B3700] via-[#C57A00] to-[#FFAA00]",
    bgColor: "rgba(91, 55, 0, 0.08)",
    borderColor: "border-[#C57A00]/50",
    dotColor: "bg-[#C57A00]",
    glowColor: "rgba(197, 122, 0, 0.3)",
    side: "left",
  },
  {
    year: "2025",
    title: "Global Excellence",
    subtitle: "Setting Industry Standards",
    description: "Expanded our performance marketing capabilities across international markets, helping brands scale with data-led campaigns, conversion-focused strategies, and measurable ROI.",
    achievements: [
      { text: "Global presence", icon: <FaGlobe /> },
      { text: "Premium client portfolio", icon: <FaMedal /> },
      { text: "Industry benchmarks set", icon: <FaStar /> }
    ],
    icon: <FaStar />,
    color: "from-rose-500 to-pink-500",
    bgColor: "rgba(244, 63, 94, 0.08)",
    borderColor: "border-rose-200",
    dotColor: "bg-rose-500",
    glowColor: "rgba(244, 63, 94, 0.3)",
    side: "right",
  },
]

function S3() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const timelineItemsRef = useRef([])
  const timelineLineRef = useRef(null)
  const decorativeElementsRef = useRef([])

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      // Reset states
      timelineItemsRef.current.forEach(item => {
        if (item) gsap.set(item, { opacity: 0, x: 0, y: 60 })
      })

      // Responsive GSAP animations
      mm.add({
        isMobile: "(max-width: 639px)",
        isDesktop: "(min-width: 640px)"
      }, (context) => {
        let { isMobile, isDesktop } = context.conditions

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

        // Animate timeline line
        tl.fromTo(
          timelineLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { 
            scaleY: 1, 
            duration: 1.5, 
            ease: "power3.inOut",
          },
          "-=0.5"
        )

        // Animate each timeline item
        timelineItemsRef.current.forEach((item, index) => {
          if (item) {
            const isLeft = TIMELINE_DATA[index].side === "left"
            
            // Fix: Slide from side on desktop, just fade up on mobile
            const startX = isDesktop ? (isLeft ? -80 : 80) : 0
            
            tl.fromTo(
              item,
              { 
                opacity: 0,
                x: startX,
                y: 40,
                scale: 0.95
              },
              { 
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.8, 
                ease: "back.out(1.2)",
              },
              `-=${index === 0 ? 0.3 : 0.6}`
            )

            // Create scroll trigger for parallax effect
            ScrollTrigger.create({
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                // Parallax is less aggressive on mobile
                const maxParallax = isMobile ? 10 : 20
                const speed = index % 2 === 0 ? maxParallax : -maxParallax
                gsap.to(item, {
                  y: speed * self.progress,
                  duration: 0,
                  ease: "none",
                })
              }
            })
          }
        })
      }) // End matchMedia

      // Animate decorative elements (Keep as is, they are hidden on mobile anyway)
      decorativeElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.4,
              duration: 1.5,
              delay: 0.5 + index * 0.3,
              ease: "elastic.out(1, 0.6)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              }
            }
          )

          gsap.to(el, {
            y: -15,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          })
        }
      })

    }, sectionRef)

    return () => ctx.revert() // Cleanup GSAP perfectly
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#e8ecf4] py-16 sm:py-20 lg:py-24"
    >
      {/* ── Animated Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C57A00]/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFAA00]/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#C57A00]/20 via-[#FFAA00]/20 to-[#5B3700]/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Floating Decorative Icons ── */}
      {[
        { icon: <FaStar />, position: "top-20 left-[10%]", size: "text-2xl" },
        { icon: <FaRocket />, position: "top-40 right-[15%]", size: "text-xl" },
        { icon: <FaTrophy />, position: "bottom-32 left-[15%]", size: "text-3xl" },
        { icon: <FaLightbulb />, position: "bottom-20 right-[10%]", size: "text-2xl" },
        { icon: <FaChartLine />, position: "top-1/3 right-[5%]", size: "text-xl" },
      ].map((item, index) => (
        <div
          key={index}
          ref={el => decorativeElementsRef.current[index] = el}
          className={`absolute ${item.position} ${item.size} text-[#C57A00]/50 hidden sm:block`}
        >
          {item.icon}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div ref={headingRef}>
            <span className="inline-block px-4 py-1.5 bg-white/70 backdrop-blur-sm border border-[#C57A00]/40 rounded-full text-[#5B3700] text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
              The Story of{" "}
              <span className="bg-gradient-to-r from-[#5B3700] via-[#C57A00] to-[#FFAA00] bg-clip-text text-transparent animate-gradient">
                Digital Stag
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              From a small team with big dreams to an award-winning agency. 
              Every milestone tells a story of passion, innovation, and dedication.
            </p>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Center Line: Positioned left-6 on mobile, centered on desktop */}
          <div 
            ref={timelineLineRef}
            className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5B3700] via-[#C57A00] to-[#FFAA00] opacity-40"
            style={{ transformOrigin: "top center" }}
          />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {TIMELINE_DATA.map((item, index) => (
              <div
                key={index}
                ref={el => timelineItemsRef.current[index] = el}
                className={`relative flex flex-col sm:flex-row items-start ${
                  item.side === 'right' ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card: Padded cleanly on mobile so it doesn't overlap line */}
                <div className={`w-full sm:w-[calc(50%-30px)] pl-14 sm:pl-0 sm:ml-0 ${
                  item.side === 'left' ? 'sm:pr-8 lg:pr-12' : 'sm:pl-8 lg:pl-12'
                }`}>
                  <div 
                    className={`group relative bg-white/80 backdrop-blur-sm border ${item.borderColor} rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1`}
                  >
                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: item.glowColor }}
                    />

                    {/* Year Badge (Mobile) */}
                    <div className="sm:hidden inline-flex items-center gap-2 px-3 py-1 bg-[#F8EAD5] border border-[#C57A00]/40 rounded-full mb-4">
                      <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                      <span className="text-[#5B3700] font-bold text-sm">{item.year}</span>
                    </div>
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.color} p-[1px] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center text-[#5B3700] text-xl sm:text-2xl lg:text-3xl group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#5B3700] group-hover:via-[#C57A00] group-hover:to-[#FFAA00] transition-all duration-300">
                          {item.icon}
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-gray-900 font-bold text-lg sm:text-xl lg:text-2xl mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">
                        {item.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                        {item.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 sm:space-y-3">
                        {item.achievements.map((achievement, achIndex) => (
                          <div 
                            key={achIndex}
                            className="flex items-center gap-2 sm:gap-3 group/ach"
                          >
                            <span className="text-[#C57A00] text-sm sm:text-base group-hover/ach:scale-110 transition-transform duration-300">
                              {achievement.icon}
                            </span>
                            <span className="text-gray-500 text-xs sm:text-sm group-hover/ach:text-gray-700 transition-colors duration-300">
                              {achievement.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot: Positioned cleanly down the line */}
                <div className={`absolute left-6 sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center top-6 sm:top-1/2 sm:-translate-y-1/2`}>
                  {/* Dot */}
                  <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.dotColor} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${item.glowColor}` }}
                  >
                    {/* Inner dot */}
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                    
                    {/* Pulse ring */}
                    <div className={`absolute inset-0 rounded-full ${item.dotColor} animate-ping opacity-30`} />
                  </div>

                  {/* Year Badge (Desktop) */}
                  <div className="hidden sm:flex absolute top-0 -translate-y-full items-center gap-2 px-2 py-1">
                    <span className="text-gray-900 font-bold text-xs lg:text-sm bg-white/90 backdrop-blur-sm border border-gray-200 px-2 py-0.5 rounded-full shadow-sm">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Position Indicator */}
          <div className="flex justify-center mt-16 sm:mt-20 lg:mt-24">
            <div className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(91,55,0,0.35)] hover:scale-105 active:scale-95">
              <span className="text-white font-semibold text-sm sm:text-base">
                We're Just Getting Started
              </span>
              <FaArrowRight className="text-white text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300" />
            </div>
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
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
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
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  )
}

export default S3