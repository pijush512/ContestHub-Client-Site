import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4 border-gray-200 mx-auto"></div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-700">
          Loading...
        </h1>
      </div>
    </div>
  )
}

export default Loader
