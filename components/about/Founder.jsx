"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaAward,
  FaUsers,
  FaRocket,
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaCompass,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Co-Founders Data ─────────────────────────────────────────────────────
const FOUNDERS_DATA = [
  {
    id: "anshu-singh",
    name: "Anshu Singh",
    role: "Co-Founder & Operations Strategist",
    image: "/founder/founder.jpeg",
    tagline: "Building Digital Excellence Since 2018",
    bio: "Focused on business growth, client acquisition, and digital strategy, Anshu combines years of entrepreneurial experience with performance marketing expertise to help businesses scale through innovative digital solutions.",
    story: [
      "Started Digital Stag in 2018 with a vision to help businesses establish a powerful online presence. What began as a focused initiative has grown into a full-service agency serving clients worldwide.",
      "With expertise spanning SEO, web development, digital marketing, and brand strategy, Anshu has helped over 160+ businesses achieve their digital goals.",
    ],
    expertise: [
      "Digital Strategy",
      "Operations & Growth",
      "Client Acquisition",
      "Web Technologies",
      "Performance Marketing",
    ],
    achievements: [
      { value: "160+", label: "Projects Delivered" },
      { value: "8+", label: "Years Experience" },
      { value: "5L+", label: "Leads Generated" },
      { value: "90%", label: "Client Satisfaction" },
    ],
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/anshu-singh-18056622b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      facebook: "https://www.facebook.com/share/1Bdp9gRknK/",
      instagram:
        "https://www.instagram.com/diamond_akki?igsi=MTN3dHRtZm81NTY3cQ==",
    },
    quote:
      "Success isn't just about what you accomplish, it's about what you inspire others to do.",
  },
  {
    id: "shantanu-kumar",
    name: "Shantanu Kumar",
    role: "Co-Founder & Creative Director",
    image: "/founder/founder2.jpeg",
    tagline: "Crafting Stories That Build Lasting Brands",
    bio: "The creative mind behind Digital Stag, Shantanu specializes in brand storytelling, content strategy, and creative marketing. With a background in English Literature and over 6 years of digital marketing experience, he transforms ideas into compelling digital experiences.",
    story: [
      "Believes that every brand has an authentic story waiting to be told. Shantanu leverages narrative design to forge deep connections between clients and their audiences.",
      "Combines literary precision with modern digital marketing strategies to craft high-converting creative campaigns.",
    ],
    expertise: [
      "Brand Storytelling",
      "Creative Direction",
      "Content Strategy",
      "Digital Marketing",
      "Audience Engagement",
    ],
    achievements: [
      { value: "6+", label: "Years Experience" },
      { value: "100+", label: "Brand Identities" },
      { value: "500+", label: "Creative Campaigns" },
      { value: "95%", label: "Retention Rate" },
    ],
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
    },
    quote:
      "Creativity is intelligence having fun while solving real business challenges.",
  },
  {
    id: "atul-kumar",
    name: "Atul Kumar",
    role: "Co-Founder & Sales Strategist",
    image: "/founder/founder3.jpeg",
    tagline: "Connecting Businesses with Scalable Growth",
    bio: "Atul Kumar brings 8+ years of sales experience across diverse industries, with expertise in both online and offline sales. Known for his exceptional communication and relationship-building skills, he helps businesses identify growth opportunities and build lasting client relationships.",
    story: [
      "Leads sales and business development at Digital Stag, connecting businesses with the right digital marketing solutions through a customer-first and results-driven approach.",
      "Bridging the gap between traditional relationship selling and modern omnichannel conversion funnels.",
    ],
    expertise: [
      "Sales Strategy",
      "Business Development",
      "Client Relations",
      "Omnichannel Sales",
      "Revenue Growth",
    ],
    achievements: [
      { value: "8+", label: "Years Experience" },
      { value: "200+", label: "Key Partnerships" },
      { value: "98%", label: "Client Retention" },
      { value: "3x", label: "Average Growth" },
    ],
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
    },
    quote:
      "True sales strategy isn't about closing deals—it's about opening long-term, value-driven relationships.",
  },
];

