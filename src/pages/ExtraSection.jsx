// src/pages/ExtraSection.jsx
import React from "react";
import { FaRocket, FaLightbulb, FaStar } from "react-icons/fa";

const ExtraSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">Extra Section</h2>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto drop-shadow-md">
          Discover additional features and highlights of our platform. Boost your creativity, 
          participate in contests, and achieve your dreams with ContestHub!
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            <FaRocket className="text-5xl mb-4 mx-auto text-yellow-400" />
            <h3 className="text-2xl font-bold mb-2">Fast & Easy</h3>
            <p>
              Quickly join contests and showcase your creativity without hassle. Everything is designed for you!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            <FaLightbulb className="text-5xl mb-4 mx-auto text-yellow-400" />
            <h3 className="text-2xl font-bold mb-2">Innovative Ideas</h3>
            <p>
              Find inspiration from top contests and creative challenges. Share your ideas and shine bright!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            <FaStar className="text-5xl mb-4 mx-auto text-yellow-400" />
            <h3 className="text-2xl font-bold mb-2">Earn Rewards</h3>
            <p>
              Participate, win contests, and claim exciting prizes. Your success is celebrated on our platform!
            </p>
          </div>
        </div>

        <div className="mt-16">
          <button className="btn btn-primary btn-lg">Explore More</button>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
