"use client"

import { useRef, useLayoutEffect, useState, useMemo, useCallback, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────
   ACCENT PALETTE
───────────────────────────────────────────────────────────── */
const ACCENTS = [
  '#7c3aed',
  '#4f46e5', 
  '#0ea5e9',
  '#a855f7',
  '#06b6d4',
];

// Stable seed-based accent assignment (won't change between renders)
function getAccent(charIndex, seed = 0) {
  const hash = (charIndex * 2654435761 + seed) >>> 0;
  if (hash % 10 < 3) {
    return ACCENTS[hash % ACCENTS.length];
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────
   COLORED TEXT RENDERER - Stable colors with outline effect
───────────────────────────────────────────────────────────── */
function ColoredText({ text, seed = 0, href }) {
  // Memoize characters with stable seed so colors NEVER change
  const chars = useMemo(() => {
    let ci = 0;
    return text.split('').map((char, i) => {
      const isLetter = /[a-zA-Z]/.test(char);
      const accent = isLetter ? getAccent(ci, seed) : null;
      const isOutlined = accent && (ci * 7 + seed) % 5 === 0;
      if (isLetter) ci++;
      return { char, accent, key: i, isOutlined };
    });
  }, [text, seed]);

  const content = (
    <>
      {chars.map(({ char, accent, key, isOutlined }) =>
        char === ' ' ? (
          <span key={key}>&nbsp;</span>
        ) : (
          <span
            key={key}
            style={{
              display: 'inline-block',
              color: isOutlined ? 'transparent' : (accent || '#0d0d0d'),
              WebkitTextStroke: isOutlined ? `2px ${accent}` : 'none',
              textShadow: accent && !isOutlined ? `0 0 24px ${accent}55` : 'none',
              fontWeight: 'inherit',
            }}
          >
            {char}
          </span>
        )
      )}
    </>
  );

  // Wrap in anchor if href provided
  if (href) {
    return (
      <a
        href={href}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        {content}
      </a>
    );
  }

  return content;
}

/* ─────────────────────────────────────────────────────────────
   SEPARATOR
───────────────────────────────────────────────────────────── */
function Separator({ rowIndex }) {
  const accent = ACCENTS[rowIndex % ACCENTS.length];
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0 28px',
        color: accent,
        opacity: 0.7,
        fontSize: '0.5em',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    >
      ◆
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   ELEMENT WIDTH HOOK with ResizeObserver
───────────────────────────────────────────────────────────── */
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      if (element) {
        setWidth(element.offsetWidth);
      }
    };
    
    update();
    
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);
  
  return width;
}

/* ─────────────────────────────────────────────────────────────
   VELOCITY ROW - Vanilla JS Animation
───────────────────────────────────────────────────────────── */
function VelocityRow({
  text,
  href,
  rowIndex,
  baseVelocity,
  scrollContainerRef,
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
}) {
  const containerRef = useRef(null);
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);
  const animationRef = useRef(null);
  const currentXRef = useRef(0);
  const directionRef = useRef(1);
  const lastScrollY = useRef(0);
  const scrollVelocityRef = useRef(0);
  const smoothVelocityRef = useRef(0);

  // Scroll velocity tracking
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current || window;
    
    let lastTime = performance.now();
    
    const handleScroll = () => {
      const currentY = scrollContainer === window 
        ? window.scrollY 
        : scrollContainer.scrollTop;
      
      const now = performance.now();
      const deltaTime = now - lastTime;
      
      if (deltaTime > 0) {
        const rawVelocity = (currentY - lastScrollY.current) / deltaTime;
        scrollVelocityRef.current = rawVelocity * 16;
      }
      
      lastScrollY.current = currentY;
      lastTime = now;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef]);

  // Smooth velocity spring simulation
  useEffect(() => {
    let animationId;
    
    const updateSpring = () => {
      const target = scrollVelocityRef.current;
      const current = smoothVelocityRef.current;
      
      const springForce = (target - current) * stiffness * 0.001;
      const dampingForce = -current * damping * 0.001;
      const acceleration = springForce + dampingForce;
      
      smoothVelocityRef.current += acceleration;
      
      animationId = requestAnimationFrame(updateSpring);
    };
    
    animationId = requestAnimationFrame(updateSpring);
    
    return () => cancelAnimationFrame(animationId);
  }, [stiffness, damping]);

  // Main animation loop
  useEffect(() => {
    if (copyWidth === 0) return;
    
    let lastTime = performance.now();
    
    const animate = (currentTime) => {
      const delta = Math.min(currentTime - lastTime, 50);
      lastTime = currentTime;
      
      const vf = smoothVelocityRef.current;
      const [inputMin, inputMax] = velocityMapping.input;
      const [outputMin, outputMax] = velocityMapping.output;
      const normalizedVf = Math.max(outputMin, Math.min(outputMax, 
        ((Math.abs(vf) - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin
      ));
      
      if (Math.abs(vf) > 0.1) {
        directionRef.current = vf > 0 ? 1 : -1;
      }
      
      let moveBy = directionRef.current * baseVelocity * (delta / 1000);
      moveBy += directionRef.current * moveBy * normalizedVf;
      
      currentXRef.current += moveBy;
      
      if (copyWidth > 0) {
        if (directionRef.current > 0 && currentXRef.current > 0) {
          currentXRef.current -= copyWidth;
        } else if (directionRef.current < 0 && currentXRef.current < -copyWidth) {
          currentXRef.current += copyWidth;
        }
      }
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${currentXRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [copyWidth, baseVelocity, velocityMapping]);

  const rowAccent = ACCENTS[rowIndex % ACCENTS.length];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '18px 0',
        borderTop: rowIndex === 0 ? `1px solid rgba(124,58,237,0.12)` : 'none',
        borderBottom: `1px solid rgba(124,58,237,0.08)`,
      }}
    >
      {/* Glow bar */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(90deg, transparent, ${rowAccent}08 40%, ${rowAccent}06 60%, transparent)`,
        pointerEvents: 'none',
      }} />

      <div
        ref={containerRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(38px, 6vw, 88px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: '#0d0d0d',
          willChange: 'transform',
        }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? copyRef : null}
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <ColoredText 
              text={text} 
              seed={rowIndex * 100 + i * 13} 
              href={href}
            />
            <Separator rowIndex={rowIndex + i} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  links = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
}) => {
  // Default texts if none provided (only 2 rows)
  const displayTexts = texts.length > 0 ? texts.slice(0, 2) : [
    "Digital Marketing",
    "SEO Excellence",
  ];

  // Links array - map each text to its link
  const getLink = (index) => {
    if (links.length > index) return links[index];
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');
      `}</style>

      <section
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #fafafa 0%, #f3f0ff 50%, #eef6ff 100%)',
          padding: '0',
        }}
      >
        {/* Top edge glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, #7c3aed, #4f46e5, #0ea5e9, #06b6d4)',
          zIndex: 2,
        }} />

        {/* Bottom edge glow */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, #06b6d4, #0ea5e9, #4f46e5, #7c3aed)',
          zIndex: 2,
        }} />

        {/* Ambient orbs */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '-80px',
          transform: 'translateY(-50%)',
          width: '260px', height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute',
          top: '50%', right: '-80px',
          transform: 'translateY(-50%)',
          width: '260px', height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Velocity Rows - Always exactly 2 */}
        {displayTexts.map((text, index) => (
          <VelocityRow
            key={index}
            text={text}
            href={getLink(index)}
            rowIndex={index}
            baseVelocity={index % 2 !== 0 ? -velocity : velocity}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
          />
        ))}
      </section>
    </>
  );
};

export default ScrollVelocity;