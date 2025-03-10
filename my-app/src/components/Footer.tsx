import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-gray-700 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Top Section: Logo & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Left Column: Logo & Description */}
          <div>
            <h2>
              <Link to="/" className="text-2xl font-bold text-gray-900">ProLoc</Link>
            </h2>
            <p className="mt-2 text-sm">
              ProLoc simplifies lease management for small landlords in Quebec, offering automated lease renewals, e-signatures, and rent tracking.
            </p>
          </div>

          {/* Middle Columns: Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-900">SERVICES</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gray-500">Lease Management</Link></li>
              <li><Link to="/pricing#faq" className="hover:text-gray-500">FAQ</Link></li>
              <li><Link to="/" className="hover:text-gray-500">Testimonials</Link></li>
              <li><Link to="/" className="hover:text-gray-500">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">RESOURCES</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-gray-500">Blog</Link></li>
              <li><Link to="/" className="hover:text-gray-500">Quebec Lease Laws</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">LEGAL</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-gray-500">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gray-500">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media & Copyright */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedinIn size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900"><FaInstagram size={20} /></a>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-gray-500">&copy; {new Date().getFullYear()} ProLoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
