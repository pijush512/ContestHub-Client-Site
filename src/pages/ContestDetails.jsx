import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ContestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Fetch contest details
  useEffect(() => {
    fetch(`http://localhost:3000/contest/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setContest(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Check if user already registered
  useEffect(() => {
    if (user && contest) {
      fetch(`http://localhost:3000/contest/participated/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const isRegistered = data.some(p => p.contestId === contest._id);
          setRegistered(isRegistered);
        });
    }
  }, [user, contest]);

  // Countdown Timer
  useEffect(() => {
    if (!contest) return;

    const interval = setInterval(() => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const handleRegister = () => {
    // Make API call to register user (after payment logic)
    fetch("http://localhost:3000/participate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email, contestId: contest._id }),
    })
      .then((res) => res.json())
      .then(() => setRegistered(true))
      .catch((err) => console.error(err));
  };

  const handleSubmitTask = () => {
    fetch("http://localhost:3000/participate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contestId: contest._id,
        userEmail: user.email,
        taskSubmitted: true,
        taskLink: taskInput,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Task submitted successfully!");
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!contest) return <p className="text-center mt-10">Contest not found</p>;

  const contestEnded = new Date(contest.deadline).getTime() < new Date().getTime();

  return (
    <div className="w-11/12 mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">{contest.title}</h1>
      <img
        src={contest.image || "https://via.placeholder.com/800x400"}
        alt={contest.title}
        className="w-full h-96 object-cover mb-6"
      />
      <p className="text-gray-600 mb-2">Participants: {contest.participants}</p>
      <p className="text-gray-600 mb-4">Prize: ${contest.prize}</p>
      <p className="mb-4">{contest.description}</p>
      <p className="mb-4 font-semibold">Task Details: {contest.taskInstruction}</p>
      <p className="mb-4 font-semibold">Deadline: {timeLeft}</p>

      {contest.winnerName && (
        <div className="flex items-center gap-4 mb-4">
          <img
            src={contest.winnerPhoto || "https://via.placeholder.com/50"}
            alt={contest.winnerName}
            className="w-12 h-12 rounded-full"
          />
          <span className="font-semibold">Winner: {contest.winnerName}</span>
        </div>
      )}

      {!contestEnded && !registered && (
        <button
          onClick={handleRegister}
          className="btn btn-primary mb-4"
        >
          Register / Pay
        </button>
      )}

      {registered && !contestEnded && (
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-secondary mb-4"
        >
          Submit Task
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Submit Task</h2>
            <textarea
              className="w-full h-32 border p-2 mb-4"
              placeholder="Provide your task links here..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-gray"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitTask}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {contestEnded && <p className="text-red-500 font-bold mt-4">Contest Ended</p>}
    </div>
  );
};

export default ContestDetails;
