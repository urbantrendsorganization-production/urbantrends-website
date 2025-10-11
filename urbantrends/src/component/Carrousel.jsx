import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules"

import development from '../assets/develop.jpeg'
import Cybersecurity from '../assets/cyber_sec.jpeg'
import aipowered from '../assets/ai_powered.jpeg'
import enterprise from '../assets/enterprise.jpeg'
import devs from '../assets/devs.jpeg'
import ents from '../assets/devs.jpeg'

function Carrousel() {
  const slides = [
    {
      img: development,
      title: "Web Development",
      desc: "Custom, scalable websites built with modern frameworks.",
      cta: "Learn More"
    },
    {
      img: Cybersecurity,
      title: "Cybersecurity",
      desc: "Protect your digital assets with advanced security solutions.",
      cta: "Secure Now"
    },
    {
      img: aipowered,
      title: "AI-Powered Solutions",
      desc: "Harness AI for smarter workflows and insights.",
      cta: "Explore AI"
    },
    {
      img: enterprise,
      title: "Enterprise Systems",
      desc: "Robust software for businesses of any size.",
      cta: "Get Started"
    },
    {
      img: devs,
      title: "Dedicated Developers",
      desc: "Hire top-tier developers for your projects.",
      cta: "Hire Now"
    },
    {
      img: ents,
      title: "Enterprise Tech",
      desc: "Future-ready technology built for scale.",
      cta: "Discover"
    }
  ]

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={"auto"}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={4000}
      className="w-full py-6"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide
          key={idx}
          className="
            !w-[220px] !h-[280px]
            sm:!w-[260px] sm:!h-[320px] 
            md:!w-[300px] md:!h-[360px] 
            lg:!w-[360px] lg:!h-[400px]
          "
        >
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
            {/* Fixed-height image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-32 sm:h-40 md:h-48 object-cover"
            />

            {/* Content */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-base sm:text-lg mb-1">{slide.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 flex-grow">{slide.desc}</p>

              <button className="mt-2 sm:mt-3 w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow hover:opacity-90">
                {slide.cta}
              </button>
            </div>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carrousel
