// import React from 'react'

// const WinnersSection = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default WinnersSection


import React from 'react';

const WinnersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Inspiring Text & Stats */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-black leading-tight italic">
              DREAM BIG, <br /> 
              <span className="text-yellow-400">WIN BIGGER!</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
              Join thousands of creators who have already turned their passion into prize money. 
              Your talent deserves more than just likes—it deserves a trophy!
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <h3 className="text-3xl font-bold text-yellow-400">1,200+</h3>
                <p className="text-sm text-gray-300 uppercase tracking-tighter">Total Winners</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <h3 className="text-3xl font-bold text-green-400">$45k+</h3>
                <p className="text-sm text-gray-300 uppercase tracking-tighter">Cash Distributed</p>
              </div>
              <div className="hidden md:block bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <h3 className="text-3xl font-bold text-blue-400">50+</h3>
                <p className="text-sm text-gray-300 uppercase tracking-tighter">New Contests</p>
              </div>
            </div>
          </div>

          {/* Right Side: Featured Winner Cards */}
          <div className="w-full lg:w-1/2 relative">
            {/* Decorative background glow */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="space-y-6 relative z-10">
              {/* Winner Card 1 */}
              <div className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 transform hover:-rotate-2 transition-all duration-300 shadow-2xl">
                <img 
                  src="https://i.ibb.co/m0v0TML/winner1.jpg" 
                  alt="Winner" 
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="text-xl font-bold">Alex Johnson</h4>
                  <p className="text-yellow-400 font-medium">Won $2,500 - UI/UX Challenge</p>
                  <p className="text-gray-400 text-sm italic">"ContestHub changed my career path!"</p>
                </div>
              </div>

              {/* Winner Card 2 */}
              <div className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 transform lg:translate-x-12 hover:rotate-2 transition-all duration-300 shadow-2xl">
                <img 
                  src="https://i.ibb.co/5GzXyYm/winner2.jpg" 
                  alt="Winner" 
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-400"
                />
                <div>
                  <h4 className="text-xl font-bold">Sarah Williams</h4>
                  <p className="text-blue-400 font-medium">Won $1,200 - Creative Writing</p>
                  <p className="text-gray-400 text-sm italic">"Finally, a place that values real talent."</p>
                </div>
              </div>

              {/* Winner Card 3 */}
              <div className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 transform hover:-rotate-1 transition-all duration-300 shadow-2xl">
                <img 
                  src="https://i.ibb.co/fN8p8N4/winner3.jpg" 
                  alt="Winner" 
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-green-400"
                />
                <div>
                  <h4 className="text-xl font-bold">Rahat Islam</h4>
                  <p className="text-green-400 font-medium">Won $3,000 - Logo Design</p>
                  <p className="text-gray-400 text-sm italic">"Fastest payment I've ever received!"</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WinnersSection;