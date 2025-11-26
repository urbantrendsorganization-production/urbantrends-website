import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import axios from 'axios'



export default function Blog() {
  const [fetchedBlogs, setFetchedBlogs] = useState([])
  const featuredPost = fetchedBlogs.find((post) => post.featured);

  const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(
      'https://urbantrends-backend-production-fde8.up.railway.app/blogs/blo'
    );
    setFetchedBlogs(response.data);
    console.log('fetched blogs', response.data)
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

useEffect(() => {
  fetchBlogPosts();
}, []);

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
            <h1 className="text-silver mb-4">Tech Insights & Resources</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Articles, guides, and case studies from our team of experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-gunmetal/50 to-dim-grey/30 border border-silver/30 rounded-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="relative h-64 lg:h-auto">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-silver text-black text-xs">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-dim-grey mb-4">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-silver mb-4">{featuredPost.title}</h2>
                  <p className="text-dim-grey mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dim-grey">By {featuredPost.author}</span>
                    <Button className="bg-silver text-black hover:bg-silver/90 group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <br />

      {/* Blog Grid */}
      <section className="py-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fetchedBlogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl overflow-hidden hover:border-silver/50 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
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

                  {/* Content */}
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
                    <h3 className="text-silver mb-2 group-hover:text-silver transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-dim-grey text-sm mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gunmetal">
                      <span className="text-xs text-dim-grey">By {post.author}</span>
                      <Button variant="ghost" size="sm" className="text-silver hover:text-silver hover:bg-gunmetal group/btn">
                        Read
                        <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-silver mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-dim-grey text-lg mb-8">
              Get the latest tech insights delivered to your inbox
            </p>
            <br />
            <Link to="/">
              <Button size="lg" className="bg-silver text-black hover:bg-silver/90">
                Subscribe Now
              </Button>
            </Link>
          </motion.div>
        </div>
        <br />
      </section>
    </div>
  );
}