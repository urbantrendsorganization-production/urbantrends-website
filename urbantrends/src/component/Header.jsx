import React, { useState, useEffect } from "react";
import logo from "../assets/urbantrends.svg";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-xl border-b border-gray-200/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={logo}
              alt="UrbanTrends"
              className="h-10 sm:h-12 lg:h-14 w-auto drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-10 bg-white/40 backdrop-blur-xl px-8 py-3 rounded-full shadow-sm border border-gray-200/30">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className="text-gray-700 font-medium text-sm uppercase tracking-wide hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-800 group-hover:w-full transition-all duration-300"></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-5">
            <button className="px-5 py-2 rounded-lg border border-gray-800 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
              Order Now
            </button>

            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 shadow-sm"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                )}
                <button
                  onClick={() =>
                    logout({ logoutParams: { returnTo: window.location.origin } })
                  }
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 p-4">
              <ul className="space-y-3 w-full text-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full px-4 py-3 text-gray-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 text-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button className="bg-gray-900 text-white font-medium px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-md">
                  Order Now
                </button>
                {!isAuthenticated ? (
                  <button
                    onClick={() => loginWithRedirect()}
                    className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      logout({ logoutParams: { returnTo: window.location.origin } })
                    }
                    className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
