import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// আলাদা ছোট কম্পোনেন্ট ইমেইল দিয়ে ইউজারের নাম খুঁজে বের করার জন্য
const ParticipantName = ({ email }) => {
  const axiosSecure = useAxiosSecure();
  const { data: userDetails } = useQuery({
    queryKey: ["user-name", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
    enabled: !!email, // ইমেইল থাকলে তবেই কল হবে
  });
  // আসল নাম না থাকলে ইমেইলের প্রথম অংশ দেখাবে
  return <span>{userDetails?.name || email.split("@")[0]}</span>;
};

const SubmissionDetails = () => {
  const { id } = useParams(); // URL থেকে কন্টেস্ট আইডি
  const axiosSecure = useAxiosSecure();

  // ১. এই কন্টেস্টের সব সাবমিশন নিয়ে আসা
  const { data: submissions = [], isLoading: isSubLoading, refetch: subRefetch } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creator/submissions/${id}`);
      return res.data;
    },
  });

  // ২. কন্টেস্টের বর্তমান ডাটা (উইনার আছে কি না চেক করার জন্য)
  const { data: contest = {}, isLoading: isContestLoading, refetch: contestRefetch } = useQuery({
    queryKey: ["contest-single", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  // ৩. উইনার ডিক্লেয়ার করার ফাংশন
  const handleDeclareWinner = async (sub) => {
    try {
      // ইউজারের বিস্তারিত তথ্য আনা
      const userRes = await axiosSecure.get(`/users/${sub.userEmail}`);
      const userData = userRes.data;

      const confirm = await Swal.fire({
        title: "Declare Winner?",
        text: `Are you sure you want to declare ${userData.name || sub.userEmail} as the winner?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Declare!",
      });

      if (confirm.isConfirmed) {
        const winnerData = {
          winnerEmail: sub.userEmail,
          winnerName: userData.name || "Unknown Participant",
          winnerPhoto: userData.photo || "https://i.ibb.co/PNG-placeholder.png",
        };

        // ব্যাকএন্ডে উইনার ডিক্লেয়ার করার রিকোয়েস্ট
        const res = await axiosSecure.patch(`/contest/declare-winner/${id}`, winnerData);

        if (res.data.modifiedCount > 0) {
          Swal.fire("Congratulations!", "Winner has been successfully declared.", "success");
          subRefetch(); 
          contestRefetch();
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to declare winner.", "error");
    }
  };

  if (isSubLoading || isContestLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Submissions for: <span className="text-blue-600">{contest.name}</span>
        </h2>
        {contest.winnerEmail && (
          <div className="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold shadow-sm">
            🏆 Winner: {contest.winnerName} ({contest.winnerEmail})
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-100">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-4">Participant Details</th>
              <th className="py-4">Submitted Task Info</th>
              <th className="py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50 border-b transition-colors">
                {/* ১. পার্টিসিপেন্ট নাম ও ইমেইল */}
                <td className="py-4">
                  <div className="font-bold text-gray-800 text-lg">
                    <ParticipantName email={sub.userEmail} />
                  </div>
                  <div className="text-sm text-gray-500 font-medium italic">{sub.userEmail}</div>
                </td>

                {/* ২. সাবমিটেড টাস্ক লিঙ্ক */}
                <td className="py-4">
                  {sub.taskLink ? (
                    <a 
                      href={sub.taskLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-outline btn-info btn-xs normal-case"
                    >
                      View Submitted Task
                    </a>
                  ) : (
                    <span className="text-red-400 text-sm italic">No link provided</span>
                  )}
                </td>

                {/* ৩. বাটন লজিক */}
                <td className="py-4 text-center">
                  {contest.winnerEmail ? (
                    <div className="flex justify-center">
                      {contest.winnerEmail === sub.userEmail ? (
                        <span className="badge badge-success text-white py-4 px-6 font-bold shadow-md">
                          🏆 SELECTED WINNER
                        </span>
                      ) : (
                        <span className="badge badge-ghost text-gray-400">Not Selected</span>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeclareWinner(sub)}
                      className="btn btn-sm btn-success text-white px-6 shadow hover:scale-105 transition-transform"
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
          <div className="text-center py-20 bg-gray-50 rounded-xl mt-4 text-gray-400 italic text-lg">
            No one has submitted any tasks for this contest yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;