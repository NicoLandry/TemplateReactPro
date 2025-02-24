import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 pt-16">
        <div className="text-center max-w-3xl">
            <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
            <p className="mt-4 text-gray-700 text-lg">Learn more about our website.</p>
        </div>
    </div>
  );
};

export default About;
