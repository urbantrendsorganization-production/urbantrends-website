import { motion } from 'framer-motion';
import { Code, Layout, Database, Search, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';


export default function Services() {

    const services = [
  {
    id: 'service-1',
    icon: Code,
    title: 'Custom Web Development',
    description: 'Build scalable, high-performance web applications tailored to your business needs',
    features: [
      'Full-stack development',
      'Responsive design',
      'Modern frameworks (React, Next.js)',
      'Progressive Web Apps',
    ],
    price: 5000,
    priceLabel: 'Starting at',
  },
  {
    id: 'service-2',
    icon: Layout,
    title: 'Dashboard Development',
    description: 'Create intuitive, data-driven dashboards for real-time insights',
    features: [
      'Custom analytics',
      'Interactive visualizations',
      'Real-time data updates',
      'Role-based access',
    ],
    price: 3500,
    priceLabel: 'Starting at',
  },
  {
    id: 'service-3',
    icon: Database,
    title: 'Database Design',
    description: 'Design and optimize databases for performance and scalability',
    features: [
      'Schema design',
      'Query optimization',
      'Migration services',
      'Backup solutions',
    ],
    price: 2500,
    priceLabel: 'Starting at',
  },
  {
    id: 'service-4',
    icon: Search,
    title: 'SEO Optimization',
    description: 'Improve your search rankings and drive organic traffic',
    features: [
      'Technical SEO audit',
      'On-page optimization',
      'Content strategy',
      'Performance monitoring',
    ],
    price: 1500,
    priceLabel: 'Monthly',
  },
  {
    id: 'service-5',
    icon: Wrench,
    title: 'Maintenance & Support',
    description: '24/7 monitoring, updates, and technical support for your applications',
    features: [
      'Proactive monitoring',
      'Security updates',
      'Bug fixes',
      'Performance optimization',
    ],
    price: 999,
    priceLabel: 'Monthly',
  },
  {
    id: 'service-6',
    icon: Rocket,
    title: 'API Development',
    description: 'Build robust and scalable APIs for seamless integrations',
    features: [
      'RESTful APIs',
      'GraphQL',
      'API documentation',
      'Rate limiting & security',
    ],
    price: 4000,
    priceLabel: 'Starting at',
  },
];

  

  return (
    <div className="min-h-screen bg-black">
        <br /><br />
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gunmetal/50 to-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-silver mb-4">Our Services</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Comprehensive tech services to transform your ideas into reality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="w=full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 hover:border-silver/50 transition-all duration-300 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-black" />
                  </div>

                  {/* Content */}
                  <h3 className="text-silver mb-2">{service.title}</h3>
                  <p className="text-dim-grey text-sm mb-4">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-dim-grey">
                        <ArrowRight className="w-4 h-4 text-silver mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className="border-t border-gunmetal pt-4">
                    <div className="mb-4">
                      <div className="text-xs text-dim-grey mb-1">{service.priceLabel}</div>
                      <div className="text-2xl text-silver">${service.price.toLocaleString()}</div>
                    </div>
                    <Button
                      onClick={() => handleOrderService(service)}
                      className="w-full bg-silver text-black hover:bg-silver/90"
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <br />

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-silver mb-4">Our Process</h2>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              A streamlined approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
              { step: '02', title: 'Planning', description: 'Creating a detailed roadmap' },
              { step: '03', title: 'Development', description: 'Building with best practices' },
              { step: '04', title: 'Launch', description: 'Deploying and ongoing support' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl text-silver/30 mb-4">{item.step}</div>
                <h4 className="text-silver mb-2">{item.title}</h4>
                <p className="text-dim-grey text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <br />
        </div>
      </section>

      <br />

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-silver mb-4">Ready to Get Started?</h2>
            <p className="text-dim-grey text-lg mb-8">
              Schedule a free consultation to discuss your project
            </p>
            <Button size="lg" className="bg-silver text-black hover:bg-silver/90">
              Book a Consultation
            </Button>
          </motion.div>
        </div>
        <br />
      </section>
    </div>
  );
}