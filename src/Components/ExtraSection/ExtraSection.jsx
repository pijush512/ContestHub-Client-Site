// // src/components/ExtraSection.jsx
// const ExtraSection = () => {
//   return (
//     <section className="py-20 bg-base-100">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Why Thousands Trust ContestHub?
//             </h2>
//             <ul className="space-y-6 text-lg">
//               <li className="flex items-center gap-4">
//                 <span className="text-4xl">Verified & Secure Platform</span>
//               </li>
//               <li className="flex items-center gap-4">
//                 <span className="text-4xl">Real Prizes Paid Instantly</span>
//               </li>
//               <li className="flex items-center gap-4">
//                 <span className="text-4xl">Join 100K+ Creators Worldwide</span>
//               </li>
//               <li className="flex items-center gap-4">
//                 <span className="text-4xl">24/7 Support Team</span>
//               </li>
//             </ul>
//           </div>
//           <div className="flex justify-center">
//             <img
//               src="https://i.ibb.co.com/9hY7Y7K/winner-trophy.png"
//               alt="Winner"
//               className="w-96 drop-shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExtraSection;


import React from "react";

const ExtraSection = () => {
  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="bg-blue-50 p-10 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Why Join ContestHub?</h2>

        <p className="text-gray-600 w-3/4 mx-auto mb-6">
          Learn, compete, and grow your talent. Participate in exciting contests,
          win rewards, and build your portfolio.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-xl">Creative Contests</h3>
            <p className="text-gray-500 mt-2">
              Participate in a wide range of contests that challenge your creativity.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-xl">Grow Your Skills</h3>
            <p className="text-gray-500 mt-2">
              Improve yourself with every competition and get better daily.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-xl">Win Exciting Rewards</h3>
            <p className="text-gray-500 mt-2">
              Earn certificates, prizes, and recognition across the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
