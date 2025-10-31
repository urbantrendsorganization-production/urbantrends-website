import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [getServices, setGetServices] = useState([]);
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${backendLink}/v2/api/services`);
      setGetServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    const scrollAmount = 400;
    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleRedirect = (slug) => {
    navigate(`/services/${slug}`);
  };

  return (
    <section className="relative mx-auto px-6 py-12 group">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Explore Our Services
      </h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-md p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable Services */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
      >
        {getServices.map((service) => (
          <div
            key={service.id}
            onClick={() => handleRedirect(service.slug)}
            className="min-w-[300px] sm:min-w-[340px] bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden group/item cursor-pointer snap-center"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={service.service_image}
                alt={service.title}
                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover/item:text-gray-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
              <p className="text-xs text-gray-400 mt-3 italic">
                {service.slug}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-md p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Card;
