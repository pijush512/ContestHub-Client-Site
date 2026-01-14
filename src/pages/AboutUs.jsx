import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Header */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h1 className="text-5xl font-black mb-4">Our Story</h1>
        <p className="max-w-2xl mx-auto px-4 text-blue-100 text-lg">
          Empowering creators and innovators to showcase their skills through global competitions.
        </p>
      </section>

      {/* Content Section */}
      <section className="w-11/12 mx-auto py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <img 
            src="https://i.ibb.co/3Y8Nf6r/about-team.jpg" 
            alt="Our Team Working" 
            className="rounded-[3rem] shadow-2xl"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-black dark:text-white">Why ContestHub?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            ContestHub was built with one goal in mind: to bridge the gap between talented individuals and opportunities. Whether you are a designer, writer, or programmer, our platform provides a transparent space to compete and win rewards.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <h4 className="text-3xl font-bold text-blue-600">Transparency</h4>
              <p className="text-sm text-gray-500 mt-2">Fair judging and secure payments via Stripe.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <h4 className="text-3xl font-bold text-indigo-600">Global</h4>
              <p className="text-sm text-gray-500 mt-2">Connect with creators from over 50 countries.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;