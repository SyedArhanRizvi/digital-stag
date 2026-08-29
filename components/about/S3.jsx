"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaRocket,
  FaChartLine,
  FaBuilding,
  FaUsers,
  FaLaptopCode,
  FaChartBar,
  FaArrowRight,
  FaCheckCircle,
  FaBriefcase,
  FaBullhorn,
} from "react-icons/fa";

// ── Updated Timeline Data ──────────────────────────────────────────────
const TIMELINE_DATA = [
  {
    year: "2020",
    title: "The Beginning",
    subtitle: "Where the Journey Started",
    description:
      "Digital Stag began over 5 years ago from a modest 10×10 room, 3 friends and a lot of passion, driven by a vision to help businesses establish a strong digital presence. Starting as a freelance venture, every client became an opportunity to learn, grow, and deliver meaningful results.",
    achievements: [
      { text: "Started from a 10×10 workspace", icon: <FaBuilding /> },
      { text: "Freelance digital marketing projects", icon: <FaLaptopCode /> },
      { text: "Built the foundation of Digital Stag", icon: <FaCheckCircle /> },
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
    year: "2021",
    title: "Building Experience",
    subtitle: "Learning Across Industries",
    description:
      "As our experience grew, we began working with network marketing businesses, helping them generate leads, build their online presence, and scale through digital campaigns. These projects helped us sharpen our expertise in paid advertising and customer acquisition.",
    achievements: [
      { text: "Network marketing campaigns", icon: <FaBullhorn /> },
      { text: "Performance marketing experience", icon: <FaChartLine /> },
      { text: "Strong client relationships", icon: <FaUsers /> },
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
    year: "2022",
    title: "Expanding Our Reach",
    subtitle: "Helping Local Businesses Grow",
    description:
      "With growing confidence and a stronger portfolio, we partnered with local businesses across different industries, including studios, retail outlets, service providers, and small enterprises. Every campaign taught us something new about different markets and customer behavior.",
    achievements: [
      { text: "Local business campaigns", icon: <FaBuilding /> },
      { text: "Multi-industry experience", icon: <FaBriefcase /> },
      { text: "Brand awareness & lead generation", icon: <FaChartBar /> },
    ],
    icon: <FaBriefcase />,
    color: "from-emerald-500 to-teal-500",
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "border-emerald-200",
    dotColor: "bg-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    side: "left",
  },
  {
    year: "2023",
    title: "Diversifying Our Portfolio",
    subtitle: "Growing Beyond Local Markets",
    description:
      "As referrals increased, so did our opportunities. We expanded our services to businesses in sectors like Education, Event Management, Healthcare, and Professional Services, offering complete digital marketing solutions tailored to each industry.",
    achievements: [
      { text: "Education marketing", icon: <FaLaptopCode /> },
      { text: "Event management campaigns", icon: <FaBullhorn /> },
      { text: "SEO, websites & social media", icon: <FaChartBar /> },
    ],
    icon: <FaChartBar />,
    color: "from-orange-500 to-red-500",
    bgColor: "rgba(249, 115, 22, 0.08)",
    borderColor: "border-orange-200",
    dotColor: "bg-orange-500",
    glowColor: "rgba(249, 115, 22, 0.3)",
    side: "right",
  },
  {
    year: "2024",
    title: "A New Chapter",
    subtitle: "Our First Office",
    description:
      "A significant milestone in our journey was opening our first office, transforming Digital Stag from a freelance setup into a dedicated agency. This allowed us to build stronger systems, collaborate more effectively, and serve clients at a larger scale.",
    achievements: [
      { text: "Opened our first office", icon: <FaBuilding /> },
      { text: "Expanded our team", icon: <FaUsers /> },
      { text: "Full-service digital marketing agency", icon: <FaBriefcase /> },
    ],
    icon: <FaBuilding />,
    color: "from-[#5B3700] via-[#C57A00] to-[#FFAA00]",
    bgColor: "rgba(91, 55, 0, 0.08)",
    borderColor: "border-[#C57A00]/50",
    dotColor: "bg-[#C57A00]",
    glowColor: "rgba(197, 122, 0, 0.3)",
    side: "left",
  },
  {
    year: "2025",
    title: "Focused Growth",
    subtitle: "Helping Real Estate Brands Scale",
    description:
      "Today, Digital Stag specializes in helping real estate developers and businesses grow through high-performance Google Ads, Meta Ads, SEO, website development, and social media marketing. Alongside real estate, we continue to work with clients across Education, Event Management, Healthcare, Retail, and other industries, delivering strategies that drive measurable business growth.",
    achievements: [
      { text: "Strong focus on Real Estate Marketing", icon: <FaBuilding /> },
      { text: "Google Ads & Meta Ads specialists", icon: <FaBullhorn /> },
      { text: "Serving multiple industries", icon: <FaBriefcase /> },
    ],
    icon: <FaBullhorn />,
    color: "from-rose-500 to-pink-500",
    bgColor: "rgba(244, 63, 94, 0.08)",
    borderColor: "border-rose-200",
    dotColor: "bg-rose-500",
    glowColor: "rgba(244, 63, 94, 0.3)",
    side: "right",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const decorativeElementsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      timelineItemsRef.current.forEach((item) => {
        if (item) gsap.set(item, { opacity: 0, x: 0, y: 60 });
      });

      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isDesktop: "(min-width: 640px)",
        },
        (context) => {
          const conditions = context.conditions;
          const isDesktop = conditions?.isDesktop ?? false;
          const isMobile = conditions?.isMobile ?? false;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });

          tl.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );

          tl.fromTo(
            timelineLineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power3.inOut",
            },
            "-=0.5"
          );

          timelineItemsRef.current.forEach((item, index) => {
            if (!item) return;
            const isLeft = TIMELINE_DATA[index].side === "left";
            const startX = isDesktop ? (isLeft ? -80 : 80) : 0;

            tl.fromTo(
              item,
              {
                opacity: 0,
                x: startX,
                y: 40,
                scale: 0.95,
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
            );

            ScrollTrigger.create({
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                const maxParallax = isMobile ? 10 : 20;
                const speed = index % 2 === 0 ? maxParallax : -maxParallax;
                gsap.to(item, {
                  y: speed * self.progress,
                  duration: 0,
                  ease: "none",
                });
              },
            });
          });
        }
      );

      decorativeElementsRef.current.forEach((el, index) => {
        if (!el) return;

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
            },
          }
        );

        gsap.to(el, {
          y: -15,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#e8ecf4] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C57A00]/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFAA00]/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#C57A00]/20 via-[#FFAA00]/20 to-[#5B3700]/20 rounded-full blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div ref={headingRef}>
            <span className="inline-block px-4 py-1.5 bg-white/70 backdrop-blur-sm border border-[#C57A00]/40 rounded-full text-[#5B3700] text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              Our Journey
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
              style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
            >
              The Story of{" "}
              <span className="bg-gradient-to-r from-[#5B3700] via-[#C57A00] to-[#FFAA00] bg-clip-text text-transparent animate-gradient">
                Digital Stag
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              From a 10×10 room with big dreams to a growing digital marketing
              agency helping businesses succeed online.
            </p>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative">
          <div
            ref={timelineLineRef}
            className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5B3700] via-[#C57A00] to-[#FFAA00] opacity-40"
            style={{ transformOrigin: "top center" }}
          />

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {TIMELINE_DATA.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  timelineItemsRef.current[index] = el;
                }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  item.side === "right" ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-full sm:w-[calc(50%-30px)] pl-14 sm:pl-0 sm:ml-0 ${
                    item.side === "left"
                      ? "sm:pr-8 lg:pr-12"
                      : "sm:pl-8 lg:pl-12"
                  }`}
                >
                  <div
                    className={`group relative bg-white/80 backdrop-blur-sm border ${item.borderColor} rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1`}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                      style={{ background: item.glowColor }}
                    />

                    <div className="sm:hidden inline-flex items-center gap-2 px-3 py-1 bg-[#F8EAD5] border border-[#C57A00]/40 rounded-full mb-4">
                      <span
                        className={`w-2 h-2 rounded-full ${item.dotColor}`}
                      />
                      <span className="text-[#5B3700] font-bold text-sm">
                        {item.year}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.color} p-[1px] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center text-[#5B3700] text-xl sm:text-2xl lg:text-3xl group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#5B3700] group-hover:via-[#C57A00] group-hover:to-[#FFAA00] transition-all duration-300">
                          {item.icon}
                        </div>
                      </div>

                      <h3 className="text-gray-900 font-bold text-lg sm:text-xl lg:text-2xl mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">
                        {item.subtitle}
                      </p>

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                        {item.description}
                      </p>

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

                <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center top-6 sm:top-1/2 sm:-translate-y-1/2">
                  <div
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.dotColor} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${item.glowColor}` }}
                  >
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                    <div
                      className={`absolute inset-0 rounded-full ${item.dotColor} animate-ping opacity-30`}
                    />
                  </div>

                  <div className="hidden sm:flex absolute top-0 -translate-y-full items-center gap-2 px-2 py-1">
                    <span className="text-gray-900 font-bold text-xs lg:text-sm bg-white/90 backdrop-blur-sm border border-gray-200 px-2 py-0.5 rounded-full shadow-sm">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Ending */}
          <div className="flex flex-col items-center justify-center mt-16 sm:mt-20 lg:mt-24 text-center">
            <p className="text-gray-700 font-medium text-base sm:text-lg lg:text-xl max-w-xl mb-6">
              "The journey continues, and we're excited to help more businesses grow in the years ahead."
            </p>
            <div className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(91,55,0,0.35)] hover:scale-105 active:scale-95"
            onClick={()=>window.open('/contact')}
            >
              <span className="text-white font-semibold text-sm sm:text-base">
                Continuing to grow, innovate, and deliver results
              </span>
              <FaArrowRight className="text-white text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#e8ecf4] to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes ping {
          75%,
          100% {
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
  );
}