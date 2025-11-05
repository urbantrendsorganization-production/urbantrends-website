import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function PortfolioPreview() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-[90%] mx-auto my-28 py-20 px-6 rounded-3xl overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />

      {/* Blobs */}
      <div className="absolute -top-20 -left-24 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-black/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Text Content */}
      <div ref={textRef} className="text-center space-y-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Explore Our <span className="text-gray-700">Portfolio</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          From startups to enterprises, we build digital experiences that drive
          growth and shape the future. Here’s a glimpse of what we’ve crafted.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 relative z-10">
        {[
          {
            title: "SaaS Dashboard UI",
            img: "https://cdn.cosmos.so/520a0446-70d7-4866-ba49-7dba325f46d6?format=jpeg",
          },
          {
            title: "E-commerce Experience",
            img: "https://cdn.cosmos.so/dc613767-b906-48d5-845c-6aab37d38594?format=jpeg",
          },
          {
            title: "Brand Identity Web",
            img: "https://cdn.cosmos.so/24e3ad82-9f64-418e-a41c-953fd307894f?format=jpeg",
          },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-white">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <span className="flex items-center gap-2 text-sm opacity-80 group-hover:opacity-100 transition">
                View Case Study <ArrowRight size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 relative z-10">
        <button className="px-8 py-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 mx-auto">
          View Full Portfolio <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default PortfolioPreview;
