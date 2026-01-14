import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="w-11/12 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Story</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-8 text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
            Empowering creators and innovators to showcase their skills through global competitions. 
            We believe talent has no borders.
          </p>
        </div>
      </section>

      <section className="w-11/12 max-w-7xl mx-auto py-24 grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-8 border-white dark:border-gray-800">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Our Team Working" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase italic tracking-tighter">
              Why <span className="text-blue-600">ContestHub?</span>
            </h2>
            <div className="h-1 w-16 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
            ContestHub was built with one goal in mind: to bridge the gap between talented individuals and opportunities. 
            Whether you are a designer, writer, or programmer, our platform provides a transparent space to compete, 
            grow, and win life-changing rewards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-8 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] hover:shadow-xl transition-all group">
              <h4 className="text-4xl font-black text-blue-600 italic tracking-tighter">Transparency</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-bold uppercase tracking-wider">
                Fair judging & secure Stripe payments.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] hover:shadow-xl transition-all group">
              <h4 className="text-4xl font-black text-indigo-600 italic tracking-tighter">Global</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-bold uppercase tracking-wider">
                Creators from 50+ countries worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;