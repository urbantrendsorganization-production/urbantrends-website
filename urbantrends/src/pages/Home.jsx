import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, TrendingUp, Award, Zap, ChevronDown } from "lucide-react";
import { initLenis } from "../lenis";
import Carousel from "../component/Carrousel.jsx";
import About from "../component/About.jsx";
import Card from "../component/Card.jsx";
import ProductsCard from "../component/ProductsCard.jsx";
import Testimonials from "../component/Testimonials.jsx";
import { useNavigate } from "react-router-dom";



function Home() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Replace with your actual Lenis initialization
    initLenis();
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  useEffect(() => {
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

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
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
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 60px rgba(147, 51, 234, 0.5); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative rounded-3xl mx-4 flex flex-col items-center text-center overflow-hidden mt-24 md:mt-28 py-20 sm:py-24 md:py-32 lg:py-40">

        {/* Floating Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
            style={{
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
            style={{
              animationDelay: '4s',
              transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {[...Array(20)].map((_, i) => (
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

        {/* Premium Badge */}
        <div
          className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white text-sm font-bold shadow-xl mb-8 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
        >
          <Award className="w-5 h-5" />
          <span>Award-Winning Digital Software Agency</span>
          <Sparkles className="w-5 h-5" />
        </div>

        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight mb-8 max-w-6xl transition-all duration-1000 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="text-slate-900">Custom software,  </span>
          <span className="relative inline-block">
            <span className="text-slate-900">intelligent automation, </span>
            <svg
              className="absolute -bottom-2 left-0 w-full hidden sm:block"
              height="12"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M2 10C50 3 250 3 298 10"
                stroke="url(#gradient-hero)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9CA3AF" />      {/* light gray */}
                  <stop offset="50%" stopColor="#6B7280" />     {/* medium gray */}
                  <stop offset="100%" stopColor="#374151" />    {/* dark gray */}
                </linearGradient>
              </defs>
            </svg>

          </span>
          <br />
          <span className="text-slate-900">& </span>
          <span className="bg-gradient-to-r from-gray-600 via-gray-900 to-pink-600 bg-clip-text text-transparent">
            digital transformation solutions
          </span>
        </h1>

        {/* Sub-heading */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto px-4 leading-relaxed mb-10 transition-all duration-1000 delay-400 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          UrbanTrends is your tech partner — designing and delivering advanced digital products that connect systems, fuel innovation, and unlock new revenue opportunities.        </p>

        {/* Stats Pills */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-12 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {[
            { icon: TrendingUp, value: '200+', label: 'Projects', color: 'from-gray-400 to-slate-500' },
            { icon: Award, value: '50+', label: 'Awards', color: 'from-slate-400 to-slate-700' },
            { icon: Zap, value: '99.9%', label: 'Success Rate', color: 'from-gray-400 to-slate-500' }
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 hover:scale-105 transition-all duration-300"
            >
              <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-xl`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 transition-all duration-1000 delay-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <button
            onClick={() => navigate('/products')}
            className="group relative px-10 py-5 bg-gradient-to-r from-pink-600 via-gray-600 to-slate-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-slate-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
            style={{
              animation: 'pulse-glow 3s infinite'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-gray-600 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"></div>
            </div>
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              View Products
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => navigate('/portfolio')}
            className="px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-white hover:border-slate-300 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            View Portfolio
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`flex flex-col items-center text-slate-400 transition-all duration-1000 delay-900 ${isAnimated ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <p className="text-sm font-medium mb-2">Scroll to explore</p>
          <ChevronDown
            className="w-6 h-6"
            style={{
              animation: 'bounce-slow 2s infinite'
            }}
          />
        </div>

        {/* CAROUSEL SECTION */}
        <div
          className={`mt-20 w-full max-w-[1400px] transition-all duration-1000 delay-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full text-white text-sm font-bold shadow-lg mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Our Solutions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Discover What We Offer
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explore our comprehensive range of products and services designed for your success
            </p>
          </div>
          <Carousel />
        </div>
      </section>

      {/* SECTIONS WITH SPACING */}
      <div className="space-y-24 py-16">
        {/* About Section */}
        <section className="container mx-auto px-4">
          <About />
        </section>

        {/* Services Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white text-sm font-bold shadow-lg mb-6">
              <Zap className="w-4 h-4" />
              <span>Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What We Do Best
            </h2>
          </div>
          <Card />
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-white text-sm font-bold shadow-lg mb-6">
              <Award className="w-4 h-4" />
              <span>Our Products</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Premium Solutions
            </h2>
          </div>
          <ProductsCard />
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4">

          <Testimonials />
        </section>
      </div>
    </div>
  );
}

export default Home;