import React, { useState, useEffect } from "react";
import logo from "../assets/urbantrends.svg";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

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
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const syncAndFetchOrders = async () => {
      try {
        // 1️⃣ Sync user
        const payload = {
          auth0_id: user.sub,
          name:
            user.name ||
            `${user.given_name || ""} ${user.family_name || ""}`.trim() ||
            "Unnamed User",
          email: user.email,
          avatar: user.picture,
          role: "client",
        };

        await axios.post(`${backendLink}/v2/users/sync`, payload);
        console.log("✅ User synced successfully");

        // 2️⃣ Fetch orders using auth0_id
        const response = await axios.get(
          `${backendLink}/v2/orders/order/${user.sub}`
        );

        const count = response.data.orders?.length || 0;
        setOrderCount(count);
        console.log("🧾 Orders fetched:", count);
      } catch (error) {
        console.error("❌ Error syncing/fetching:", error.message);
      }
    };

    syncAndFetchOrders();
  }, [isAuthenticated, user, backendLink]);

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
          <div className="hidden lg:flex items-center gap-5 relative">
            {/* 🛒 Order Icon */}
            {isAuthenticated && (
              <Link
                to="/orders"
                className="relative hover:text-indigo-600 transition-colors duration-200"
              >
                <ShoppingBag className="w-6 h-6 text-gray-800" />
                {orderCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {orderCount}
                  </span>
                )}
              </Link>
            )}

            {/* Order Now */}
            <button className="px-5 py-2 rounded-lg border border-gray-800 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
              Order Now
            </button>

            {/* Auth */}
            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="px-5 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-slate-700 transition-all duration-300 shadow-sm"
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
      </div>
    </header>
  );
}

export default Header;
