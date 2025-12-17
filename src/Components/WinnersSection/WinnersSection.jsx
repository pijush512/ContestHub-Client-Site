// WinnersSection.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WinnersSection = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch winners using TanStack Query
  const { data: winners = [], isLoading, isError } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/winners");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-20">Loading winners...</p>;
  if (isError) return <p className="text-center py-20 text-red-500">Failed to load winners</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">All Winners</h1>
        <p className="mb-10 text-lg">
          Celebrate our top achievers and get inspired to participate in contests!
        </p>

        {winners.length === 0 ? (
          <p className="text-white text-xl py-20">No winners yet. Be the first to win!</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src={winner.photo || "/default-user.png"}
                  alt={winner.name || "Winner"}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-white"
                />
                <h3 className="text-xl font-semibold">{winner.name || "Anonymous"}</h3>
                <p className="mt-2">{winner.contest || "Contest Name"}</p>
                <p className="mt-2 font-bold text-yellow-300">
                  {winner.prize ? `$${winner.prize}` : "$0"}
                </p>
                <p className="text-sm mt-1 text-gray-200">
                  Won on: {winner.winDate ? new Date(winner.winDate).toLocaleDateString() : "Date Pending"}
                </p>
              </div>
            ))}
          </div>
        )}

        <button className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition">
          Join a Contest Now
        </button>
      </div>
    </div>
  );
};

export default WinnersSection;
