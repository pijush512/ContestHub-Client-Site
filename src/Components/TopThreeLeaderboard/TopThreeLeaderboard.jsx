import { useEffect, useState } from "react";

const TopThreeLeaderboard = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/leaderboard')
      .then(res => res.json())
      .then(data => setWinners(data.slice(0, 3)));
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="w-11/12 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 dark:text-white">
          Our Top <span className="text-blue-600">Creators</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6">

          {winners[1] && (
            <div className="order-2 md:order-1 w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <img src={winners[1].photoURL} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md" alt="" />
                <span className="absolute -bottom-2 -right-2 text-2xl">🥈</span>
              </div>
              <h3 className="font-bold text-lg dark:text-white">{winners[1].displayName}</h3>
              <p className="text-blue-600 font-bold text-sm mt-1">{winners[1].winCount} Wins</p>
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 mt-6 rounded-t-xl opacity-50"></div>
            </div>
          )}

          {winners[0] && (
            <div className="order-1 md:order-2 w-full md:w-72 bg-blue-600 p-10 rounded-t-[3rem] text-center shadow-2xl relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">👑</div>
              <div className="w-28 h-28 mx-auto mb-4 relative">
                <img src={winners[0].photoURL} className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow-xl" alt="" />
                <span className="absolute -bottom-2 -right-2 text-3xl">🥇</span>
              </div>
              <h3 className="font-black text-2xl text-white uppercase">{winners[0].displayName}</h3>
              <p className="text-yellow-300 font-black text-xl mt-1">{winners[0].winCount} Wins</p>
              <div className="h-20 w-full bg-white/10 mt-6 rounded-t-2xl"></div>
            </div>
          )}

          {winners[2] && (
            <div className="order-3 w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <img src={winners[2].photoURL} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md" alt="" />
                <span className="absolute -bottom-2 -right-2 text-2xl">🥉</span>
              </div>
              <h3 className="font-bold text-lg dark:text-white">{winners[2].displayName}</h3>
              <p className="text-blue-600 font-bold text-sm mt-1">{winners[2].winCount} Wins</p>
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 mt-6 rounded-t-xl opacity-50"></div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default TopThreeLeaderboard;