import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Award, TrendingUp, CheckCircle2 } from "lucide-react";

function CompanyAbout({ title, description, image, reverse = false }) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Split title into words for animation
  const titleWords = title?.split(' ') || [];

  return (
    <section
      ref={sectionRef}
      className={`relative flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center justify-between gap-12 w-[92%] mx-auto my-20 py-16 px-8 lg:px-12 rounded-[2.5rem] overflow-hidden `}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes wordReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        ></div>
        <div
          className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-gradient-to-br from-pink-400 to-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-gradient-to-br from-slate-400 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
      `}</style>

      {/* Image Section */}
      <div 
        ref={imgRef}
        className={`md:w-1/2 w-full flex justify-center relative z-10 ${
          isAnimated ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          animation: isAnimated ? `${reverse ? 'fadeInRight' : 'fadeInLeft'} 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-6 bg-gradient-to-r from-slate-500 via-gray-500 to-pink-800 rounded-[2rem] opacity-30 blur-3xl group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {/* Image Container with 3D Effect */}
          <div 
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.2}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <img
              src={image}
              alt={title}
              className="rounded-[2rem] shadow-2xl w-full h-[400px] lg:h-[450px] object-cover border-4 border-white/50 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Premium Badge Overlay */}
            <div className="absolute top-6 right-6 px-4 py-2.5 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Excellence</span>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -right-6 px-6 py-4 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 group-hover:scale-110 transition-transform duration-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-800">5.0</div>
                  <div className="text-xs text-slate-500 font-medium">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div
        ref={textRef}
        className={`md:w-1/2 w-full text-center md:text-left relative z-10 space-y-6 ${
          isAnimated ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          animation: isAnimated ? `${reverse ? 'fadeInLeft' : 'fadeInRight'} 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards` : 'none'
        }}
      >
        {/* Premium Badge */}
        <div 
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-500 via-slate-700 to-black/50 rounded-full text-white text-sm font-bold shadow-lg mb-2"
          style={{
            animation: isAnimated ? 'fadeInUp 0.8s ease-out 0.4s backwards' : 'none'
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Our Story</span>
        </div>

        {/* Animated Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight"
        >
          {titleWords.map((word, index) => (
            <span
              key={index}
              className="inline-block mr-3 bg-gradient-to-r from-slate-900 via-gray-700 to-rose-400 bg-clip-text text-transparent"
              style={{
                animation: isAnimated ? `wordReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.08}s backwards` : 'none'
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Description */}
        <p 
          className="text-slate-600 text-lg leading-relaxed max-w-xl"
          style={{
            animation: isAnimated ? 'fadeInUp 0.8s ease-out 0.8s backwards' : 'none'
          }}
        >
          {description}
        </p>

        {/* Feature Pills */}
        <div 
          className="flex flex-wrap justify-center md:justify-start gap-3 pt-2"
          style={{
            animation: isAnimated ? 'fadeInUp 0.8s ease-out 1s backwards' : 'none'
          }}
        >
          {[
            { icon: CheckCircle2, text: 'Trusted' },
            { icon: Award, text: 'Award-Winning' },
            { icon: TrendingUp, text: 'Growing' }
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-700 text-sm font-semibold border border-slate-200 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <feature.icon className="w-4 h-4 text-blue-500" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 pt-4"
          style={{
            animation: isAnimated ? 'fadeInUp 0.8s ease-out 1.2s backwards' : 'none'
          }}
        >
          <button 
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 via-slate-600 to-gray-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-slate-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"
              ></div>
            </div>
            <span className="relative flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 hover:scale-105 transition-all duration-300 shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default CompanyAbout;