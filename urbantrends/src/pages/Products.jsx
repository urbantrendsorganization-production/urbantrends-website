import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import InfoComponent from "../component/InfoComponent";
import ProductsMain from "../component/ProductsMain";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const filterRef = useRef(null);
  const cardsRef = useRef([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.urbantrends.dev/v2/products/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!loading && products.length > 0) {
      const ctx = gsap.context(() => {
        // Filter bar animation
        gsap.from(filterRef.current, {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power3.out",
        });

        // Cards animation
        cardsRef.current.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => ctx.revert();
    }
  }, [loading, products]);

  // Filter & search
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.product_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter ? p.product_name === filter : true;
    return matchesSearch && matchesFilter;
  });

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="w-full max-w-[320px] bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-5 animate-pulse border border-gray-200">
      <div className="w-full h-36 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
      <div className="h-3 w-full bg-gray-200 rounded"></div>
      <div className="h-9 w-1/2 bg-gray-300 rounded mt-4 mx-auto"></div>
    </div>
  );

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] mt-22">
      {/* Info Section */}
      <div className="w-full mx-auto">
        <InfoComponent />
      </div>

      {/* Filter Bar */}
      <div
        ref={filterRef}
        className="w-3/4 md:w-1/2 mx-auto mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 py-3 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 rounded-xl border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-500 text-sm md:text-base transition-all"
        />

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-xl border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm md:text-base transition-all"
        >
          <option value="">All Categories</option>
          <option value="web">urbanflow</option>
          <option value="uiux">UI/UX Design</option>
          <option value="seo">SEO Services</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center px-4">
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : filteredProducts.length > 0
          ? filteredProducts.map((product, i) => (
              <div
                key={product.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="w-full"
              >
                <ProductsMain
                  name={product.product_name}
                  image={product.product_image}
                  description={product.description}
                  slug={product.slug_name}
                />
              </div>
            ))
          : "No products found."}
      </div>
    </div>
  );
}
