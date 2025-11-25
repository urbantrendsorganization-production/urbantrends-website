
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';





const products = [
  {
    id: 'prod-1',
    name: 'DataFlow Pro',
    description: 'Advanced data analytics and visualization platform for businesses',
    price: 299,
    features: [
      'Real-time analytics',
      'Custom dashboards',
      'API integration',
      '24/7 support',
      'Unlimited users',
    ],
    image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    popular: true,
  },
  {
    id: 'prod-2',
    name: 'SecureVault',
    description: 'Enterprise-grade password manager with encryption',
    price: 149,
    features: [
      'AES-256 encryption',
      'Team sharing',
      'Biometric access',
      'Audit logs',
      'Cross-platform sync',
    ],
    image: 'https://images.unsplash.com/photo-1722850646236-61c6f917df96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdCUyMGRldmljZXxlbnwxfHx8fDE3NjQwNjc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'prod-3',
    name: 'CloudSync Suite',
    description: 'Seamless file synchronization and collaboration tools',
    price: 199,
    features: [
      '10TB storage',
      'Version control',
      'Team collaboration',
      'Mobile apps',
      'Advanced sharing',
    ],
    image: 'https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2Mzk1OTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'prod-4',
    name: 'DevOps Commander',
    description: 'Complete CI/CD pipeline automation and monitoring',
    price: 399,
    features: [
      'Auto-deployment',
      'Container orchestration',
      'Performance monitoring',
      'Log aggregation',
      'Slack integration',
    ],
    image: 'https://images.unsplash.com/photo-1713463374257-16790466d9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Mzk1OTMzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    popular: true,
  },
  {
    id: 'prod-5',
    name: 'AI Assistant Pro',
    description: 'Intelligent automation for business workflows',
    price: 249,
    features: [
      'Natural language processing',
      'Custom workflows',
      'Integration hub',
      'Smart scheduling',
      'Predictive analytics',
    ],
    image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'prod-6',
    name: 'API Gateway',
    description: 'Secure and scalable API management platform',
    price: 349,
    features: [
      'Rate limiting',
      'API versioning',
      'Analytics dashboard',
      'Developer portal',
      'Load balancing',
    ],
    image: 'https://images.unsplash.com/photo-1722850646236-61c6f917df96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdCUyMGRldmljZXxlbnwxfHx8fDE3NjQwNjc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function Products() {
  

  return (
    <div className="min-h-screen bg-black">
        <br />
        <br />
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gunmetal/50 to-black">
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
      <section className="py-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
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
                
                <div className={`bg-gunmetal/20 border rounded-xl overflow-hidden hover:border-silver/50 transition-all duration-300 h-full flex flex-col ${
                  product.popular ? 'border-silver/30' : 'border-dim-grey/30'
                }`}>
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
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-dim-grey">
                          <Check className="w-4 h-4 text-silver mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="border-t border-gunmetal pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl text-silver">${product.price}</div>
                          <div className="text-xs text-dim-grey">per month</div>
                        </div>
                      </div>
                      <br />
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-silver text-black hover:bg-silver/90 group/btn"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-silver mb-4">Need a Custom Solution?</h2>
            <p className="text-dim-grey text-lg mb-8">
              We can build tailored software specifically for your business needs
            </p>
            <Button size="lg" className="bg-silver text-black hover:bg-silver/90">
              Contact Sales
            </Button>
          </motion.div>
        </div>
        <br />
      </section>
    </div>
  );
}