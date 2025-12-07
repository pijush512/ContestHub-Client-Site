// src/Components/Banner/Banner.jsx
import React, { useState, useEffect } from 'react';

export default function HeroBanner() {
  const [search, setSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Win ₹5 Lakh in Coding Championship", desc: "Top 50 coders battle every month" },
    { title: "iPhone 16 Pro Max Giveaway", desc: "Design & Photography contests running now" },
    { title: "₹3 Lakh Gaming Tournament", desc: "BGMI • Free Fire • Valorant" }
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const trending = [
    "LeetCode Weekly", "Figma UI Challenge", "BGMI Pro League", "Logo Sprint",
    "Photography Awards", "React Hackathon", "Writing Battle", "App Jam"
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Logo */}
        <div className="mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-sky-600 rounded-3xl shadow-2xl flex items-center justify-center flex text-white text-5xl font-black">
            CH
          </div>
        </div>

        {/* Title */}
        <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-12">
          Contest<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">Hub</span>
        </h1>

        {/* Slider – এখানেই ম্যাজিক */}
        <div className="relative h-32 mb-10 w-full max-w-4xl">
          <div className="absolute inset-0 flex items-center justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-3">
                  {slide.title}
                </h2>
                <p className="text-xl text-blue-700">{slide.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="w-full max-w-3xl mb-12">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contests: Programming, Design, Gaming..."
              className="w-full px-10 py-7 text-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-blue-100 focus:outline-none focus:ring-4 focus:ring-sky-300"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold px-12 py-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
              Search
            </button>
          </div>
        </div>

        {/* 3 Dots */}
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition-all duration-500 ${
                currentSlide === i ? 'w-16 bg-blue-600' : 'w-3 bg-blue-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-900/95 to-transparent py-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trending, ...trending].map((item, i) => (
            <span key={i} className="mx-10 text-white font-medium text-lg">
              {item} •
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}