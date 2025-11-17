import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProductDetails() {
  const { slug_name } = useParams();
  const [productTiers, setProductTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const backendLink = import.meta.env.VITE_MAIN_LINK;

  const fetchProductTiers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${backendLink}/v2/tiers-products/products-tiers/${slug_name}`
      );
      setProductTiers(response.data);
    } catch (err) {
      console.error("Error fetching product tiers", err);
      setError("Failed to load product tiers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTiers();
  }, [slug_name]);

  useEffect(() => {
    if (productTiers.length > 0 && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".product-tier-card");
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
  }, [productTiers]);

  const SkeletonCard = () => (
    <div className="bg-white/70 border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between animate-pulse backdrop-blur-sm">
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="space-y-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-full bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      <div className="mt-6 h-10 w-full bg-gray-300 rounded-lg"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const productName = slug_name?.replace(/-/g, " ").toUpperCase();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-600 via-slate-500 to-rose-700 text-white text-center py-24 px-6 relative overflow-hidden">
        <h1 className="text-5xl font-bold mb-4">{productName}</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Discover the perfect plan for {productName}. Simple, transparent, and
          tailored to your needs.
        </p>
        <Link
          to="#tiers"
          className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105"
        >
          See Packages
        </Link>

        {/* Hero blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-white/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              img: "https://cdn.cosmos.so/ea9edab2-43b2-42b0-8f1b-fbbf5a0aa76a?format=jpeg",
              title: "Choose a Plan",
              desc: "Select the package that best fits your needs and budget.",
            },
            {
              img: "https://cdn.cosmos.so/ea9edab2-43b2-42b0-8f1b-fbbf5a0aa76a?format=jpeg",
              title: "Submit Details",
              desc: "Provide your project info so we can get started immediately.",
            },
            {
              img: "https://cdn.cosmos.so/86dc9eef-1259-43b1-949b-c119f4acd3d9?format=jpeg",
              title: "Get Results",
              desc: "Receive top-quality deliverables in your chosen timeframe.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white/80 p-8 rounded-3xl shadow-md backdrop-blur-sm hover:shadow-xl transition duration-300 flex flex-col items-center"
            >
              <img src={step.img} alt={step.title} className="w-42 h-42 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Tiers */}
      <section
        id="tiers"
        className="py-16 px-6 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Available Plans</h2>
        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}
        {productTiers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No product tiers found for this product.
          </p>
        ) : (
          <div
            ref={sectionRef}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {productTiers.map((tier) => {
              let featuresArray = [];
              try {
                featuresArray = JSON.parse(tier.features);
              } catch {
                featuresArray = tier.features
                  ? tier.features.split(",").map((f) => f.trim())
                  : [];
              }

              return (
                <div
                  key={tier.id}
                  className="product-tier-card bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
                >
                  <div className="p-6 flex flex-col h-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                      {tier.tier_name}
                    </h2>

                    <p className="text-center text-4xl font-bold text-indigo-600 mb-4">
                      ${tier.price}
                    </p>

                    <p className="text-gray-600 text-sm text-center mb-6">
                      {tier.description}
                    </p>

                    <ul className="text-gray-700 text-sm space-y-2 mb-6 flex-1">
                      {featuresArray.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto text-center">
                      <p className="text-sm text-gray-500 mb-3">
                        Delivery in {tier.delivery_time} days
                      </p>
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-all">
                        Choose Plan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">What Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Jane Doe",
              comment: "Outstanding quality and quick delivery!",
            },
            {
              name: "John Smith",
              comment: "The process was smooth and professional.",
            },
            {
              name: "Alice Brown",
              comment: "Helped us grow our business efficiently.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md backdrop-blur-sm hover:shadow-xl transition duration-300"
            >
              <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
              <span className="font-semibold text-gray-900">
                {testimonial.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-slate-600 to-gray-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Choose your plan, submit your project details, and let’s make it
          happen.
        </p>
        <Link
          to="/contact"
          className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 inline-block"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}

export default ProductDetails;
