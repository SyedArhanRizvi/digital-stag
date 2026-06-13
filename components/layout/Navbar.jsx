"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { TbSeo } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { IoAnalytics } from "react-icons/io5";
import { FaPhotoVideo } from "react-icons/fa";
import { MdOutlineGraphicEq } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";

/* ─────────────────────────────────────────────────────────────────
   SERVICES sub-menu data
───────────────────────────────────────────────────────────────── */
const SERVICES = [
  { label: "SEO", href: "/services/seo", icon: <TbSeo /> },
  {
    label: "Web Development",
    href: "/services/web-development",
    icon: <CgWebsite />,
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    icon: <IoAnalytics />,
  },
  {
    label: "Video Editing",
    href: "/services/video-editing",
    icon: <FaPhotoVideo />,
  },
  {
    label: "Graphic Designing",
    href: "/services/graphic-designing",
    icon: <MdOutlineGraphicEq />,
  },
  {
    label: "AI Automation",
    href: "/services/ai-automation",
    icon: <IoShareSocialOutline />,
  },
  {
    label: "Lead Generation",
    href:"/services/lead-generation",
     icon: <MdOutlineGraphicEq />
  }
];

/* ─────────────────────────────────────────────────────────────────
   PILL NAV
───────────────────────────────────────────────────────────────── */
const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#120F17",
  hoveredPillTextColor = "#120F17",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // FIX: Separate refs for the wrapper and the dropdown panel
  const servicesRef = useRef(null); // The <li> wrapper
  const dropdownRef = useRef(null); // The dropdown panel div
  const dropdownTween = useRef(null);
  const closeTimeoutRef = useRef(null); // To handle delayed close

  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  /* ── original layout / resize effect ── */
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0,
        );
        if (label)
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0,
          );
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0,
          );
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready)
      document.fonts.ready.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu)
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;
      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
      }
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  /* ── Close dropdown when clicking outside ── */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // FIX: Check if click is outside both the services wrapper and the dropdown
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  /* ── dropdown open / close helpers ── */
  const openDropdown = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const el = dropdownRef.current;
    if (!el) return;

    setIsDropdownOpen(true);
    dropdownTween.current?.kill();
    gsap.set(el, { display: "block", visibility: "visible" });
    dropdownTween.current = gsap.fromTo(
      el,
      { opacity: 0, y: -8, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" },
    );
    /* stagger children */
    const kids = el.querySelectorAll(".dd-item");
    gsap.fromTo(
      kids,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.25,
        ease: "power2.out",
        delay: 0.06,
      },
    );
  };

  const closeDropdown = () => {
    // Small delay to prevent flickering when moving from button to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      const el = dropdownRef.current;
      if (!el) return;

      dropdownTween.current?.kill();
      dropdownTween.current = gsap.to(el, {
        opacity: 0,
        y: -6,
        scale: 0.97,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, { display: "none", visibility: "hidden" });
          setIsDropdownOpen(false);
        },
      });
    }, 100);
  };

  // FIX: Handler for mouse entering the dropdown panel
  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // FIX: Handler for mouse leaving the dropdown panel
  const handleDropdownLeave = () => {
    closeDropdown();
  };

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: "top center",
          },
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href) => href && !isExternalLink(href);

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
    ["--nav-h"]: "42px",
    ["--logo"]: "36px",
    ["--pill-pad-x"]: "18px",
    ["--pill-gap"]: "3px",
  };

  return (
    <div className="z-[1000] flex items-center">
      <nav
        className={`flex items-center justify-between md:justify-start box-border ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {/* ── Logo circle (original) ── */}
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            href={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={(el) => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="w-full h-full object-cover block"
            />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || "#"}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={(el) => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="w-full h-full object-cover block"
            />
          </a>
        )}

        {/* ── Desktop pill row ── */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2"
          style={{ height: "var(--nav-h)", background: "var(--base, #000)" }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: "var(--pill-gap)" }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const isServices = item.label?.toLowerCase() === "services";

              const pillStyle = {
                background: "var(--pill-bg, #fff)",
                color: "var(--pill-text, var(--base, #000))",
                paddingLeft: "var(--pill-pad-x)",
                paddingRight: "var(--pill-pad-x)",
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: "var(--base, #000)",
                      willChange: "transform",
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: "transform" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: "var(--hover-text, #fff)",
                        willChange: "transform, opacity",
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {/* ── Chevron for Services ── */}
                  {isServices && (
                    <svg
                      className="ml-1 inline-block relative z-[3]"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{
                        transition: "transform .2s",
                        transform: isDropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                      style={{ background: "var(--base, #000)" }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

              // FIX: Services pill with proper event handling
              if (isServices) {
                return (
                  <li
                    key={item.href}
                    role="none"
                    className="flex h-full relative"
                    ref={servicesRef} // FIX: Use servicesRef for the wrapper
                  >
                    <Link
                      href="/services"
                      role="menuitem"
                      className={`${basePillClasses} border-0`}
                      style={pillStyle}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                      onMouseEnter={() => {
                        handleEnter(i);
                        openDropdown();
                      }}
                      onMouseLeave={() => {
                        handleLeave(i);
                        closeDropdown();
                      }}
                      onClick={() =>
                        isDropdownOpen ? closeDropdown() : openDropdown()
                      }
                    >
                      {PillContent}
                    </Link>

                    {/* FIX: Dropdown panel uses dropdownRef */}
                    <div
                      ref={dropdownRef} // FIX: Only one ref here
                      className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 rounded-2xl shadow-2xl overflow-hidden z-[2000] hidden"
                      style={{
                        minWidth: "240px",
                        background: "var(--base, #000)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        visibility: "hidden",
                        display: "none",
                      }}
                      onMouseEnter={handleDropdownEnter} // FIX: Keep open when hovering dropdown
                      onMouseLeave={handleDropdownLeave} // FIX: Close when leaving dropdown
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {SERVICES.map((svc) => (
                          <Link
                            key={svc.href}
                            href={svc.href}
                            className="dd-item flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors"
                            style={{ color: "var(--pill-bg, #fff)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <span className="text-base">{svc.icon}</span>
                            <span>{svc.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Hamburger (< 1024 px) ── */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: "var(--nav-h)",
            height: "var(--nav-h)",
            background: "var(--base, #000)",
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: "var(--pill-bg, #fff)" }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: "var(--pill-bg, #fff)" }}
          />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
        style={{ ...cssVars, background: "#ffffff" }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map((item) => {
            const isServices = item.label?.toLowerCase() === "services";
            const defaultStyle = {
              background: "#ffffff",
              color: "#0a0a0a",
              border: "1px solid #e5e5e5",
            };
            const hoverIn = (e) => {
              e.currentTarget.style.background = "#f5f5f5";
              e.currentTarget.style.borderColor = "#d4d4d4";
            };
            const hoverOut = (e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "#e5e5e5";
            };
            const linkClasses =
              "block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]";

            return (
              <li key={item.href}>
                {isServices ? (
                  <div
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    <span className="flex items-center justify-between cursor-pointer">
                      <span>{item.label}</span>
                      <svg
                        className="w-4 h-4 transition-transform"
                        style={{
                          transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </span>
                  </div>
                ) : isRouterLink(item.href) ? (
                  <Link
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
                {isServices && mobileServicesOpen && (
                  <ul className="list-none m-0 pl-4 flex flex-col gap-2 mt-2">
                    {SERVICES.map((svc) => (
                      <li key={svc.href}>
                        <Link
                          href={svc.href}
                          className="flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-[50px] transition-all duration-200"
                          style={{
                            background: "#f9f9f9",
                            color: "#0a0a0a",
                            border: "1px solid #e5e5e5",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f0f0f0";
                            e.currentTarget.style.borderColor = "#d4d4d4";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f9f9f9";
                            e.currentTarget.style.borderColor = "#e5e5e5";
                          }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-base">{svc.icon}</span>
                          <span>{svc.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
