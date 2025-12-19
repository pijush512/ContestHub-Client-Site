import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (userEmail, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
           await axiosSecure.patch(`/users/role/${userEmail}`, { role: newRole });

          refetch();
          Swal.fire("Updated!", "User role updated", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to update role", "error");
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage All Users</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gradient-to-b from-purple-500 to-indigo-600 text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="text-lg font-bold">{u.displayName}</td>
                <td>{u.email}</td>
                <td className="font-semibold uppercase text-sm">{u.role || "user"}</td>
                <td className="space-x-2">
                  <button onClick={() => handleRoleChange(u.email, "user")} className="btn btn-sm btn-outline">User</button>
                  <button onClick={() => handleRoleChange(u.email, "creator")} className="btn btn-sm btn-primary">Creator</button>
                  <button onClick={() => handleRoleChange(u.email, "admin")} className="btn btn-sm btn-success text-white">Admin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;