import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {

  const { user, logOut, } = useAuth();

  const links = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/allContests'>AllContests</NavLink></li>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/'>Home</NavLink></li>
  </>

  const handleLogout = () => {
    logOut()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      })
  };


  return (
    <div className='bg-gray-200'>
      <div className="navbar w-11/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <Link to='/' className='w-10 h-10 flex items-center gap-4'>
            <img src="https://i.ibb.co.com/Vchp0YVj/image-jpg-removebg-preview-1.png" alt="" />
            <a className="text-xl font-bold hidden md:block">ContestHub</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user ? (
              // <>
              //   {user.photoURL && (
              //   <img src={user.photoURL} className=" mr-4 w-10 h-10 rounded-full border" alt="User" />
              // )}
              //   <button
              //     onClick={handleLogout}
              //     className="btn btn-secondary">Sign Out</button>
              // </>

              <>
                <div className="dropdown dropdown-end">
                  {/* এটা ক্লিক করলে ড্রপডাউন ওপেন হবে */}
                  <div tabIndex={0} role="button" className="avatar online cursor-pointer">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user?.photoURL || "https://i.ibb.co.com/0jZjg4F/avatar.png"}
                        alt="Profile"
                      />
                    </div>
                  </div>

                  {/* ড্রপডাউন মেনু */}
                  <ul tabIndex={0} className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-56 mt-3 z-50">
                    <li className="menu-title pb-2 border-b">
                      <span className="font-bold text-lg">
                        {user?.displayName || "User"}
                      </span>
                    </li>
                    <li className="mt-2">
                      <Link to="/dashboard" className="flex items-center gap-2 text-base">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-primary text-white mt-2 w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) :
              (
                <>
                  <Link to='/login' className="btn btn-primary mr-4">Login</Link>
                  <Link to='/register' className="btn btn-secondary">Register</Link>
                </>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
