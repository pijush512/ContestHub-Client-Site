// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";
// import { FaEdit, FaCheckCircle, FaUsers } from "react-icons/fa";

// const CreatorDashboardHome = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: creatorStats = {} } = useQuery({
//         queryKey: ['creator-stats', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/contest/creator/${user?.email}`);
//             const submissions = await axiosSecure.get(`/creator/all-submissions/${user?.email}`);
//             return {
//                 myContests: res.data.length,
//                 totalSubmissions: submissions.data.length
//             };
//         }
//     });

//     return (
//         <div className="p-8">
//             <h2 className="text-3xl font-bold mb-6">Creator Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-purple-100 p-8 rounded-2xl shadow-md border-b-4 border-purple-500">
//                     <FaEdit className="text-purple-500 mb-4" size={40} />
//                     <h4 className="text-xl font-medium">Contests Created</h4>
//                     <p className="text-4xl font-black">{creatorStats.myContests || 0}</p>
//                 </div>
//                 <div className="bg-orange-100 p-8 rounded-2xl shadow-md border-b-4 border-orange-500">
//                     <FaUsers className="text-orange-500 mb-4" size={40} />
//                     <h4 className="text-xl font-medium">Total Submissions Received</h4>
//                     <p className="text-4xl font-black">{creatorStats.totalSubmissions || 0}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreatorDashboardHome;





import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaUsers, FaWallet } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const CreatorDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: creatorStats = {}, isLoading } = useQuery({
        queryKey: ['creator-stats', user?.email],
        enabled: !!user?.email, // ইউজার ইমেইল থাকলে তবেই কল হবে
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/creator/${user?.email}`);
            const submissions = await axiosSecure.get(`/creator/all-submissions/${user?.email}`);
            
            // ডাটা অ্যারে কি না তা নিশ্চিত করা
            const contestsArray = Array.isArray(res.data) ? res.data : [];
            const submissionsArray = Array.isArray(submissions.data) ? submissions.data : [];

            // চার্ট ডাটা ক্যালকুলেশন
            const approved = contestsArray.filter(c => c.status === 'approved').length;
            const pending = contestsArray.filter(c => c.status === 'pending').length;

            return {
                myContests: contestsArray,
                totalContestsCount: contestsArray.length,
                totalSubmissions: submissionsArray.length,
                chartData: [
                    { name: "Approved", value: approved },
                    { name: "Pending", value: pending }
                ]
            };
        }
    });

    const COLORS = ["#10b981", "#f59e0b"];

    if (isLoading) return <div className="p-10 text-center font-black animate-pulse text-slate-400 uppercase tracking-widest">SYNCING CREATOR DATA...</div>;

    return (
        <div className="p-6 md:p-10 bg-[#FBFBFB] min-h-screen">
            
            {/* --- HEADER --- */}
            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Creator Hub</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[3px] mt-1">Contest Management & Insights</p>
            </div>

            {/* --- ১. STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6"><FaEdit size={20}/></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Contests</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{creatorStats.totalContestsCount || 0}</h3>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6"><FaUsers size={20}/></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submissions</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{creatorStats.totalSubmissions || 0}</h3>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm font-black flex items-center justify-center text-green-500 uppercase italic">
                    <FaWallet className="mr-2"/> Verified Creator
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- ২. CHART --- */}
                <div className="lg:col-span-5 bg-white p-10 rounded-[45px] border border-slate-100 shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8 italic border-l-4 border-blue-600 pl-4">Contest Status</h4>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={creatorStats.chartData || []} 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    paddingAngle={10} 
                                    dataKey="value"
                                >
                                    {creatorStats.chartData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- ৩. RECENT LIST (Error Fixed Here) --- */}
                <div className="lg:col-span-7 bg-white p-10 rounded-[45px] border border-slate-100 shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8 italic border-l-4 border-black pl-4">Recent Contests</h4>
                    <div className="space-y-4">
                        {/* এখানে আমরা চেক করছি myContests অ্যারে কি না */}
                        {Array.isArray(creatorStats.myContests) && creatorStats.myContests.length > 0 ? (
                            creatorStats.myContests.slice(0, 4).map((contest, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-transparent">
                                    <div className="flex items-center gap-4">
                                        <img src={contest.image} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" />
                                        <div>
                                            <h5 className="text-sm font-black text-slate-900">{contest.name}</h5>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase">{contest.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${contest.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {contest.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-300 font-bold py-10 uppercase italic text-xs">No contests found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorDashboardHome;