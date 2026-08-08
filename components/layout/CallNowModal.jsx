"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FiX, FiCheck, FiLoader } from "react-icons/fi";

export default function CallNowModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    if (isOpen) {
      // Entry Animation
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, scale: 0.94, y: 20 });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        modalRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.2)",
        },
        "-=0.15"
      );
    } else {
      // Exit Animation
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
        },
      });

      tl.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 15,
        duration: 0.2,
        ease: "power2.in",
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        "-=0.1"
      );
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/save-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
        }, 1800);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
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
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-3.5
            top-3.5
            z-30
            flex
            h-8
            w-8
            cursor-pointer
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
          <FiX className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="flex w-full flex-col items-center justify-center p-12 text-center bg-white">
            <div className="relative mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30">
                <FiCheck className="text-4xl text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-emerald-300" />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Request Received!
            </h3>
            <p className="mt-2 max-w-xs text-xs text-slate-500 leading-relaxed">
              We have received your details. Our team will reach out to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Left Banner */}
            <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-slate-950 p-8 sm:flex">
              <Image
                src="/popup.jpg"
                alt="Enquiry backdrop"
                fill
                priority
                className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-white backdrop-blur-md ring-1 ring-white/20 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Exclusive Access
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h2 className="text-2xl font-light tracking-tight text-white">
                  Let&apos;s Build <span className="font-semibold text-amber-200">Something Great</span>
                </h2>

                <p className="text-xs leading-relaxed text-slate-300">
                  Share your vision with us and our advisory team will connect with you within 24 hours.
                </p>
              </div>
            </div>

            {/* Right Form Container */}
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
                  <div className="group relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      id="call-form-name"
                      className="peer w-full border-b border-slate-200 bg-transparent py-2 text-xs font-medium text-slate-900 placeholder-transparent outline-none transition-all focus:border-slate-900"
                    />
                    <label
                      htmlFor="call-form-name"
                      className="absolute left-0 -top-3.5 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-slate-900"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="group relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      id="call-form-email"
                      className="peer w-full border-b border-slate-200 bg-transparent py-2 text-xs font-medium text-slate-900 placeholder-transparent outline-none transition-all focus:border-slate-900"
                    />
                    <label
                      htmlFor="call-form-email"
                      className="absolute left-0 -top-3.5 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-slate-900"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="group relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      id="call-form-phone"
                      className="peer w-full border-b border-slate-200 bg-transparent py-2 text-xs font-medium text-slate-900 placeholder-transparent outline-none transition-all focus:border-slate-900"
                    />
                    <label
                      htmlFor="call-form-phone"
                      className="absolute left-0 -top-3.5 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-slate-900"
                    >
                      Phone Number
                    </label>
                  </div>

                  <div className="group relative">
                    <textarea
                      name="message"
                      rows={2}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Brief Details"
                      id="call-form-message"
                      className="peer w-full resize-none border-b border-slate-200 bg-transparent py-2 text-xs font-medium text-slate-900 placeholder-transparent outline-none transition-all focus:border-slate-900"
                    />
                    <label
                      htmlFor="call-form-message"
                      className="absolute left-0 -top-3.5 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-slate-900"
                    >
                      Project Summary
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group relative mt-4 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:bg-slate-800 hover:shadow-slate-900/25 active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin text-sm" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}