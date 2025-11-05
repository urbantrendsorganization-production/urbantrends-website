import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactCTA = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          ease: "back.out(1.7)",
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
      className="relative w-[90%] mx-auto rounded-2xl mb-3 py-32 text-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />

      {/* Motion blobs */}
      <div className="absolute -top-20 -left-16 w-96 h-96 bg-gray-500 mix-blend-multiply filter blur-3xl opacity-30 rounded-full animate-blob"></div>
      <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-slate-600 mix-blend-multiply filter blur-3xl opacity-25 rounded-full animate-blob animation-delay-2000"></div>

      <div ref={textRef} className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Ready to Build <br />
          <span className="bg-gradient-to-r from-slate-600 to-gray-500 bg-clip-text text-transparent">
            Something Timeless?
          </span>
        </h2>
        <p className="text-gray-600 mt-6 text-lg md:text-xl">
          Let’s turn your ideas into a digital experience that truly stands out.
        </p>
      </div>

      <div ref={buttonRef} className="mt-10 relative z-10">
        <button className="px-10 py-4 text-white font-semibold rounded-full bg-gradient-to-r from-slate-600 to-gray-600 shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
          Start Your Project
        </button>
      </div>
    </section>
  );
};

export default ContactCTA;
