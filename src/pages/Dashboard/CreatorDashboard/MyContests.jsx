import {} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ["mycontest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/creator/${user?.email}`);
      return res.data
    }
  });

  if (isLoading) {
    return <div className="text-center mt-12 text-blue-500">Contests Loading...</div>;
  }


  const handleContestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/contest/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your contest has been deleted.",
                icon: "success"
              });
            }
          })


      }
    });
  }



  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        My Created Contests
      </h2>

      {contests.length === 0 ? (
        <p className="text-center text-gray-500">No contests created yet.</p>
      ) : (

        <div className="overflow-x-auto shadow-lg rounded-lg ">
          <p className="text-center text-5xl">Total Contest: {contests.length}</p>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 font-medium text-gray-700">
                  Contest Name
                </th>
                <th className="py-3 px-6 font-medium text-gray-700">Type</th>
                <th className="py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 font-medium text-gray-700">
                  Deadline
                </th>
                <th className="py-3 px-6 font-medium text-gray-700">Prize</th>
                <th className="py-3 px-6 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest._id} className="border-b">
                  <td className="py-3 px-6 font-bold">{contest.name}</td>
                  <td className="py-3 px-6 font-semibold">{contest.type}</td>
                  <td className="py-3 px-6 capitalize">{contest.status}</td>
                  <td className="py-3 px-6">
                    {new Date(contest.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{contest.prize}</td>
                  <td className="py-3 px-6 space-x-2">
                    {/* Edit only if pending */}
                    {contest.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/creator/edit-contest/${contest._id}`)
                          }
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleContestDelete(contest._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/creator/submissions/${contest._id}`)
                      }
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      See Submissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
};

export default MyContests;
