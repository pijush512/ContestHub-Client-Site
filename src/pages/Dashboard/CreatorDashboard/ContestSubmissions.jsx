// src/pages/dashboard/creator/ContestSubmissions.jsx
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ContestSubmissions = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${id}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (submission) => axiosSecure.patch(`/contest/${id}/winner`, {
      winnerEmail: submission.userEmail,
      winnerName: submission.userName,
      winnerPhoto: submission.userPhoto,
    }),
    onSuccess: () => {
      toast.success("Winner declared!");
      queryClient.invalidateQueries(["submissions", id]);
    },
  });

  if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Submissions ({submissions.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((s) => (
          <div key={s._id} className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img src={s.userPhoto || "https://i.imgur.com/0X8vV5g.png"} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold">{s.userName}</h3>
                  <p className="text-sm text-gray-600">{s.userEmail}</p>
                </div>
              </div>
              <p className="mt-4 bg-gray-100 p-4 rounded">{s.taskLink || s.taskText}</p>
              <button
                onClick={() => mutation.mutate(s)}
                disabled={mutation.isLoading}
                className="btn btn-success btn-sm mt-4"
              >
                Declare Winner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestSubmissions;