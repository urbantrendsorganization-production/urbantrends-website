import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import devs from "../assets/devs.jpeg"
import biz from "../assets/business.jpeg"
import prise from "../assets/entss.jpeg"

const smoothTransition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1],
}

function FlipCard({ image, title, description, bgColor = "bg-white", delay = 0, cta }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, once: false })
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={`relative w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[650px] rounded-2xl shadow-2xl overflow-hidden ${bgColor} cursor-pointer`}
      style={{ perspective: "1400px" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Flip container */}
      <motion.div
        animate={isInView ? { rotateY: flipped ? 180 : 0 } : { rotateY: 0 }}
        transition={smoothTransition}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70"></div>
          <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111]/70 text-white text-lg sm:text-xl md:text-2xl font-semibold px-4 py-2 rounded-xl shadow-md">
            {title}
          </h2>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 backface-hidden rotateY-180 flex flex-col justify-center items-center px-6 sm:px-8 text-center bg-gradient-to-b from-[#111] via-[#222] to-[#000] text-gray-200 rounded-2xl"
          style={{
            transform: "rotateY(180deg)",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            className="max-w-md sm:max-w-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 text-sm sm:text-base"
            >
              {cta}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="relative space-y-4 mt-5 p-3 sm:overflow-hidden overflow-auto min-h-screen">

      {/* Glow */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl animate-pulse"
        ></motion.div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-5xl md:text-7xl text-center font-bold underline tracking-wider"
      >
        UrbanTrends
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-base sm:text-lg md:text-xl text-center font-semibold text-gray-700"
      >
        For
      </motion.h2>

      {/* Cards */}
      <section className="w-full relative py-12 sm:py-16">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl">
          <FlipCard
            image={devs}
            title="Developers"
            description={`UrbanTrends empowers developers to work smarter — with tools, projects, and collaborations built for real-world growth.\n\n🚀 Build faster\n🤝 Collaborate better\n💡 Learn AI tools\n⚙️ Use deploy-ready templates`}
            cta="Join the Movement"
          />

          <FlipCard
            image={biz}
            title="Businesses"
            bgColor="bg-[#BCDAC8]"
            description={`We help businesses build strong digital brands through sleek websites, automation systems, and customer-driven solutions.`}
            cta="Build With Us"
            delay={0.2}
          />

          <FlipCard
            image={prise}
            title="Enterprises"
            description={`For enterprises, UrbanTrends delivers scalable platforms, optimized performance, and tech ecosystems that evolve with your brand.`}
            cta="Explore Solutions"
            delay={0.4}
          />
        </div>
      </section>
    </div>
  )
}
