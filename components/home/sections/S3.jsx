"use client"

import React, { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const awards = [
  { img: "/home/s2/award1.jpg",  title: "Startup India",        desc: "Growing Startup Company"           },
  // { img: "/home/s2/award2.webp", title: "NSDC Certified",       desc: "Transforming the Skill Landscape"  },
  // { img: "/home/s2/award3.webp", title: "Entrepreneur",         desc: "Top Digital Marketing Agency India" },
  // { img: "/home/s2/award4.webp", title: "ISO/IEC (27001:2022)", desc: "ISO Certified Company"             },
  // { img: "/home/s2/award5.webp", title: "Forbes India",         desc: "Best SEO Company"                  },
  // { img: "/home/s2/award6.webp", title: "Clutch",               desc: "Top Digital Marketing Agency"      },
  // { img: "/home/s2/award7.webp", title: "Fit Small Business",   desc: "Top Digital Marketing Agency"      },
  // { img: "/home/s2/award8.webp", title: "Good Firms",           desc: "Best SEO Company In India"         },
  // { img: "/home/s2/award9.webp", title: "Plerdy",               desc: "Top SEO Experts"                   },
  // { img: "/home/s2/award10.webp",title: "G2",                   desc: "Best Local SEO Agency"             },
  // { img: "/home/s2/award11.webp",title: "Software World",       desc: "Best Marketing Consultant"         },
  // { img: "/home/s2/award12.webp",title: "Clouds Ways",          desc: "Best SEO Company in World"         },
]

const STATS = [
  { count: 12,  suffix: '+', label: 'Awards Won'          },
  { count: 40, suffix: '+', label: 'Clients Served'      },
  { count: 5,   suffix: '+', label: 'Years Active'        },
  { count: 90,  suffix: '%', label: 'Client Satisfaction' },
]

const ACCENT_COLORS = ['#7c3aed', '#4f46e5', '#0ea5e9', '#06b6d4']

/* ─────────────────────────────────────────────────────────────
   CUSTOM HOOK: Intersection Observer
───────────────────────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once) {
            observer.unobserve(node)
          }
        } else if (!options.once) {
          setInView(false)
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.margin || '0px',
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [options.once, options.margin, options.threshold])

  return [ref, inView]
}

/* ─────────────────────────────────────────────────────────────
   VARIABLE PROXIMITY TEXT
───────────────────────────────────────────────────────────── */
function VariableProximityText({ text, style }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const spans = container.querySelectorAll('span')
    
    const handleMouseMove = (e) => {
      spans.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
        const t = Math.max(0, 1 - dist / 160)
        const weight = Math.round(400 + t * 500)
        
        el.style.fontWeight = String(weight)
        el.style.color = t > 0.5 ? '#7c3aed' : `rgba(15,15,15,${0.45 + t * 0.55})`
      })
    }

    const handleMouseLeave = () => {
      spans.forEach((el) => {
        el.style.fontWeight = '600'
        el.style.color = 'rgba(15,15,15,0.85)'
      })
    }

    spans.forEach((el) => {
      el.style.fontWeight = '600'
      el.style.color = 'rgba(15,15,15,0.85)'
    })

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <span
      ref={containerRef}
      style={{ display: 'inline-block', cursor: 'default', ...style }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transition: 'font-weight 0.1s ease, color 0.1s ease',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────────────────────────── */
function StatCounter({ count, suffix, label, delay = 0 }) {
  const [ref, inView] = useInView({ once: true, margin: '-80px' })
  const numRef = useRef(null)
  const hasFired = useRef(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!inView || hasFired.current) return
    hasFired.current = true

    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [inView, delay])

  useEffect(() => {
    if (!isVisible) return

    const node = numRef.current
    if (!node) return

    let animationId
    const duration = 1800
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * count)
      
      node.textContent = current + suffix

      if (progress < 1) {
        animationId = requestAnimationFrame(updateCounter)
      }
    }

    animationId = requestAnimationFrame(updateCounter)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isVisible, count, suffix])

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        minWidth: '80px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        ref={numRef}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(28px, 3.5vw, 46px)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: '6px', 
          color:'#000000'
        }}
      >
        {'0' + suffix}
      </div>
      <div style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        color: '#aaa',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   AWARD CARD
