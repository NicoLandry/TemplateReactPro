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
              Welcome to <strong>ProLoc</strong> ("we," "our," or "us"). At ProLoc, we prioritize your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect data when you use our **lease management platform**.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">2. Information We Collect</h2>
            <p>We collect and process different types of data to provide our lease management services effectively.</p>
            <ul className="list-disc list-inside">
              <li>
                <strong className="text-blue-800">Landlord Information:</strong> Name, email, contact details, property details.
              </li>
              <li>
                <strong className="text-blue-800">Tenant Information:</strong> Name, email, lease agreements, rental history.
              </li>
              <li>
                <strong className="text-blue-800">Lease & Payment Data:</strong> Lease terms, rent increase approvals, e-signature records.
              </li>
              <li>
                <strong className="text-blue-800">Technical Data:</strong> IP address, browser type, and usage logs for security and performance monitoring.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">3. How We Use Your Information</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul className="list-disc list-inside">
              <li>Facilitating lease agreements between landlords and tenants.</li>
              <li>Providing legally compliant e-signature services.</li>
              <li>Storing and managing lease agreements securely.</li>
              <li>Calculating rent increases based on Quebec regulations.</li>
              <li>Sending important notifications regarding leases and rent changes.</li>
              <li>Improving user experience through analytics.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">4. Cookies & Tracking</h2>
            <p>
              ProLoc uses cookies to improve platform functionality, track login sessions, and enhance security. You can adjust your browser settings to manage cookie preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">5. How We Share Your Information</h2>
            <p>We do not sell your personal data. However, we may share limited information with:</p>
            <ul className="list-disc list-inside">
              <li>Trusted service providers for payment processing and cloud storage.</li>
              <li>Legal authorities when required by law or rental regulations.</li>
              <li>Third-party authentication providers (e.g., Google Login) for secure account access.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">6. Data Security</h2>
            <p>
              We implement strong security measures to protect lease agreements and personal data. These include:
            </p>
            <ul className="list-disc list-inside">
              <li>End-to-end encryption for sensitive lease documents.</li>
              <li>Multi-factor authentication (MFA) for landlord accounts.</li>
              <li>Regular security audits to prevent unauthorized access.</li>
            </ul>
            <p>However, no system is 100% secure, and we encourage users to take additional precautions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">7. Your Rights</h2>
            <p>
              As a ProLoc user, you have the right to:
            </p>
            <ul className="list-disc list-inside">
              <li>Access, update, or delete your personal data.</li>
              <li>Request a copy of your stored lease agreements.</li>
              <li>Opt-out of marketing communications.</li>
              <li>Request deletion of your account (subject to legal document retention requirements).</li>
            </ul>
            <p>To exercise these rights, contact us at <strong>[Insert Contact Email]</strong>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">8. Compliance with Quebec Rental Laws</h2>
            <p>
              ProLoc is designed to comply with Quebec rental laws regarding **lease agreements, rent increases, and digital signatures**. We regularly update our platform to reflect changes in provincial regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">9. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Any changes will be posted on this page, and users will be notified of significant updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600">10. Contact Us</h2>
            <div>
              <p>If you have any questions about this Privacy Policy, contact us:</p>
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
