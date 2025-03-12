import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiTrendingUp,
  FiUsers,
  FiClock,
} from "react-icons/fi";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/verify-token`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, API_BASE_URL]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, {user?.email || "User"} 🎉</h2>
          <p className="text-gray-600 mt-1">Manage your rental properties with ProLoc.</p>

          {/* Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Total Properties */}
            <div className="p-6 bg-white shadow-md rounded-lg flex items-center">
              <FiHome className="text-blue-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Properties</h3>
                <p className="text-gray-600">5 Properties</p>
              </div>
            </div>

            {/* Active Leases */}
            <div className="p-6 bg-white shadow-md rounded-lg flex items-center">
              <FiFileText className="text-green-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Active Leases</h3>
                <p className="text-gray-600">8 Active</p>
              </div>
            </div>

            {/* Pending Lease Renewals */}
            <div className="p-6 bg-white shadow-md rounded-lg flex items-center">
              <FiClock className="text-yellow-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pending Renewals</h3>
                <p className="text-gray-600">2 Pending</p>
              </div>
            </div>

            {/* Upcoming Rent Increases */}
            <div className="p-6 bg-white shadow-md rounded-lg flex items-center">
              <FiTrendingUp className="text-purple-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Rent Increases</h3>
                <p className="text-gray-600">1 Scheduled</p>
              </div>
            </div>

            {/* Recent Tenant Activity */}
            <div className="p-6 bg-white shadow-md rounded-lg flex items-center">
              <FiUsers className="text-red-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Recent Tenant Activity</h3>
                <p className="text-gray-600">3 New Requests</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
