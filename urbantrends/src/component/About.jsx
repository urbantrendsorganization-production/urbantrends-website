import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import devs from "../assets/devs.jpeg";
import biz from "../assets/business.jpeg";
import prise from "../assets/entss.jpeg";
import { useNavigate } from "react-router-dom";

const smoothTransition = {
  duration: 1.0,
  ease: [0.25, 0.1, 0.25, 1],
};

function FlipCard({ image, title, description, bgColor = "bg-white", delay = 0, cta }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.25, once: false });
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setFlipped(isInView);
  }, [isInView, isMobile]);

  return (
    <motion.div
      ref={ref}
      className={`relative w-full rounded-2xl shadow-2xl ${bgColor} cursor-pointer`}
      style={{
        perspective: "1400px",
        minHeight: "420px",
        height: "auto",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={smoothTransition}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-gray-600/70"></div>
          <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-lg sm:text-xl md:text-2xl font-semibold px-4 py-2 rounded-xl shadow-md">
            {title}
          </h2>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 flex flex-col justify-start items-center px-6 sm:px-8 text-center rounded-2xl overflow-y-auto"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(180deg, rgba(17,17,17,0.95), rgba(0,0,0,1))",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: delay + 0.15 }}
            className="max-w-xl py-8 no-scrollbar"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">{title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
            <motion.button
              onClick={ () => navigate('/portfolio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 border-2 border-white text-white font-semibold rounded-full shadow-lg hover:opacity-90 text-sm sm:text-base"
            >
              {cta}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div
      className="relative space-y-6 mt-5 p-4 overflow-auto"
      style={{ WebkitOverflowScrolling: "touch", minHeight: "100vh" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full  blur-3xl animate-pulse"
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-3xl sm:text-5xl md:text-6xl text-center font-bold underline tracking-wider font-tech"
      >
        UrbanTrends
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-center font-semibold text-gray-700 font-tech"
      >
        For
      </motion.h2>

      {/* Cards Section */}
      <section className="w-full relative py-10 sm:py-14">
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
            description={`UrbanTrends solves this by giving brands the tools, systems, and digital experiences they need to stay relevant and competitive.
\n\n. modern websites that attract customers\n. Improve visibility through SEO\n. Automate workflows and operations\n. Integrate AI to make smarter decisions`}
            cta="Join the Movement"
            delay={0.15}
          />

          <FlipCard
            image={prise}
            title="Enterprises"
            description={`Legacy systems, disconnected departments, and manual workflows make it hard to stay agile in a digital-first world.\n\n. Automate and optimize internal processes\n. Strengthen cybersecurity and compliance\n. Move operations to scalable cloud infrastructures.`}
            cta="Join the Movement"
            delay={0.3}
          />
        </div>
      </section>
    </div>
  );
}
