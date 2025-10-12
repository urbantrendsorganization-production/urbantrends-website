// AboutFlipCards.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import devs from "../assets/devs.jpeg";
import biz from "../assets/business.jpeg";
import prise from "../assets/entss.jpeg";

const smoothTransition = {
  duration: 1.0,
  ease: [0.25, 0.1, 0.25, 1],
};

function FlipCard({ image, title, description, bgColor = "bg-white", delay = 0, cta }) {
  const ref = useRef(null);
  // threshold small so partial visible counts as in view while scrolling
  const isInView = useInView(ref, { amount: 0.25, once: false });
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 1024);

  // listen resize to update mobile/desktop behavior
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // On mobile: flip when in view
  useEffect(() => {
    if (isMobile) {
      setFlipped(isInView);
    }
  }, [isInView, isMobile]);

  // On desktop we rely on hover to flip (mouse events)
  return (
    <motion.div
      ref={ref}
      className={`relative w-full rounded-2xl shadow-2xl ${bgColor} cursor-pointer`}
      style={{ perspective: "1400px", minHeight: "48vh", maxHeight: "80vh" }} // responsive heights that let page grow
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      // only attach mouse handlers on desktop
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={smoothTransition}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70"></div>
          <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-lg sm:text-xl md:text-2xl font-semibold px-4 py-2 rounded-xl shadow-md">
            {title}
          </h2>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-8 text-center rounded-2xl"
          style={{
            transform: "rotateY(180deg)",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(180deg, rgba(17,17,17,0.95), rgba(0,0,0,1))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: delay + 0.15 }}
            className="max-w-xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">{title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 text-sm sm:text-base"
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
  // enforce page can scroll if some ancestor was locking it
  useEffect(() => {
    try {
      // allow scrolling on html/body if any script previously locked it
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    } catch (e) {
      // ignore in SSR or restricted envs
      console.warn("Could not set overflow auto", e);
    }
  }, []);

  return (
    // allow mobile touch scrolling and avoid overflow hidden
    <div
      className="relative space-y-4 mt-5 p-4 overflow-auto"
      style={{ WebkitOverflowScrolling: "touch", minHeight: "100vh" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="w-50 h-50 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full blur-3xl animate-pulse"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-3xl sm:text-5xl md:text-6xl text-center font-bold underline tracking-wider font-tech "
      >
        UrbanTrends
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-center font-semibold text-gray-700"
      >
        For
      </motion.h2>

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
