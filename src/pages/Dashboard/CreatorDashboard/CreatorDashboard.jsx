// src/pages/dashboard/creator/CreatorDashboard.jsx
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaPlus, FaList, FaHome } from "react-icons/fa";

const CreatorDashboard = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="creator-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-purple-700 text-white shadow-lg">
          <div className="flex-none lg:hidden">
            <label htmlFor="creator-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">Creator Dashboard</div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.imgur.com/0X8vV5g.png"} alt="avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                <li className="font-semibold">{user?.displayName}</li>
                <li><NavLink to="/">Home</NavLink></li>
                <li><button onClick={logOut} className="text-red-600">Logout</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="creator-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-purple-800 text-white">
          <h2 className="text-2xl font-bold text-center py-6 font-bold">ContestPro</h2>
          <li><NavLink to="/dashboard/creator/add-contest" className="mb-2 text-lg"><FaPlus className="inline mr-2" />Add Contest</NavLink></li>
          <li><NavLink to="/dashboard/creator/my-contests" className="mb-2 text-lg"><FaList className="inline mr-2" />My Contests</NavLink></li>
          <li><NavLink to="/" className="text-lg"><FaHome className="inline mr-2" />Home</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default CreatorDashboard;