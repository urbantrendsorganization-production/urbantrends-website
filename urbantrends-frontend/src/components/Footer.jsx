import { Link } from 'react-router';
import { Facebook, Twitter, Linkedin, Github, Instagram, Mail, Phone, MapPin, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import logo from '/urbantrends.svg'


export function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    toast.success('Thank you for subscribing!');
  };

  return (
    <footer className="bg-black border-t border-gunmetal">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-gunmetal">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-silver mb-4">Stay Updated</h3>
            <p className="text-dim-grey mb-6">
              Subscribe to our newsletter for the latest tech insights, product updates, and exclusive offers.
            </p>
            <br />
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                required
              />
              <Button type="submit" className="bg-silver text-black hover:bg-silver/90">
                Subscribe
              </Button>
            </form>
            <br />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src={logo} alt="company logo" className='w-8'/>
              <span className="text-lg text-silver tracking-tight">
                Urban<span className="text-silver">Trends</span>
              </span>
            </Link>
            <p className="text-dim-grey text-sm mb-4">
              Innovative tech solutions for the modern world. Building tomorrow's software today.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gunmetal flex items-center justify-center text-silver hover:bg-silver hover:text-black transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gunmetal flex items-center justify-center text-silver hover:bg-silver hover:text-black transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gunmetal flex items-center justify-center text-silver hover:bg-silver hover:text-black transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gunmetal flex items-center justify-center text-silver hover:bg-silver hover:text-black transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gunmetal flex items-center justify-center text-silver hover:bg-silver hover:text-black transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-silver mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Projects', path: '/projects' },
                { label: 'Products', path: '/products' },
                { label: 'Services', path: '/services' },
                { label: 'About Us', path: '/about' },
                { label: 'Urbantrends developers', path: 'https://developers.urbantrends.dev'}
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-dim-grey hover:text-silver transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
                
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-silver mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', path: '/blog', id: 'blog' },
                { label: 'Documentation', path: '/blog', id: 'docs' },
                { label: 'Case Studies', path: '/projects', id: 'cases' },
                { label: 'Support', path: '/contact', id: 'support' },
                { label: 'FAQ', path: '/contact', id: 'faq' },
              ].map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="text-dim-grey hover:text-silver transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-silver mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-silver mt-1 flex-shrink-0" />
                <a href="mailto:hello@urbantrends.com" className="text-dim-grey hover:text-silver transition-colors text-sm">
                  hello@urbantrends.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-silver mt-1 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-dim-grey hover:text-silver transition-colors text-sm">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-silver mt-1 flex-shrink-0" />
                <span className="text-dim-grey text-sm">
                  123 Tech Street, San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gunmetal flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dim-grey text-sm">
            © {new Date().getFullYear()} UrbanTrends. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-dim-grey hover:text-silver transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-dim-grey hover:text-silver transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-dim-grey hover:text-silver transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
    </footer>
  );
}