import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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
  const handleRoleChange = (userEmail, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/${userEmail}`, { role: newRole });
          refetchUsers();
          Swal.fire("Updated!", "User role updated", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to update role", "error");
        }
      }
    });
  };

  // Handle contest actions
  const handleContestAction = (contestId, status) => {
    let title = "";
    let icon = "question";
    let confirmButtonColor = "#3085d6";

    if (status === "approved") title = "Approve this contest?";
    if (status === "rejected") title = "Reject this contest?";
    if (status === "delete") {
      title = "Delete this contest? This cannot be undone!";
      icon = "warning";
      confirmButtonColor = "#d33";
    }

    Swal.fire({
      title,
      icon,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (status === "delete") {
            await axiosSecure.delete(`/contest/${contestId}`);
          } else {
            await axiosSecure.patch(`/contest/${contestId}`, {
              status,
            });
          }

          refetchContests();
          queryClient.invalidateQueries(["mycontest"]);
          Swal.fire("Success!", "Contest updated successfully", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to update contest", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* USERS */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="border px-4 py-2">{u.name}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.role || "user"}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleRoleChange(u.email, "user")}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      User
                    </button>
                    <button
                      onClick={() => handleRoleChange(u.email, "creator")}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Creator
                    </button>
                    <button
                      onClick={() => handleRoleChange(u.email, "admin")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
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

      {/* CONTESTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Contests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Creator</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((c) => (
                <tr key={c._id}>
                  <td className="border px-4 py-2">{c.name}</td>
                  <td className="border px-4 py-2">{c.creatorEmail}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-xl text-white font-semibold ${
                        c.status === "approved"
                          ? "bg-green-500"
                          : c.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    {c.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleContestAction(c._id, "approved")
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleContestAction(c._id, "rejected")
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        handleContestAction(c._id, "delete")
                      }
                      className="px-3 py-1 bg-gray-700 text-white rounded"
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
