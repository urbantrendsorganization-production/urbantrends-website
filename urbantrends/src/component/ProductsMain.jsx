import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Sparkles, ExternalLink, Package } from "lucide-react";

export default function ProductsMain({ name, image, description, slug }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Simulate GSAP scroll trigger animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`w-full max-w-[340px] mx-auto rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border-2 border-slate-200/50 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-700 flex flex-col group ${
        isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ 
        transitionProperty: 'opacity, transform, box-shadow',
        transitionDuration: '0.8s',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 p-4">
        {image ? (
          <div className="relative">
            {/* Glow effect on hover */}
            <div className="absolute -inset-2 bg-gradient-to-r from-slate-400 via-gray-500 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
            
            <img
              src={image}
              alt={name}
              className="relative w-full h-40 sm:h-48 object-cover rounded-2xl border-2 border-white/50 shadow-lg group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Floating badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-slate-600 rounded-full text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Premium
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl animate-pulse flex items-center justify-center">
            <Package className="w-16 h-16 text-slate-400" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title */}
        {name ? (
          <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-600 group-hover:to-slate-600 transition-all duration-300">
            {name}
          </h3>
        ) : (
          <div className="space-y-2 mb-3">
            <div className="h-5 bg-slate-300 rounded-lg animate-pulse w-4/5"></div>
            <div className="h-5 bg-slate-200 rounded-lg animate-pulse w-3/5"></div>
          </div>
        )}

        {/* Description */}
        {description ? (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
            {description}
          </p>
        ) : (
          <div className="space-y-2 mb-4 flex-grow">
            <div className="h-3 bg-slate-200 rounded animate-pulse w-full"></div>
            <div className="h-3 bg-slate-200 rounded animate-pulse w-11/12"></div>
            <div className="h-3 bg-slate-200 rounded animate-pulse w-4/5"></div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4"></div>

        {/* CTA Button */}
        {slug ? (
          <a
            href={`/products/${slug}`}
            className="relative w-full px-6 py-3.5 bg-gradient-to-r from-gray-600 via-slate-600 to-pink-600 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden group/button flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-slate-600 to-gray-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-1000"
                style={{
                  transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
                }}
              ></div>
            </div>
            <span className="relative flex items-center gap-2">
              <span>View Product</span>
              <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
            </span>
          </a>
        ) : (
          <div className="w-full h-12 bg-slate-300 rounded-xl animate-pulse"></div>
        )}

        {/* Secondary Info */}
        {slug && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-3 h-3" />
            <span>Click to explore features</span>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div 
        className="h-1 bg-gradient-to-r from-slate-500 via-gray-500 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      ></div>
    </div>
  );
}