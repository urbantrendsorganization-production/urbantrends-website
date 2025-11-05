import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactIntro = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance animation
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-[90%] mx-auto py-28 px-6 text-center overflow-hidden rounded"
    >
      {/* Background Gradient + Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-48 -right-16 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Text */}
      <div ref={textRef} className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Let’s Create <span className="bg-gradient-to-r from-slate-500 to-gray-800 bg-clip-text text-transparent">Something Extraordinary</span>
        </h2>
        <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          Have a project in mind? A bold idea? Or just want to say hi?
          We’d love to turn your vision into something unforgettable.
        </p>
      </div>

      {/* Subtle Glow Line */}
      <div className="mt-12 h-[2px] w-32 mx-auto bg-gradient-to-r from-gray-400 to-black/50 rounded-full opacity-70"></div>
    </section>
  );
};

export default ContactIntro;
