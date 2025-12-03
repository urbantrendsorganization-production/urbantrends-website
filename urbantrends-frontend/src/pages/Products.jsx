import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export default function Products() {
  const [fetchedProducts, setFetchedProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://urbantrends-backend-production-fde8.up.railway.app/products/prods'
      );
      setFetchedProducts(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOrderProduct = async (product) => {
    try {
      // Replace customer info with your actual frontend form/user input if needed
      const payload = {
        productId: product._id || product.id,
        customer: {
          name: 'Edwin Wamuyu',
          email: 'Muchemiedwin68@gmail.com',
          phone: '0748016528',
        },
        quantity: 1,
        notes: '',
      };

      const response = await axios.post(
        'https://urbantrends-backend-production-fde8.up.railway.app/products/order/create',
        payload
      );

      if (response.status === 201 || response.data?.message) {
        toast.success(`${product.name} order created successfully`);
      } else {
        toast.error('Failed to create order');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error: Could not create order');
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* header */}
       <section className="py-15 bg-gradient-to-b from-gunmetal/50 to-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-silver mb-4">Our Software Products</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Powerful tools and software solutions to accelerate your business growth
            </p>
            <br />
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fetchedProducts.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-silver text-black px-4 py-1 rounded-full text-xs">
                      Popular
                    </div>
                  </div>
                )}

                <div className={`bg-gunmetal/20 border rounded-xl overflow-hidden hover:border-silver/50 transition-all duration-300 h-full flex flex-col`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-silver mb-2">{product.name}</h3>
                    <p className="text-dim-grey text-sm mb-4">{product.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-dim-grey">
                          <Check className="w-4 h-4 text-silver mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price + CTA */}
                    <div className="border-t border-gunmetal pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl text-silver">${product.price}</div>
                          <div className="text-xs text-dim-grey">per month</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleOrderProduct(product)}
                        className="w-full bg-silver text-black hover:bg-silver/90 group/btn"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Order Product
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
