import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ProductsCard() {
  const [products, setProducts] = useState([]);
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendLink}/v2/products/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: 'smooth',
    });
  };

  const handleRedirect = (slug_name) => {
    navigate(`/product/${slug_name}`);
  }

  return (
    <div className="relative mx-auto px-4 py-12 group">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Our Products
      </h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable Section */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[320px] sm:min-w-[360px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group/item snap-center"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-5 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover/item:text-gray-600 transition-colors duration-200">
                {product.product_name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {product.description}
              </p>
              <button onClick={ () => handleRedirect(product.slug_name)} className="w-full bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 rounded-lg transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

export default ProductsCard;
