import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ShoppingCart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import React from 'react';
import logo from '/urbantrends.svg'
import { useCart } from './context/CartContext';
import { useAuth0 } from '@auth0/auth0-react';


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  


  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gunmetal' : 'bg-transparent'
        }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="company logo" className='w-10' />
            <span className="text-xl text-silver tracking-tight">
              Urban<span className="text-silver">Trends</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors duration-200 relative group ${location.pathname === item.path ? 'text-silver' : 'text-dim-grey hover:text-silver'
                  }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-silver transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                />
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {isLoading ? (
  <Button variant="ghost" className="text-silver px-6 py-3 text-lg rounded-xl">
    Loading...
  </Button>
) : isAuthenticated ? (
  <div className="flex items-center gap-2">
    <span className="text-silver">Hi, {user.name}</span>
    <Button
      onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
      variant="ghost"
      className="text-silver px-4 py-2 rounded-lg"
    >
      Logout
    </Button>
  </div>
) : (
  <Button
    onClick={() => loginWithRedirect()}
    variant="ghost"
    className="relative text-silver px-6 py-3 text-lg rounded-xl"
  >
    Login
  </Button>
)}




            <Link to="/checkout" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-silver hover:text-silver hover:bg-gunmetal"
              >
                <ShoppingCart className="w-5 h-5" />

                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-silver text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-silver hover:text-silver transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/98 border-t border-gunmetal overflow-hidden"
          >
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 transition-colors duration-200 ${location.pathname === item.path ? 'text-silver' : 'text-dim-grey'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}