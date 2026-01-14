// const TopThreeLeaderboard = () => {
//   return (
//     <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-black uppercase tracking-tighter italic">The Elite 3</h2>
//       </div>
//       <div className="flex flex-wrap justify-center items-end gap-6 w-11/12 mx-auto">
//          {/* 2nd Place */}
//          <div className="h-48 w-40 bg-white dark:bg-gray-800 shadow-xl rounded-t-3xl flex flex-col items-center justify-center border-t-4 border-silver">
//             <div className="text-sm font-bold opacity-50 mb-2">2nd Place</div>
//             <div className="avatar placeholder mb-2"><div className="w-16 bg-neutral text-neutral-content rounded-full"><span>S</span></div></div>
//          </div>
//          {/* 1st Place */}
//          <div className="h-64 w-48 bg-blue-600 shadow-2xl rounded-t-3xl flex flex-col items-center justify-center text-white">
//             <div className="text-5xl mb-4">👑</div>
//             <div className="text-lg font-black uppercase">Champion</div>
//          </div>
//          {/* 3rd Place */}
//          <div className="h-40 w-40 bg-white dark:bg-gray-800 shadow-xl rounded-t-3xl flex flex-col items-center justify-center border-t-4 border-orange-400">
//             <div className="text-sm font-bold opacity-50 mb-2">3rd Place</div>
//          </div>
//       </div>
//     </section>
//   );
// };

import { useEffect, useState } from "react";

// export default TopThreeLeaderboard

const TopThreeLeaderboard = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/leaderboard')
      .then(res => res.json())
      .then(data => setWinners(data.slice(0, 3)));
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <h2 className="text-4xl font-black text-center mb-16 dark:text-white italic uppercase tracking-tighter">The Elite Creators</h2>
      <div className="flex flex-col md:flex-row justify-center items-end gap-10 w-11/12 mx-auto">
        
        {/* 2nd Place: Lili Man (WinCount: 2) */}
        {winners[1] && (
          <div className="w-64 bg-white dark:bg-gray-800 p-6 rounded-t-[3rem] shadow-xl text-center border-t-8 border-gray-300">
            <img src={winners[1].photoURL} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200" alt="" />
            <h3 className="font-black text-lg">{winners[1].displayName}</h3>
            <p className="text-blue-600 font-bold">Wins: {winners[1].winCount}</p>
          </div>
        )}

        {/* 1st Place: Highest WinCount */}
        {winners[0] && (
          <div className="w-72 bg-gradient-to-b from-blue-600 to-indigo-700 p-8 rounded-t-[4rem] shadow-2xl text-center text-white relative transform scale-110">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">👑</div>
            <img src={winners[0].photoURL} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-400" alt="" />
            <h3 className="font-black text-2xl uppercase">{winners[0].displayName}</h3>
            <p className="text-yellow-300 font-black text-xl">Champion</p>
            <p className="text-blue-100 mt-2">Total Wins: {winners[0].winCount}</p>
          </div>
        )}

        {/* 3rd Place */}
        {winners[2] && (
          <div className="w-64 bg-white dark:bg-gray-800 p-6 rounded-t-[3rem] shadow-xl text-center border-t-8 border-orange-400">
            <img src={winners[2].photoURL} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-100" alt="" />
            <h3 className="font-black text-lg">{winners[2].displayName}</h3>
            <p className="text-blue-600 font-bold">Wins: {winners[2].winCount}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopThreeLeaderboard