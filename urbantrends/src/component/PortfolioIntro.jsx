import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function PortfolioIntro() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade-in
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 40,
        delay: 0.3,
        duration: 1,
        ease: "power3.out",
      });

      // Image fade + parallax
      gsap.from(imgRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 50,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Parallax for blobs
      blobsRef.current.forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: i % 2 === 0 ? 20 : -20,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col-reverse lg:flex-row items-center justify-between w-[92%] mx-auto my-20 py-20 px-6 rounded-3xl overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />

      {/* Animated Blobs */}
      <div
        ref={(el) => (blobsRef.current[0] = el)}
        className="absolute -top-24 -left-24 w-72 sm:w-80 h-72 sm:h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
      ></div>
      <div
        ref={(el) => (blobsRef.current[1] = el)}
        className="absolute top-48 -right-16 w-80 sm:w-96 h-80 sm:h-96 bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"
      ></div>
      <div
        ref={(el) => (blobsRef.current[2] = el)}
        className="absolute bottom-0 left-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-black/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"
      ></div>

      {/* Text Section */}
      <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6 relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Crafting <span className="text-gray-700">Digital Perfection</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
        >
          Our portfolio is a reflection of innovation and precision. Every
          design and product we craft embodies strategy, creativity, and
          top-tier engineering.
        </p>

        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center lg:justify-start gap-2 mx-auto lg:mx-0">
          Explore Projects <ArrowRight size={18} />
        </button>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center mb-10 lg:mb-0 relative z-10">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
          alt="Portfolio Overview"
          className="rounded-2xl shadow-2xl w-full max-w-[550px] h-[300px] sm:h-[400px] lg:h-[450px] object-cover hover:scale-[1.02] transition-transform duration-700"
        />
      </div>
    </section>
  );
}

export default PortfolioIntro;
