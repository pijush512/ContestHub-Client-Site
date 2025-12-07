import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
  <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <h1 className="text-[10rem] md:text-[12rem] font-extrabold mb-6">404</h1>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Oops! Page Not Found</h2>
      <p className="text-lg md:text-xl mb-8 text-center max-w-md text-gray-300">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary font-semibold px-8 py-3 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound





