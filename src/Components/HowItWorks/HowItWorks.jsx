import React from "react";
import { FaSearch, FaUserPlus, FaCloudUploadAlt, FaTrophy } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      title: "Explore",
      desc: "Find a contest that matches your skill.",
      icon: <FaSearch />,
      color: "bg-blue-500"
    },
    {
      title: "Register",
      desc: "Pay the entry fee and join the battle.",
      icon: <FaUserPlus />,
      color: "bg-purple-500"
    },
    {
      title: "Submit",
      desc: "Upload your best work before the deadline.",
      icon: <FaCloudUploadAlt />,
      color: "bg-indigo-500"
    },
    {
      title: "Win",
      desc: "Get recognized and win amazing prizes!",
      icon: <FaTrophy />,
      color: "bg-yellow-500"
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">

          <div className="hidden lg:block absolute top-1/3 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-200 dark:border-gray-800 -z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 group text-center">
              <div className={`w-20 h-20 mx-auto rounded-3xl ${step.color} text-white text-3xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 mb-6`}>
                {step.icon}
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm">
                0{i + 1}
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
              <div className="mt-6 w-2 h-2 bg-blue-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;