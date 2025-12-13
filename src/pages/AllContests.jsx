// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AllContests = () => {
//   const [contests, setContests] = useState([]);
//   const [filteredContests, setFilteredContests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeType, setActiveType] = useState("All");

//   useEffect(() => {
//     fetch("http://localhost:3000/contest") // fetch all contests
//       .then((res) => res.json())
//       .then((data) => {
//         // filter only approved contests
//         const approved = data.filter(c => c.status === "approved");
//         setContests(approved);
//         setFilteredContests(approved);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   // get unique contest types
//   const types = ["All", ...new Set(contests.map(c => c.type))];

//   const handleTabClick = (type) => {
//     setActiveType(type);
//     if (type === "All") {
//       setFilteredContests(contests);
//     } else {
//       setFilteredContests(contests.filter(c => c.type === type));
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (contests.length === 0) return <p className="text-center mt-10">No contests found</p>;

//   return (
//     <div className="w-11/12 mx-auto py-16">
//       <h2 className="text-3xl font-bold text-center mb-8">All Contests</h2>

//       {/* Tabs */}
//       <div className="flex flex-wrap justify-center mb-10 gap-4">
//         {types.map(type => (
//           <button
//             key={type}
//             onClick={() => handleTabClick(type)}
//             className={`px-4 py-2 rounded-full font-semibold ${
//               activeType === type ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* Contest Cards */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {filteredContests.map((c) => (
//           <div key={c._id} className="card bg-base-100 shadow-md hover:shadow-xl">
//             <figure>
//               <img
//                 src={c.image || "https://via.placeholder.com/400x200"}
//                 alt={c.title}
//                 className="h-52 w-full object-cover"
//               />
//             </figure>

//             <div className="card-body">
//               <h3 className="card-title">{c.title || "Untitled Contest"}</h3>
//               <p className="text-sm text-gray-500">
//                 {c.description?.slice(0, 100) || "No description"}...
//               </p>

//               <p className="font-semibold mt-2">
//                 Participants: {c.participants}
//               </p>

//               <div className="card-actions justify-end mt-4">
//                 <Link
//                   to={`/contest/${c._id}`}
//                   className="btn btn-primary btn-sm"
//                 >
//                   Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllContests;


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Contest types for tabs
  const contestTypes = ["all", "Image Design", "Article Writing", "Business Ideas", "Gaming Reviews"];

  // Fetch contests from backend
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["allContests", activeTab],
    queryFn: async () => {
      const params = {};
      if(activeTab !== "all")params.type = activeTab;
      const res = await axiosSecure.get("/contests", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-blue-600 text-xl">
        Loading Contests...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Contests</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {contestTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded font-medium ${
              activeTab === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Contest Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No contests found.
          </p>
        )}
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={contest.image || "https://via.placeholder.com/400x200"}
              alt={contest.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{contest.name}</h3>
              <p className="text-gray-600 mb-2">
                {contest.description?.slice(0, 80) || "No description"}...
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Participants: {contest.participantsCount || 0}
              </p>
              <p className="text-sm text-gray-500 mb-1">Prize: ${contest.prize || 0}</p>
              <p className="text-sm text-gray-500 mb-3">Type: {contest.type || "—"}</p>

              {/* Details Button */}
              <button
                onClick={() => {
                  // const token = localStorage.getItem("access-token");
                  // if (!token) {
                  //   navigate("/login");
                  // } else {
                  //   navigate(`/contest/${contest._id}`);
                  // }
                  navigate(`/contest/${contest._id}`)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContests;


