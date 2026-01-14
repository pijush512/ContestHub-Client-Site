// import React from 'react'
// import { NavLink, Outlet } from 'react-router-dom'
// import Navbar from '../../../Components/Navbar/Navbar'
// import Footer from '../../../Components/Footer/Footer'
// import useRole from '../../../hooks/useRole' // আপনার তৈরি করা হুকটি ইম্পোর্ট করুন

// const DashboardLayout = () => {
//   const [role, isRoleLoading] = useRole();

//   if (isRoleLoading) {
//     return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
//   }

//   return (
//     <>
//       <Navbar></Navbar>
//       <div className="flex min-h-screen w-11/12 mx-auto">

//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
//           <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

//           {/* for user */}
//           {role === 'user' && (
//             <div>
//               <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
//                 User Panel
//               </h3>
//               <>
//                 <NavLink to="/dashboard/my-participated" className={({ isActive }) => (isActive ? "block text-blue-400" : "block hover:text-blue-300")}>My Participated</NavLink>
//                 <NavLink to="/dashboard/my-winning" className="block">My Winning</NavLink>
                
//               </>
//             </div>

//           )}

//           {/* for creator */}
//           {role === 'creator' && (
//             <div className="space-y-4">
//               <h3 className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-2">
//                 Creator Panel
//               </h3>
//               <NavLink to="/dashboard/creator/my-contests" className={({ isActive }) => (isActive ? "block text-orange-400 font-bold" : "block hover:text-orange-300")}>
//                 My Contest
//               </NavLink>

//               <NavLink to="/dashboard/creator/add-contest" className={({ isActive }) => (isActive ? "block text-orange-400 font-bold" : "block hover:text-orange-300")}>
//                 Add Contest
//               </NavLink>
//               <NavLink to="/dashboard/creator/submitted-tasks" className="block hover:text-orange-300">
//                 Submitted Tasks
//               </NavLink>
//             </div>
//           )}

//           {/* for admin */}
//           {role === 'admin' && (
//             <div className="space-y-4">
//               <h3 className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-2">
//                 Admin Panel
//               </h3>
//               <NavLink to="/dashboard/admin/manage-users" className="">
//                 Manage Users
//               </NavLink>
//               <NavLink to="/dashboard/admin/manage-contests" className="block">
//                 Manage Contests
//               </NavLink>
//             </div>
//           )}

//           {/* Common menu */}
//           <hr className="border-gray-700 my-4" />
//           <NavLink to="/dashboard/my-profile" className="block">My Profile</NavLink>
//           <NavLink to="/dashboard/payment-history" className="block">Payment History</NavLink>
//           <NavLink to="/" className="block">Home</NavLink>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 bg-gray-100 p-6">
//           <Outlet />
//         </main>

//       </div>
//       <Footer></Footer>
//     </>
//   )
// }

// export default DashboardLayout



import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import useRole from '../../../hooks/useRole'
import {FaUserCircle, FaHistory, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-blue-600"></span></div>;
  }

  // Active Link Style
  const navStyle = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
      isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">

        {/* --- Sharp Sidebar --- */}
        <aside className="w-72 bg-gray-950 text-white p-6 sticky top-0 h-screen overflow-y-auto">
          <div className="mb-10 px-4">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Dash<span className="text-blue-500">Board</span></h2>
          </div>

          <div className="space-y-1">
            {/* ১. সবার জন্য কমন - ড্যাশবোর্ড হোম */}
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-4">Main</p>
            <NavLink to="/dashboard" end className={navStyle}>
                Dashboard Home
            </NavLink>

            <div className="py-4"></div>

            {/* ২. Role Specific Menu */}
            {role === 'user' && (
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-4">User Panel</p>
                <NavLink to="/dashboard/my-participated" className={navStyle}>My Participated</NavLink>
                <NavLink to="/dashboard/my-winning" className={navStyle}>My Winning</NavLink>
              </div>
            )}

            {role === 'creator' && (
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-600/50 mb-2 px-4">Creator Panel</p>
                <NavLink to="/dashboard/creator/my-contests" className={navStyle}>My Contest</NavLink>
                <NavLink to="/dashboard/creator/add-contest" className={navStyle}>Add Contest</NavLink>
                <NavLink to="/dashboard/creator/submitted-tasks" className={navStyle}>Submitted Tasks</NavLink>
              </div>
            )}

            {role === 'admin' && (
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-600/50 mb-2 px-4">Admin Panel</p>
                <NavLink to="/dashboard/admin/manage-users" className={navStyle}>Manage Users</NavLink>
                <NavLink to="/dashboard/admin/manage-contests" className={navStyle}>Manage Contests</NavLink>
              </div>
            )}

            {/* --- Common Footer Menu --- */}
            <div className="pt-10 space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-4">Account</p>
               <NavLink to="/dashboard/my-profile" className={navStyle}><FaUserCircle /> My Profile</NavLink>
               <NavLink to="/dashboard/payment-history" className={navStyle}><FaHistory /> Payments</NavLink>
               <NavLink to="/" className={navStyle}><FaHome /> Back to Home</NavLink>
            </div>
          </div>
        </aside>

        {/* --- Main Content Outlet --- */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>

      </div>
      <Footer />
    </>
  )
}

export default DashboardLayout