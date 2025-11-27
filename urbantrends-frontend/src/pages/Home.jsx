import React from 'react'
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Database, Shield, Zap, TrendingUp, ExternalLink, ShoppingCart, Check, Wrench, Layout, Search, Calendar, Clock, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/context/CartContext';


function Home() {

  const { addToCart } = useCart()

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const stats = [
        { label: 'Projects Delivered', value: '500+' },
        { label: 'Happy Clients', value: '200+' },
        { label: 'Team Members', value: '50+' },
        { label: 'Years Experience', value: '10+' },
    ];

    const features = [
        {
            icon: Code,
            title: 'Custom Development',
            description: 'Tailored software solutions built with cutting-edge technologies',
        },
        {
            icon: Database,
            title: 'Data Solutions',
            description: 'Scalable databases and data architecture for your business',
        },
        {
            icon: Shield,
            title: 'Security First',
            description: 'Enterprise-grade security and compliance in every solution',
        },
        {
            icon: Cpu,
            title: 'AI Integration',
            description: 'Machine learning and AI-powered features to stay ahead',
        },
    ];

    const featuredProjects = [
    {
      id: '1',
      title: 'Enterprise Dashboard Platform',
      description: 'A comprehensive analytics dashboard for real-time business intelligence',
      industry: 'Finance',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'TypeScript', 'Analytics'],
    },
    {
      id: '2',
      title: 'Mobile Banking App',
      description: 'Secure and intuitive mobile banking solution with biometric authentication',
      industry: 'Finance',
      image: 'https://images.unsplash.com/photo-1722850646236-61c6f917df96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdCUyMGRldmljZXxlbnwxfHx8fDE3NjQwNjc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Mobile', 'Security', 'FinTech'],
    },
    {
      id: '3',
      title: 'E-Commerce Platform',
      description: 'Scalable marketplace with AI-powered recommendations',
      industry: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2Mzk1OTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Next.js', 'AI', 'Stripe'],
    },
  ];

  const featuredProducts = [
    {
      id: 'prod-1',
      name: 'DataFlow Pro',
      description: 'Advanced data analytics and visualization platform',
      price: 299,
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true,
    },
    {
      id: 'prod-2',
      name: 'SecureVault',
      description: 'Enterprise-grade password manager',
      price: 149,
      image: 'https://images.unsplash.com/photo-1722850646236-61c6f917df96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdCUyMGRldmljZXxlbnwxfHx8fDE3NjQwNjc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'prod-4',
      name: 'DevOps Commander',
      description: 'Complete CI/CD pipeline automation',
      price: 399,
      image: 'https://images.unsplash.com/photo-1713463374257-16790466d9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Mzk1OTMzMnww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true,
    },
  ];

  const services = [
    {
      id: 'service-1',
      icon: Code,
      title: 'Custom Web Development',
      description: 'Build scalable, high-performance web applications',
      price: 5000,
    },
    {
      id: 'service-2',
      icon: Layout,
      title: 'Dashboard Development',
      description: 'Create intuitive, data-driven dashboards',
      price: 3500,
    },
    {
      id: 'service-3',
      icon: Search,
      title: 'SEO Optimization',
      description: 'Improve your search rankings',
      price: 1500,
    },
  ];

  const testimonials = [
    {
      quote: "UrbanTrends transformed our business with their innovative solutions. The team's expertise is unmatched.",
      author: 'Jennifer Martinez',
      role: 'CEO, TechCorp',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
    },
    {
      quote: 'Working with UrbanTrends was seamless. They delivered beyond our expectations and on time.',
      author: 'James Wilson',
      role: 'CTO, DataFlow Inc',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
    },
    {
      quote: 'The best tech partner we could ask for. Their insights and technical prowess are exceptional.',
      author: 'Lisa Anderson',
      role: 'Founder, StartupHub',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
    },
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'The Future of AI in Software Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build software.',
      date: 'Nov 20, 2024',
      readTime: '8 min read',
      category: 'AI & ML',
      image: 'https://images.unsplash.com/photo-1713463374257-16790466d9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Mzk1OTMzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Building Scalable Microservices',
      excerpt: 'A comprehensive guide to designing microservices that scale with your business.',
      date: 'Nov 18, 2024',
      readTime: '12 min read',
      category: 'Architecture',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product',
    });
    toast.success(`${product.name} added to cart`);
  };

    return (
        <div className='h-full'>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gunmetal to-black opacity-95" />
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1739056238852-9ebc2d3f9407?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Tech Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>

                {/* Animated Grid Background */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(#BCBCBC 1px, transparent 1px), linear-gradient(90deg, #BCBCBC 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }} />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <motion.div {...fadeIn}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gunmetal/50 border border-dim-grey mb-8">
                            <Zap className="w-4 h-4 text-silver" />
                            <span className="text-sm text-silver">Building Tomorrow's Tech Today</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-silver mb-6 max-w-4xl mx-auto"
                    >
                        Innovative Software Solutions for Modern Businesses
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-center text-gray-300 mb-10 max-w-2xl mx-auto"
                    >
                        We craft cutting-edge software, build scalable products, and deliver services that transform your business vision into reality.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link to="/projects">
                            <Button
                                size="lg"
                                className="bg-silver text-black hover:bg-silver/90 group px-6 py-4 text-md"
                            >
                                View Projects
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button size="lg" variant="outline" className="border-silver text-slate-800 hover:bg-silver hover:text-black">
                                Buy Products
                            </Button>
                        </Link>
                        <Link to="/services">
                            <Button size="lg" variant="outline" className="border-silver text-slate-900 hover:bg-silver hover:text-black">
                                Order Services
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-gunmetal"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-silver text-3xl md:text-4xl mb-2">{stat.value}</div>
                                <div className="text-dim-grey text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-silver/30 flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-silver/50 rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="px-8 sm:px-12 lg:px-20 bg-gradient-to-b from-black to-gunmetal/20 py-16">
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-silver mb-6 text-3xl sm:text-4xl font-semibold">Why Choose UrbanTrends</h2>
                            <p className="text-dim-grey text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                                We combine innovation, expertise, and dedication to deliver exceptional tech solutions
                            </p>
                        </motion.div>
                    </div>
                    <br />

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-gunmetal/30 border border-dim-grey/30 rounded-xl p-8 hover:border-silver/50 transition-all duration-300 h-full flex flex-col">
                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-7 h-7 text-black" />
                                    </div>
                                    <h3 className="text-silver mb-3 text-lg font-medium">{feature.title}</h3>
                                    <p className="text-dim-grey text-base leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <br />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-gunmetal via-dim-grey to-gunmetal relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #BCBCBC 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }} />
                </div>

                <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <TrendingUp className="w-16 h-16 text-black mx-auto mb-6" />
                        <h2 className="text-black mb-4">Ready to Transform Your Business?</h2>
                        <p className="text-black/80 text-lg mb-8">
                            Let's build something amazing together. Get in touch with our team today.
                        </p>
                        <br />
                        <Link to="/contact">
                            <Button size="lg" className="bg-black text-silver hover:bg-black/90">
                                Get Started Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                    <br />
                </div>
            </section>

            <br />
            <br />

            

            {/* Featured Projects Section */}
      <section className="py-20 bg-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-silver mb-4">Featured Projects</h2>
              <p className="text-dim-grey text-center text-lg max-w-2xl mx-auto">
                Explore some of our recent work and success stories
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-10 overflow-hidden hover:border-silver/50 transition-all duration-300">
                  <div className="relative h-82 p-4 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-silver flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs text-silver mb-2">{project.industry}</div>
                    <h3 className="text-silver mb-2">{project.title}</h3>
                    <p className="text-dim-grey text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-gunmetal text-dim-grey text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <br />
          <br />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-5"
          >
            <Link to="/projects">
              <Button variant="outline" className="border-silver text-slate-700 hover:bg-silver hover:text-black">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <br />
      <br />

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-silver mb-4">Popular Products</h2>
              <p className="text-dim-grey text-lg max-w-2xl mx-auto">
                Powerful software tools to accelerate your business
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-silver mb-2">{product.name}</h3>
                    <p className="text-dim-grey text-sm mb-4 flex-1">{product.description}</p>
                    <div className="border-t border-gunmetal pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl text-silver">${product.price}</div>
                          <div className="text-xs text-dim-grey">per month</div>
                        </div>
                      </div>
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

          <br />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/products">
              <Button variant="outline" className="border-silver text-slate-800 hover:bg-silver hover:text-black">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <br />
      </section>


      <br />
      <br />

      {/* Services Section */}
      <section className="py-20 bg-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-silver mb-4">Our Services</h2>
              <p className="text-dim-grey text-lg max-w-2xl mx-auto">
                Comprehensive tech services to bring your ideas to life
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 hover:border-silver/50 transition-all duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-silver mb-2">{service.title}</h3>
                  <p className="text-dim-grey text-sm mb-4 flex-1">{service.description}</p>
                  <div className="border-t border-gunmetal pt-4">
                    <div className="mb-4">
                      <div className="text-xs text-dim-grey mb-1">Starting at</div>
                      <div className="text-2xl text-silver">${service.price.toLocaleString()}</div>
                    </div>
                    <Link to="/services">
                      <Button className="w-full bg-silver text-black hover:bg-silver/90">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <br />
          <br />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/services">
              <Button variant="outline" className="border-silver text-slate-700 hover:bg-silver hover:text-black">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-silver mb-4">What Our Clients Say</h2>
              <p className="text-dim-grey text-lg max-w-2xl mx-auto">
                Trusted by businesses worldwide
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 hover:border-silver/30 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-silver text-silver" />
                    ))}
                  </div>
                  <p className="text-dim-grey mb-6 italic flex-1">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gunmetal">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-silver text-sm">{testimonial.author}</div>
                      <div className="text-dim-grey text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Blog Section */}
      <section className="py-20 bg-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-silver mb-4">Latest Insights</h2>
              <p className="text-dim-grey text-lg max-w-2xl mx-auto">
                Tech articles, guides, and industry insights from our experts
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl overflow-hidden hover:border-silver/50 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-80 overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-gunmetal/80 backdrop-blur-sm text-silver text-xs border border-dim-grey">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-dim-grey mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-silver mb-2">{post.title}</h3>
                    <p className="text-dim-grey text-sm mb-4 flex-1">{post.excerpt}</p>
                    <Button variant="ghost" size="sm" className="text-silver hover:text-silver hover:bg-gunmetal w-fit group/btn">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <br />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-40"
          >
            <Link to="/blog">
              <Button variant="outline" className="border-silver text-slate-700 hover:bg-silver hover:text-black">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <br />
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-silver mb-4">Ready to Start Your Project?</h2>
            <p className="text-dim-grey text-lg mb-8">
              Get in touch with our team to discuss your vision and see how we can help
            </p>
            <br />
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-silver text-black hover:bg-silver/90">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-silver text-silver hover:bg-silver hover:text-black">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <br />
      </section>


        </div>

    )
}

export default Home