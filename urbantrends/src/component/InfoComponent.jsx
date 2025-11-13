import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Trophy, TrendingUp, CheckCircle } from 'lucide-react';

function InfoComponent() {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <div className='flex justify-center py-12'>
            <section 
                className="relative w-11/12 md:w-3/4 lg:w-[70%] flex flex-col md:flex-row items-center justify-between gap-12 px-10 py-12
                rounded-[2rem] border-2 border-slate-200/50
                bg-white/70 backdrop-blur-xl shadow-2xl
                hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-700 ease-out overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsHovered(true)}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {/* Gradient Orbs */}
                    <div 
                        className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-gray-300 to-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
                        style={{
                            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    ></div>
                    <div 
                        className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-slate-300 to-orange-800 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
                        style={{
                            animationDelay: '2s',
                            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    ></div>
                    
                    {/* Floating Particles */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-black rounded-full opacity-40"
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    
                    @keyframes pulse-glow {
                        0%, 100% {
                            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                        }
                        50% {
                            box-shadow: 0 0 40px rgba(147, 51, 234, 0.5);
                        }
                    }
                `}</style>

                {/* Left — Enhanced Text */}
                <div className="flex-1 text-center md:text-left space-y-6 relative z-10">
                    {/* Premium Badge */}
                    <div 
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-slate-600 to-pink-600 rounded-full text-white text-xs font-bold shadow-lg mb-2"
                        style={{
                            animation: 'slideIn 0.8s ease-out'
                        }}
                    >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Premium Digital Solutions</span>
                        <Sparkles className="w-3.5 h-3.5" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                        <span className="text-slate-900">Browse Our </span>
                        <span className="relative inline-block text-slate-900">
                            Products
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                height="10"
                                viewBox="0 0 200 10"
                                fill="none"
                            >
                                <path
                                    d="M2 8C30 3 170 3 198 8"
                                    stroke="url(#gradient1)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-gray-600 via-slate-600 to-rose-600 bg-clip-text text-transparent">
                            Get Your Free Trial
                        </span>
                    </h1>

                    <p className="text-slate-600 max-w-xl mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
                        Discover cutting-edge digital tools crafted for business excellence. Experience speed, innovation, and exceptional user experience with UrbanTrends.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                        {[
                            { icon: Zap, text: 'Lightning Fast' },
                            { icon: TrendingUp, text: 'Proven Results' },
                            { icon: CheckCircle, text: 'Easy Setup' }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-700 text-sm font-semibold border border-slate-200 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                                style={{
                                    animation: `slideIn 0.6s ease-out ${0.2 + i * 0.1}s backwards`
                                }}
                            >
                                <feature.icon className="w-4 h-4 text-blue-500" />
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            className="group relative px-8 py-4 bg-gradient-to-r from-slate-600 via-gray-600 to-pink-600 text-white rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                            style={{
                                animation: isHovered ? 'pulse-glow 2s infinite' : 'none'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-slate-600 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"></div>
                            </div>
                            <span className="relative flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Explore Services
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:bg-slate-50 hover:border-slate-300 hover:scale-105 transition-all duration-300 shadow-md">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right — Enhanced Image */}
                <div className="flex-shrink-0 relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Image Container with 3D Effect */}
                    <div 
                        className="relative"
                        style={{
                            transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        {/* Placeholder SVG - Replace with your conversation.svg */}
                        <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50 group-hover:scale-110 transition-transform duration-500">
                            <div className="text-center space-y-3">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                                    <Sparkles className="w-12 h-12 text-white" />
                                </div>
                                <div className="text-slate-600 font-bold">Conversation</div>
                            </div>
                        </div>
                        
                        {/* Replace above div with your actual image: */}
                        {/* <img
                            src={conversation}
                            alt="conversation"
                            className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 rounded-3xl"
                        /> */}
                    </div>

                    {/* Floating Stats Badge */}
                    <div className="absolute -bottom-4 -right-4 px-5 py-3 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 group-hover:scale-110 transition-transform duration-500">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-800">10K+</div>
                                <div className="text-xs text-slate-500 font-medium">Active Users</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InfoComponent;