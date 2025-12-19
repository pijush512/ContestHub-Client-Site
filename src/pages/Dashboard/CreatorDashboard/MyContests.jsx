import React, { useState } from "react"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch contests
  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ["mycontest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/creator/${user?.email}`);
      return res.data;
    },
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContests = contests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <div className="max-w-7xl mx-auto mt-12 px-4 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center border-b-2 pb-5">
        My Created Contests
      </h2>

      {contests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't created any contests yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left font-medium text-gray-700">Contest Name</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-700">Type</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-700">Status</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-700">Deadline</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-700">Prize</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentContests.map((contest) => (
                  <tr key={contest._id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-6 font-medium">{contest.name}</td>
                    <td className="py-3 px-6 capitalize">{contest.type}</td>
                    <td className="py-3 px-6">
                      <span className={`font-semibold py-1 px-3 rounded-full text-xs text-white ${
                        contest.status === "pending" ? "bg-yellow-500" : 
                        contest.status === "approved" ? "bg-green-500" : "bg-red-500"
                      }`}>
                        {contest.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">{new Date(contest.deadline).toLocaleDateString()}</td>
                    <td className="py-3 px-6 font-medium">${contest.prize}</td>
                    <td className="py-3 px-6 space-x-2">
                      {contest.status === "pending" && (
                        <>
                          <button onClick={() => navigate(`/dashboard/creator/edit-contest/${contest._id}`)} className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm">Edit</button>
                          <button onClick={() => handleContestDelete(contest._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm">Delete</button>
                        </>
                      )}
                      <button onClick={() => navigate(`/dashboard/creator/submissions/${contest._id}`)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">See Submissions</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Previous
            </button>
            
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => handlePageChange(num + 1)}
                className={`px-4 py-2 rounded-md transition ${
                  currentPage === num + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {num + 1}              
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyContests;

