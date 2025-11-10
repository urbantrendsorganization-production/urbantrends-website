import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const { slug } = useParams();
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const sectionRef = useRef(null);

  const fetchTiers = async () => {
    try {
      const response = await axios.get(`${backendLink}/v2/tiers/tier/${slug}`);
      setTiers(response.data);
    } catch (error) {
      console.error("Error fetching tiers", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, [slug]);

  useEffect(() => {
    if (tiers.length > 0) {
      const cards = sectionRef.current.querySelectorAll(".tier-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [tiers]);

  const SkeletonCard = () => (
    <div className="bg-white/70 border border-gray-200 rounded-3xl shadow-md p-8 flex flex-col justify-between animate-pulse backdrop-blur-sm">
      <div>
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded mb-5"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-full bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      <div className="mt-8 h-10 w-full bg-gray-300 rounded-xl"></div>
    </div>
  );

  return (
    <div
      className="min-h-screen py-24 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #f9f9f9, white, #eaeaea)",
      }}
    >
      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
      <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>

      {/* Title Section */}
      <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          <span className="bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent">
            Service Tiers
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our packages and pick the one that fits your project’s ambition.
        </p>
      </div>

      {/* Tiers Section */}
      <div
        ref={sectionRef}
        className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto relative z-10"
      >
        {loading
          ? Array(3)
              .fill()
              .map((_, index) => <SkeletonCard key={index} />)
          : tiers.map((tier) => {
              let parsedFeatures = [];
              try {
                parsedFeatures = JSON.parse(tier.features);
              } catch (e) {
                console.warn("Invalid JSON in features:", tier.features);
              }

              return (
                <div
                  key={tier.id}
                  className="tier-card bg-white/80 border border-gray-200 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 p-8 flex flex-col justify-between backdrop-blur-sm"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                      {tier.tier_name}
                    </h2>
                    <p className="text-gray-600 mb-4">{tier.description}</p>

                    <div className="my-4">
                      <h3 className="text-4xl font-extrabold text-blue-600">
                        ${tier.price}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Delivery: {tier.delivery_time || "—"} Days
                      </p>
                    </div>

                    <ul className="text-gray-700 text-sm space-y-2 mt-5">
                      {parsedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2.5 h-2.5 mt-1 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="mt-8 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-500 hover:to-gray-500 text-white py-3 rounded-xl w-full font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.97]"
                  >
                    Select Tier
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Services;
