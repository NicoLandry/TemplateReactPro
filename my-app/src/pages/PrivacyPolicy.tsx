import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <header className="pb-4 pt-4 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-blue-600">Privacy Policy</h1>
          <p className="text-sm text-gray-600">
            Effective Date: [Insert Date] | Last Updated: [Insert Date]
          </p>
        </header>

        {/* Content Section */}
        <main className="prose max-w-none mt-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">1. Introduction</h2>
            <p>
              Welcome to <strong>My Website</strong> ("we," "our," or "us"). We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">2. Information We Collect</h2>
            <ul className="list-disc list-inside">
              <li>
                <strong className="text-blue-800">Personal Information:</strong> Name, email, phone number, etc.
              </li>
              <li>
                <strong className="text-blue-800">Non-Personal Information:</strong> Browser type, IP address, pages visited, etc.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Send promotional emails (if opted-in)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">4. Cookies & Tracking</h2>
            <p>
              We use cookies for analytics and improving site functionality. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">5. How We Share Your Information</h2>
            <p>We do not sell your personal data. However, we may share data with:</p>
            <ul className="list-disc list-inside">
              <li>Service providers (e.g., hosting, analytics)</li>
              <li>Legal authorities when required</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">6. Data Security</h2>
            <p>
              We implement security measures to protect your data, but no system is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">7. Your Rights</h2>
            <p>
              You may have the right to access, update, or delete your personal data. Contact us at [Insert Contact Email].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">8. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Any changes will be posted on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">9. Contact Us</h2>
            <div>
              <p>If you have any questions, contact us at:</p>
              <div className="mt-4 space-y-2">
                <p className="flex items-center">
                  <span className="text-xl mr-2">📧</span>
                  <strong className="text-blue-800">Email:</strong>
                  <span className="ml-2">[Insert Contact Email]</span>
                </p>
                <p className="flex items-center">
                  <span className="text-xl mr-2">📍</span>
                  <strong className="text-blue-800">Address:</strong>
                  <span className="ml-2">[Insert Business Address]</span>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
