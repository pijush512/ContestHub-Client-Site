import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { FaUsers, FaChartPie, FaDollarSign, FaCheckDouble, FaUserShield, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // ১. অ্যাডমিন স্ট্যাটাস ফেচ করা
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // ২. চার্ট ডাটা প্রিপারেশন
  const revenueData = stats.revenueHistory || [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: 0 },
  ];

  const userData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Creators", value: stats.totalCreators || 0 },
    { name: "Admins", value: stats.totalAdmins || 0 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#f43f5e"];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-black uppercase tracking-widest animate-pulse">Syncing Admin Data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#FBFBFB] min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">System Overview</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[3px] mt-1">Platform-wide analytics & management</p>
        </div>
        <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-200">
          <FaArrowUp /> Live Updates
        </div>
      </div>

      {/* --- ১. STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<FaDollarSign/>} label="Total Revenue" value={`$${stats.totalRevenue || 0}`} color="green" />
        <StatCard icon={<FaUsers/>} label="Total Users" value={stats.totalUsers || 0} color="blue" />
        <StatCard icon={<FaCheckDouble/>} label="Active Contests" value={stats.totalContests || 0} color="purple" />
        <StatCard icon={<FaUserShield/>} label="Admin Staff" value={stats.totalAdmins || 0} color="orange" />
      </div>

      {/* --- ২. CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Revenue Growth Area Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Revenue Growth
          </h4>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span> User Breakdown
          </h4>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- ৩. DATA TABLE (PENDING CONTESTS) --- */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Pending Approvals
          </h4>
          <Link to="/dashboard/manage-contests" className="text-[10px] font-black text-blue-600 uppercase hover:underline">View All Task</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="pb-4">Contest Details</th>
                <th className="pb-4">Creator</th>
                <th className="pb-4">Revenue</th>
                <th className="pb-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.pendingContests?.length > 0 ? (
                stats.pendingContests.map((contest, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5">
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{contest.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{contest.category || 'General'}</p>
                    </td>
                    <td className="py-5 text-slate-500 font-medium text-sm">{contest.creatorEmail}</td>
                    <td className="py-5 font-black text-slate-900">${contest.price}</td>
                    <td className="py-5 text-right">
                      <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100">
                        In Review
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center">
                    <p className="text-slate-300 font-black uppercase italic text-xs">All clear! No pending contests.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${colorMap[color]} rounded-2xl flex items-center justify-center mb-6`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">{value}</h3>
    </div>
  );
};

export default AdminDashboardHome;