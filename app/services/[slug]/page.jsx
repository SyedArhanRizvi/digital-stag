"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaSearch, 
  FaChartBar, 
  FaCog, 
  FaGlobe,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaStar
} from 'react-icons/fa'
import data from "@/data.json"
import Link from 'next/link'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Icon mapping for different service types
const getServiceIcon = (slug) => {
  const icons = {
    '/technical-seo': <FaCog />,
    '/keyword-research': <FaSearch />,
    '/on-page-seo': <FaChartBar />,
    '/off-page-seo': <FaGlobe />,
    '/local-seo': <FaRocket />,
  }
  return icons[slug] || <FaStar />
}

// Color schemes for different services
const getServiceColorScheme = (slug) => {
  const schemes = {
    '/technical-seo': {
      primary: 'from-violet-600 to-purple-600',
      accent: 'violet',
      bg: 'from-violet-50 to-purple-50',
      text: 'text-violet-600',
      border: 'border-violet-200',
      badge: 'bg-violet-100 text-violet-700 border-violet-200',
      glow: 'rgba(124, 58, 237, 0.15)',
    },
    '/keyword-research': {
      primary: 'from-blue-600 to-cyan-600',
      accent: 'blue',
      bg: 'from-blue-50 to-cyan-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      glow: 'rgba(37, 99, 235, 0.15)',
    },
    '/on-page-seo': {
      primary: 'from-emerald-600 to-teal-600',
      accent: 'emerald',
      bg: 'from-emerald-50 to-teal-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      glow: 'rgba(5, 150, 105, 0.15)',
    },
    '/off-page-seo': {
      primary: 'from-orange-600 to-red-600',
      accent: 'orange',
      bg: 'from-orange-50 to-red-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      badge: 'bg-orange-100 text-orange-700 border-orange-200',
      glow: 'rgba(234, 88, 12, 0.15)',
    },
    '/local-seo': {
      primary: 'from-rose-600 to-pink-600',
      accent: 'rose',
      bg: 'from-rose-50 to-pink-50',
      text: 'text-rose-600',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-700 border-rose-200',
      glow: 'rgba(225, 29, 72, 0.15)',
    },
  }
  return schemes[slug] || schemes['/technical-seo']
}

// Benefits data (can be customized per service)
const getBenefits = (slug) => {
  const benefits = {
    '/technical-seo': [
      'Faster website loading speeds',
      'Better crawlability and indexing',
      'Improved Core Web Vitals scores',
      'Enhanced mobile responsiveness',
      'Structured data implementation'
    ],
    '/keyword-research': [
      'Targeted traffic generation',
      'Competitive advantage insights',
      'Content strategy alignment',
      'Higher conversion potential',
      'Market trend identification'
    ],
    '/on-page-seo': [
      'Higher search rankings',
      'Improved user engagement',
      'Better content relevance',
      'Enhanced CTR from SERPs',
      'Optimized internal linking'
    ],
    '/off-page-seo': [
      'Increased domain authority',
      'Quality backlink profile',
      'Brand credibility boost',
      'Referral traffic growth',
      'Long-term ranking stability'
    ],
    '/local-seo': [
      'Local pack visibility',
      'Google Maps optimization',
      'Customer review management',
      'Local citation building',
      'Geo-targeted traffic'
    ],
  }
  return benefits[slug] || benefits['/technical-seo']
}

function ServicePage() {
  const params = useParams()
  const slug = `/${params.slug}`
  const serviceData = data.find(item => item.slug === slug)

  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef([])
  const benefitsRef = useRef(null)
  const ctaRef = useRef(null)
  
  const colorScheme = getServiceColorScheme(slug)
  const serviceIcon = getServiceIcon(slug)
  const benefits = getBenefits(slug)

  useEffect(() => {
    if (!serviceData) return

    // Master timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    })

    // Hero animations
    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )

    // Animate cards with stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95,
            rotation: index % 2 === 0 ? -2 : 2
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        )

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      }
    })

    // Animate benefits
    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.children,
        { 
          opacity: 0, 
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
          }
        }
      )
    }

    // Animate CTA
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [serviceData])

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-[#e8ecf4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600">The service you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#e8ecf4]">
      {/* ── Hero Section ── */}
      <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 right-0 w-96 h-96 bg-${colorScheme.accent}-300/20 rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 left-0 w-96 h-96 bg-${colorScheme.accent}-200/20 rounded-full blur-3xl`} />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            {/* Service Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${colorScheme.primary} text-white text-2xl sm:text-3xl mb-6 sm:mb-8 shadow-lg`}>
              {serviceIcon}
            </div>

            {/* Badge */}
            <span className={`inline-block px-4 py-1.5 ${colorScheme.badge} rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6`}>
              Our Services
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.1]" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
              {serviceData.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {serviceData.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Service Cards Grid ── */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {serviceData.cards.map((card, index) => (
              <div
                key={card.id}
                ref={el => cardsRef.current[index] = el}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Section ── */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        {/* Background accent */}
        <div className="absolute inset-0 bg-white/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left - Benefits List */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
                Why Choose Our{" "}
                <span className={`bg-gradient-to-r ${colorScheme.primary} bg-clip-text text-transparent`}>
                  {serviceData.title.replace(' Services', '')}
                </span>
              </h2>
              
              <div ref={benefitsRef} className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br ${colorScheme.primary} flex items-center justify-center`}>
                      <FaCheckCircle className="text-white text-xs" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats/Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '250+', label: 'Projects Delivered' },
                  { value: '98%', label: 'Client Satisfaction' },
                  { value: '15+', label: 'Years Experience' },
                  { value: '50+', label: 'Team Experts' },
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${colorScheme.primary} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={ctaRef}
            className="relative bg-gray-900 rounded-3xl sm:rounded-4xl p-8 sm:p-10 lg:p-12 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.primary} opacity-10`} />
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
                Ready to Get Started?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                Let's discuss how our {serviceData.title.toLowerCase()} can help your business grow and achieve better results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className={`group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${colorScheme.primary} text-white font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95`}>
                 <Link href={"/contact"} alt="Contact us"> Get Free Consultation</Link>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
              <Link href={"/contact"} alt="Contact us">View Pricing Plans</Link>     
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage