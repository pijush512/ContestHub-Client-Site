// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAuth from "../hooks/useAuth";
// import Swal from "sweetalert2";

// const ContestDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [taskSubmitted, setTaskSubmitted] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [task, setTask] = useState("");

//   // Fetch contest
//   const { data: contest, isLoading } = useQuery({
//     queryKey: ["contest", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/contest/${id}`);
//       return res.data;
//     },
//   });

//   console.log(contest)

//   const isExpired = contest ? new Date(contest.deadline) < new Date() : false;

//   // Countdown timer
//   useEffect(() => {
//     if (!contest?.deadline) return;
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const end = new Date(contest.deadline).getTime();
//       const diff = end - now;

//       if (diff <= 0) {
//         setTimeLeft("Contest Ended");
//         clearInterval(interval);
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [contest]);

//   // Check registration & task submission
//   useEffect(() => {
//     if (!user?.email || !id) return;
//     const fetchParticipation = async () => {
//       try {
//         const res = await axiosSecure.get(
//           `/participations?contestId=${id}&userEmail=${user.email}`
//         );
//         setIsRegistered(res.data.alreadyRegistered || false);
//         setTaskSubmitted(res.data.taskSubmitted || false);
//         console.log(res.data)
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchParticipation();
//   }, [id, user?.email, axiosSecure]);


//   const submitTask = async () => {
//     if (!task.trim()) {
//       return Swal.fire({
//         icon: 'warning',
//         title: 'Oops...',
//         text: 'Please enter task details before submitting!',
//         confirmButtonColor: '#3085d6',
//       });
//     }

//     try {
//       await axiosSecure.post("/submissions", {
//         contestId: contest._id,
//         userEmail: user.email,
//         taskLink: task, 
//         submittedAt: new Date(),
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Submitted!',
//         text: 'Your task has been submitted successfully.',
//         showConfirmButton: false,
//         timer: 2000 
//       });

//       setTaskSubmitted(true);
//       setTask("");
//       setModalOpen(false);
//     } catch (err) {
//       console.error(err);

//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: 'Something went wrong. Please try again later.',
//       });
//     }
//   };


//   if (isLoading)
//     return (
//       <div className="text-center py-12 text-blue-600 text-xl">
//         Loading Contest...
//       </div>
//     );

//   if (!contest)
//     return (
//       <div className="text-center py-12 text-red-600 text-xl">
//         Contest not found.
//       </div>
//     );

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//       >
//         Back
//       </button>

//       <div className="bg-white rounded shadow p-6">
//         <h1 className="text-3xl font-bold mb-4">{contest.name}</h1>
//         <img
//           src={contest.image || "https://via.placeholder.com/600x300"}
//           alt={contest.name}
//           className="w-full h-64 object-cover rounded mb-4"
//         />

//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Type:</span> {contest.type || "—"}
//         </p>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Description:</span> {contest.description || "No description"}
//         </p>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Task:</span> {contest.task || "N/A"}
//         </p>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Prize:</span> ${contest.prize || 0}
//         </p>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Price:</span> ${contest.price || 0}
//         </p>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Participants:</span> {contest.participantsCount || 0}
//         </p>
//         <p className="text-red-600 font-semibold mt-2">Deadline: {timeLeft}</p>

//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Status:</span>{" "}
//           {contest.status === "approved"
//             ? isExpired
//               ? "Closed"
//               : "Active"
//             : contest.status === "rejected"
//               ? "Rejected"
//               : "Pending Approval"}
//         </p>

//         {/* Winner */}
//         {contest.winnerName && contest.winnerPhoto && (
//           <div className="mt-4 p-4 bg-yellow-100 rounded">
//             <p className="font-semibold text-green-700">Winner:</p>
//             <div className="flex items-center gap-2 mt-2">
//               <img
//                 src={contest.winnerPhoto}
//                 alt={contest.winnerName}
//                 className="w-12 h-12 rounded-full"
//               />
//               <p>{contest.winnerName}</p>
//             </div>
//           </div>
//         )}

//         {/* Register button */}
//         {!isRegistered && !isExpired && contest.status === "approved" && (
//           <Link to={`/dashboard/payment/${contest._id}`}>
//             <button className="px-6 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Register
//             </button>
//           </Link>
//         )}

//         {/* Submit Task button */}
//         {isRegistered && !isExpired && !taskSubmitted && (
//           <button
//             onClick={() => setModalOpen(true)}
//             className="px-6 py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Submit Task
//           </button>
//         )}

