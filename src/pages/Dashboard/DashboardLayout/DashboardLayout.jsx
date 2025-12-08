import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

        <NavLink to="/dashboard/user" className="block">User Dashboard</NavLink>
        <NavLink to="/dashboard/creator" className="block">Creator Dashboard</NavLink>
        <NavLink to="/dashboard/admin" className="block">Admin Dashboard</NavLink>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>

    </div>
  )
}

export default DashboardLayout
