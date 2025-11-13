import React, { useEffect, useRef, useState } from "react";
import { Search, Filter, Sparkles, TrendingUp, Package, Zap, CheckCircle } from "lucide-react";
import ProductsMain from "../component/ProductsMain.jsx";
import axios from "axios";
import InfoComponent from "../component/InfoComponent.jsx";



export default function Products() {
  const filterRef = useRef(null);
  const cardsRef = useRef([]);
  const heroRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      // Simulated API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace above with actual API call:
      const response = await axios.get("https://api.urbantrends.dev/v2/products/products");
      setProducts(response.data);
      
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  // Filter & search
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.product_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter ? p.product_name.toLowerCase().includes(filter.toLowerCase()) : true;
    return matchesSearch && matchesFilter;
  });

  // Enhanced Skeleton loader
  const SkeletonCard = () => (
    <div className="w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 animate-pulse border-2 border-slate-200/50">
      <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl mb-6"></div>
      <div className="h-6 w-3/4 bg-slate-300 rounded-lg mb-3"></div>
      <div className="h-4 w-2/3 bg-slate-200 rounded-lg mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-slate-200 rounded"></div>
        <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
      </div>
      <div className="h-12 w-full bg-slate-300 rounded-xl"></div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="relative z-10 py-16 px-4">
        {/* Info Section */}
        <div className="w-full mx-auto mb-16">
          <InfoComponent />
        </div>

        {/* Hero Stats Section */}
        <div 
          ref={heroRef}
          className={`max-w-5xl mx-auto mb-12 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white text-sm font-bold shadow-lg mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Premium Products</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-gray-700 to-rose-700 mb-4">
              Explore Our Solutions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover cutting-edge products designed to transform your business
            </p>
          </div>

          {/* Stats Pills */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: TrendingUp, value: '50+', label: 'Products', color: 'from-blue-400 to-cyan-500' },
              { icon: CheckCircle, value: '10K+', label: 'Happy Clients', color: 'from-green-400 to-emerald-500' },
              { icon: Zap, value: '99.9%', label: 'Uptime', color: 'from-yellow-400 to-orange-500' }
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 hover:scale-105 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.2 + i * 0.1}s backwards`
                }}
              >
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Filter Bar */}
        <div
          ref={filterRef}
          className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white/70 backdrop-blur-xl border-2 border-slate-200/50 rounded-3xl shadow-2xl p-6 hover:shadow-blue-200/50 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 text-slate-800 font-medium transition-all"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative w-full lg:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-slate-500 text-slate-800 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  <option value="urbanflow">UrbanFlow</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="seo">SEO Services</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="analytics">Analytics</option>
                  <option value="hosting">Cloud Hosting</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(search || filter) && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-600 font-medium">Active filters:</span>
                {search && (
                  <span className="px-3 py-1 bg-blue-100 text-rose-400 rounded-full text-sm font-semibold flex items-center gap-1">
                    Search: {search}
                    <button onClick={() => setSearch("")} className="hover:text-blue-900">×</button>
                  </span>
                )}
                {filter && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
                    Category: {filter}
                    <button onClick={() => setFilter("")} className="hover:text-purple-900">×</button>
                  </span>
                )}
                <button
                  onClick={() => { setSearch(""); setFilter(""); }}
                  className="text-sm text-slate-500 hover:text-slate-700 underline font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill().map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="w-full"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s backwards`
                  }}
                >
                  <ProductsMain
                    name={product.product_name}
                    image={product.product_image}
                    description={product.description}
                    slug={product.slug_name}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No Products Found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(""); setFilter(""); }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {!loading && filteredProducts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-600 via-slate-600 to-rose-900 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Can't Find What You Need?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Let's create a custom solution tailored to your business needs
              </p>
              <button className="px-8 py-4 bg-white text-slate-800 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl">
                Contact Our Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}