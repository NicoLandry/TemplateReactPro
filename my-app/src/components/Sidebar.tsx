import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiEdit,
  FiSettings,
  FiLogOut,
  FiPlusSquare,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Logo from "../assets/logo.png"; // Make sure your logo is here

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
        {/* Logo on Mobile */}
        <Link to="/dashboard">
          <img src={Logo} alt="App Logo" className="h-8" />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
          w-3/4 md:w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        {/* Sidebar Header with Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            <img src={Logo} alt="App Logo" className="h-8" />
          </Link>
          {/* Optional close icon on desktop if you want it visible at all times:
              <button className="md:hidden" onClick={() => setIsOpen(false)}>
                <FiX size={24} />
              </button> 
          */}
        </div>

        <nav className="p-4">
          <ul>
            <li className="mb-3">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                <FiHome className="mr-2" /> Overview
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/manage-properties"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                <FiPlusSquare className="mr-2" /> Manage Properties
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/lease-management"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                <FiFileText className="mr-2" /> Lease Management
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/rent-increases"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                <FiEdit className="mr-2" /> Rent Increases
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                <FiSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center w-full p-2 text-red-600 hover:bg-red-100 rounded-lg"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
