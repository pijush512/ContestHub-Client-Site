import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic"; // পাথ চেক করে নিন (../ নাকি ../../)

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    // ডাটা ফেচিং: যারা সবচেয়ে বেশি কন্টেস্ট জিতেছে তাদের আনা
    const { data: winners = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-16 px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mb-4">
                    🏆 Hall of Fame
                </h1>
                <p className="text-gray-500 text-lg font-medium italic">
                    Top performers ranked by their glorious contest wins
                </p>
                <div className="divider w-24 mx-auto before:bg-orange-400 after:bg-orange-400">✨</div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto shadow-2xl rounded-3xl border border-gray-100 bg-white">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-gray-800 text-white text-base">
                        <tr>
                            <th className="py-5 pl-8">Rank</th>
                            <th>User Details</th>
                            <th>Total Wins</th>
                            <th>Victory Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((winner, index) => (
                            <tr key={winner._id} className="hover:bg-orange-50 transition-all border-b border-gray-100">
                                {/* Rank Column */}
                                <td className="py-6 pl-8">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold shadow-md
                                        ${index === 0 ? 'bg-yellow-400 text-white scale-110 ring-4 ring-yellow-200' : 
                                          index === 1 ? 'bg-slate-300 text-slate-700' : 
                                          index === 2 ? 'bg-orange-300 text-orange-800' : 
                                          'bg-indigo-50 text-indigo-600'}`}>
                                        {index + 1}
                                    </div>
                                </td>

                                {/* User Column */}
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 border-2 border-gray-200">
                                                <img 
                                                    src={winner.photoURL || "https://i.ibb.co.com/0j9vL0M/user-avatar.png"} 
                                                    alt={winner.name} 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-gray-800">{winner.name}</div>
                                            <div className="text-xs text-gray-500">{winner.email}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Total Wins Column */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-primary italic">
                                            {winner.winCount || 0}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 uppercase">Wins</span>
                                    </div>
                                </td>

                                {/* Performance Progress Bar */}
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <progress 
                                            className="progress progress-warning w-32 md:w-56 h-3" 
                                            value={winner.winCount || 0} 
                                            max="20">
                                        </progress>
                                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
                                            Victory Level
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {winners.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-gray-400 text-xl italic">No legends found yet. Start participating to claim your spot!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;