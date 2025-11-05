import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const formItems = formRef.current.querySelectorAll(".form-item");

      gsap.fromTo(
        formItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-[90%] mx-auto my-20 p-10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(245,245,245,0.75))",
      }}
      ref={formRef}
    >
      {/* Animated Background Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10"></div>

      <h2 className="form-item text-4xl md:text-5xl font-bold text-gray-900 text-center mb-10">
        Get in Touch
      </h2>

      <form className="space-y-8 max-w-3xl mx-auto">
        {/* Name Field */}
        <div className="form-item flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300"
          />
        </div>

        {/* Email Field */}
        <div className="form-item flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300"
          />
        </div>

        {/* Message Field */}
        <div className="form-item flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            rows="5"
            placeholder="Tell us about your project..."
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="form-item text-center">
          <button
            type="submit"
            className="px-10 py-4 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-full font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
