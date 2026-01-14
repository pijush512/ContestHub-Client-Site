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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 mx-auto py-20">
        {[1, 2, 3].map((n) => (
          <div key={n} className="skeleton h-80 w-full rounded-[2.5rem]"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="w-11/12 max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
            Victory <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Hall of Fame
            </span>
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-lg mx-auto italic font-medium">
            "Success is where preparation and opportunity meet. Celebrate our champions."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {winners.slice(0, 6).map((winner, idx) => (
            <div key={idx} className="group relative">

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">

                <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-[1.5rem] font-bold text-sm shadow-lg">
                  ${winner.prize}
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                    <img
                      src={winner.photo || "https://i.ibb.co/0Qck0Qc/default-user.png"}
                      className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                      alt={winner.name}
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-tighter whitespace-nowrap">
                      🏆 WINNER
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                      {winner.name}
                    </h3>
                    <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-tight">
                        {winner.contest}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 w-full flex justify-between items-center text-gray-400 text-[10px] font-bold tracking-widest uppercase">
                    <span>Awarded On</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {winner.winDate ? new Date(winner.winDate).toLocaleDateString() : 'Dec 2025'}
                    </span>
                  </div>
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