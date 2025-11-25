import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    (e).reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@urbantrends.com',
      link: 'mailto:hello@urbantrends.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Tech Street, San Francisco, CA 94102',
      link: '#',
    },
  ];

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
            <h1 className="text-silver mb-4">Get In Touch</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Have a question or ready to start your project? We'd love to hear from you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <a
                    href={info.link}
                    className="block bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 hover:border-silver/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-black" />
                    </div>
            
                    <h4 className="text-silver mb-2">{info.title}</h4>
                    <p className="text-dim-grey text-sm">{info.content}</p>
                  </a>
                  <br />
                </motion.div>
                
              ))}


              {/* Live Chat */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-gradient-to-br from-silver/20 to-dim-grey/20 border border-silver/30 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-silver mb-2">Live Chat</h4>
                  <p className="text-dim-grey text-sm mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button size="sm" className="bg-silver text-black hover:bg-silver/90">
                    Start Chat
                  </Button>
                </div>
                <br />
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-8">
                <h3 className="text-silver mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-silver mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-silver mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm text-silver mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm text-silver mb-2">
                        Company
                      </label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm text-silver mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-silver mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us about your project..."
                      className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey resize-none"
                      required
                    />
                  </div>

                  <br />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-silver text-black hover:bg-silver/90 group"
                  >
                    Send Message
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl overflow-hidden h-96">
              {/* Placeholder for map - in a real application, you'd integrate Google Maps or similar */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gunmetal/50 to-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#BCBCBC 1px, transparent 1px), linear-gradient(90deg, #BCBCBC 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }} />
                </div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-12 h-12 text-silver mx-auto mb-4" />
                  <p className="text-silver">Map Integration Available</p>
                  <p className="text-dim-grey text-sm mt-2">123 Tech Street, San Francisco, CA 94102</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <br />

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gunmetal/30">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-silver mb-4">Frequently Asked Questions</h2>
            <p className="text-dim-grey mb-12">
              Quick answers to common questions
            </p>

            <div className="space-y-4 text-left">
              {[
                {
                  q: 'What is your typical project timeline?',
                  a: 'Project timelines vary based on complexity, but most projects take 8-16 weeks from kickoff to launch.',
                },
                {
                  q: 'Do you offer maintenance and support?',
                  a: 'Yes, we offer comprehensive maintenance packages with 24/7 monitoring and support.',
                },
                {
                  q: 'What technologies do you specialize in?',
                  a: 'We specialize in React, Next.js, Node.js, Python, and modern cloud platforms like AWS and Azure.',
                },
              ].map((faq, index) => (
                <div>
                    <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6"
                >
                  <h4 className="text-silver mb-2">{faq.q}</h4>
                  <p className="text-dim-grey text-sm">{faq.a}</p>

                </motion.div>
                <br />
                </div>   
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}