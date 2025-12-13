import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch single contest
  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });


  if (isLoading) {
    return (
      <div className="text-center py-12 text-blue-600 text-xl">
        Loading Contest...
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="text-center py-12 text-red-600 text-xl">
        Contest not found.
      </div>
    );
  }

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
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Deadline:</span> {new Date(contest.deadline).toLocaleString()}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Status:</span> {contest.status || "pending"}
        </p>

        {/* Register or Join button */}
        <Link to={`/dashboard/payment/${contest._id}`} className="mt-6">
          <button
            // onClick={handleRegisterClick}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContestDetails;

