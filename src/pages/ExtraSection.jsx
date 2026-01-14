import React from 'react';
import { FaBullseye, FaGlobe, FaAward, FaShieldAlt } from 'react-icons/fa';

const ExtraSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Why Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              ContestHub?
            </span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            The ultimate platform for creators to showcase talent and win amazing rewards. 
            Join the revolution of creativity!
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="text-3xl mb-8 w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
              <FaBullseye />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 italic tracking-tighter">500+</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Contests Hosted</p>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Goal Oriented</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">We help creators reach their full potential through competitive tasks.</p>
          </div>
          <div className="group p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="text-3xl mb-8 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
              <FaGlobe />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 italic tracking-tighter">12k+</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Active Members</p>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Global Community</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Connect with talented individuals from all over the world.</p>
          </div>

          <div className="group p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="text-3xl mb-8 w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
              <FaAward />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 italic tracking-tighter">$25k+</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Prizes Awarded</p>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Big Rewards</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Win exciting prize money and get recognized by industry leaders.</p>
          </div>

          <div className="group p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="text-3xl mb-8 w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
              <FaShieldAlt />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 italic tracking-tighter">100%</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Safe Transactions</p>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Secure Payments</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Your registration fees and prize money are protected with Stripe.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExtraSection;