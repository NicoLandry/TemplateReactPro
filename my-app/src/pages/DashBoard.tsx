import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiFileText, FiEdit, FiSettings, FiLogOut } from "react-icons/fi";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    if (token && email) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email }));
      window.history.replaceState({}, document.title, "/dashboard");
    }

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">ProLoc Dashboard</h1>
        </div>

        <nav className="p-4">
          <ul>
            <li className="mb-3">
              <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
                <FiHome className="mr-2" /> Overview
              </button>
            </li>
            <li className="mb-3">
              <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
                <FiFileText className="mr-2" /> Lease Management
              </button>
            </li>
            <li className="mb-3">
              <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
                <FiEdit className="mr-2" /> Rent Increases
              </button>
            </li>
            <li className="mb-3">
              <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
                <FiSettings className="mr-2" /> Settings
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full p-2 text-red-600 hover:bg-red-100 rounded-lg"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, {user?.email || "User"} 🎉</h2>
          <p className="text-gray-600 mt-1">Manage your rental properties with ProLoc.</p>

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Active Leases */}
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-blue-600">Active Leases</h3>
              <p className="text-gray-600 mt-2">View and manage your current rental agreements.</p>
              <button className="mt-4 text-blue-600 hover:underline">View Leases</button>
            </div>

            {/* Pending Lease Approvals */}
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-blue-600">Pending Lease Approvals</h3>
              <p className="text-gray-600 mt-2">Check tenant responses to lease renewals.</p>
              <button className="mt-4 text-blue-600 hover:underline">Review Approvals</button>
            </div>

            {/* Rent Increase Requests */}
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-blue-600">Rent Increase Requests</h3>
              <p className="text-gray-600 mt-2">Monitor tenant responses to rent increases.</p>
              <button className="mt-4 text-blue-600 hover:underline">Manage Increases</button>
            </div>
          </div>

          {/* Extra Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Document Storage */}
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-blue-600">Document Storage</h3>
              <p className="text-gray-600 mt-2">Access and store lease agreements securely.</p>
              <button className="mt-4 text-blue-600 hover:underline">View Documents</button>
            </div>

            {/* Notifications */}
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-blue-600">Notifications</h3>
              <p className="text-gray-600 mt-2">Get updates on lease approvals and tenant actions.</p>
              <button className="mt-4 text-blue-600 hover:underline">View Notifications</button>
            </div>

            {/* Account Settings */}
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-blue-600">Account Settings</h3>
              <p className="text-gray-600 mt-2">Update your account information and preferences.</p>
              <button className="mt-4 text-blue-600 hover:underline">Manage Account</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
