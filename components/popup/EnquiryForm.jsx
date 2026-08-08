"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

function EnquiryForm() {
  const [isOpen, setIsOpen] = useState(false);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("enquiryPopupShown");

    if (popupShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("enquiryPopupShown", "true");

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, {
        opacity: 0,
        scale: 0.94,
        y: 20,
      });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }).to(
        modalRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    gsap
      .timeline({
        onComplete: () => setIsOpen(false),
      })
      .to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 15,
        duration: 0.25,
        ease: "power2.in",
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.25,
        },
        "-=0.15"
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dynamic Glassmorphism Overlay */}
      <div
        ref={overlayRef}
        onClick={closePopup}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-all duration-300"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="
          relative
          z-10
          flex
          w-full
          max-w-3xl
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]
          ring-1
          ring-white/20
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          className="
            absolute
            right-3.5
            cursor-pointer
            top-3.5
            z-30
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-slate-900/10
            text-slate-500
            backdrop-blur-md
            transition-all
            duration-200
            hover:bg-slate-900
            hover:text-white
            hover:scale-105
            active:scale-95
          "
          aria-label="Close modal"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ================= LEFT BANNER ================= */}
        <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-slate-950 p-8 sm:flex">
          {/* Background Image */}
          <Image
            src="/popup.jpg"
            alt="Enquiry backdrop"
            fill
            priority
            className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
          />

          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Brand Pill */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-white backdrop-blur-md ring-1 ring-white/20 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Exclusive Access
            </span>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl font-light tracking-tight text-white">
              Let&apos;s Build <span className="font-semibold text-amber-200">Something Great</span>
            </h2>

            <p className="text-xs leading-relaxed text-slate-300">
              Share your vision with us and our advisory team will connect with you within 24 hours.
            </p>
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="flex w-full sm:w-[55%] items-center bg-white p-7 sm:p-8">
          <div className="w-full">
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600">
                Get In Touch
              </p>

              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                Elevate Your Project
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="group relative">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name"
                  className="
                    peer
                    w-full
                    border-b
                    border-slate-200
                    bg-transparent
                    py-2
                    text-xs
                    font-medium
                    text-slate-900
                    placeholder-transparent
                    outline-none
                    transition-all
                    focus:border-slate-900
                  "
                  id="form-name"
                />
                <label
                  htmlFor="form-name"
                  className="
                    absolute
                    left-0
                    -top-3.5
                    text-[10px]
                    font-medium
                    text-slate-400
                    transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-xs
                    peer-placeholder-shown:text-slate-400
                    peer-focus:-top-3.5
                    peer-focus:text-[10px]
                    peer-focus:font-semibold
                    peer-focus:text-slate-900
                  "
                >
                  Full Name
                </label>
              </div>

              {/* Email Input */}
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email Address"
                  className="
                    peer
                    w-full
                    border-b
                    border-slate-200
                    bg-transparent
                    py-2
                    text-xs
                    font-medium
                    text-slate-900
                    placeholder-transparent
                    outline-none
                    transition-all
                    focus:border-slate-900
                  "
                  id="form-email"
                />
                <label
                  htmlFor="form-email"
                  className="
                    absolute
                    left-0
                    -top-3.5
                    text-[10px]
                    font-medium
                    text-slate-400
                    transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-xs
                    peer-placeholder-shown:text-slate-400
                    peer-focus:-top-3.5
                    peer-focus:text-[10px]
                    peer-focus:font-semibold
                    peer-focus:text-slate-900
                  "
                >
                  Email Address
                </label>
              </div>

              {/* Phone Input */}
              <div className="group relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Your Phone Number"
                  className="
                    peer
                    w-full
                    border-b
                    border-slate-200
                    bg-transparent
                    py-2
                    text-xs
                    font-medium
                    text-slate-900
                    placeholder-transparent
                    outline-none
                    transition-all
                    focus:border-slate-900
                  "
                  id="form-phone"
                />
                <label
                  htmlFor="form-phone"
                  className="
                    absolute
                    left-0
                    -top-3.5
                    text-[10px]
                    font-medium
                    text-slate-400
                    transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-xs
                    peer-placeholder-shown:text-slate-400
                    peer-focus:-top-3.5
                    peer-focus:text-[10px]
                    peer-focus:font-semibold
                    peer-focus:text-slate-900
                  "
                >
                  Phone Number
                </label>
              </div>

              {/* Message Input */}
              <div className="group relative">
                <textarea
                  name="message"
                  rows={2}
                  required
                  placeholder="Brief Details"
                  className="
                    peer
                    w-full
                    resize-none
                    border-b
                    border-slate-200
                    bg-transparent
                    py-2
                    text-xs
                    font-medium
                    text-slate-900
                    placeholder-transparent
                    outline-none
                    transition-all
                    focus:border-slate-900
                  "
                  id="form-message"
                />
                <label
                  htmlFor="form-message"
                  className="
                    absolute
                    left-0
                    -top-3.5
                    text-[10px]
                    font-medium
                    text-slate-400
                    transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-xs
                    peer-placeholder-shown:text-slate-400
                    peer-focus:-top-3.5
                    peer-focus:text-[10px]
                    peer-focus:font-semibold
                    peer-focus:text-slate-900
                  "
                >
                  Project Summary
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="
                  group
                  cursor-pointer
                  relative
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  bg-slate-900
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-slate-900/10
                  transition-all
                  duration-300
                  hover:bg-slate-800
                  hover:shadow-slate-900/25
                  active:scale-[0.99]
                "
              >
                <span>Request Callback</span>
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryForm;