import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Award, Zap } from "lucide-react";

function PortfolioIntro() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRef = useRef(null);
  const blobsRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate GSAP animations with CSS transitions
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "translateY(0)";
      }
    }, 100);

    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transform = "translateY(0)";
      }
    }, 400);

    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.style.opacity = "1";
        imgRef.current.style.transform = "scale(1) translateY(0)";
      }
    }, 600);

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col-reverse lg:flex-row items-center justify-between w-[92%] mx-auto my-20 py-20 px-8 lg:px-12 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Floating Gradient Orbs - Enhanced */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={(el) => (blobsRef.current[0] = el)}
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: "transform 0.3s ease-out"
          }}
        ></div>
        <div
          ref={(el) => (blobsRef.current[1] = el)}
          className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
          style={{
            animationDelay: "2s",
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
            transition: "transform 0.3s ease-out"
          }}
        ></div>
        <div
          ref={(el) => (blobsRef.current[2] = el)}
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{
            animationDelay: "4s",
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
            transition: "transform 0.3s ease-out"
          }}
        ></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
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
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Text Section - Enhanced */}
      <div className="lg:w-1/2 w-full text-center lg:text-left space-y-8 relative z-10">
        {/* Premium Badge */}
        <div
          ref={titleRef}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-500 via-slate-500 to-rose-500 rounded-full text-white text-sm font-bold shadow-lg opacity-0 translate-y-12 mb-4"
          style={{ transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Award className="w-4 h-4" />
          <span>Award-Winning Studio</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700 leading-[1.1] opacity-0 translate-y-12"
          style={{
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 5s ease infinite"
          }}
        >
          Crafting Digital{" "}
          <span className="relative inline-block">
            Excellence
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C30 3 170 3 198 10"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-slate-900 leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-0 translate-y-8"
          style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
        >
          Where innovation meets artistry. Every pixel, every interaction, every experience is meticulously crafted to inspire and captivate.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
          {[
            { value: "500+", label: "Projects" },
            { value: "98%", label: "Satisfaction" },
            { value: "50+", label: "Awards" }
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center lg:text-left"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: `${0.8 + i * 0.1}s`
              }}
            >
              <div className="text-3xl font-black bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button - Premium */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 py-4 bg-gradient-to-r from-slate-600 via-gray-600 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-slate-800 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                style={{ animation: isHovered ? "shimmer 1s ease-in-out" : "none" }}
              ></div>
            </div>
            <span className="relative flex items-center justify-center gap-3">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-white hover:border-slate-300 hover:scale-105 transition-all duration-300 shadow-lg">
            View Process
          </button>
        </div>
      </div>

      {/* Image Section - Enhanced */}
      <div className="lg:w-1/2 w-full flex justify-center mb-12 lg:mb-0 relative z-10">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-500 via-slate-500 to-rose-500 rounded-[2rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {/* Image Container */}
          <div className="relative">
            <img
              ref={imgRef}
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
              alt="Portfolio Overview"
              className="rounded-[2rem] shadow-2xl w-full max-w-[550px] h-[320px] sm:h-[420px] lg:h-[480px] object-cover opacity-0 scale-95 translate-y-12 border-4 border-white/50"
              style={{
                transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.2}deg)`
              }}
            />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 px-6 py-4 bg-white rounded-2xl shadow-2xl border border-slate-200 transform group-hover:scale-110 transition-transform duration-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-800">4.9</div>
                  <div className="text-xs text-slate-500 font-medium">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default PortfolioIntro;