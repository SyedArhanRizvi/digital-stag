"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram,
  FaAward,
  FaUsers,
  FaRocket,
  FaQuoteLeft,
  FaStar,
  FaArrowRight
} from 'react-icons/fa'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Founder Data (Replace with actual data) ──────────────────────────
const FOUNDER_DATA = {
  name: "Anshu Singh",
  role: "Founder & CEO",
  image: "/founder/founder.jpeg", // Replace with actual founder image
  tagline: "Building Digital Excellence Since 2020",
  bio: "A visionary entrepreneur with over 5+ years of experience in digital marketing, web development, and brand strategy. Passionate about transforming businesses through innovative digital solutions.",
  fullStory: [
    "Started Digital Stag in 2020 with a vision to help businesses establish a powerful online presence. What began as a one-person operation has grown into a full-service digital agency serving clients worldwide.",
    "With expertise spanning SEO, web development, digital marketing, and brand strategy, Arhan has helped over 160+ businesses achieve their digital goals. His leadership philosophy centers on innovation, integrity, and delivering measurable results.",
    "When not strategizing for clients, Arhan is an avid tech enthusiast, speaker at industry conferences, and mentor to aspiring digital marketers. He believes in continuous learning and staying ahead of digital trends."
  ],
  expertise: [
    "Digital Strategy",
    "SEO & Analytics",
    "Brand Development",
    "Team Leadership",
    "Web Technologies",
    "Growth Marketing"
  ],
  achievements: [
    { value: "160+", label: "Projects Delivered" },
    { value: "5+", label: "Years Experience" },
    { value: "5L+", label: "Leads Generated" },
    { value: "98%", label: "Client Satisfaction" }
  ],
  socialLinks: {
    linkedin: "https://www.facebook.com/share/1ELYGuVP5v/",
    twitter: "https://www.facebook.com/share/1ELYGuVP5v/",
    instagram: "https://www.instagram.com/digitalstagofficial?igsh=YTVuNjE1NnYyMHcw"
  },
  quote: "Success isn't just about what you accomplish, it's about what you inspire others to do."
}

function Founder() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const imageContainerRef = useRef(null)
  const contentRef = useRef(null)
  const storyRef = useRef(null)
  const expertiseRef = useRef(null)
  const achievementsRef = useRef(null)
  const quoteRef = useRef(null)
  const ctaRef = useRef(null)
  const decorativeRef = useRef([])

  useEffect(() => {
    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    })

    // Animate decorative elements
    decorativeRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0, rotation: index * 45 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            delay: 0.3 + index * 0.15,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        )

        // Continuous floating animation
        gsap.to(el, {
          y: -15 + index * 5,
          duration: 3 + index * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
      }
    })

    // Heading animation
    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    // Image container animation
    tl.fromTo(
      imageContainerRef.current,
      { x: -100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    )

    // Content animation
    tl.fromTo(
      contentRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    )

    // Story paragraphs stagger
    if (storyRef.current) {
      gsap.fromTo(
        storyRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
          }
        }
      )
    }

    // Expertise tags stagger
    if (expertiseRef.current) {
      gsap.fromTo(
        expertiseRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: "top 85%",
          }
        }
      )
    }

    // Achievements counter animation
    if (achievementsRef.current) {
      gsap.fromTo(
        achievementsRef.current.children,
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 85%",
          }
        }
      )
    }

    // Quote animation
    gsap.fromTo(
      quoteRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 90%",
        }
      }
    )

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 95%",
        }
      }
    )

    // Parallax effect on image
    gsap.to(imageContainerRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#fafafa] pt-16 sm:pt-20 lg:pt-24 overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236d28d9' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    >
      {/* ── Floating Decorative Elements ── */}
      {[
        { icon: <FaStar />, position: "top-20 left-[8%]", size: "text-xl", color: "text-[#C57A00]/40" },
        { icon: <FaRocket />, position: "top-32 right-[12%]", size: "text-2xl", color: "text-[#FFAA00]/30" },
        { icon: <FaAward />, position: "bottom-40 left-[10%]", size: "text-2xl", color: "text-[#C57A00]/40" },
        { icon: <FaUsers />, position: "bottom-32 right-[8%]", size: "text-xl", color: "text-[#FFAA00]/30" },
        { icon: <FaStar />, position: "top-1/2 left-[5%]", size: "text-lg", color: "text-[#C57A00]/50" },
        { icon: <FaRocket />, position: "top-[60%] right-[15%]", size: "text-xl", color: "text-[#FFAA00]/40" },
      ].map((item, index) => (
        <div
          key={index}
          ref={el => decorativeRef.current[index] = el}
          className={`absolute ${item.position} ${item.size} ${item.color} hidden sm:block pointer-events-none`}
        >
          {item.icon}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-14 sm:mb-18 lg:mb-22">
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-3">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
            Meet The{" "}
            <span className="relative">
              <span className="relative z-10">Founder</span>
              <span className="absolute bottom-0.5 left-0 w-full h-2 sm:h-3 bg-[#C57A00]/50 -z-0" />
            </span>
          </h2>
        </div>

        {/* ── Main Founder Card ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_2px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-16 sm:mb-20">
          
          {/* Top Section - Image & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left - Image */}
            <div 
              ref={imageContainerRef}
              className="relative bg-gradient-to-br from-[#F8EAD5] to-[#FFE19A]/70 p-8 sm:p-10 lg:p-12 flex items-center justify-center min-h-[400px] sm:min-h-[500px]"
            >
              {/* Decorative circles behind image */}
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#C57A00]/50 rounded-full" />
              <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-[#FFAA00]/50 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C57A00]/30 rounded-full blur-xl" />
              
              {/* Image Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-[#C57A00]/50">
                <img 
                  src={FOUNDER_DATA.image} 
                  alt={FOUNDER_DATA.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#5B3700]/10 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-gray-700">Available for Projects</span>
              </div>
            </div>

            {/* Right - Info */}
            <div 
              ref={contentRef}
              className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center"
            >
              {/* Name & Role */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
                  {FOUNDER_DATA.name}
                </h3>
                <p className="text-[#5B3700] font-semibold text-sm sm:text-base">
                  {FOUNDER_DATA.role}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {FOUNDER_DATA.tagline}
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {FOUNDER_DATA.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                <a 
                  href={FOUNDER_DATA.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <FaLinkedinIn />
                </a>
                <a 
                  href={FOUNDER_DATA.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <FaTwitter />
                </a>
                <a 
                  href={FOUNDER_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <FaInstagram />
                </a>
              </div>

              {/* Expertise Tags */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Expertise</p>
                <div ref={expertiseRef} className="flex flex-wrap gap-2">
                  {FOUNDER_DATA.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-[#F8EAD5] hover:border-[#C57A00]/40 hover:text-[#5B3700] transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Bottom Section - Achievements */}
          <div ref={achievementsRef} className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {FOUNDER_DATA.achievements.map((achievement, index) => (
              <div 
                key={index}
                className="p-6 sm:p-8 text-center hover:bg-gray-50/50 transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#5B3700] mb-1 group-hover:scale-110 transition-transform duration-300">
                  {achievement.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Story & Quote Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          
          {/* Story */}
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 shadow-[0_2px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FaRocket className="text-[#5B3700] text-xl" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
                The Journey
              </h3>
            </div>
            
            <div ref={storyRef} className="space-y-4">
              {FOUNDER_DATA.fullStory.map((paragraph, index) => (
                <p key={index} className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div 
            ref={quoteRef}
            className="bg-gradient-to-br from-[#5B3700] via-[#C57A00] to-[#FFAA00] rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-center relative overflow-hidden"
          >
            {/* Decorative quote marks */}
            <FaQuoteLeft className="text-white/10 text-6xl absolute top-4 left-4" />
            
            <div className="relative z-10">
              <p className="text-lg sm:text-xl font-medium leading-relaxed italic mb-6">
                "{FOUNDER_DATA.quote}"
              </p>
              <p className="text-[#FFE19A] font-semibold">
                — {FOUNDER_DATA.name}
              </p>
            </div>

            {/* Decorative dots */}
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              <span className="w-2 h-2 bg-white/30 rounded-full" />
              <span className="w-2 h-2 bg-white/50 rounded-full" />
              <span className="w-2 h-2 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef} className="text-center">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-[#5B3700] transition-all duration-300 hover:shadow-xl hover:shadow-[#C57A00]/30 active:scale-[0.98]">
            <span>Work With {FOUNDER_DATA.name.split(' ')[0]}</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Founder