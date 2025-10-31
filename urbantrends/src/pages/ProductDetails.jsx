import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

function ProductDetails() {
  const { slug_name } = useParams();
  const [productTiers, setProductsTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendLink = import.meta.env.VITE_MAIN_LINK;

  const fetchProductTiers = async () => {
    try {
      const response = await axios.get(
        `${backendLink}/v2/tiers-products/products-tiers/${slug_name}`
      );
      setProductsTiers(response.data);
    } catch (error) {
      console.error('Error fetching tiers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTiers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-5">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        {slug_name?.replace(/-/g, ' ').toUpperCase()} Packages
      </h1>

      {productTiers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No product tiers found for this product.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {productTiers.map((tier) => {
            // Properly parse the features JSON
            let featuresArray = [];
            try {
              featuresArray = JSON.parse(tier.features);
            } catch {
              featuresArray = tier.features
                ? tier.features.split(',').map((f) => f.trim())
                : [];
            }

            return (
              <div
                key={tier.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col mt-8"
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
    </div>
  );
}

export default ProductDetails;
