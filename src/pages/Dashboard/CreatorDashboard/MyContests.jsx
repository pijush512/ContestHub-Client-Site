import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch contests created by logged-in creator
  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ["mycontest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/creator/${user?.email}`);
      return res.data;
    },
  });

  // Delete contest
  const handleContestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contest/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your contest has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center mt-12 text-blue-500 text-lg">
        Contests Loading...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Created Contests
      </h2>

      {contests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't created any contests yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left font-medium text-gray-700">
                  Contest Name
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">
                  Type
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">
                  Deadline
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">
                  Prize
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr
                  key={contest._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-6 font-medium">{contest.name}</td>
                  <td className="py-3 px-6 capitalize">{contest.type}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`font-semibold ${
                        contest.status === "pending"
                          ? "bg-yellow-500 py-2 px-3 rounded-xl"
                          : contest.status === "approved"
                          ? "bg-green-500 py-2 px-3 rounded-xl"
                          : "bg-red-500 py-2 px-3 rounded-xl"
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {new Date(contest.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 font-medium">${contest.prize}</td>
                  <td className="py-3 px-6 space-x-2">
                    {/* Edit/Delete only if pending */}
                    {contest.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/creator/edit-contest/${contest._id}`)
                          }
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleContestDelete(contest._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/creator/submissions/${contest._id}`)
                      }
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      See Submissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContests;
