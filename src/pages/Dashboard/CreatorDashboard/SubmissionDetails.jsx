// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const SubmissionDetails = () => {
//   const { id } = useParams(); 
//   const axiosSecure = useAxiosSecure();

//   const { data: submissions = [], isLoading } = useQuery({
//     queryKey: ["submissions", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/creator/submissions/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <div className="p-10 text-center text-blue-500">Loading Submissions...</div>;

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-4">
//       <h2 className="text-2xl font-bold mb-6">Contest Submissions</h2>
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="py-3 px-6 text-left">User Email</th>
//               <th className="py-3 px-6 text-left">Submitted Link/Task</th>
//               <th className="py-3 px-6 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((sub) => (
//               <tr key={sub._id} className="border-b">
//                 <td className="py-4 px-6">{sub.userEmail}</td>
//                 <td className="py-4 px-6">
//                   <span className="text-blue-600 break-all">
//                     {sub.taskLink || sub.task || "No Link Provided"}
//                   </span>
//                 </td>
//                 <td className="py-4 px-6">
//                   <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
//                     Declare Winner
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {submissions.length === 0 && (
//           <p className="text-center py-10 text-gray-500">No one has submitted yet!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubmissionDetails;



import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SubmissionDetails = () => {
  const { id } = useParams(); // এখানে id হলো contestId
  const axiosSecure = useAxiosSecure();

  // ১. সাবমিশন ডাটা ফেচ করা
  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creator/submissions/${id}`);
      return res.data;
    },
  });

  // ২. কন্টেস্টের বর্তমান অবস্থা চেক করা (অলরেডি উইনার আছে কি না)
  const { data: contest = {} } = useQuery({
    queryKey: ["contest-single", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  const handleDeclareWinner = async (sub) => {
    try {
      // ৩. ইউজারের নাম ও ছবি পেতে ইউজার এপিআই কল করা
      const userRes = await axiosSecure.get(`/users/${sub.userEmail}`);
      const userData = userRes.data;

      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to declare ${userData.name || sub.userEmail} as the winner?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Declare!",
      });

      if (confirm.isConfirmed) {
        const winnerData = {
          winnerEmail: sub.userEmail,
          winnerName: userData.name || "Unknown",
          winnerPhoto: userData.photo || "https://i.ibb.co/PNG-placeholder.png",
        };

        // ৪. ব্যাকএন্ডে প্যাচ (Patch) রিকোয়েস্ট পাঠানো
        const res = await axiosSecure.patch(`/contest/declare-winner/${id}`, winnerData);

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Winner Declared!",
            text: "The contest winner has been successfully updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
          refetch(); // লিস্ট আপডেট করা
          window.location.reload(); // প্রয়োজনে পেজ রিলোড করা যাতে বাটন হাইড হয়
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <div className="p-10 text-center text-blue-500 font-bold">Loading Submissions...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Submissions for: {contest.name}</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">User Email</th>
              <th className="py-3 px-6 text-left">Submitted Link/Task</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{sub.userEmail}</td>
                <td className="py-4 px-6 text-blue-600">
                  <a href={sub.taskLink} target="_blank" rel="noreferrer" className="underline break-all">
                    {sub.taskLink || "View Submission"}
                  </a>
                </td>
                <td className="py-4 px-6 text-center">
                  {contest.winnerEmail ? (
                    <span className={`px-4 py-1 rounded-full text-white text-sm font-bold ${contest.winnerEmail === sub.userEmail ? "bg-green-600" : "bg-gray-400"}`}>
                      {contest.winnerEmail === sub.userEmail ? "Winner" : "Finished"}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDeclareWinner(sub)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition-all"
                    >
                      Declare Winner
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && <p className="text-center py-10 text-gray-500">No one has submitted yet!</p>}
      </div>
    </div>
  );
};

export default SubmissionDetails;