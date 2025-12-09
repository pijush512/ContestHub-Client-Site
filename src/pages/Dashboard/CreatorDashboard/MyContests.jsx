// src/pages/dashboard/creator/MyContests.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/creator/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (!confirm("Delete this contest?")) return;
    try {
      await axiosSecure.delete(`/contest/${id}`);
      toast.success("Contest deleted");
      refetch();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-purple-700">My Created Contests ({contests.length})</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-purple-100">
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Prize</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((c, i) => (
              <tr key={c._id}>
                <td>{i + 1}</td>
                <td><img src={c.image} className="w-16 h-16 object-cover rounded" /></td>
                <td className="font-semibold">{c.title}</td>
                <td><span className="badge badge-info">{c.type}</span></td>
                <td><span className={`badge ${c.status === "confirmed" ? "badge-success" : "badge-warning"}`}>{c.status}</span></td>
                <td className="font-bold text-green-600">${c.prize}</td>
                <td className="space-x-2">
                  {c.status === "pending" && (
                    <>
                      <Link to={`/dashboard/creator/edit-contest/${c._id}`} className="btn btn-sm btn-warning">Edit</Link>
                      <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-error">Delete</button>
                    </>
                  )}
                  <Link to={`/dashboard/creator/submissions/${c._id}`} className="btn btn-sm btn-accent">
                    Submissions
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContests;