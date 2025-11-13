import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Eye, ExternalLink, Award, Layers } from "lucide-react";

function PortfolioPreview() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
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

  const projects = [
    {
      title: "SaaS Dashboard UI",
      category: "Web Application",
      img: "https://cdn.cosmos.so/520a0446-70d7-4866-ba49-7dba325f46d6?format=jpeg",
      color: "from-gray-500 to-slate-500"
    },
    {
      title: "E-commerce Experience",
      category: "Online Store",
      img: "https://cdn.cosmos.so/dc613767-b906-48d5-845c-6aab37d38594?format=jpeg",
      color: "from-slate-500 to-pink-500"
    },
    {
      title: "Brand Identity Web",
      category: "Corporate Site",
      img: "https://cdn.cosmos.so/24e3ad82-9f64-418e-a41c-953fd307894f?format=jpeg",
      color: "from-gray-500 to-slate-700"
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-[92%] mx-auto my-28 py-24 px-8 lg:px-12 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
      `}</style>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-slate-400 to-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div 
          className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-gradient-to-br from-pink-400 to-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div 
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating Particles */}
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

      {/* Header Section */}
      <div 
        ref={textRef}
        className={`text-center space-y-6 relative z-10 mb-16 transition-all duration-1000 ${
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Premium Badge */}
        <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white text-sm font-bold shadow-lg mb-4">
          <Award className="w-4 h-4" />
          <span>Featured Work</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
          <span className="text-slate-900">Explore Our </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-gray-600 via-slate-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
            <svg
  className="absolute -bottom-2 left-0 w-full drop-shadow-[0_2px_6px_rgba(219,39,119,0.6)]"
  height="12"
  viewBox="0 0 200 12"
  fill="none"
>
  <path
    d="M2 10C30 3 170 3 198 10"
    stroke="url(#gradient-line)"
    strokeWidth="3"
    strokeLinecap="round"
  />
  <defs>
    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#F9A8D4" /> {/* pink-300 */}
      <stop offset="50%" stopColor="#EC4899" /> {/* pink-500 */}
      <stop offset="100%" stopColor="#BE185D" /> {/* pink-700 */}
    </linearGradient>
  </defs>
</svg>

          </span>
        </h2>

        <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
          From startups to enterprises, we craft digital experiences that drive growth and shape the future. Here's what excellence looks like.
        </p>

        {/* Stats Pills */}
        <div className="flex flex-wrap justify-center gap-6 pt-6">
          {[
            { icon: Layers, value: '50+', label: 'Projects' },
            { icon: Award, value: '15+', label: 'Awards' },
            { icon: Eye, value: '100K+', label: 'Views' }
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 hover:scale-105 transition-all duration-300"
              style={{
                animation: isAnimated ? `fadeInUp 0.6s ease-out ${0.6 + i * 0.1}s backwards` : 'none'
              }}
            >
              <div className={`p-2 bg-gradient-to-br ${stat.value === '50+' ? 'from-slate-400 to-gray-500' : stat.value === '15+' ? 'from-slate-400 to-pink-500' : 'from-gray-400 to-slate-500'} rounded-lg`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative z-10">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-300/50 transition-all duration-700 cursor-pointer ${
              isAnimated ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animation: isAnimated ? `scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.2}s backwards` : 'none'
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-90 transition-all duration-500`}></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                {/* Category Badge */}
                <div className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-3 self-start">
                  <Layers className="w-3 h-3" />
                  <span>{project.category}</span>
                </div>

                <h3 className="text-2xl font-black mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-300">
                    <Eye className="w-4 h-4" />
                    View Case
                  </button>
                  <button className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Border Animation */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-3xl transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div 
        className={`text-center mt-20 relative z-10 transition-all duration-1000 delay-500 ${
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-block">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-gray-600 via-slate-600 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-slate-600 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"></div>
            </div>
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              View Full Portfolio
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <p className="mt-6 text-slate-500 text-sm">
            Discover <span className="font-bold text-blue-600">50+</span> more inspiring projects
          </p>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPreview;