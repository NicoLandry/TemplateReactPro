import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

// Pricing Card Component
interface PricingTierProps {
  name: string;
  price: number;
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
        <span className="text-4xl font-bold text-gray-900">${price}</span>
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

// Main Pricing Component
const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 9,
      description: "Ideal for landlords managing 1-2 properties.",
      features: [
        "Manage up to 2 rental properties",
        "Automated lease renewals",
        "Basic e-signature integration",
        "Legal document storage",
        "Standard customer support",
      ],
    },
    {
      name: "Pro",
      monthlyPrice: 29,
      description: "For landlords managing multiple properties efficiently.",
      features: [
        "Unlimited rental properties",
        "Automated rent increase calculations",
        "Advanced e-signature system",
        "Custom lease templates",
        "Tenant communication tools",
        "Priority customer support",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      description: "For property managers handling large portfolios.",
      features: [
        "Everything in Pro",
        "Unlimited lease document storage",
        "Dedicated account manager",
        "Custom legal compliance checks",
        "Advanced reporting & analytics",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-20 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Simple, Transparent Pricing for Landlords
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your rental management needs. All plans include <strong>automated lease renewals</strong>, <strong>legal document storage</strong>, and <strong>e-signature features</strong>.
          </p>
        </div>

        {/* Billing Toggle */}
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
            const displayPrice = isAnnual ? plan.monthlyPrice * 10 : plan.monthlyPrice;
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
      </div>
    </div>
  );
};

export default Pricing;
