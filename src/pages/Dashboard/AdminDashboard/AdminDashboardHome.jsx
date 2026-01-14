import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaCoins, FaTasks, FaCheckCircle, FaUserShield, FaCrown } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: contests = [] } = useQuery({
        queryKey: ['all-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contest');
            return res.data;
        }
    });
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    const totalRevenue = payments.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const totalCreators = users.filter(u => u.role === 'creator').length;
    const approvedContests = contests.filter(c => c.status === 'approved').length;
    const pendingContests = contests.filter(c => c.status === 'pending').length;

    const roleData = [
        { name: 'Admins', value: totalAdmins, color: '#EF4444' },
        { name: 'Creators', value: totalCreators, color: '#F59E0B' },
        { name: 'Regular Users', value: users.length - (totalAdmins + totalCreators), color: '#10B981' }
    ];

    const contestData = [
        { name: 'Approved', count: approvedContests },
        { name: 'Pending', count: pendingContests },
        { name: 'Completed', count: contests.filter(c => c.status === 'completed').length }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500">Live statistics from your database</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase">Total Revenue</p>
                        <h2 className="text-3xl font-black text-gray-800">${totalRevenue.toFixed(2)}</h2>
                    </div>
                    <div className="bg-green-100 p-4 rounded-full text-green-600 text-2xl"><FaCoins /></div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase">Total Users</p>
                        <h2 className="text-3xl font-black text-gray-800">{users.length}</h2>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-2xl"><FaUsers /></div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase">Approved Contests</p>
                        <h2 className="text-3xl font-black text-gray-800">{approvedContests}</h2>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-full text-purple-600 text-2xl"><FaCheckCircle /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FaUserShield className="text-red-500" /> User Roles Distribution
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={roleData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {roleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 text-xs font-bold mt-2">
                            {roleData.map(d => <span key={d.name} style={{color: d.color}}>{d.name}: {d.value}</span>)}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FaTasks className="text-blue-500" /> Contest Analytics
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={contestData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 bg-indigo-900 text-white p-6 rounded-2xl flex flex-wrap justify-around items-center shadow-lg">
                <div className="text-center">
                    <p className="text-indigo-200 text-xs uppercase">Pending Approval</p>
                    <p className="text-2xl font-bold">{pendingContests}</p>
                </div>
                <div className="h-10 w-[1px] bg-indigo-700 hidden md:block"></div>
                <div className="text-center">
                    <p className="text-indigo-200 text-xs uppercase">Creators</p>
                    <p className="text-2xl font-bold">{totalCreators}</p>
                </div>
                <div className="h-10 w-[1px] bg-indigo-700 hidden md:block"></div>
                <div className="text-center">
                    <p className="text-indigo-200 text-xs uppercase">System Admins</p>
                    <p className="text-2xl font-bold">{totalAdmins}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;