import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const MyParticipate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: participated = [], isLoading } = useQuery({
    queryKey: ["participated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/participated/${user.email}`);
      return res.data;
    },
  });

  // ডেডলাইন অনুযায়ী সর্টিং
  const sortedParticipated = [...participated].sort((a, b) => {
    const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
    const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
    return dateA - dateB;
  });

  if (isLoading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-purple-600"></span></div>;

  return (
    <div className="p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-purple-700">My Participated Contests</h2>
            <p className="text-gray-500">List of all contests you have joined</p>
          </div>
          <div className="badge badge-purple p-4 h-auto bg-purple-100 text-purple-700 border-none font-bold">
            Total: {participated.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="rounded-l-xl">#</th>
                <th>Contest Name</th>
                <th>Prize</th>
                <th>Deadline</th>
                <th>Payment</th>
                <th className="rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedParticipated.map((c, i) => (
                <tr key={c._id} className="hover:bg-purple-50 transition border-b">
                  <td className="font-bold text-gray-400">{i + 1}</td>
                  <td className="font-semibold text-gray-700">{c.title}</td>
                  <td className="text-green-600 font-bold">${c.prize || 0}</td>
                  <td>
                    {c.deadline ? format(new Date(c.deadline), "dd MMM yyyy") : "N/A"}
                  </td>
                  <td><span className="badge badge-success badge-outline font-medium">Paid</span></td>
                  <td>
                    {c.isWinner ? (
                      <span className="badge badge-success gap-1 font-bold italic">🏆 Winner</span>
                    ) : new Date(c.deadline) < new Date() ? (
                      <span className="badge badge-error badge-ghost text-red-600">Ended</span>
                    ) : (
                      <span className="badge badge-warning badge-ghost text-orange-600">Running</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {participated.length === 0 && (
            <div className="text-center py-10 text-gray-500 font-medium">
              You haven't participated in any contests yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyParticipate;