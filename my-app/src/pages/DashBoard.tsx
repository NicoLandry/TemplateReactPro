import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Redirect if no user is logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-20 overflow-x-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        {user && <p className="text-gray-700 mt-4">Welcome, {user.email} 🎉</p>}
        <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
