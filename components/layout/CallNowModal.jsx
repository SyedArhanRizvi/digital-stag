"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  FiX, 
  FiCheck, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiPhoneCall, 
  FiLoader 
} from "react-icons/fi";

export default function CallNowModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Removed overlayRef entirely
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Safety check to ensure refs are attached
    if (!modalRef.current || !contentRef.current) return;

    if (isOpen) {
      gsap.set(modalRef.current, { display: "flex" });
      
      // Fade in the background
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Pop in the content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      // Fade out content
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
      
      // Fade out background and hide modal
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(modalRef.current, { display: "none" });
        },
      });
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
      className="fixed inset-0 z-[9999] hidden items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          /* ── Success State ── */
          <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
            <div className="relative mb-5">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
              >
                <FiCheck className="text-white text-3xl sm:text-4xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-[250px]">
              We received your message and will get back to you within 24 hours.
            </p>
            
            <div className="mt-5 w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <div className="relative px-6 pt-6 pb-4">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />
              
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    Let's Talk
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Fill in the details and we'll call you back
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90 hover:bg-gray-100 bg-gray-50 text-gray-500 hover:text-gray-900"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <div className="flex flex-col gap-3.5">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                      <FiUser className="text-lg" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:bg-gray-50 focus:shadow-sm hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                      <FiMail className="text-lg" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:bg-gray-50 focus:shadow-sm hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                      <FiPhone className="text-lg" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:bg-gray-50 focus:shadow-sm hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                      <FiMessageSquare className="text-lg" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      required
                      rows="3"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:bg-gray-50 focus:shadow-sm hover:border-gray-300 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 mt-1 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  style={{ 
                    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                    color: "white",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin text-lg" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiPhoneCall className="text-lg" />
                      <span>Call Me Back</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-400 mt-1">
                  🔒 Your information is secure and will never be shared
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}