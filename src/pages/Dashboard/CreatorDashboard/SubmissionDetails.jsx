import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
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

const SubmissionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading: isSubLoading, refetch: subRefetch } = useQuery({
    queryKey: ["submissions", id, user?.email],
    queryFn: async () => {
      const endpoint = id 
        ? `/creator/submissions/${id}` 
        : `/creator/all-submissions/${user?.email}`;
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  const { data: contest = {}, isLoading: isContestLoading, refetch: contestRefetch } = useQuery({
    queryKey: ["contest-single", id],
    queryFn: async () => {
      if (!id) return {};
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleDeclareWinner = async (sub) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: `Declare ${sub.userEmail} as the winner?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        confirmButtonText: "Yes, Declare!",
      });

      if (confirm.isConfirmed) {
        const winnerData = {
          winnerEmail: sub.userEmail,
          winnerName: "Winner", 
          winnerPhoto: "https://i.ibb.co/PNG-placeholder.png",
        };

        const res = await axiosSecure.patch(`/contest/declare-winner/${sub.contestId}`, winnerData);

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Winner has been declared.", "success");
          subRefetch(); 
          if(id) contestRefetch();
        }
      }
    } catch (err) {
      Swal.fire("Error", "Action failed", err);
    }
  };

  if (isSubLoading || (id && isContestLoading)) {
    return <div className="p-10 text-center text-blue-500">Loading Submissions...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">
        {id ? `Submissions for Contest ID: ${id}` : "All Submitted Tasks"}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Participant</th>
              <th className="p-3">Contest ID</th>
              <th className="p-3">Task Link</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-b">
                <td className="p-3">
                  <div className="flex flex-col">
                    <ParticipantName email={sub.userEmail} />
                    <span className="text-xs text-gray-400">{sub.userEmail}</span>
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-500">{sub.contestId}</td>
                <td className="p-3">
                  <a href={sub.taskLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
                    View Task
                  </a>
                </td>
                <td className="p-3 text-center">
                  {(id ? contest.winnerEmail === sub.userEmail : sub.status === "winner") ? (
                    <span className="badge badge-success text-white">🏆 Winner</span>
                  ) : (
                    <button
                      onClick={() => handleDeclareWinner(sub)}
                      disabled={id ? !!contest.winnerEmail : false}
                      className="btn btn-xs btn-neutral"
                    >
                      Declare Winner
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && (
          <p className="text-center py-10 text-gray-400">No submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;