import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full fixed top-0 left-0 bg-blue-600 p-4 text-white shadow-md z-50">
      <div className="w-full flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">My Website</h1>
        <ul className="hidden md:flex gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`hover:underline ${
                  location.pathname === (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    ? "text-yellow-400 font-semibold"
                    : "text-white"
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 bg-blue-700 p-4 rounded">
          <ul className="flex flex-col gap-4">
            {["Home", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block py-2 text-center text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
