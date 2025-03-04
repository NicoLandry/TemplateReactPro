import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  billingPeriod: string;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  isPopular,
  billingPeriod,
}) => (
  <div
    className={`bg-white rounded-lg shadow-lg overflow-hidden ${
      isPopular ? "ring-2 ring-blue-600 scale-105" : ""
    }`}
  >
    {isPopular && (
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        Most Popular
      </div>
    )}
    <div className="p-8">
      <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
      <p className="mt-4 text-gray-500">{description}</p>
      <p className="mt-8">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-500">{billingPeriod}</span>
      </p>

      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FiCheck className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/startnow"
        className={`mt-8 block w-full py-3 px-4 rounded-md text-center font-medium transition-colors duration-200 ${
          isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        Get Started
      </Link>
    </div>
  </div>
);

const FAQItem: React.FC<{
  question: string;
  answer: string;
}> = ({ question, answer }) => {
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

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "24/7 support",
        "1GB storage",
        "Email notifications",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Custom integrations",
        "Team collaboration",
        "API access",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Unlimited storage",
        "Custom solutions",
        "Advanced security",
        "SLA guarantee",
        "Custom training",
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, the new pricing will be prorated for the remainder of your billing cycle. If you downgrade, the new pricing will take effect at the start of your next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also support wire transfers and purchase orders.",
    },
    {
      question: "Is there a long-term contract?",
      answer:
        "No, all our plans are month-to-month and you can cancel at any time. For Enterprise customers, we also offer annual contracts with special pricing.",
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-20 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing Toggle as Swipe-Style Switch */}
        <div className="flex justify-center items-center mb-8">
          <label htmlFor="billing-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="billing-toggle"
                type="checkbox"
                className="sr-only"
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
            <span className="ml-3 text-gray-700 font-medium">Annual Billing</span>
          </label>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const monthlyPrice = parseInt(plan.price.replace("$", ""));
            const displayPrice = isAnnual ? `$${monthlyPrice * 10}` : plan.price;
            const billingPeriod = isAnnual ? "/year" : "/month";

            return (
              <PricingTier
                key={index}
                name={plan.name}
                price={displayPrice}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                billingPeriod={billingPeriod}
              />
            );
          })}
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-24 max-w-3xl mx-auto mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600">
              Everything you need to know about our services
            </p>
          </div>

          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-blue-200">
                <FAQItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We're here to help! Contact our support team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
