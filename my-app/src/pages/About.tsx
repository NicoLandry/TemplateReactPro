import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
}

const About: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        // Define three blog posts
        setPosts([
          {
            id: "1",
            title: "Getting Started with React",
            excerpt:
              "Learn the basics of React and how to build your first application with modern web development practices.",
            date: "March 15, 2024",
            author: "John Doe",
            readTime: "5 min read",
            imageUrl: "https://picsum.photos/800/400?random=1",
          },
          {
            id: "2",
            title: "Understanding TypeScript",
            excerpt:
              "Dive deep into TypeScript features and how they can improve your JavaScript development experience.",
            date: "March 10, 2024",
            author: "Jane Smith",
            readTime: "7 min read",
            imageUrl: "https://picsum.photos/800/400?random=2",
          },
          {
            id: "3",
            title: "Mastering Tailwind CSS",
            excerpt:
              "Explore the power of Tailwind CSS and learn how to build beautiful, responsive interfaces quickly.",
            date: "March 5, 2024",
            author: "Mike Johnson",
            readTime: "6 min read",
            imageUrl: "https://picsum.photos/800/400?random=3",
          },
        ]);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Skeleton loader for the loading state
  const BlogSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-40 sm:h-48 bg-gray-200" />
      <div className="p-4 sm:p-6">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 sm:mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2 sm:mb-4" />
        <div className="flex items-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-24 ml-2" />
        </div>
      </div>
    </div>
  );

  const shouldShowPosts = posts.length > 0;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-32 pb-32 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Stay updated with our latest thoughts, tutorials, and insights about web
            development, design, and technology.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-600 mb-12 p-4 bg-red-50 rounded-lg">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-4 text-blue-600 hover:text-blue-700 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {isLoading && !shouldShowPosts ? (
            [...Array(3)].map((_, index) => <BlogSkeleton key={index} />)
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 sm:h-48 object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/800x400?text=Image+Not+Found";
                  }}
                />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2 sm:mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      {post.author[0]}
                    </div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-600">
                      {post.author}
                    </span>
                  </div>
                  {/* Only one "Read More" link per card */}
                  <Link
                    to="/blog"
                    className="inline-block mt-2 sm:mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
