import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../assets/logo.png";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  const handleLogin = async () => {
    setMessage("");
    if (!email || !password) {
      setMessage("All fields are required.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("🔍 Server Response:", data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(data.message);
        console.error("❌ Login failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-page flex items-center justify-center w-screen h-screen bg-white-100 pt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold text-blue-600">
            <Link to="/"><img src={Logo} alt="ProLoc Logo" className="h-10 w-auto" /></Link>
          </h1>
        </div>
        <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">Welcome back</h2>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4 relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full mt-1 p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 focus:outline-none p-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {message && <p className="mt-3 text-center text-red-600">{message}</p>}
        <button
          className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Continue
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/startnow" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
          onClick={() => window.location.href = `${API_BASE_URL}/auth/google`}
        >
          <FaGoogle size={18} />
          Continue with Google
        </button>
        <p className="text-center text-xs text-gray-500 mt-4">
          By registering, you agree to our{" "}
          <Link to="/privacy-policy" className="text-blue-600 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
