import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

// আলাদা ছোট কম্পোনেন্ট ইমেইল দিয়ে নাম খুঁজে বের করার জন্য
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

  // ১. এই ক্রিয়েটরের সব কন্টেস্টের সব সাবমিশন একসাথে আনা
  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["all-creator-submissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creator/all-submissions/${user?.email}`);
      return res.data;
    },
  });

  // ২. উইনার ঘোষণা করার ফাংশন
  const handleDeclareWinner = async (sub) => {
    try {
      // ইউজারের বর্তমান তথ্য আনা (ছবি ও নাম)
      const userRes = await axiosSecure.get(`/users/${sub.userEmail}`);
      const userData = userRes.data;

      // কন্টেস্টটি অলরেডি উইনার আছে কি না চেক করা
      const contestRes = await axiosSecure.get(`/contest/${sub.contestId}`);
      if (contestRes.data.winnerEmail) {
        return Swal.fire("Error", "Winner already declared for this contest!", "error");
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to make ${userData.name || sub.userEmail} the winner?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
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
          Swal.fire("Success!", "Winner has been declared.", "success");
          refetch(); // টেবিল রিফ্রেশ
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 pb-2">
        Submitted Tasks ({submissions.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl border">
        <table className="table w-full">
          {/* Table Header */}
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
                {/* ১. পার্টিসিপেন্ট নাম (Dynamic Fetch) */}
                <td className="font-bold text-gray-800">
                  <ParticipantName email={sub.userEmail} />
                </td>

                {/* ২. পার্টিসিপেন্ট ইমেইল */}
                <td className="text-gray-600">{sub.userEmail}</td>

                {/* ৩. সাবমিটেড টাস্ক (Task Link) */}
                <td>
                  {sub.taskLink ? (
                    <a
                      href={sub.taskLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-xs btn-outline btn-info lowercase"
                    >
                      View Link
                    </a>
                  ) : (
                    <span className="text-red-400 italic text-sm">No link provided</span>
                  )}
                </td>

                {/* ৪. উইনার ডিক্লেয়ার বাটন */}
                <td className="text-center">
                  <button
                    onClick={() => handleDeclareWinner(sub)}
                    className="btn btn-success btn-sm text-white px-4 font-bold"
                  >
                    Declare Winner
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* যদি কোনো সাবমিশন না থাকে */}
        {submissions.length === 0 && (
          <div className="p-20 text-center text-gray-400 italic text-xl">
            No submissions found yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedTasks;