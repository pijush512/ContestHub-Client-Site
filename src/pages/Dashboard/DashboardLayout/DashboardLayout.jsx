// import React from 'react'
// import { NavLink, Outlet } from 'react-router-dom'
// import Navbar from '../../../Components/Navbar/Navbar'
// import Footer from '../../../Components/Footer/Footer'



// const DashboardLayout = () => {
//   return (

//     <>
//     <Navbar></Navbar>
//     <div className="flex min-h-screen">

//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
//         <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

//         <NavLink to="/dashboard/user" className="block">User Dashboard</NavLink>
//         <NavLink to="/dashboard/creator" className="block">Creator Dashboard</NavLink>
//         <NavLink to="/dashboard/admin" className="block">Admin Dashboard</NavLink>
//         <NavLink to="/dashboard/payment-history" className="block">Payment History</NavLink>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-6">
//         <Outlet />
//       </main>

//     </div>

//     <Footer></Footer>
//     </>


//   )
// }

// export default DashboardLayout



import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import useRole from '../../../hooks/useRole' // আপনার তৈরি করা হুকটি ইম্পোর্ট করুন

const DashboardLayout = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex min-h-screen w-11/12 mx-auto">

        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
          <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

          {/* for user */}
          {role === 'user' && (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
                User Panel
              </h3>
              <>
                <NavLink to="/dashboard/my-participated" className={({ isActive }) => (isActive ? "block text-blue-400" : "block hover:text-blue-300")}>My Participated</NavLink>
                <NavLink to="/dashboard/my-winning" className="block">My Winning</NavLink>
                
              </>
            </div>

          )}

          {/* for creator */}
          {role === 'creator' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-2">
                Creator Panel
              </h3>
              <NavLink to="/dashboard/creator/my-contests" className={({ isActive }) => (isActive ? "block text-orange-400 font-bold" : "block hover:text-orange-300")}>
                My Contest
              </NavLink>

              <NavLink to="/dashboard/creator/add-contest" className={({ isActive }) => (isActive ? "block text-orange-400 font-bold" : "block hover:text-orange-300")}>
                Add Contest
              </NavLink>
              <NavLink to="/dashboard/creator/submitted-tasks" className="block hover:text-orange-300">
                Submitted Tasks
              </NavLink>
            </div>
          )}

          {/* for admin */}
          {role === 'admin' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-2">
                Admin Panel
              </h3>
              <NavLink to="/dashboard/admin/manage-users" className="">
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/admin/manage-contests" className="block">
                Manage Contests
              </NavLink>
            </div>
          )}

          {/* Common menu */}
          <hr className="border-gray-700 my-4" />
          <NavLink to="/dashboard/my-profile" className="block">My Profile</NavLink>
          <NavLink to="/dashboard/payment-history" className="block">Payment History</NavLink>
          <NavLink to="/" className="block">Home</NavLink>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>

      </div>
      <Footer></Footer>
    </>
  )
}

export default DashboardLayout
