import React from 'react'

function Services() {
  const services = [
    {
      title: "Web Development",
      img: "https://cdn.cosmos.so/16c7d975-782f-4bfb-b763-38d3677d33c2?format=jpeg",
      desc: "We build responsive, modern websites tailored to your needs."
    },
    {
      title: "UI/UX Design",
      img: "https://cdn.cosmos.so/4378898b-5fd0-4fb0-afcd-1df40dff9181?format=jpeg",
      desc: "Crafting clean, user-friendly interfaces that engage audiences."
    },
    {
      title: "SEO Optimization",
      img: "https://cdn.cosmos.so/9294d41d-c55e-437f-8af2-0b5bd4743f7d?format=jpeg",
      desc: "Boost your site’s ranking and visibility across search engines."
    }
  ]

  const products = [
    {
      title: "Website Templates & Themes",
      img: "https://cdn.cosmos.so/1ccc1f48-4647-4e8b-b601-929cc3a40230?format=jpeg",
      desc: "We build responsive, modern websites tailored to your needs."
    },
    {
      title: "Automation Tools",
      img: "https://cdn.cosmos.so/018f49c3-41ea-435f-9056-cad31db3a22d?format=jpeg",
      desc: "Crafting clean, user-friendly interfaces that engage audiences."
    },
    {
      title: "Business Growth Kits",
      img: "https://cdn.cosmos.so/cf94068e-6cb1-4eaa-b56f-819d3a073986?format=jpeg",
      desc: "Boost your site’s ranking and visibility across search engines."
    }
  ]



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
        {services.map((service, index) => (
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
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-gray-700 text-sm sm:text-base">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {/* products */}

      <h2 className="text-2xl md:text-5xl font-bold mb-8 mt-3 font-tech underline text-center">
       Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((service, index) => (
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
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-gray-700 text-sm sm:text-base">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
