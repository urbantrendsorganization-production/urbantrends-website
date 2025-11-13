import React, { useEffect, useState } from 'react';
import { Quote, Star, Sparkles, Award, TrendingUp, Users } from 'lucide-react';

function Testimonials() {
  const [clientMessages, setClientMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Simulated backend - replace with actual env variable
  // const mainLink = import.meta.env.VITE_MAIN_LINK;

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      // Simulated API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoData = [
        {
          id: 1,
          client_name: "Sarah Johnson",
          client_message: "UrbanTrends transformed our digital presence completely. Their attention to detail and innovative approach exceeded all expectations. Highly recommended!",
          client_image: "https://i.pravatar.cc/150?img=1",
          company: "TechStart Inc.",
          rating: 5
        },
        {
          id: 2,
          client_name: "Michael Chen",
          client_message: "Working with UrbanTrends was a game-changer for our business. They delivered a stunning website that boosted our conversions by 300%.",
          client_image: "https://i.pravatar.cc/150?img=13",
          company: "Digital Dynamics",
          rating: 5
        },
        {
          id: 3,
          client_name: "Emily Rodriguez",
          client_message: "Professional, creative, and results-driven. UrbanTrends doesn't just build websites—they build experiences that convert.",
          client_image: "https://i.pravatar.cc/150?img=5",
          company: "GrowthLab",
          rating: 5
        },
        {
          id: 4,
          client_name: "David Williams",
          client_message: "From concept to launch, the team at UrbanTrends was exceptional. They truly understand modern design and user experience.",
          client_image: "https://i.pravatar.cc/150?img=12",
          company: "Innovate Corp",
          rating: 5
        }
      ];
      
      setClientMessages(demoData);
      
      // Replace with actual API call:
      // const response = await axios.get(`${mainLink}/v2/testimony/clients`);
      // setClientMessages(response.data);
      
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  return (
    <div className="w-full relative py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
        
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
      `}</style>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
        className={`text-center mb-16 max-w-4xl mx-auto transition-all duration-1000 ${
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        {/* Premium Badge */}
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white text-sm font-bold shadow-xl mb-6">
          <Award className="w-5 h-5" />
          <span>Client Success Stories</span>
          <Sparkles className="w-5 h-5" />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-slate-900">What Our </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-slate-600 via-gray-600 to-pink-600 bg-clip-text text-transparent">
              Clients Say
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M2 10C30 3 170 3 198 10"
                stroke="url(#gradient-testimonial)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-testimonial" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="text-xl text-slate-600 leading-relaxed">
          Don't just take our word for it—hear from the businesses we've helped transform
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { icon: Users, value: '500+', label: 'Happy Clients' },
            { icon: Star, value: '4.9/5', label: 'Average Rating' },
            { icon: TrendingUp, value: '98%', label: 'Satisfaction' }
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 hover:scale-105 transition-all duration-300"
              style={{
                animation: isAnimated ? `fadeInUp 0.6s ease-out ${0.6 + i * 0.1}s backwards` : 'none'
              }}
            >
              <div className={`p-2 bg-gradient-to-br ${
                i === 0 ? 'from-blue-400 to-cyan-500' : 
                i === 1 ? 'from-yellow-400 to-orange-500' : 
                'from-green-400 to-emerald-500'
              } rounded-xl`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200/50 shadow-xl animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-slate-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-300 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : clientMessages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {clientMessages.map((client, index) => (
              <div
                key={client.id || index}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200/50 shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: isAnimated ? `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s backwards` : 'none'
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 via-slate-600 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    {client.client_image ? (
                      <img
                        src={client.client_image}
                        alt={client.client_name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-white font-bold text-xl">
                          {client.client_name?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {client.client_name || "Anonymous"}
                    </h3>
                    {client.company && (
                      <p className="text-sm text-slate-500 font-medium">{client.company}</p>
                    )}
                    {/* Star Rating */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(client.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6"></div>

                {/* Message */}
                <p className="text-slate-700 text-base leading-relaxed italic">
                  "{client.client_message || "No message available."}"
                </p>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-slate-500 via-gray-800 to-pink-500 rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
              <Quote className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Testimonials Yet</h3>
            <p className="text-slate-500">Be the first to share your experience!</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {!isLoading && clientMessages.length > 0 && (
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-slate-600 text-lg mb-6">
            Ready to join our success stories?
          </p>
          <button className="group relative px-10 py-5 bg-gradient-to-r from-gray-600 via-slate-800 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-slate-800 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Your Project
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Testimonials;