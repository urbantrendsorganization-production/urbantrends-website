import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, ExternalLink, Zap, Package } from "lucide-react";
import axios from "axios";

function Carousel() {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Simulated backend link - replace with your actual env variable
  const backendLink = import.meta.env.VITE_MAIN_LINK;

  const fetchData = async () => {
    try {
      // Demo data for preview - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Replace above with actual API calls:
      
      const [servicesRes, productsRes] = await Promise.all([
        axios.get(`${backendLink}/v2/api/services`),
        axios.get(`${backendLink}/v2/products/products`),
      ]);

      const servicesData = servicesRes.data.map((item) => ({
        id: `service-${item.id}`,
        title: item.title,
        description: item.description,
        image: item.service_image,
        slug: item.slug,
        type: "service",
      }));

      const productsData = productsRes.data.map((item) => ({
        id: `product-${item.id}`,
        title: item.product_name,
        description: item.description,
        image: item.product_image,
        slug: item.slug_name,
        type: "product",
      }));

      const combinedData = [...servicesData, ...productsData].sort(
        () => Math.random() - 0.5
      );

      setItems(combinedData);
      
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRedirect = (item) => {
    if (item.type === "service") {
      window.location.href = `/services/${item.slug}`;
    } else if (item.type === "product") {
      window.location.href = `/product/${item.slug}`;
    }
  };

  return (
    <div className="w-full py-8 overflow-hidden relative">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Gradient Overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Container */}
      <div className="flex animate-scroll">
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            onClick={() => handleRedirect(item)}
            onMouseEnter={() => setHoveredItem(`${item.id}-${index}`)}
            onMouseLeave={() => setHoveredItem(null)}
            className="cursor-pointer flex-shrink-0 mx-4 w-[220px] h-[320px] sm:w-[260px] sm:h-[360px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[440px]"
          >
            <div className="h-full bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 transition-all duration-500 flex flex-col border-2 border-slate-200/50 group relative">
              
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 via-slate-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></div>

              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 sm:h-44 md:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Type Badge */}
                <span
                  className={`absolute top-3 left-3 text-xs px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20 ${
                    item.type === "service"
                      ? "bg-gradient-to-r from-gray-500 to-pink-500 text-white"
                      : "bg-gradient-to-r from-slate-400 to-pink-800 text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.type === "service" ? (
                      <Zap className="w-3 h-3" />
                    ) : (
                      <Package className="w-3 h-3" />
                    )}
                    {item.type.toUpperCase()}
                  </span>
                </span>

                {/* Premium badge on hover */}
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-bold text-slate-800">Featured</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="font-black text-base sm:text-lg lg:text-xl mb-2 line-clamp-2 text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-600 group-hover:to-slate-600 transition-all duration-300">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 flex-grow line-clamp-3 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4"></div>

                {/* CTA Button */}
                <button
                  className="relative w-full bg-gradient-to-r from-gray-600 via-slate-600 to-rose-600 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-slate-600 to-gray-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-1000"
                      style={{
                        transform: hoveredItem === `${item.id}-${index}` ? 'translateX(100%)' : 'translateX(-100%)'
                      }}
                    ></div>
                  </div>
                  <span className="relative flex items-center justify-center gap-2">
                    <span>Explore Now</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>

                {/* Secondary info on hover */}
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-3 h-3" />
                  <span>Click to view details</span>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-slate-500 via-gray-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;