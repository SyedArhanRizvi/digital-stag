"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiZap,
} from "react-icons/fi";

/* ─────────────────────────────────────────────────────────────
   Custom hook: Intersection Observer
───────────────────────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once) observer.unobserve(node);
        } else if (!options.once) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.margin || "0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.once, options.margin, options.threshold]);

  return [ref, inView];
}

function S5() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [badgeRef, badgeInView] = useInView({ once: true, margin: "-50px" });
  const [headingRef, headingInView] = useInView({
    once: true,
    margin: "-50px",
  });
  const [descRef, descInView] = useInView({ once: true, margin: "-50px" });
  const [formRef, formInView] = useInView({ once: true, margin: "-50px" });

  const totalSteps = 5;

  const steps = [
    { id: 1, title: "Start", icon: FiZap },
    { id: 2, title: "Info", icon: FiUser },
    { id: 3, title: "Details", icon: FiMessageSquare },
    { id: 4, title: "Review", icon: FiCheck },
    { id: 5, title: "Done", icon: FiSend },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
    }
    if (step === 3) {
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))
        newErrors.phone = "Invalid phone number";
      if (!formData.message.trim()) newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if ((currentStep === 2 || currentStep === 3) && !validateStep(currentStep))
      return;
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/save-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        setCurrentStep(5);
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

  const progressPercentage =
    currentStep < 5 ? ((currentStep - 1) / (totalSteps - 2)) * 100 : 100;

  const contactItems = [
    {
      icon: FiMail,
      title: "Email Us",
      value: "Info@digitalstag.in",
      href: "mailto:Info@digitalstag.in",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      value: "1st Floor, A-64, Sector 4, Noida, Uttar Pradesh, India, 201301",
      href: "#",
    },
    {
      icon: FiClock,
      title: "Working Hours",
      value: "Mon - Fri, 10 AM - 6 PM",
      href: "#",
    },
  ];

  const socialIcons = [FiInstagram, FiLinkedin, FiFacebook];

  return (
    <section
      style={{
        background: "#fafafa",
        padding: "clamp(60px, 8vw, 100px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@600;700;800&display=swap');

        .s5 * { box-sizing: border-box; }
        .s5 { font-family: 'Inter', sans-serif; }
        .s5-heading { font-family: 'Playfair Display', serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-animation { animation: pulse 2s ease-in-out infinite; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation { animation: spin 1s linear infinite; }

        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in { animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        .input-field {
          transition: all 0.25s ease;
          background: #fff;
          border: 1.5px solid #e5e5e5;
          border-radius: 12px;
          padding: 14px 18px;
          width: 100%;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          color: #0a0a0a;
          outline: none;
        }
        .input-field:focus {
          border-color: #0a0a0a;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.04);
        }
        .input-field.error {
          border-color: #dc2626;
        }
        .input-field::placeholder { color: #b0b0b0; }

        .step-indicator {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .step-indicator.active {
          background: #0a0a0a;
          color: #fff;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .step-indicator.completed {
          background: #0a0a0a;
          color: #fff;
        }

        .contact-card {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .contact-card:hover {
          transform: translateX(6px);
          border-color: #d4d4d4 !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04) !important;
        }

        .social-icon {
          transition: all 0.25s ease;
        }
        .social-icon:hover {
          background: #0a0a0a !important;
          color: #fff !important;
          border-color: #0a0a0a !important;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-in-up.visible { opacity: 1; transform: translateY(0); }

        .fade-in-left {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .fade-in-left.visible { opacity: 1; transform: translateX(0); }

        .form-fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-fade-in.visible { opacity: 1; transform: translateY(0); }

        .step-content {
          opacity: 0;
          transform: translateX(16px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .step-content.active { opacity: 1; transform: translateX(0); }

        .btn-primary {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }
        .btn-secondary {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background: #f5f5f5;
          border-color: #d4d4d4;
        }

        /* Responsive Styles */
        @media (max-width: 1023px) {
          .s5-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .s5-left { 
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .contact-cards { 
            align-items: center !important;
            width: 100% !important;
          }
          .contact-cards a {
            max-width: 100% !important;
            width: 100% !important;
          }
          .s5-desc {
            max-width: 100% !important;
            text-align: center !important;
          }
        }
        
        @media (max-width: 640px) {
          .s5-grid {
            gap: 36px !important;
          }
          .step-buttons {
            flex-direction: column;
            gap: 12px !important;
          }
          .step-buttons button {
            width: 100% !important;
            justify-content: center !important;
          }
          .contact-card {
            flex-direction: column;
            align-items: flex-start !important;
            text-align: left;
          }
          .contact-card:hover {
            transform: translateY(-2px) !important;
          }
          .input-field {
            font-size: 14px !important;
            padding: 12px 16px !important;
          }
          .step-indicator {
            width: 26px !important;
            height: 26px !important;
            font-size: 10px !important;
          }
        }
        
        @media (max-width: 480px) {
          .s5-heading {
            font-size: clamp(28px, 7vw, 32px) !important;
          }
          .contact-card {
            padding: 12px 16px !important;
          }
          .social-icons-container {
            justify-content: center !important;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div
        className="s5"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 64px)",
        }}
      >
        <div
          className="s5-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT ── */}
          <div className="s5-left">
            {/* Badge - only purple accent here */}
            <div
              ref={badgeRef}
              className={`fade-in-up ${badgeInView ? "visible" : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "50px",
                padding: "7px 18px",
                marginBottom: "24px",
              }}
            >
              <div
                className="pulse-animation"
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#7c3aed",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#7c3aed",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Get In Touch
              </span>
            </div>

            {/* Heading - black & white */}
            <h2
              ref={headingRef}
              className={`s5-heading fade-in-up ${headingInView ? "visible" : ""}`}
              style={{
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 800,
                color: "#0a0a0a",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                transitionDelay: headingInView ? "0.1s" : "0s",
              }}
            >
              Let&apos;s Start a
              <br />
              <span style={{ color: "#0a0a0a" }}>Conversation</span>
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className={`s5-desc fade-in-up ${descInView ? "visible" : ""}`}
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "#737373",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "480px",
                width: "100%",
                transitionDelay: descInView ? "0.2s" : "0s",
              }}
            >
              Have a project in mind? We&apos;d love to hear about it. Send us a
              message and we&apos;ll respond within 24 hours.
            </p>

            {/* Contact Cards - Same width on all screens */}
            <div
              className="contact-cards"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBottom: "40px",
                width: "100%",
                maxWidth: "380px",
              }}
            >
              {contactItems.map((item, index) => {
                const [cardRef, cardInView] = useInView({
                  once: true,
                  margin: "-30px",
                });
                return (
                  <a
                    key={index}
                    ref={cardRef}
                    href={item.href}
                    className={`contact-card fade-in-left ${cardInView ? "visible" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "#fff",
                      borderRadius: "12px",
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid #f0f0f0",
                      width: "100%",
                      transitionDelay: `${0.3 + index * 0.1}s`,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <item.icon size={18} color="#0a0a0a" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#a3a3a3",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          marginBottom: "3px",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#0a0a0a",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div
              className={`social-icons-container fade-in-up ${descInView ? "visible" : ""}`}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                transitionDelay: "0.7s",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#a3a3a3",
                  letterSpacing: "0.06em",
                  marginRight: "4px",
                }}
              >
                FOLLOW US
              </span>
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="social-icon"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: "#fff",
                    border: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#737373",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT - FORM ── */}
          <div
            ref={formRef}
            className={`form-fade-in ${formInView ? "visible" : ""}`}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "clamp(24px, 4vw, 44px)",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.04)",
              border: "1px solid #f0f0f0",
              position: "relative",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {/* Top accent line - only purple decorative element */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "#7c3aed",
              }}
            />

            {/* Progress Bar */}
            {currentStep < 5 && (
              <div style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "18px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "0",
                      right: "0",
                      height: "1.5px",
                      background: "#f0f0f0",
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: "#0a0a0a",
                        width: `${progressPercentage}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>

                  {steps.slice(0, -1).map((step) => (
                    <div
                      key={step.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <div
                        className={`step-indicator ${currentStep > step.id ? "completed" : currentStep === step.id ? "active" : ""}`}
                        style={{
                          width: "clamp(24px, 3vw, 30px)",
                          height: "clamp(24px, 3vw, 30px)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            currentStep > step.id
                              ? "#0a0a0a"
                              : currentStep === step.id
                                ? "#0a0a0a"
                                : "#f5f5f5",
                          color: currentStep >= step.id ? "#fff" : "#a3a3a3",
                          fontWeight: 600,
                          fontSize: "clamp(10px, 1.2vw, 12px)",
                          border:
                            currentStep === step.id
                              ? "2px solid #e5e5e5"
                              : "2px solid transparent",
                        }}
                      >
                        {currentStep > step.id ? (
                          <FiCheck size={14} />
                        ) : (
                          <step.icon size={14} />
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: "clamp(8px, 1vw, 10px)",
                          fontWeight: currentStep === step.id ? 600 : 500,
                          color: currentStep >= step.id ? "#0a0a0a" : "#b0b0b0",
                          letterSpacing: "0.03em",
                          textAlign: "center",
                        }}
                      >
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step Content */}
            <div
              style={{
                minHeight: "clamp(260px, 30vw, 300px)",
                position: "relative",
              }}
            >
              {/* Step 1 */}
              <div
                className={`step-content ${currentStep === 1 ? "active" : ""}`}
                style={{
                  display: currentStep === 1 ? "flex" : "none",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "clamp(260px, 30vw, 300px)",
                  textAlign: "center",
                }}
              >
                <div
                  className="float-animation"
                  style={{
                    width: "clamp(56px, 6vw, 72px)",
                    height: "clamp(56px, 6vw, 72px)",
                    borderRadius: "20px",
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <FiZap size={32} color="#7c3aed" />
                </div>
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "10px",
                  }}
                >
                  Stop Chasing Vanity Metrics. <br /> Start Converting.
                </h3>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.2vw, 14px)",
                    color: "#737373",
                    lineHeight: 1.6,
                    marginBottom: "28px",
                    maxWidth: "380px",
                    padding: "0 10px",
                  }}
                >
                Let's build a system that works for your business. No fluff, just results.

                </p>
                <button
                  onClick={handleNext}
                  className="btn-primary"
                  style={{
                    padding: "clamp(12px, 2vw, 14px) clamp(28px, 4vw, 36px)",
                    background: "#0a0a0a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "clamp(14px, 1.5vw, 15px)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                 Schedule Your Strategy Call Today <FiArrowRight size={16} />
                </button>
              </div>

              {/* Step 2 */}
              <div
                className={`step-content ${currentStep === 2 ? "active" : ""}`}
                style={{ display: currentStep === 2 ? "block" : "none" }}
              >
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 20px)",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "6px",
                  }}
                >
                  Tell us about yourself
                </h3>
                <p
                  style={{
                    fontSize: "clamp(12px, 1.2vw, 13px)",
                    color: "#a3a3a3",
                    marginBottom: "clamp(20px, 3vw, 28px)",
                  }}
                >
                  We&apos;ll use this to get in touch with you.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "clamp(11px, 1vw, 12px)",
                        fontWeight: 600,
                        color: "#0a0a0a",
                        marginBottom: "6px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`input-field ${errors.name ? "error" : ""}`}
                    />
                    {errors.name && (
                      <span
                        style={{
                          color: "#dc2626",
                          fontSize: "11px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "clamp(11px, 1vw, 12px)",
                        fontWeight: 600,
                        color: "#0a0a0a",
                        marginBottom: "6px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`input-field ${errors.email ? "error" : ""}`}
                    />
                    {errors.email && (
                      <span
                        style={{
                          color: "#dc2626",
                          fontSize: "11px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`step-content ${currentStep === 3 ? "active" : ""}`}
                style={{ display: currentStep === 3 ? "block" : "none" }}
              >
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 20px)",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "6px",
                  }}
                >
                  Project Details
                </h3>
                <p
                  style={{
                    fontSize: "clamp(12px, 1.2vw, 13px)",
                    color: "#a3a3a3",
                    marginBottom: "clamp(20px, 3vw, 28px)",
                  }}
                >
                  Help us understand your needs better.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "clamp(11px, 1vw, 12px)",
                        fontWeight: 600,
                        color: "#0a0a0a",
                        marginBottom: "6px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9354683813"
                      className={`input-field ${errors.phone ? "error" : ""}`}
                    />
                    {errors.phone && (
                      <span
                        style={{
                          color: "#dc2626",
                          fontSize: "11px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "clamp(11px, 1vw, 12px)",
                        fontWeight: 600,
                        color: "#0a0a0a",
                        marginBottom: "6px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..."
                      className={`input-field ${errors.message ? "error" : ""}`}
                      rows={4}
                      style={{
                        resize: "vertical",
                        minHeight: "clamp(90px, 12vw, 110px)",
                      }}
                    />
                    {errors.message && (
                      <span
                        style={{
                          color: "#dc2626",
                          fontSize: "11px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div
                className={`step-content ${currentStep === 4 ? "active" : ""}`}
                style={{ display: currentStep === 4 ? "block" : "none" }}
              >
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 20px)",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "6px",
                  }}
                >
                  Review Your Details
                </h3>
                <p
                  style={{
                    fontSize: "clamp(12px, 1.2vw, 13px)",
                    color: "#a3a3a3",
                    marginBottom: "clamp(20px, 3vw, 28px)",
                  }}
                >
                  Please verify your information before submitting.
                </p>
                <div
                  style={{
                    background: "#fafafa",
                    borderRadius: "12px",
                    padding: "clamp(16px, 2vw, 20px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  {[
                    { label: "Name", value: formData.name },
                    { label: "Email", value: formData.email },
                    { label: "Phone", value: formData.phone },
                    { label: "Message", value: formData.message },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        paddingBottom: index < 3 ? "14px" : "0",
                        borderBottom: index < 3 ? "1px solid #e5e5e5" : "none",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(11px, 1vw, 12px)",
                          fontWeight: 600,
                          color: "#a3a3a3",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(12px, 1.2vw, 13px)",
                          fontWeight: 500,
                          color: "#0a0a0a",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 5 */}
              <div
                className={`step-content ${currentStep === 5 ? "active" : ""}`}
                style={{
                  display: currentStep === 5 ? "flex" : "none",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "clamp(260px, 30vw, 300px)",
                  textAlign: "center",
                }}
              >
                <div
                  className="scale-in"
                  style={{
                    width: "clamp(56px, 6vw, 72px)",
                    height: "clamp(56px, 6vw, 72px)",
                    borderRadius: "50%",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <FiCheck size={36} color="#fff" />
                </div>
                <h3
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 24px)",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "10px",
                  }}
                >
                  Thank You!
                </h3>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.2vw, 14px)",
                    color: "#737373",
                    lineHeight: 1.6,
                    marginBottom: "6px",
                    maxWidth: "380px",
                    padding: "0 10px",
                  }}
                >
                  Your enquiry has been submitted successfully.
                </p>
                <p
                  style={{
                    fontSize: "clamp(12px, 1.1vw, 13px)",
                    color: "#a3a3a3",
                    lineHeight: 1.6,
                    maxWidth: "380px",
                    padding: "0 10px",
                  }}
                >
                  We&apos;ll review your request and get back to you within 24
                  hours.
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            {currentStep > 1 && currentStep < 5 && (
              <div
                className="step-buttons"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "clamp(24px, 3vw, 36px)",
                  gap: "14px",
                }}
              >
                <button
                  onClick={handleBack}
                  className="btn-secondary"
                  style={{
                    padding: "clamp(10px, 1.5vw, 12px) clamp(20px, 3vw, 24px)",
                    background: "#fff",
                    color: "#0a0a0a",
                    border: "1.5px solid #e5e5e5",
                    borderRadius: "10px",
                    fontSize: "clamp(12px, 1.2vw, 13px)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <FiArrowLeft size={14} /> Back
                </button>

                {currentStep === 4 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      padding:
                        "clamp(10px, 1.5vw, 12px) clamp(24px, 3vw, 28px)",
                      background: isSubmitting ? "#737373" : "#0a0a0a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "clamp(12px, 1.2vw, 13px)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      minWidth: "110px",
                      justifyContent: "center",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          className="spin-animation"
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid #fff",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit <FiSend size={14} />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="btn-primary"
                    style={{
                      padding:
                        "clamp(10px, 1.5vw, 12px) clamp(24px, 3vw, 28px)",
                      background: "#0a0a0a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "clamp(12px, 1.2vw, 13px)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {currentStep === 3 ? "Review" : "Continue"}{" "}
                    <FiArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default S5;
