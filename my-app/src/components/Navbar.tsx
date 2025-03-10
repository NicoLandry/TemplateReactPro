import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/logo.png"; // Import the logo

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle Language (Without i18n)
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "fr" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100/80 backdrop-blur-md shadow-md border-b border-gray-200/80"
          : "bg-transparent border-b border-gray-200"
      }`}
    >
      <div className="w-full flex justify-between items-center px-4 py-4">
        {/* Website Logo + Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="ProLoc Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-2xl font-bold text-blue-600 hover:opacity-80 hidden sm:inline">ProLoc</span>
        </Link>

        {/* Desktop Navigation Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li><Link to="/about" className="text-blue-600 hover:text-blue-700">About</Link></li>
          <li><Link to="/pricing" className="text-blue-600 hover:text-blue-700">Pricing</Link></li>
          <li><Link to="/contact" className="text-blue-600 hover:text-blue-700">Contact</Link></li>
          <li><Link to="/login" className="text-blue-600 hover:text-blue-700">Login</Link></li>

          {/* Start Now Button */}
          <li>
            <Link
              to="/startnow"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Start Now
            </Link>
          </li>

          {/* Language Toggle */}
          <li className="ml-2">
            <button
              onClick={toggleLanguage}
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {language.toUpperCase()}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden p-4 bg-white shadow-lg">
          <ul className="flex flex-col gap-4">
            <li><Link to="/about" className="block py-2 text-center text-blue-600 hover:text-blue-700" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/pricing" className="block py-2 text-center text-blue-600 hover:text-blue-700" onClick={() => setIsOpen(false)}>Pricing</Link></li>
            <li><Link to="/contact" className="block py-2 text-center text-blue-600 hover:text-blue-700" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><Link to="/login" className="block py-2 text-center text-blue-600 hover:text-blue-700" onClick={() => setIsOpen(false)}>Login</Link></li>

            {/* Mobile Start Now Button */}
            <li>
              <Link
                to="/startnow"
                className="block text-center py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Start Now
              </Link>
            </li>

            {/* Mobile Language Toggle */}
            <li className="text-center">
              <button
                onClick={toggleLanguage}
                className="w-8 h-8 rounded-full mx-auto flex items-center justify-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {language.toUpperCase()}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
