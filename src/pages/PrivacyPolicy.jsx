import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Privacy Policy</h1>
      <div className="prose prose-blue text-gray-600 space-y-6">
        <p className="text-lg">Last updated: January 2026</p>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, participate in a contest, or communicate with us.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Information</h2>
          <p>We use the information we collect to operate and maintain our contests, process payments, and improve your experience on ContestHub.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal data from unauthorized access or disclosure.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;