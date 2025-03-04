import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  // Inline Testimonial Carousel Component
  const TestimonialCarousel = () => {
    const testimonials = [
      {
        quote:
          "This template made it incredibly easy for me to launch my website quickly. The design is modern and the code is clean!",
        author: "Alex Smith",
      },
      {
        quote:
          "I love how customizable and responsive the template is. It's perfect for any project, big or small!",
        author: "Jamie Lee",
      },
      {
        quote:
          "An outstanding template that is both powerful and easy to use. I highly recommend it!",
        author: "Sam Johnson",
      },
      {
        quote:
          "The best website template I've ever used. It is sleek, fast, and fully responsive.",
        author: "Taylor Brown",
      },
    ];

    const intervalRef = useRef<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
      if (!isPaused) {
        intervalRef.current = window.setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 4000);
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isPaused, testimonials.length]);

    const handlePause = () => {
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleResume = () => {
      setIsPaused(false);
    };

    return (
      <div
        className="relative bg-gray-50 p-8 rounded-lg shadow-md max-w-lg mx-auto"
        style={{ perspective: 1000 }}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-700 italic text-center">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="mt-4 text-right">
              <p className="text-blue-600 font-semibold">
                - {testimonials[currentIndex].author}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-blue-600 hover:text-blue-800"
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + testimonials.length) % testimonials.length
            )
          }
        >
          &#8592;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-blue-600 hover:text-blue-800"
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % testimonials.length)
          }
        >
          &#8594;
        </button>
      </div>
    );
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-600">
            Welcome to My Website
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-700">
            Your ultimate template for building amazing web projects. This website
            is a fully customizable template that you can use for your future projects.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">
            About This Template
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-700 text-center">
            This template is designed to be flexible, easy to customize, and perfect for
            startups, small businesses, or personal projects. Enjoy a modern design with
            responsive layouts, smooth animations, and clean, maintainable code.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">
            Testimonials
          </h2>
          <div className="mt-10">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">
            Our Sponsors
          </h2>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-8">
            <img
              src="https://picsum.photos/150/80?random=8"
              alt="Tailwind Bank"
              className="object-contain"
            />
            <img
              src="https://picsum.photos/150/80?random=5"
              alt="Sponsor 2"
              className="object-contain"
            />
            <img
              src="https://picsum.photos/150/80?random=6"
              alt="Sponsor 3"
              className="object-contain"
            />
            <img
              src="https://picsum.photos/150/80?random=7"
              alt="Sponsor 4"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="w-full bg-blue-600 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-blue-100">
            Explore the template, customize it to your needs, and build something amazing!
          </p>
          <Link
            to="/startnow"
            className="mt-8 inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
