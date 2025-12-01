import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users, Award, Heart, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly pushing boundaries with cutting-edge technology',
    },
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your success is our mission, always putting clients first',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in everything',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together to achieve extraordinary results',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://i.pinimg.com/1200x/7a/8a/07/7a8a07041b38d80f4e68ece9274640e3.jpg',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      image: 'https://i.pinimg.com/1200x/ac/ff/6e/acff6e6b122870db3fc6b7cb118f2e7d.jpg',
    },
    {
      name: 'Emily Watson',
      role: 'Head of Design',
      image: 'https://i.pinimg.com/1200x/8f/47/8c/8f478cdd6e36de0f95457cb5857a2a5c.jpg',
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: 'https://i.pinimg.com/736x/36/1e/fc/361efc2732a3a393cd4aab26b23c1578.jpg',
    },
  ];

  const testimonials = [
    {
      quote: "UrbanTrends transformed our business with their innovative solutions. The team's expertise and dedication are unmatched.",
      author: 'Jennifer Martinez',
      role: 'CEO, TechCorp',
      image: 'https://i.pinimg.com/1200x/7a/8a/07/7a8a07041b38d80f4e68ece9274640e3.jpg',
    },
    {
      quote: 'Working with UrbanTrends was seamless. They delivered beyond our expectations and on time.',
      author: 'James Wilson',
      role: 'CTO, DataFlow Inc',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      quote: 'The best tech partner we could ask for. Their insights and technical prowess are exceptional.',
      author: 'Lisa Anderson',
      role: 'Founder, StartupHub',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
  
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gunmetal/50 to-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-silver mb-4">About UrbanTrends</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Building tomorrow's technology, today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gunmetal/50 border border-dim-grey mb-6">
                <Target className="w-4 h-4 text-silver" />
                <span className="text-sm text-silver">Our Mission</span>
              </div>
              <h2 className="text-silver mb-6">Empowering Businesses Through Innovation</h2>
              <p className="text-dim-grey mb-4">
                At UrbanTrends, we believe technology should be a catalyst for growth, not a barrier. Since our founding in 2014, we've been dedicated to creating innovative software solutions that help businesses thrive in the digital age.
              </p>
              <p className="text-dim-grey mb-4">
                Our team of expert developers, designers, and strategists work collaboratively to transform complex challenges into elegant, scalable solutions. We don't just build software; we build partnerships that drive long-term success.
              </p>
              <p className="text-dim-grey">
                With a focus on cutting-edge technologies, security, and user experience, we deliver products that not only meet but exceed expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY0MDY3NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Team collaboration"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-silver/10 rounded-2xl backdrop-blur-sm border border-silver/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-silver mb-4">Our Values</h2>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-silver mb-2">{value.title}</h4>
                <p className="text-dim-grey text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-silver mb-4">Meet Our Team</h2>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              The talented people behind UrbanTrends
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="text-silver text-center mb-1">{member.name}</h4>
                <p className="text-dim-grey text-sm text-center">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-silver mb-4">Client Testimonials</h2>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              What our clients say about working with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 h-full">
                  <p className="text-dim-grey mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
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
    </div>
  );

}