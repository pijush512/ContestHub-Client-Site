import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["adminContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest");
      return res.data;
    },
  });

  const handleContestAction = (contestId, status) => {
    let confirmText = status === 'delete' ? "Delete this contest?" : `Do you want to ${status} this?`;

    Swal.fire({
      title: confirmText,
      icon: status === 'delete' ? "warning" : "info",
      showCancelButton: true,
      confirmButtonColor: status === 'delete' ? "#d33" : "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (status === "delete") {
            await axiosSecure.delete(`/contest/${contestId}`);
          } else {
            await axiosSecure.patch(`/contest/${contestId}`, { status });
          }
          refetch();
          queryClient.invalidateQueries(["mycontest"]);
          Swal.fire("Success!", `Contest ${status} successfully`, "success");
        } catch (err) {
          Swal.fire("Error!", "Action failed", "error");
          console.log(err)
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage All Contests</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gradient-to-t from-purple-500 to-indigo-600 text-white">
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((c) => (
              <tr key={c._id}>
                <td className="font-bold text-lg">{c.name}</td>
                <td>{c.creatorEmail}</td>
                <td>
                  <span className={`badge font-bold p-3 ${c.status === 'approved' ? 'badge-success' : c.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {c.status === "pending" && (
                    <>
                      <button onClick={() => handleContestAction(c._id, "approved")} className="btn btn-xs btn-success text-white">Approve</button>
                      <button onClick={() => handleContestAction(c._id, "rejected")} className="btn btn-xs btn-error">Reject</button>
                    </>
                  )}
                  <button onClick={() => handleContestAction(c._id, "delete")} className="btn btn-xs btn-neutral">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;