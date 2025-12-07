// // src/components/WinnersSection.jsx
// const WinnersSection = () => {
//   const winners = [
//     { name: "Rahim Khan", prize: "$5000", contest: "Logo Design 2025" },
//     { name: "Ayesha Siddika", prize: "$3000", contest: "Photography Contest" },
//     { name: "Karim Ahmed", prize: "$10000", contest: "Gaming Championship" },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
//       <div className="container mx-auto px-6 text-center">
//         <h2 className="text-5xl font-bold mb-8">Our Champions</h2>
//         <p className="text-xl mb-12 max-w-3xl mx-auto">
//           Thousands have won big prizes. Your name could be next!
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {winners.map((winner, idx) => (
//             <div key={idx} className="text-center">
//               <div className="avatar placeholder mb-4">
//                 <div className="bg-neutral-focus text-neutral-content rounded-full w-32 mx-auto ring ring-white ring-offset-base-100 ring-offset-4">
//                   <span className="text-4xl font-bold">{winner.name[0]}</span>
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold">{winner.name}</h3>
//               <p className="text-lg">{winner.contest}</p>
//               <p className="text-3xl font-extrabold mt-3 text-yellow-300">
//                 Won {winner.prize}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-16">
//           <p className="text-6xl font-black">500+ Winners</p>
//           <p className="text-2xl mt-4">Total Prize Money: $250,000+</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WinnersSection;

import React from "react";

const WinnerAdsSection = () => {
  return (
    <div className="bg-yellow-100 py-20 mt-16">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-yellow-700">
          Congratulations To Our Recent Winners!
        </h2>

        <p className="text-lg mb-10 text-gray-700">
          See how contestants achieved success — You can be the next champion!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg">
            <img
              src="https://i.ibb.co/9ZcVt9b/trophy.png"
              className="h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">10+ Recent Winners</h3>
            <p className="text-gray-500 mt-2">We celebrate success every day!</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <img
              src="https://i.ibb.co/XbV8NJL/winner.png"
              className="h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">৳50,000+ Prize Money</h3>
            <p className="text-gray-500 mt-2">Earn rewards by participating.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <img
              src="https://i.ibb.co/NYcCHqv/medal.png"
              className="h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">100+ Total Winners</h3>
            <p className="text-gray-500 mt-2">Join and become one of them!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdsSection;
