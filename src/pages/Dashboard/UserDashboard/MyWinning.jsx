import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyWinning = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: won = [], isLoading } = useQuery({
    queryKey: ["won", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/won/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

  return (
    <div className="p-6">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-green-600 mb-2">My Hall of Fame</h2>
        <p className="text-gray-500 text-lg">Congratulations on your victories! Keep up the great work.</p>
      </div>

      {won.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-xl border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-gray-400">No wins yet — keep participating!</h3>
          <p className="mt-2 text-gray-400">Winning is a habit, start participating to build yours.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {won.map((contest) => (
            <div key={contest._id} className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-t-8 border-green-500">
              <figure className="px-4 pt-4 h-48">
                <img src={contest.image} alt="Contest" className="rounded-xl h-full w-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-gray-800 leading-tight">{contest.name}</h2>
                  <div className="badge badge-success text-white p-3 font-bold">Winner</div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg my-3">
                  <p className="text-sm text-green-700 font-semibold uppercase tracking-wider">Winning Prize</p>
                  <p className="text-3xl font-black text-green-600">${contest.prize}</p>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-outline badge-secondary">{contest.type}</span>
                </div>
                
                <div className="card-actions justify-end border-t pt-4 mt-2">
                  <p className="text-xs font-medium text-gray-400">
                    Victory Date: {contest.winDate ? new Date(contest.winDate).toLocaleDateString() : "TBA"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWinning;