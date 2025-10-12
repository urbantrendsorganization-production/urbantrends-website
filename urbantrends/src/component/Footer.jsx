import React from 'react'
import logo from '../assets/urbantrends.svg'

function Footer() {
  return (
    <footer className="w-full text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
        
        {/* Logo + Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="UrbanTrends logo" className="h-10 w-auto" />
            <h2 className="text-xl font-bold">UrbanTrends</h2>
          </div>
          <p className="mt-4 text-sm text-gray-800 text-center md:text-left">
            Building digital experiences that drive growth.
          </p>
        </div>

        {/* Quick Links 1 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Home</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Hero Section</a></li>
            <li><a href="#" className="hover:underline">Featured Services</a></li>
            <li><a href="#" className="hover:underline">Featured Work</a></li>
            <li><a href="#" className="hover:underline">Why Choose UrbanTrends</a></li>
            <li><a href="#" className="hover:underline">Call-to-Action</a></li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Web Development</a></li>
            <li><a href="#" className="hover:underline">E-commerce Development</a></li>
            <li><a href="#" className="hover:underline">Website Optimization</a></li>
            <li><a href="#" className="hover:underline">Maintenance & Support</a></li>
            <li><a href="#" className="hover:underline">UI/UX Design</a></li>
          </ul>
        </div>

        {/* Quick Links 3 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Portfolio</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Websites</a></li>
            <li><a href="#" className="hover:underline">Apps & Dashboards</a></li>
            <li><a href="#" className="hover:underline">E-commerce Projects</a></li>
            <li><a href="#" className="hover:underline">Branding/Design</a></li>
            <li><a href="#" className="hover:underline">Industry Solutions</a></li>
            <li><a href="https://developers.urbantrends.dev" target='_blank' className="hover:underline">UrbanTrends Developers</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-400 pt-6">
        <p className="text-sm text-gray-700">
          © {new Date().getFullYear()} UrbanTrends. All rights reserved.
        </p>
        <button className="mt-4 md:mt-0 bg-slate-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get in Touch
        </button>
      </div>
    </footer>
  )

}

export default Footer