function Founder() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const decorativeRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Master header trigger
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      },
    );

    // Animate background floating elements
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
            delay: 0.2 + index * 0.1,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.to(el, {
          y: -15 + index * 5,
          duration: 3 + index * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    });

    // Animate Founder Cards on Scroll
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    // CTA animation
    if (ctaRef.current) {
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
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#fafafa] pt-16 sm:pt-20 lg:pt-24 pb-20 overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236d28d9' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px",
      }}
    >
      {/* ── Floating Decorative Elements ── */}
      {[
        {
          icon: <FaStar />,
          position: "top-20 left-[8%]",
          size: "text-xl",
          color: "text-[#C57A00]/40",
        },
        {
          icon: <FaRocket />,
          position: "top-32 right-[12%]",
          size: "text-2xl",
          color: "text-[#FFAA00]/30",
        },
        {
          icon: <FaAward />,
          position: "bottom-40 left-[10%]",
          size: "text-2xl",
          color: "text-[#C57A00]/40",
        },
        {
          icon: <FaUsers />,
          position: "bottom-32 right-[8%]",
          size: "text-xl",
          color: "text-[#FFAA00]/30",
        },
        {
          icon: <FaStar />,
          position: "top-1/2 left-[3%]",
          size: "text-lg",
          color: "text-[#C57A00]/50",
        },
        {
          icon: <FaRocket />,
          position: "top-[60%] right-[5%]",
          size: "text-xl",
          color: "text-[#FFAA00]/40",
        },
      ].map((item, index) => (
        <div
          key={index}
          ref={(el) => (decorativeRef.current[index] = el)}
          className={`absolute ${item.position} ${item.size} ${item.color} hidden sm:block pointer-events-none`}
        >
          {item.icon}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-14 sm:mb-18 lg:mb-20">
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-3">
            Leadership & Vision
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
          >
            Meet Our{" "}
            <span className="relative">
              <span className="relative z-10">Co-Founders</span>
              <span className="absolute bottom-0.5 left-0 w-full h-2 sm:h-3 bg-[#C57A00]/50 -z-0" />
            </span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            The driving forces behind Digital Stag, combining strategic
            execution, creative storytelling, and revenue growth.
          </p>
        </div>

        {/* ── Co-Founders List ── */}
        <div className="space-y-16 sm:space-y-20 mb-16 sm:mb-20">
          {FOUNDERS_DATA.map((founder, fIdx) => (
            <div
              key={founder.id}
              ref={(el) => (cardRefs.current[fIdx] = el)}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_2px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
            >
              {/* Top Section - Image & Quick Profile */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image Side */}
                <div className="lg:col-span-5 relative bg-gradient-to-br from-[#F8EAD5] to-[#FFE19A]/70 p-8 sm:p-10 flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
                  {/* Decorative circles */}
                  <div className="absolute top-8 left-8 w-28 h-28 border-2 border-[#C57A00]/40 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-36 h-36 border-2 border-[#FFAA00]/40 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#C57A00]/25 rounded-full blur-xl" />

                  {/* Photo Frame (Removed Floating Status Badge as requested) */}
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-[#C57A00]/40">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5B3700]/10 to-transparent" />
                  </div>
                </div>

                {/* Profile Details Side */}
                <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="mb-5">
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1"
                      style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
                    >
                      {founder.name}
                    </h3>
                    <p className="text-[#5B3700] font-semibold text-sm sm:text-base">
                      {founder.role}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {founder.tagline}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 mb-6">
                    <a
                      href={founder.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={`${founder.name} LinkedIn`}
                    >
                      <FaLinkedinIn />
                    </a>
                    <a
                      href={founder.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={`${founder.name} Facebook`}
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href={founder.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={`${founder.name} Instagram`}
                    >
                      <FaInstagram />
                    </a>
                  </div>

                  {/* Expertise Tags */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Key Focus & Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, index) => (
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

              {/* Story & Quote Grid inside Card */}
              <div className="border-t border-gray-100 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {/* Story Side */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-gray-50/40">
                  <div className="flex items-center gap-2.5 mb-4">
                    <FaRocket className="text-[#5B3700] text-lg" />
                    <h4
                      className="text-lg font-bold text-gray-900"
                      style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
                    >
                      Role & Focus
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {founder.story.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Quote Side */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#5B3700] via-[#C57A00] to-[#FFAA00] text-white flex flex-col justify-between relative overflow-hidden">
                  <FaQuoteLeft className="text-white/10 text-5xl absolute top-3 left-3 pointer-events-none" />
                  <div className="relative z-10 my-auto">
                    <p className="text-sm sm:text-base font-medium leading-relaxed italic mb-4">
                      "{founder.quote}"
                    </p>
                    <p className="text-[#FFE19A] text-xs font-semibold">
                      — {founder.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements Counter Row */}
              <div className="border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 bg-white">
                {founder.achievements.map((achievement, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 sm:p-6 text-center hover:bg-gray-50/50 transition-all duration-300 group"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-[#5B3700] mb-0.5 group-hover:scale-105 transition-transform duration-300">
                      {achievement.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Global Call To Action ── */}
        <div ref={ctaRef} className="text-center">
          <button
            onClick={() => window.open("/contact")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-[#5B3700] transition-all duration-300 hover:shadow-xl hover:shadow-[#C57A00]/30 active:scale-[0.98]"
          >
            <span>Work With Our Founding Team</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Founder;
