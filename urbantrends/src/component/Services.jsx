import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Services() {
  const [servicesShowcase, setServicesShowcase] = useState([]);
  const [error, setError ] = useState(null) 

  const mainLink = import.meta.env.VITE_MAIN_LINK;

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${mainLink}/v2/api/services`)
      setServicesShowcase(response.data)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchServices()
  }, []);

  if (error) return console.log(`Error: ${error.message}`)


  return (
    <div className="w-full relative px-4 py-8 space-y-4">

      {/* glowing element */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
      </div>
      <h2 className="text-2xl md:text-5xl font-bold mb-8 font-tech underline text-center">
        Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesShowcase.map((service, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Title trapezium */}
            <div
              className="text-black font-semibold font-tech text-center py-3 text-sm sm:text-base md:text-lg"
              style={{
                background: "linear-gradient(135deg, #565656, transparent)",
                clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)"
              }}
            >
              {service.title}
            </div>

            {/* Image */}
            <div className="w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded">
              <img
                src={service.service_image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-gray-700 text-sm sm:text-base">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* products */}

      <h2 className="text-2xl md:text-5xl font-bold mb-8 mt-3 font-tech underline text-center">
       Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesShowcase.map((service, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Title trapezium */}
            <div
              className="text-black font-semibold text-center py-3 text-sm sm:text-base md:text-lg"
              style={{
                background: "linear-gradient(135deg, #565656, transparent)",
                clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)"
              }}

            >
              {service.title}
            </div>

            {/* Image */}
            <div className="w-full h-40 sm:h-48 md:h-56 overflow-hidden">
              <img
                src={service.service_image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-gray-700 text-sm sm:text-base">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
