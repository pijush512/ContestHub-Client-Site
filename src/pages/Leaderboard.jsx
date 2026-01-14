import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();
    const { data: winners = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[600px] bg-white dark:bg-gray-950">
                <span className="loading loading-bars loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-20">
            <div className="w-11/12 max-w-7xl mx-auto px-4">
                
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
                        Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Fame</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full mx-auto"></div>
                    <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium italic">
                        Top performers ranked by their glorious contest wins
                    </p>
                </div>

                <div className="relative group overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-0">
                            {/* Head */}
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="py-6 pl-10 text-xs uppercase tracking-[0.2em] font-black text-gray-400 border-b border-gray-100 dark:border-gray-800">Rank</th>
                                    <th className="py-6 text-xs uppercase tracking-[0.2em] font-black text-gray-400 border-b border-gray-100 dark:border-gray-800">User Details</th>
                                    <th className="py-6 text-xs uppercase tracking-[0.2em] font-black text-gray-400 border-b border-gray-100 dark:border-gray-800">Total Wins</th>
                                    <th className="py-6 text-xs uppercase tracking-[0.2em] font-black text-gray-400 border-b border-gray-100 dark:border-gray-800 text-center">Victory Progress</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {winners.map((winner, index) => (
                                    <tr key={winner._id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                                        {/* Rank */}
                                        <td className="py-6 pl-10">
                                            <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black text-xl italic shadow-sm transform group-hover:rotate-12 transition-transform
                                                ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-yellow-200' : 
                                                  index === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 
                                                  index === 2 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 
                                                  'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
                                                {index + 1}
                                            </div>
                                        </td>

                                        {/* User Details */}
                                        <td className="py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="relative">
                                                    <div className="mask mask-squircle w-14 h-14 border-2 border-gray-100 dark:border-gray-700">
                                                        <img 
                                                            src={winner.photoURL || "https://i.ibb.co.com/0j9vL0M/user-avatar.png"} 
                                                            alt={winner.name} 
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    {index === 0 && <span className="absolute -top-2 -right-2 text-xl">👑</span>}
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-800 dark:text-white text-lg tracking-tight uppercase italic">{winner.name}</div>
                                                    <div className="text-xs font-bold text-blue-600/60 tracking-wider lowercase">{winner.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Wins */}
                                        <td className="py-6 text-center lg:text-left">
                                            <div className="flex items-center gap-3">
                                                <span className="text-4xl font-black text-blue-600 italic tracking-tighter">
                                                    {winner.winCount || 0}
                                                </span>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Wins</span>
                                            </div>
                                        </td>

                                        <td className="py-6 px-10">
                                            <div className="flex flex-col items-center lg:items-end gap-2">
                                                <progress 
                                                    className="progress progress-primary w-full max-w-[200px] h-3 rounded-full" 
                                                    value={winner.winCount || 0} 
                                                    max="20">
                                                </progress>
                                                <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
                                                    Victory Level
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {winners.length === 0 && (
                            <div className="p-24 text-center">
                                <div className="text-6xl mb-6">🏜️</div>
                                <p className="text-gray-400 text-xl font-medium italic">No legends found yet. Be the first to claim the throne!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;

