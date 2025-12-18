import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [task, setTask] = useState("");

  // Fetch contest
  const { data: contest, isLoading } = useQuery({
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
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(contest.deadline).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  // Check registration & task submission
  useEffect(() => {
    if (!user?.email || !id) return;
    const fetchParticipation = async () => {
      try {
        const res = await axiosSecure.get(
          `/participations?contestId=${id}&userEmail=${user.email}`
        );
        setIsRegistered(res.data.alreadyRegistered || false);
        setTaskSubmitted(res.data.taskSubmitted || false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchParticipation();
  }, [id, user?.email, axiosSecure]);


  const submitTask = async () => {
    if (!task.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter task details before submitting!',
        confirmButtonColor: '#3085d6',
      });
    }

    try {
      await axiosSecure.post("/submissions", {
        contestId: contest._id,
        userEmail: user.email,
        taskLink: task, 
        submittedAt: new Date(),
      });

      Swal.fire({
        icon: 'success',
        title: 'Submitted!',
        text: 'Your task has been submitted successfully.',
        showConfirmButton: false,
        timer: 2000 // ২ সেকেন্ড পর অটো চলে যাবে
      });

      setTaskSubmitted(true);
      setTask("");
      setModalOpen(false);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };


  if (isLoading)
    return (
      <div className="text-center py-12 text-blue-600 text-xl">
        Loading Contest...
      </div>
    );

  if (!contest)
    return (
      <div className="text-center py-12 text-red-600 text-xl">
        Contest not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>

      <div className="bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{contest.name}</h1>
        <img
          src={contest.image || "https://via.placeholder.com/600x300"}
          alt={contest.name}
          className="w-full h-64 object-cover rounded mb-4"
        />

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Type:</span> {contest.type || "—"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Description:</span> {contest.description || "No description"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Task:</span> {contest.task || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Prize:</span> ${contest.prize || 0}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Price:</span> ${contest.price || 0}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Participants:</span> {contest.participantsCount || 0}
        </p>
        <p className="text-red-600 font-semibold mt-2">Deadline: {timeLeft}</p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Status:</span>{" "}
          {contest.status === "approved"
            ? isExpired
              ? "Closed"
              : "Active"
            : contest.status === "rejected"
              ? "Rejected"
              : "Pending Approval"}
        </p>

        {/* Winner */}
        {contest.winnerName && contest.winnerPhoto && (
          <div className="mt-4 p-4 bg-yellow-100 rounded">
            <p className="font-semibold text-green-700">Winner:</p>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={contest.winnerPhoto}
                alt={contest.winnerName}
                className="w-12 h-12 rounded-full"
              />
              <p>{contest.winnerName}</p>
            </div>
          </div>
        )}

        {/* Register button */}
        {!isRegistered && !isExpired && contest.status === "approved" && (
          <Link to={`/dashboard/payment/${contest._id}`}>
            <button className="px-6 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Register
            </button>
          </Link>
        )}

        {/* Submit Task button */}
        {isRegistered && !isExpired && !taskSubmitted && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Task
          </button>
        )}

        {/* Task submitted info */}
        {taskSubmitted && (
          <p className="mt-4 text-green-700 font-semibold">
            Task submitted successfully ✅
          </p>
        )}

        {/* Waiting for admin approval */}
        {!isRegistered && !isExpired && contest.status === "pending" && (
          <p className="mt-4 text-yellow-600">Waiting for admin approval...</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Submit Task</h2>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Paste your submission link or description"
            />
            <div className="flex justify-end">
              <button
                onClick={submitTask}
                className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
