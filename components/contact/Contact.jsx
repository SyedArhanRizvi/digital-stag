"use client"

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// --- Icon Components ---
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
)

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
)

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
)

function Contact() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)
  const headingRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.6"
    )
    .fromTo(
      infoRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      "-=0.3"
    )
    .fromTo(
      formRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
      "-=0.2"
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/save-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      label: "Call Us",
      value: "+91 9354683813",
      href: "tel:9354683813",
      sub: "Mon-Sat 10am-7pm",
      color: "bg-violet-50 text-violet-600 border-violet-200",
      iconBg: "bg-violet-100"
    },
    {
      icon: <MailIcon />,
      label: "Email Us",
      value: "Info@digitalstag.in",
      href: "mailto:Info@digitalstag.in",
      sub: "We reply within 24hrs",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      iconBg: "bg-blue-100"
    },
    {
      icon: <MapPinIcon />,
      label: "Visit Us",
      value: "1st Floor, A-64, Sector 04, Noida",
      href: "https://maps.google.com/?q=1st+Floor+A-64+Sector+04+Noida",
      sub: "Uttar Pradesh, India",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      iconBg: "bg-emerald-100"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#fafafa] py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236d28d9' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}>
            Let's work{" "}
            <span className="relative">
              <span className="relative z-10">together</span>
              <span className="absolute bottom-0.5 left-0 w-full h-2 bg-violet-200/60 -z-0" />
            </span>
          </h2>
        </div>

        <div 
          ref={cardRef}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_2px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left - Contact Info */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50 p-8 sm:p-10 lg:p-12">
              <div ref={infoRef} className="space-y-5">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <span className={item.color.split(' ')[1]}>{item.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-violet-600 transition-colors truncate">
                        {item.value}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                    </div>
                  </a>
                ))}

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919354683813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm hover:bg-green-100 transition-all duration-300 hover:shadow-md group"
                >
                  <WhatsAppIcon />
                  <span>Chat on WhatsApp</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>

                {/* Business Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <DocumentIcon />
                    <span className="font-mono text-xs tracking-wider">GSTIN: 09GIAPK3307J1Z9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="John Doe"
                      required
                      className={`w-full px-4 py-3 rounded-xl border bg-white transition-all duration-300 text-sm placeholder:text-gray-300 outline-none
                        ${focused === 'name' 
                          ? 'border-violet-400 ring-2 ring-violet-50' 
                          : formData.name 
                            ? 'border-gray-300' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused('')}
                      placeholder="+91 00000 00000"
                      required
                      className={`w-full px-4 py-3 rounded-xl border bg-white transition-all duration-300 text-sm placeholder:text-gray-300 outline-none
                        ${focused === 'phone' 
                          ? 'border-violet-400 ring-2 ring-violet-50' 
                          : formData.phone 
                            ? 'border-gray-300' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="john@example.com"
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-white transition-all duration-300 text-sm placeholder:text-gray-300 outline-none
                      ${focused === 'email' 
                        ? 'border-violet-400 ring-2 ring-violet-50' 
                        : formData.email 
                          ? 'border-gray-300' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Service Required <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocused('service')}
                      onBlur={() => setFocused('')}
                      required
                      className={`w-full px-4 py-3 rounded-xl border bg-white transition-all duration-300 text-sm outline-none appearance-none cursor-pointer
                        ${focused === 'service' 
                          ? 'border-violet-400 ring-2 ring-violet-50' 
                          : formData.service 
                            ? 'border-gray-300 text-gray-900' 
                            : 'border-gray-200 text-gray-400 hover:border-gray-300'
                        }`}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="app-development">App Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="seo">SEO Optimization</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows="4"
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-white transition-all duration-300 text-sm placeholder:text-gray-300 outline-none resize-none
                      ${focused === 'message' 
                        ? 'border-violet-400 ring-2 ring-violet-50' 
                        : formData.message 
                          ? 'border-gray-300' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide
                    ${submitted 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-900 text-white hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-200'
                    }
                    ${isSubmitting ? 'opacity-70 cursor-wait' : 'active:scale-[0.98]'}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Message Sent Successfully
                    </>
                  ) : (
                    <>
                      Send Message
                      <SendIcon />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Subtle pattern texture */
        .bg-pattern {
          background-color: #fafafa;
          background-image: radial-gradient(#6d28d9 0.5px, transparent 0.5px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  )
}

export default Contact