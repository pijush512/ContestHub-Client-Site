import React, { useState } from "react";

const Banner = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query); // send search value to parent
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2070"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark / Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Find the Perfect Contest For You
        </h1>

        <p className="text-gray-200 text-sm md:text-lg mb-8">
          Search by contest type, category, or topic
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/90 backdrop-blur-lg rounded-xl px-4 py-2 w-full shadow-lg"
        >
          <input
            type="text"
            placeholder="Search contest type…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none px-2 py-2 text-gray-700"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
