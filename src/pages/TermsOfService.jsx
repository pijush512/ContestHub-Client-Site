import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Terms of Service</h1>
      <div className="prose prose-blue text-gray-600 space-y-6">
        <p className="text-lg">Last updated: January 2026</p>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
          <p>By accessing or using ContestHub, you agree to be bound by these Terms of Service and all applicable laws.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">2. Contest Participation</h2>
          <p>Participants must provide accurate information and follow specific contest rules. Fraudulent activity will lead to immediate disqualification.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">3. Payments & Refunds</h2>
          <p>Contest entry fees are processed via Stripe. Refunds are only issued in the event of a contest cancellation by the creator.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;