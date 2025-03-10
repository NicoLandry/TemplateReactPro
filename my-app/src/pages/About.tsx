import React from "react";
import { Link } from "react-router-dom";
import DocuSignImage from "/src/assets/docusigni.png";
import ProprioQImage from "/src/assets/proprioQ.png";

const Blog: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-blue-100 pt-32 pb-32 overflow-x-hidden">
      {/* Blog Header Section */}
      <div className="text-center">
        <h4 className="text-lg uppercase text-blue-700 font-semibold tracking-wide">Our Blog</h4>
        <h1 className="text-5xl font-bold text-gray-900 mt-4">Content on Digital Lease Management & Real Estate</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mt-4">
          Learn how <strong>ProLoc</strong> is transforming lease management, rent increases, and digital signatures for small landlords.
        </p>
      </div>

      {/* Blog Posts Section */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Blog Post 1: DocuSign Security & E-Signatures */}
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={DocuSignImage}
              alt="E-Signature Security with ProLoc"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h4 className="text-sm uppercase text-gray-500 font-semibold">E-Signature Security</h4>
              <h2 className="text-2xl font-semibold text-blue-600 mt-2">
                How <strong>ProLoc</strong> Ensures Secure Digital Lease Signatures
              </h2>
              <p className="text-gray-700 mt-4">
                With more landlords switching to digital leases, ensuring legally binding and secure signatures is crucial.
                Learn how <strong>ProLoc’s open-source e-signature system</strong> ensures compliance and security.
              </p>
              <div className="mt-6">
                <Link to="/blog/docusign-security" className="text-blue-600 hover:text-blue-700 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          </article>

          {/* Blog Post 2: Small Landlords & Rent Management */}
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ProprioQImage}
              alt="How Many Small Landlords Are in Quebec?"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h4 className="text-sm uppercase text-gray-500 font-semibold">Lease Management & Rent Increases</h4>
              <h2 className="text-2xl font-semibold text-blue-600 mt-2">
                Small Landlords in Quebec: How <strong>ProLoc</strong> Helps You Manage Rent
              </h2>
              <p className="text-gray-700 mt-4">
                Did you know that <strong>over 50% of rental properties in Quebec</strong> are owned by small landlords? 
                See how <strong>ProLoc</strong> makes rent increases, lease renewals, and legal compliance effortless.
              </p>
              <div className="mt-6">
                <Link to="/blog/small-landlords-quebec" className="text-blue-600 hover:text-blue-700 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  );
};

export default Blog;
