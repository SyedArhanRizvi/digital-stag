"use client"
import React, { useState } from 'react';

// --- Icon Components ---
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Contact Info (Dark Premium Card) */}
        <div className="relative bg-slate-900 text-white p-10 lg:p-14 lg:w-2/5 flex flex-col justify-between overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Let's Connect</h2>
            <p className="text-slate-300 mb-10 leading-relaxed">
              Have a project in mind or need digital solutions? Reach out to us and our experts will get back to you promptly.
            </p>

            <div className="space-y-8">
              {/* Clickable Phone & WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-blue-400">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium mb-1">Phone / WhatsApp</p>
                  <div className="flex items-center space-x-3">
                    <a href="tel:9354683813" className="text-lg hover:text-blue-400 transition-colors duration-300">
                      +91 9354683813
                    </a>
                    <a 
                      href="https://wa.me/919354683813" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                      title="Chat on WhatsApp"
                    >
                      <WhatsAppIcon />
                    </a>
                  </div>
                </div>
              </div>

              {/* Clickable Email */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-blue-400">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium mb-1">Email Us</p>
                  <a href="mailto:Info@digitalstag.in" className="text-lg hover:text-blue-400 transition-colors duration-300">
                    Info@digitalstag.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-blue-400">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium mb-1">Office Address</p>
                  <p className="text-base leading-relaxed">
                    1st Floor, A-64,<br />
                    Sector 04, Noida Building<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              {/* GSTIN */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-blue-400">
                  <DocumentIcon />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium mb-1">GSTIN</p>
                  <p className="text-base font-mono tracking-wider">09GIAPK3307J1Z9</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="relative z-10 mt-16 pt-8 border-t border-slate-700/50">
            <p className="text-sm text-slate-400 font-medium mb-4">Follow us on Social Media</p>
            <div className="flex space-x-4">
              {[
                { icon: <LinkedInIcon />, href: "#", color: "hover:bg-blue-600" },
                { icon: <FacebookIcon />, href: "#", color: "hover:bg-blue-500" },
                { icon: <InstagramIcon />, href: "#", color: "hover:bg-pink-600" },
                { icon: <TwitterIcon />, href: "#", color: "hover:bg-slate-700" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full bg-slate-800 text-slate-300 transition-all duration-300 ${social.color} hover:text-white`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-10 lg:p-14 lg:w-3/5 bg-white">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Send us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Service Select */}
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium text-slate-700">Service Required</label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="seo">SEO Optimization</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="other">Other</option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows="4"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center space-x-2"
            >
              <span>Send Message</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>

          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Contact;