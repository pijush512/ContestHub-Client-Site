import React from 'react'

const UserDashboard = () => {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          User Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to your personal dashboard!
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Participated Contests */}
        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">Participated Contests</h2>
          <p className="text-gray-600">
            You joined <span className="font-bold text-blue-600">0</span> contests.
          </p>
          <button className="btn btn-primary btn-sm mt-3">
            View Details
          </button>
        </div>

        {/* Winning Cards */}
        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">Winning Contests</h2>
          <p className="text-gray-600">
            You won <span className="font-bold text-green-600">0</span> contests.
          </p>
          <button className="btn btn-success btn-sm mt-3">
            View Details
          </button>
        </div>

        {/* Win Percentage */}
        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">Win Percentage</h2>
          <p className="text-3xl font-bold text-purple-600">0%</p>
          <p className="text-gray-500 text-sm">Based on your participation</p>
        </div>

      </div>

      {/* Profile Section */}
      <div className="p-6 bg-white shadow rounded-xl border">
        <h2 className="text-2xl font-semibold mb-5 border-b pb-3">
          My Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://i.ibb.co.com/0jZjg4F/avatar.png"
            className="w-24 h-24 rounded-full border shadow"
            alt="User"
          />

          <div className="flex-1 space-y-3">
            <p><span className="font-bold">Name:</span> User Name</p>
            <p><span className="font-bold">Email:</span> user@gmail.com</p>
            <p><span className="font-bold">Address:</span> Not Updated</p>

            <button className="btn btn-outline btn-primary btn-sm">
              Update Profile
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserDashboard
