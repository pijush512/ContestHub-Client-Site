// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic"; // useAxiosSecure এর বদলে এটি ভালো

// const WinnersSection = () => {
//   const axiosPublic = useAxiosPublic();

//   const { data: winners = [], isLoading, isError } = useQuery({
//     queryKey: ["winners"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/contest/winners");
//       return res.data;
//     },
//   });

//   if (isLoading) return (
//     <div className="flex justify-center items-center py-20">
//       <span className="loading loading-spinner loading-lg text-white"></span>
//     </div>
//   );

//   if (isError) return <p className="text-center py-20 text-red-300">Something went wrong!</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 py-16 px-6 text-white w-11/12 mx-auto">
//       <div className="max-w-7xl mx-auto text-center">
//         <h1 className="text-5xl font-bold mb-6">All Winners</h1>
//         <p className="mb-10 text-lg opacity-90">
//           Celebrate our top achievers and get inspired to participate in contests!
//         </p>

//         {winners.length === 0 ? (
//           <p className="text-white text-xl py-20 italic">No winners found yet. Be the first one!</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {winners.map((winner, index) => (
//               <div
//                 key={index}
//                 className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-6 flex flex-col items-center shadow-2xl hover:translate-y-[-5px] transition-all duration-300"
//               >
//                 <div className="relative">
//                   <img
//                     src={winner.photo || "https://i.ibb.co/0Qck0Qc/default-user.png"}
//                     alt={winner.name}
//                     className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400 object-cover"
//                   />
//                   <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
//                     Winner
//                   </div>
//                 </div>
                
//                 <h3 className="text-xl font-bold">{winner.name || "Anonymous User"}</h3>
//                 <p className="text-indigo-200 font-medium">{winner.contest}</p>
                
//                 <div className="mt-4 bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
//                   Prize: {winner.prize ? `$${winner.prize}` : "Recognition"}
//                 </div>
                
//                 <p className="text-xs mt-4 opacity-70">
//                   Date: {winner.winDate ? new Date(winner.winDate).toLocaleDateString() : "N/A"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <button className="mt-12 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-4 px-10 rounded-full shadow-xl transform active:scale-95 transition-all">
//           JOIN A CONTEST NOW
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WinnersSection;






import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DynamicWinners = () => {
  const axiosPublic = useAxiosPublic();

  const { data: winners = [], isLoading } = useQuery({
    queryKey: ["home-winners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contest/winners");
      return res.data;
    },
  });

  if (isLoading) return <div className="grid grid-cols-3 gap-6 w-11/12 mx-auto"><div className="skeleton h-64 w-full"></div><div className="skeleton h-64 w-full"></div><div className="skeleton h-64 w-full"></div></div>;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black overflow-hidden">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black font-heading text-gray-900 dark:text-white leading-tight">
              Victory <span className="text-blue-600 underline decoration-wavy underline-offset-8">Hall of Fame</span>
            </h2>
            <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg">
              Check out the incredible talents who dominated the latest contests.
            </p>
          </div>
          <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20">
            Total Winners: {winners.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {winners.slice(0, 6).map((winner, idx) => (
            <div key={idx} className="group relative">
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 flex flex-col items-center">
                <div className="avatar mb-6">
                  <div className="w-24 h-24 rounded-2xl ring ring-blue-600 ring-offset-base-100 ring-offset-4 overflow-hidden shadow-2xl">
                    <img src={winner.photo} alt={winner.name} />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-black font-heading text-gray-900 dark:text-white uppercase tracking-tighter">
                    {winner.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-1">{winner.contest}</p>
                  
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl text-sm font-bold">
                      🏆 Prize: {winner.prize}
                    </span>
                  </div>
                  
                  <p className="text-[10px] mt-6 text-gray-400 font-medium tracking-widest uppercase">
                    Awarded on: {winner.winDate ? new Date(winner.winDate).toDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicWinners;