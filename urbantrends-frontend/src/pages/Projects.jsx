import React, { useEffect } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios'
import { ImageWithFallback } from '../components/figma/ImageWithFallback';


const industries = ['All', 'Finance', 'E-Commerce', 'Healthcare', 'Logistics', 'Social Media'];

export default function Projects() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [projectso, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://urbantrends-backend-production-fde8.up.railway.app/projects/projs');
      setProjects(response.data)
      console.log("fetched projects", response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-gunmetal/50 to-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-silver mb-4">Our Projects</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Explore our portfolio of successful projects across various industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-gunmetal sticky top-16 md:top-20 bg-black/95 backdrop-blur-md z-40 mb-10">
        <div className="w-full grid justify-center py-5 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-silver flex-shrink-0" />
            <div className="flex gap-2">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry(industry)}
                  className={
                    selectedIndustry === industry
                      ? 'bg-silver text-black hover:bg-silver/90'
                      : 'border-dim-grey text-slate-800 hover:text-slate-700 hover:border-silver'
                  }
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <br />

      {/* Projects Grid */}
      <section className="py-16 mt-45">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectso.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl overflow-hidden hover:border-silver/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.link}
                        className="w-10 h-10 rounded-full bg-silver flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-5 h-5 text-black" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs text-silver mb-2">{project.industry}</div>
                    <h3 className="text-silver mb-2 group-hover:text-silver transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dim-grey text-sm mb-4">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-gunmetal text-dim-grey text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <br />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-silver mb-4">Have a Project in Mind?</h2>
            <p className="text-dim-grey text-lg mb-8">
              Let's discuss how we can help bring your vision to life
            </p>
            <Button size="lg" className="bg-silver text-black hover:bg-silver/90">
              Start Your Project
            </Button>
          </motion.div>
        </div>
        <br />
      </section>
    </div>
  );
}
