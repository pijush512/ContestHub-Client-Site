import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch all contests
  const { data: contests = [], refetch: refetchContests } = useQuery({
    queryKey: ["adminContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest");
      return res.data;
    },
  });

  // Handle user role change
  const handleRoleChange = async (userEmail, newRole) => {
    try {
      await axiosSecure.patch(`/users/${userEmail}`, { role: newRole });
      refetchUsers();
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  // Handle contest actions
  const handleContestAction = async (contestId, action) => {
    try {
      if (action === "delete") {
        await axiosSecure.delete(`/contest/${contestId}`);
      } else if (action === "approve") {
        await axiosSecure.patch(`/contest/${contestId}`, { approved: true });
      } else if (action === "reject") {
        await axiosSecure.patch(`/contest/${contestId}`, { approved: false });
      }
      refetchContests();
      alert(`Contest ${action}d successfully`);
    } catch (err) {
      console.error(err);
      alert("Failed to update contest");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Users Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role || "user"}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleRoleChange(user.email, "user")}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      User
                    </button>
                    <button
                      onClick={() => handleRoleChange(user.email, "creator")}
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      Creator
                    </button>
                    <button
                      onClick={() => handleRoleChange(user.email, "admin")}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contests Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Contests</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Creator Email</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-2 border">{c.name}</td>
                  <td className="px-4 py-2 border">{c.creatorEmail}</td>
                  <td className="px-4 py-2 border">
                    {c.approved ? "Approved" : "Pending"}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    {!c.approved && (
                      <button
                        onClick={() => handleContestAction(c._id, "approve")}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        Approve
                      </button>
                    )}
                    {!c.approved && (
                      <button
                        onClick={() => handleContestAction(c._id, "reject")}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleContestAction(c._id, "delete")}
                      className="px-2 py-1 bg-gray-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

