import React, { useState }from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HeroImage from "../assets/hero-image.png"; // Replace with a real ProLoc image
import ProfileImage from "../assets/face_circular.png"; // Your circular profile image


// FAQ Accordion Component (FIXED)
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full py-6 flex justify-between items-center text-left bg-transparent border-0 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400"
        >
          <FiChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home: React.FC = () => {
  const faqs = [
    {
      question: "How does ProLoc automate lease renewals?",
      answer:
        "ProLoc automatically generates renewal notices based on your lease terms and Quebec rental regulations, sending them to tenants for approval.",
    },
    {
      question: "Are e-signatures legally binding in Quebec?",
      answer:
        "Yes! ProLoc uses an open-source e-signature system that ensures compliance with Quebec’s rental laws, making your signed documents legally binding.",
    },
    {
      question: "Can I manually set a rent increase instead of automatic calculations?",
      answer:
        "Absolutely! ProLoc allows landlords to either use automatic rent increase calculations based on government guidelines or set custom values.",
    },
    {
      question: "What happens if my tenant refuses a rent increase?",
      answer:
        "If a tenant refuses a rent increase, ProLoc notifies you immediately, allowing you to take the necessary steps based on Quebec rental laws.",
    },
  ];
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-16 bg-blue-50">
        {/* Left Content */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-600 leading-tight">
            Simplify Lease Management with <span className="text-gray-800">ProLoc</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Automate lease renewals, manage rent increases, and get legally binding e-signatures—all in one platform.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/startnow" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
              Get Started
            </Link>
            <Link
              to="#how-proloc-works"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-100"
            >
              Learn More
            </Link>

          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0">
          <img src={HeroImage} alt="ProLoc Hero" className="max-w-sm md:max-w-md rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Why Choose ProLoc?</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Designed for small landlords, ProLoc makes lease management effortless.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <FaCheckCircle className="text-blue-600 text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-4">Automated Lease Renewals</h3>
            <p className="text-gray-600 mt-2">
              Generate and send renewal notices with pre-filled legal forms in minutes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <FaCheckCircle className="text-blue-600 text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-4">E-Signatures Made Easy</h3>
            <p className="text-gray-600 mt-2">
              Tenants can sign leases online, eliminating the need for in-person meetings.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <FaCheckCircle className="text-blue-600 text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-4">Stay Legally Compliant</h3>
            <p className="text-gray-600 mt-2">
              ProLoc follows Quebec’s rental laws, ensuring your documents are legally binding.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section id="how-proloc-works" className="py-16 px-6 lg:px-20 bg-gray-50">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-blue-600">How ProLoc Works</h2>
    <p className="text-gray-700 mt-3 max-w-3xl mx-auto">
      ProLoc simplifies lease management for small landlords in Quebec by automating <strong>lease renewals, rent increases, and e-signatures</strong>.
      Our platform ensures compliance with Quebec’s rental laws while saving you time and effort.
    </p>
  </div>

  {/* Steps (Now Stacked Vertically) */}
  <div className="mt-12 flex flex-col gap-6 max-w-4xl mx-auto">
    {/* Step 1 */}
    <div className="p-6 bg-white shadow-md rounded-lg flex items-start">
      <div className="flex-shrink-0 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
        1
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-blue-600">Upload or Create a Lease</h3>
        <p className="text-gray-700 mt-2">
          Start by uploading an existing lease or using ProLoc’s <strong>pre-filled legal templates</strong> based on Quebec regulations.
        </p>
      </div>
    </div>

    {/* Step 2 */}
    <div className="p-6 bg-white shadow-md rounded-lg flex items-start">
      <div className="flex-shrink-0 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
        2
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-blue-600">Automate Renewals & Rent Increases</h3>
        <p className="text-gray-700 mt-2">
          ProLoc calculates <strong>rent increases based on Quebec guidelines</strong> and automatically sends renewal notices to tenants.
        </p>
      </div>
    </div>

    {/* Step 3 */}
    <div className="p-6 bg-white shadow-md rounded-lg flex items-start">
      <div className="flex-shrink-0 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
        3
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-blue-600">Get E-Signatures Instantly</h3>
        <p className="text-gray-700 mt-2">
          Tenants can <strong>sign leases online</strong> using our <strong>open-source e-signature system</strong>, making the process <strong>fast & paperless</strong>.
        </p>
      </div>
    </div>
  </div>

  {/* More Features */}
  <div className="mt-12 text-center">
    <p className="text-gray-700 max-w-3xl mx-auto">
      With ProLoc, you can also <strong>track lease statuses, store legal documents, and receive instant notifications</strong> when a tenant accepts or refuses a rent increase.
      Manage everything from your landlord dashboard with ease.
    </p>
    <Link
      to="/startnow"
      className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
    >
      Get Started
    </Link>
  </div>
</section>
{/* FAQ Section */}
<div id="faq" className="mt-24 max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-blue-200">
                <FAQItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>



     {/* About Me Section */}
<section className="py-16 px-6 lg:px-20 bg-gray-100">
  <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
    
    {/* Left: Profile Image & Name */}
    <div className="flex-shrink-0 text-center md:text-left">
      <img
        src={ProfileImage}
        alt="Profile"
        className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-md border-4 border-blue-500"
      />
      <p className="mt-4 text-lg font-semibold text-gray-800">Nicolas Landry, 21</p>
      <p className="text-gray-600">Software Engineering Student</p>
    </div>

    {/* Right: About Text */}
    <div className="text-center md:text-left">
      <h2 className="text-3xl font-bold text-blue-600">About Me</h2>
      <p className="text-gray-700 mt-4">
        The idea for <strong>ProLoc</strong> started with my father, a small landlord managing a few rental properties in Quebec. 
        I watched him struggle with lease renewals, tenant agreements, and legal paperwork—tasks that were time-consuming and often frustrating. 
        I realized that small landlords, unlike large property management companies, lacked access to automated lease management tools.
      </p>

      <p className="text-gray-700 mt-4">
        After researching, I discovered that many independent landlords faced similar challenges. There was a clear demand for a simple, digital 
        solution that could handle <strong>lease renewals, rent increases, and e-signatures</strong> while ensuring compliance with Quebec rental laws.
      </p>

      <p className="text-gray-700 mt-4">
        As a <strong>2nd-year software engineering student at Concordia University</strong>, I knew that technology could bridge this gap. I combined my  
        <strong> technical expertise</strong> with firsthand experience to develop <strong>ProLoc</strong>—a platform designed to streamline lease management 
        for small landlords. My goal is to make managing rental properties <strong>easier, more efficient, and legally secure</strong>.
      </p>

      <p className="text-gray-900 font-semibold mt-6">
        ProLoc is more than a tool—it’s a solution built for landlords, by someone who truly understands their challenges.
      </p>
    </div>
  </div>
</section>




      {/* Call to Action */}
      <section className="w-full bg-blue-600 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Manage Your Leases Smarter?</h2>
        <p className="text-lg text-blue-200 mt-2">Start with ProLoc today and streamline your rental business.</p>
        <Link to="/startnow" className="mt-6 inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-100">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
