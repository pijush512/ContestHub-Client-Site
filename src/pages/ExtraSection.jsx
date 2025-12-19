import React from 'react';

const ExtraSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Header Part */}
        <div className="text-center w-11/12 mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Why Choose <span className="text-blue-600">ContestHub</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The ultimate platform for creators to showcase talent and win amazing rewards. 
            Join the revolution of creativity!
          </p>
        </div>

        {/* Manual Grid - No Array/Map used here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1 */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-6 w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Contests Hosted</p>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Goal Oriented</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">We help creators reach their full potential through competitive tasks.</p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-6 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">12k+</h3>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Active Members</p>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Global Community</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Connect with talented individuals from all over the world.</p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-6 w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              🏆
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$25k+</h3>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Prizes Awarded</p>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Big Rewards</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Win exciting prize money and get recognized by industry leaders.</p>
          </div>

          {/* Card 4 */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-6 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              🛡️
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">100%</h3>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Safe Transactions</p>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Secure Payments</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Your registration fees and prize money are protected with Stripe.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExtraSection;