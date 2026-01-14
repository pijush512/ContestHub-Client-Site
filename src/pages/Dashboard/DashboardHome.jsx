import React from 'react';


import useRole from '../../hooks/useRole';
import AdminDashboardHome from './AdminDashboard/AdminDashboardHome';
import CreatorDashboardHome from './CreatorDashboard/CreatorDashboardHome';
import UserDashboardHome from './UserDashboard/UserDashboardHome';

const DashboardHome = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <span className="loading loading-ring loading-lg text-blue-600"></span>
                <p className="text-xs font-black uppercase tracking-[3px] text-gray-400">Syncing Dashboard</p>
            </div>
        );
    }

    // রোল অনুযায়ী সঠিক হোম রিটার্ন করবে
    if (role === 'admin') return <AdminDashboardHome />;
    if (role === 'creator') return <CreatorDashboardHome />;
    
    return <UserDashboardHome />;
};

export default DashboardHome;