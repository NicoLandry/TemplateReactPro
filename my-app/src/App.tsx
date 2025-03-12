import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import StartNow from "./pages/StartNow";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Dashboard from "./pages/DashBoard";
import ManageProperties from "./pages/ManageProperties";

/**
 * Layout for regular pages (Non-Dashboard)
 */
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/startnow"].includes(location.pathname); // Hide Navbar/Footer on Login and Signup

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

/**
 * Dashboard Layout for all /dashboard routes
 */
const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Non-Dashboard Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <Pricing />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />

        {/* Login & Signup Pages (Without Navbar & Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/startnow" element={<StartNow />} />

        {/* Dashboard Routes (With Sidebar) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/manage-properties"
          element={
            <DashboardLayout>
              <ManageProperties />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
