import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);
  

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100/80 backdrop-blur-md shadow-md border-b border-gray-200/80"
          : "bg-transparent border-b border-gray-200"
      }`}
    >
      <div className="w-full flex justify-between items-center px-4 py-4">
        {/* Website Logo */}
        <Link
          to="/"
          className="text-2xl font-bold transition-colors duration-200 text-blue-600 hover:opacity-80"
        >
          My Website
        </Link>

        {/* Desktop Navigation Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {["About", "Pricing", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className="transition-colors duration-200 text-blue-600 hover:text-blue-700"
              >
                {item}
              </Link>
            </li>
          ))}

          {/* Login Link */}
          <li>
            <Link
              to="/login"
              className="transition-colors duration-200 text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </li>

          {/* Start Now Button */}
          <li>
            <Link
              to="/startnow"
              className="px-4 py-2 rounded-lg transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
            >
              Start Now
            </Link>
          </li>

          {/* Language Toggle */}
          <li className="ml-2">
            <button
              onClick={toggleLanguage}
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
            >
              {language.toUpperCase()}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl p-2 rounded-md transition-colors duration-200 text-blue-600 hover:bg-blue-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden p-4 bg-white">
          <ul className="flex flex-col gap-4">
            {["About", "Pricing", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="block py-2 text-center transition-colors duration-200 text-blue-600 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* Mobile Login Link */}
            <li>
              <Link
                to="/login"
                className="block py-2 text-center transition-colors duration-200 text-blue-600 hover:text-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>

            {/* Mobile Start Now Button */}
            <li>
              <Link
                to="/startnow"
                className="block text-center py-2 rounded-lg transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Start Now
              </Link>
            </li>

            {/* Mobile Language Toggle */}
            <li className="text-center">
              <button
                onClick={toggleLanguage}
                className="w-8 h-8 rounded-full mx-auto flex items-center justify-center font-semibold transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
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
