import React, { useState, useEffect } from "react";
import logo from "../assets/urbantrends.svg";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200/50"
                : "bg-gradient-to-r from-white via-[#F9FAFB] to-white"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 hover:scale-105 transition-transform duration-200">
                        <img
                            src={logo}
                            alt="UrbanTrends"
                            className="h-8 sm:h-14 lg:h-16 w-auto drop-shadow-sm"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-8 bg-white/70 backdrop-blur-md px-6 py-3 font-tech rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            {navLinks.map((link) => (
                                <li key={link.name} className="relative group text-md">
                                    <Link to={link.path} className="cursor-pointer text-gray-700 font-medium hover:text-gray-600 transition-colors duration-200 py-2 ">
                                        {link.name}
                                    </Link>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300" />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Account Avatar */}
                        <div className="hidden sm:block">
                            <button className="px-3 py-2 border-2 border-black rounded">Order now</button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`w-6 h-6 transform transition-transform duration-200 ${isMobileMenuOpen ? "rotate-90" : ""
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

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <nav className="py-4">
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 p-4">
                            <ul className="space-y-3 w-full text-center">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-center"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile Account */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                                <button className="bg-gray-600 text-white font-medium px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md">
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>

            </div>
        </header>
    );
}

export default Header;