//         {/* Task submitted info */}
//         {taskSubmitted && (
//           <p className="mt-4 text-green-700 font-semibold">
//             Task submitted successfully ✅
//           </p>
//         )}

//         {/* Waiting for admin approval */}
//         {!isRegistered && !isExpired && contest.status === "pending" && (
//           <p className="mt-4 text-yellow-600">Waiting for admin approval...</p>
//         )}
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Submit Task</h2>
//             <textarea
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               className="w-full border p-2 rounded mb-4"
//               placeholder="Paste your submission link or description"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={submitTask}
//                 className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 bg-gray-400 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContestDetails;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [timeLeft, setTimeLeft] = useState("Calculating...");
  const [isRegistered, setIsRegistered] = useState(false);
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

  // Fetch contest data
  const { data: contest, isLoading, error } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  const isExpired = contest ? new Date(contest.deadline) < new Date() : false;

  // Countdown timer
  useEffect(() => {
    if (!contest?.deadline) return;

    const updateTimer = () => {
      const diff = new Date(contest.deadline).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(`${days}d ${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [contest?.deadline]);

  // Check registration & submission status
  useEffect(() => {
    if (!user?.email || !id) return;

    const checkParticipation = async () => {
      try {
        const res = await axiosSecure.get(`/participations?contestId=${id}&userEmail=${user.email}`);
        setIsRegistered(res.data.alreadyRegistered || false);
        setTaskSubmitted(res.data.taskSubmitted || false);
      } catch (err) {
        console.error("Participation check failed:", err);
      }
    };
    checkParticipation();
  }, [id, user?.email]);

  const handleSubmitTask = async () => {
    if (!submissionLink.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Please enter your submission link or description",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    try {
      await axiosSecure.post("/submissions", {
        contestId: contest._id,
        userEmail: user.email,
        taskLink: submissionLink.trim(),
        submittedAt: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your work has been submitted successfully.",
        timer: 2200,
        showConfirmButton: false,
      });

      setTaskSubmitted(true);
      setSubmissionLink("");
      setModalOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
        err
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-blue-600">Loading contest...</div>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Contest not found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          ← Back to contests
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left – Hero Image + Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={contest.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200"}
              alt={contest.name}
              className="w-full h-64 md:h-96 object-cover"
            />

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {contest.name}
                </h1>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    isExpired
                      ? "bg-red-100 text-red-700"
                      : contest.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isExpired ? "Ended" : contest.status === "approved" ? "Active" : contest.status}
                </span>
              </div>

              <p className="text-red-600 font-medium text-lg mb-6">
                ⏳ {timeLeft}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Prize</p>
                  <p className="text-2xl font-bold text-indigo-600">${contest.prize || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Entry Fee</p>
                  <p className="text-2xl font-bold">${contest.price || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="text-2xl font-bold">{contest.participantsCount || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-xl font-semibold">{contest.type || "Contest"}</p>
                </div>
              </div>

              {/* Description & Task */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {contest.description || "No description provided."}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">What to Submit</h2>
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <p className="text-gray-800">{contest.task || "No specific task instructions."}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Winner Announcement (if exists) */}
          {contest.winnerName && contest.winnerPhoto && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl shadow">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Winner Announced! 🏆</h2>
              <div className="flex items-center gap-4">
                <img
                  src={contest.winnerPhoto}
                  alt={contest.winnerName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <p className="font-bold text-lg">{contest.winnerName}</p>
                  <p className="text-amber-700">Congratulations!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right – Sidebar / Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Participation</h2>

            {isExpired ? (
              <div className="text-center py-6 text-gray-500">
                This contest has ended.
              </div>
            ) : contest.status !== "approved" ? (
              <div className="text-center py-6 text-yellow-600">
                Waiting for admin approval...
              </div>
            ) : !isRegistered ? (
              <Link to={`/dashboard/payment/${contest._id}`}>
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-md">
                  Register Now – ${contest.price || 0}
                </button>
              </Link>
            ) : taskSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-2">Task Submitted ✓</h3>
                <p className="text-green-600">Waiting for results...</p>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-md"
              >
                Submit Your Work
              </button>
            )}

            {/* Extra info */}
            <div className="mt-6 text-sm text-gray-500 space-y-2">
              <p>Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
              <p>Contest ID: {contest._id.slice(-8)}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-7">
            <h2 className="text-2xl font-bold mb-5">Submit Your Work</h2>
            <textarea
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Paste GitHub link, Behance URL, drive link, description, etc..."
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTask}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Submit Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;




