"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function CallNowModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.set(modalRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      if (contentRef.current && overlayRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(modalRef.current, { display: "none" });
          },
        });
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
        }, 1500);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] hidden items-center justify-center"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 cursor-pointer"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative z-[10000] w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          /* Success State */
          <div className="px-8 py-12 flex flex-col items-center justify-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: "rgba(16, 185, 129, 0.1)" }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">
              Thank You!
            </h3>
            <p className="text-sm text-gray-600">
              We received your message and will get back to you soon.
            </p>
          </div>
        ) : (
          /* Form State */
          <>
            {/* Header */}
            <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0a0a]">
                Get In Touch
              </h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(0,0,0,0.05)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6">
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a0a0a] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#0a0a0a] placeholder-gray-400 outline-none transition-colors focus:border-[#0a0a0a] focus:bg-gray-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a0a0a] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#0a0a0a] placeholder-gray-400 outline-none transition-colors focus:border-[#0a0a0a] focus:bg-gray-50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a0a0a] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#0a0a0a] placeholder-gray-400 outline-none transition-colors focus:border-[#0a0a0a] focus:bg-gray-50"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a0a0a] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#0a0a0a] placeholder-gray-400 outline-none transition-colors focus:border-[#0a0a0a] focus:bg-gray-50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  style={{ background: "#0a0a0a", color: "white" }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      gsap.to(e.currentTarget, {
                        background: "#333",
                        duration: 0.2,
                        overwrite: "auto",
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      gsap.to(e.currentTarget, {
                        background: "#0a0a0a",
                        duration: 0.2,
                        overwrite: "auto",
                      });
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 012 2.22 2 2 0 013.68 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      Call Me Back
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
