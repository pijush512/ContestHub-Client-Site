import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaTrophy, FaLayerGroup } from "react-icons/fa";
// Recharts import
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const UserDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['user-stats', user?.email],
        queryFn: async () => {
            const participated = await axiosSecure.get(`/contest/participated/${user?.email}`);
            const won = await axiosSecure.get(`/contest/won/${user?.email}`);
            return {
                participatedCount: participated.data.length,
                wonCount: won.data.length
            };
        }
    });

    // Chart-er jonno data format kora
    // 'Loss' count ber kora hoyeche jate chart-ti dekhte purno mone hoy
    const chartData = [
        { name: "Contests Won", value: stats.wonCount || 0 },
        { name: "Contests Lost", value: (stats.participatedCount - stats.wonCount) || 0 }
    ];

    const COLORS = ["#10B981", "#3B82F6"]; // Green for Win, Blue for Others

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome back, {user?.displayName}!</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-blue-100 p-6 rounded-xl shadow-sm flex items-center gap-4 border border-blue-200">
                    <div className="p-4 bg-blue-500 text-white rounded-full shadow-lg"><FaLayerGroup size={25} /></div>
                    <div>
                        <p className="text-gray-600 font-medium">Total Participated</p>
                        <h3 className="text-3xl font-extrabold text-blue-900">{stats.participatedCount || 0}</h3>
                    </div>
                </div>
                
                <div className="bg-green-100 p-6 rounded-xl shadow-sm flex items-center gap-4 border border-green-200">
                    <div className="p-4 bg-green-500 text-white rounded-full shadow-lg"><FaTrophy size={25} /></div>
                    <div>
                        <p className="text-gray-600 font-medium">Contests Won</p>
                        <h3 className="text-3xl font-extrabold text-green-900">{stats.wonCount || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Visual Graph Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Performance Overview</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">
                    Showing your winning ratio against total participation.
                </p>
            </div>
        </div>
    );
};

export default UserDashboardHome;