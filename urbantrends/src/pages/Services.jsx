import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const { slug } = useParams();
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const sectionRef = useRef(null);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendLink}/v2/tiers/tier/${slug}`);
      setTiers(response.data);
    } catch (err) {
      console.error("Error fetching tiers", err.message);
      setError("Failed to load tiers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, [slug]);

  useEffect(() => {
    if (tiers.length > 0 && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".tier-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
    <div className="bg-white/70 border border-gray-200 rounded-3xl shadow-md p-6 flex flex-col justify-between animate-pulse backdrop-blur-sm">
      <div className="space-y-3">
        <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-8 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
        <div className="space-y-2 mt-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-full bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      <div className="mt-6 h-10 w-full bg-gray-300 rounded-xl"></div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
      <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 mt-10  relative z-10">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Our Services
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the perfect package for your project. Our tiers are designed
          to give you flexibility, clarity, and the results you expect.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className=" p-8 rounded-3xl shadow-md backdrop-blur-sm hover:shadow-xl transition duration-300 flex flex-col items-center">
            <img
              src="https://cdn.cosmos.so/f8352c96-2301-49d1-9521-adf68b81e76e?format=jpeg"
              alt="Choose a Tier"
              className="w-42 h-42 mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">Choose a Tier</h3>
            <p className="text-gray-600">
              Select the package that best suits your project's needs and budget.
            </p>
          </div>

          <div className="bg-white/80 p-8 rounded-3xl shadow-md backdrop-blur-sm hover:shadow-xl transition duration-300 flex flex-col items-center">
            <img
              src="https://cdn.cosmos.so/ab7fa7ce-8f51-442e-ae62-57fb3419a8b7?format=jpeg"
              alt="Submit Your Details"
              className="w-42 h-42 mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">Submit Your Details</h3>
            <p className="text-gray-600">
              Provide all the necessary information so we can start immediately.
            </p>
          </div>

          <div className="bg-white/80 p-8 rounded-3xl shadow-md backdrop-blur-sm hover:shadow-xl transition duration-300 flex flex-col items-center">
            <img
              src="https://cdn.cosmos.so/86dc9eef-1259-43b1-949b-c119f4acd3d9?format=jpeg"
              alt="Receive Results"
              className="w-42 h-42 mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">Receive Results</h3>
            <p className="text-gray-600">
              Sit back and watch your project come to life with top-notch quality.
            </p>
          </div>
        </div>
      </section>


      {/* Tiers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">Service Tiers</h2>
        {error && (
          <div className="text-red-500 text-center mb-8">{error}</div>
        )}
        <div
          ref={sectionRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
                  className="tier-card bg-white/80 border border-gray-200 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 p-6 flex flex-col justify-between backdrop-blur-sm"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      {tier.tier_name}
                    </h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>

                    <div className="my-4">
                      <h4 className="text-3xl font-extrabold text-blue-600">
                        ${tier.price}
                      </h4>
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

                  <button className="mt-8 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-500 hover:to-gray-500 text-white py-3 rounded-xl w-full font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.97]">
                    Select Tier
                  </button>
                </div>
              );
            })}
        </div>
      </section>

      {/* Testimonials / Clients Section */}
      <section className="py-16 px-6 bg-gray-50 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Clients
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-md backdrop-blur-sm">
            <p className="text-gray-600 mb-4">
              "The team exceeded our expectations. Highly recommend!"
            </p>
            <span className="font-semibold text-gray-900">Jane Doe</span>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md backdrop-blur-sm">
            <p className="text-gray-600 mb-4">
              "Professional, fast, and reliable service every time."
            </p>
            <span className="font-semibold text-gray-900">John Smith</span>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md backdrop-blur-sm">
            <p className="text-gray-600 mb-4">
              "Their solutions helped us scale our business effectively."
            </p>
            <span className="font-semibold text-gray-900">Alice Brown</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-r from-gray-600 via-pink-900 to-slate-600 text-white relative z-10">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Pick a tier, provide your project details, and let’s build something amazing together.
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 inline-block"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}

export default Services;
