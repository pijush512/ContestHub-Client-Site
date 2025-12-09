// src/pages/Dashboard/AdminDashboard/AdminDashboard.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Users fetch
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Contests fetch
  const { data: contests = [], isLoading: contestsLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest");
      return res.data;
    },
  });

  // Change user role
  const handleRoleChange = async (email, newRole) => {
    try {
      await axiosSecure.patch(`/users/${email}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  // Contest actions
  const handleContestAction = async (id, action) => {
    try {
      if (action === "confirm") {
        await axiosSecure.patch(`/contest/${id}`, { status: "approved" });
        toast.success("Contest approved!");
      } else if (action === "delete") {
        await axiosSecure.delete(`/contest/${id}`);
        toast.success("Contest deleted!");
      }
      queryClient.invalidateQueries(["contests"]);
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  if (usersLoading || contestsLoading)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8 space-y-12">
      {/* Users Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td>{idx + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "User"}</td>
                  <td className="space-x-2">
                    {["User", "Creator", "Admin"].map((role) => (
                      <button
                        key={role}
                        className={`btn btn-xs ${
                          user.role === role ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => handleRoleChange(user.email, role)}
                      >
                        {role}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contests Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Contests</h2>
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Title</th>
                <th>Creator</th>
                <th>Participants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest, idx) => (
                <tr key={contest._id} className="hover:bg-gray-50">
                  <td>{idx + 1}</td>
                  <td>{contest.title}</td>
                  <td>{contest.creatorEmail}</td>
                  <td>{contest.participants || 0}</td>
                  <td>{contest.status || "pending"}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        handleContestAction(contest._id, "confirm")
                      }
                      disabled={contest.status === "approved"}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() =>
                        handleContestAction(contest._id, "delete")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
