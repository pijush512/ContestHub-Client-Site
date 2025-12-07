// // src/components/HeroBanner.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const HeroBanner = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/allContests?search=${searchTerm}`);
//     }
//   };

//   return (
//     <div className="relative h-96 md:h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>
//       <div className="absolute inset-0 bg-[url('https://i.ibb.co.com/4z7v7Z/pattern.png')] opacity-10"></div>

//       <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
//         <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
//           Join The Ultimate Contest Hub
//         </h1>
//         <p className="text-xl md:text-3xl mb-10 font-light">
//           Win Big. Show Your Talent. Be a Champion!
//         </p>

//         {/* Search Bar */}
//         <form onSubmit={handleSearch} className="w-full max-w-2xl">
//           <div className="flex gap-3">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search by contest type: Logo, Photo, Gaming..."
//               className="input input-bordered input-lg w-full text-black text-lg"
//             />
//             <button type="submit" className="btn btn-neutral btn-lg px-10">
//               Search
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Wave Bottom */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full">
//           <path d="M0,0V60C300,120 900,0 1200,60V0Z" className="fill-base-100"></path>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;



import React from "react";

const Banner = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    onSearch(text); // backend query caller
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-20">
      <div className="w-11/12 mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Exciting Contests & Participate!
        </h1>

        <p className="text-lg md:text-xl opacity-90 w-3/4 mx-auto mb-8">
          Search your favorite contest types and start competing today.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center gap-3"
        >
          <input
            type="text"
            name="search"
            placeholder="Search contest types..."
            className="input input-bordered w-64 md:w-96"
            required
          />
          <button className="btn btn-accent">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
