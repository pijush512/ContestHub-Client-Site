import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // User info
  const { data: profile = {} } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Participated contests
  const { data: participated = [] } = useQuery({
    queryKey: ["participated", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/participated/${user.email}`);
      return res.data;
    },
  });

  // Won contests
  const { data: won = [] } = useQuery({
    queryKey: ["won", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/won/${user.email}`);
      return res.data;
    },
  });

  // Sort by upcoming deadline
  const sortedParticipated = [...participated].sort((a, b) => 
    new Date(a.deadline) - new Date(b.deadline)
  );

  const winRate = participated.length > 0 
    ? Math.round((won.length / participated.length) * 100) 
    : 0;

  const totalPrize = won.reduce((sum, c) => sum + (c.prize || 0), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center py-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold">Welcome back, {profile.name || user?.displayName}!</h1>
        <p className="mt-3 text-xl">Track your contest journey & achievements</p>
        <Link to="/dashboard/profile" className="btn btn-outline btn-white mt-6">
          Edit Profile
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="stat bg-white shadow-xl rounded-2xl border border-purple-200">
          <div className="stat-title text-gray-600">Participated</div>
          <div className="stat-value text-purple-600">{participated.length}</div>
        </div>
        <div className="stat bg-white shadow-xl rounded-2xl border border-green-200">
          <div className="stat-title text-gray-600">Won</div>
          <div className="stat-value text-green-600">{won.length}</div>
        </div>
        <div className="stat bg-white shadow-xl rounded-2xl border border-pink-200">
          <div className="stat-title text-gray-600">Win Rate</div>
          <div className="stat-value text-pink-600">{winRate}%</div>
        </div>
        <div className="stat bg-white shadow-xl rounded-2xl border border-yellow-200">
          <div className="stat-title text-gray-600">Total Prize</div>
          <div className="stat-value text-yellow-600">${totalPrize}</div>
        </div>
      </div>

      {/* Win Rate Circle */}
      <div className="flex justify-center my-12">
        <div 
          className="radial-progress bg-purple-100 text-purple-600 border-8 border-purple-50" 
          style={{ "--value": winRate, "--size": "12rem", "--thickness": "1.2rem" }}
          role="progressbar"
        >
          <span className="text-4xl font-bold">{winRate}%</span>
        </div>
      </div>

      {/* Participated Contests */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 border">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 flex items-center justify-between">
          My Participated Contests 
          <span className="text-sm font-normal text-gray-500">Sorted by upcoming deadline</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead>
              <tr className="bg-purple-50 text-purple-800">
                <th>#</th>
                <th>Contest</th>
                <th>Entry Fee</th>
                <th>Prize</th>
                <th>Deadline</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedParticipated.map((c, i) => (
                <tr key={c._id} className="hover:bg-purple-50 transition">
                  <td>{i + 1}</td>
                  <td className="font-semibold">{c.title}</td>
                  <td>${c.price}</td>
                  <td className="text-green-600 font-bold">${c.prize}</td>
                  <td>{format(new Date(c.deadline), "dd MMM yyyy, h:mm a")}</td>
                  <td>
                    <span className="badge badge-success badge-sm">Paid</span>
                  </td>
                  <td>
                    {c.isWinner ? (
                      <span className="badge badge-success">Winner</span>
                    ) : new Date(c.deadline) < new Date() ? (
                      <span className="badge badge-error">Ended</span>
                    ) : (
                      <span className="badge badge-warning">Running</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Winning Contests */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 border">
        <h2 className="text-3xl font-bold mb-8 text-green-600">
          My Winning Contests ({won.length})
        </h2>
        {won.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">No wins yet — keep participating!</p>
            <p className="mt-4 text-gray-400">Your first victory is just around the corner</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {won.map((contest) => (
              <div key={contest._id} className="card bg-gradient-to-br from-green-50 to-emerald-100 shadow-xl border-2 border-green-200 transform hover:scale-105 transition">
                <figure className="px-8 pt-8">
                  <img src={contest.image} alt={contest.title} className="rounded-xl h-48 w-full object-cover" />
                </figure>
                <div className="card-body text-center">
                  <h3 className="card-title text-xl">{contest.title}</h3>
                  <p className="text-4xl font-bold text-green-600 mt-4">${contest.prize}</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="badge badge-success badge-lg">Winner</span>
                    <span className="badge badge-outline badge-success">Champion</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;