import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function CompanyAbout({ title, description, image, reverse = false }) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the title text into words
      const split = new SplitType(titleRef.current, { types: "words" });

      // Animate title words
      gsap.from(split.words, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Image slide-in animation
      gsap.from(imgRef.current, {
        x: reverse ? 120 : -120,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Text section animation
      gsap.from(textRef.current, {
        x: reverse ? -120 : 120,
        opacity: 0,
        duration: 1.3,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center justify-between gap-10 w-[90%] mx-auto my-20 py-12 px-6 rounded-3xl overflow-hidden`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />

      {/* Blobs */}
      <div className="absolute -top-20 -left-24 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-black/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Image */}
      <div ref={imgRef} className="md:w-1/2 w-full flex justify-center relative z-10">
        <img
          src={image}
          alt={title}
          className="rounded-2xl shadow-2xl w-full h-[380px] object-cover hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="md:w-1/2 w-full text-center md:text-left relative z-10 space-y-6"
      >
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          {title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        <button className="px-7 py-3 bg-gray-900 text-white rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
}

export default CompanyAbout;
