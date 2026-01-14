import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"; 

const ParticipantName = ({ email }) => {
  const axiosSecure = useAxiosSecure();
  const { data: userDetails } = useQuery({
    queryKey: ["user-name", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
  return <span>{userDetails?.name || email.split("@")[0]}</span>;
};

const SubmittedTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["creator-submissions", user?.email, id],
    queryFn: async () => {
      const endpoint = id 
        ? `/creator/submissions/${id}` 
        : `/creator/all-submissions/${user?.email}`;
      
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  const handleDeclareWinner = async (sub) => {
    try {
      const userRes = await axiosSecure.get(`/users/${sub.userEmail}`);
      const userData = userRes.data;

      const contestRes = await axiosSecure.get(`/contest/${sub.contestId}`);
      if (contestRes.data.winnerEmail) {
        return Swal.fire("Error", "Winner already declared!", "error");
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Make ${userData.name || sub.userEmail} the winner?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Declare Winner!",
      });

      if (result.isConfirmed) {
        const winnerData = {
          winnerEmail: sub.userEmail,
          winnerName: userData.name || "Unknown",
          winnerPhoto: userData.photo || "https://i.ibb.co/PNG-placeholder.png",
        };

        const response = await axiosSecure.patch(`/contest/declare-winner/${sub.contestId}`, winnerData);
        if (response.data.modifiedCount > 0) {
          Swal.fire("Success!", "Winner declared.", "success");
          refetch();
        }
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", error);
    }
  };

  if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 border-b-2 pb-5">
        {id ? "Contest Specific Submissions" : "All Submitted Tasks"} ({submissions.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 uppercase text-sm">
              <th className="py-4">Participant Name</th>
              <th className="py-4">Participant Email</th>
              <th className="py-4">Task Info</th>
              <th className="py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="hover:bg-blue-50 transition-colors border-b">
                <td className="font-bold text-gray-800">
                  <ParticipantName email={sub.userEmail} />
                </td>
                <td className="text-gray-600">{sub.userEmail}</td>
                <td>
                  {sub.taskLink ? (
                    <a href={sub.taskLink} target="_blank" rel="noreferrer" className="btn btn-xs btn-outline btn-info">View Link</a>
                  ) : (
                    <span className="text-red-400 italic">No link</span>
                  )}
                </td>
                <td className="text-center">
                  <button onClick={() => handleDeclareWinner(sub)} className="btn btn-success btn-sm text-white px-4 font-bold">
                    Declare Winner
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && <div className="p-20 text-center text-gray-400 italic text-xl">No submissions found.</div>}
      </div>
    </div>
  );
};

export default SubmittedTasks;