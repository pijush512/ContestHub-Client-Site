import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaTrophy, FaLayerGroup, FaHistory } from "react-icons/fa";

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

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8">Welcome back, {user?.displayName}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-xl shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-blue-500 text-white rounded-full"><FaLayerGroup size={30} /></div>
                    <div>
                        <p className="text-gray-600">Total Participated</p>
                        <h3 className="text-2xl font-bold">{stats.participatedCount || 0}</h3>
                    </div>
                </div>
                <div className="bg-green-100 p-6 rounded-xl shadow-sm flex items-center gap-4">
                    <div className="p-4 bg-green-500 text-white rounded-full"><FaTrophy size={30} /></div>
                    <div>
                        <p className="text-gray-600">Contests Won</p>
                        <h3 className="text-2xl font-bold">{stats.wonCount || 0}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHome;