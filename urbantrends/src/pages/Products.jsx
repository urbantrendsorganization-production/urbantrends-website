import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfoComponent from "../component/InfoComponent";
import ProductsMain from "../component/ProductsMain";

// Register GSAP plugin once
gsap.registerPlugin(ScrollTrigger);

function Products() {
  const filterRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate filter bar on mount
      gsap.from(filterRef.current, {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power3.out",
      });

      // Animate cards on scroll
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // when card enters viewport
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] mt-22">
      {/* Info Section */}
      <div className="w-full mx-auto">
        <InfoComponent />
      </div>

      {/* Filter Bar */}
      <div
        ref={filterRef}
        className="w-3/4 md:w-1/2 mx-auto mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 py-3 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full sm:w-2/3 px-4 py-2 rounded-xl border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-500 text-sm md:text-base transition-all"
        />

        {/* Filter Dropdown */}
        <select
          className="w-full sm:w-1/3 px-4 py-2 rounded-xl border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm md:text-base transition-all"
        >
          <option value="">Filter by</option>
          <option value="web">Web Development</option>
          <option value="uiux">UI/UX Design</option>
          <option value="seo">SEO Services</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Products Section with Scroll Animations */}
      <div className="md:w-1/2 mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center px-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="w-full"
          >
            <ProductsMain />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
