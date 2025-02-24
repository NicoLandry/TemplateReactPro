import React from "react";

/**
 * Home Component
 * This component renders the home page with a centered welcome message.
 */
const Home: React.FC = () => {
  return (
    // Main container: Takes full width and height of the screen, 
    // centers content both vertically and horizontally, 
    // and ensures background color is applied.
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 pt-16">
      
      {/* Inner container: Centers text and restricts width for better readability */}
      <div className="text-center max-w-3xl">
        
        {/* Heading: Main welcome text with bold blue styling */}
        <h1 className="text-5xl font-bold text-blue-600">Welcome to My Website</h1>
        
        {/* Subtext: Additional information below the heading */}
        <p className="mt-4 text-gray-700 text-lg">
          This is the home page. Explore and enjoy!
        </p>

      </div>
    </div>
  );
};

export default Home;