───────────────────────────────────────────────────────────── */
function AwardCard({ award, index }) {
  const [ref, inView] = useInView({ once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        border: `1.5px solid ${isHovered ? '#ddd4fe' : '#efefef'}`,
        borderRadius: '20px',
        padding: '26px 18px 22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.93)',
        transition: `
          opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${(index % 4) * 0.07}s,
          transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${(index % 4) * 0.07}s,
          border-color 0.22s cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 0.22s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)
        `,
        boxShadow: isHovered 
          ? '0 20px 48px rgba(124,58,237,0.13), 0 4px 16px rgba(0,0,0,0.07)'
          : '0 2px 8px rgba(0,0,0,0.05)',
        transform: isHovered 
          ? (inView ? 'translateY(-8px) scale(1.03)' : 'translateY(36px) scale(0.93)')
          : (inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.93)'),
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${accent}, ${accent}30)`,
        borderRadius: '20px 20px 0 0',
      }} />

      <div style={{
        position: 'absolute',
        top: '12px',
        right: '13px',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 800,
        fontSize: '10px',
        color: accent + '30',
        letterSpacing: '0.04em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{
        width: '68px',
        height: '68px',
        borderRadius: '14px',
        background: accent + '10',
        border: `1px solid ${accent}25`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={award.img}
          alt={award.title}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: '13px',
          color: '#111',
          margin: '0 0 5px',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}>
          {award.title}
        </p>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: '11.5px',
          color: '#aaa',
          margin: 0,
          lineHeight: 1.5,
        }}>
          {award.desc}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export default function S3() {
  const [tagRef, tagInView] = useInView({ once: true, margin: '-80px' })
  const [headRef, headInView] = useInView({ once: true, margin: '-80px' })
  const [subRef, subInView] = useInView({ once: true, margin: '-80px' })
  const [divRef, divInView] = useInView({ once: true, margin: '-80px' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');

        .s3-wrap, .s3-wrap * { box-sizing: border-box; }

        .s3-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(32px, 5vw, 66px);
          line-height: 1.07;
          letter-spacing: -0.025em;
          margin: 0 0 18px;
          font-weight: 600;
        }

        .s3-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) { .s3-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px)  { .s3-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }

        .s3-stats-row {
          display: flex;
          gap: clamp(20px, 4vw, 56px);
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .s3-stat-sep {
          width: 1px;
          height: 44px;
          background: #e5e5e5;
          flex-shrink: 0;
        }
        @media (max-width: 500px) { .s3-stat-sep { display: none; } }
      `}</style>

      <section
        className="s3-wrap"
        style={{
          background: 'linear-gradient(150deg, #fafafa 0%, #f3f0ff 45%, #eef6ff 100%)',
          padding: 'clamp(72px, 10vw, 128px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[
          { top: '-160px', right: '-160px', size: '520px', color: 'rgba(124,58,237,0.06)' },
          { bottom: '-100px', left: '-100px', size: '380px', color: 'rgba(14,165,233,0.07)' },
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{
          position: 'absolute', top: '-140px', right: '-140px',
          width: '500px', height: '500px', borderRadius: '50%',
          border: '1px solid rgba(124,58,237,0.08)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '340px', height: '340px', borderRadius: '50%',
          border: '1px solid rgba(14,165,233,0.07)', pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 64px)',
          position: 'relative',
          zIndex: 1,
        }}>

          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 80px)' }}>

            <div
              ref={tagRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: '#fff',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '7px 18px',
                borderRadius: '100px',
                marginBottom: '28px',
                boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
                opacity: tagInView ? 1 : 0,
                transform: tagInView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <span style={{
                display: 'inline-block',
                width: '5px', height: '5px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.65)',
              }} />
              Awards &amp; Recognition
            </div>

            <div ref={headRef}>
              <h2
                className="s3-heading"
                style={{
                  opacity: headInView ? 1 : 0,
                  transform: headInView ? 'translateY(0)' : 'translateY(32px)',
                  transition: 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
                }}
              >
                <VariableProximityText text="We're Obsessed With Quality," style={{ display: 'block' }} />
                <VariableProximityText text="Not Vanity Metrics." style={{ display: 'block' }} />
              </h2>
            </div>

            <p
              ref={subRef}
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 'clamp(14px, 1.4vw, 16.5px)',
                color: '#999',
                margin: '0 auto',
                maxWidth: '500px',
                lineHeight: 1.8,
                opacity: subInView ? 1 : 0,
                transform: subInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s',
              }}
            >
              We have a system that works and leads that qualify. Our clients see a consistent 40%+ qualified lead rate.
            </p>

            <div
              ref={divRef}
              style={{
                width: '48px',
                height: '3px',
                background: 'linear-gradient(90deg, #7c3aed, #4f46e5)',
                borderRadius: '2px',
                margin: '28px auto 0',
                transformOrigin: 'left center',
                opacity: divInView ? 1 : 0,
                transform: divInView ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s',
              }}
            />
          </div>

          <div
            className="s3-stats-row"
            style={{
              marginBottom: 'clamp(48px, 7vw, 72px)',
              background: '#fff',
              border: '1.5px solid rgba(124,58,237,0.1)',
              borderRadius: '20px',
              padding: 'clamp(24px, 3vw, 36px) clamp(24px, 5vw, 56px)',
              boxShadow: '0 4px 24px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            {STATS.map((s, i) => (
              <React.Fragment key={i}>
                <StatCounter {...s} delay={i * 0.12} />
                {i < STATS.length - 1 && <div className="s3-stat-sep" />}
              </React.Fragment>
            ))}
          </div>

          <div className="s3-grid">
            {awards.map((award, i) => (
              <AwardCard key={i} award={award} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}