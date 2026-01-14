// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// const AllContests = () => {
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("all");

//   // Contest types for tabs
//   const contestTypes = ["all", "Image Design", "Article Writing", "Business Ideas", "Gaming Reviews"];

//   // Fetch contests from backend
//   const { data: contests = [], isLoading } = useQuery({
//     queryKey: ["allContests", activeTab],
//     queryFn: async () => {
//       const params = {};
//       if (activeTab !== "all") params.type = activeTab;
//       const res = await axiosSecure.get("/contests", { params });
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-12 text-blue-600 text-xl">
//         Loading Contests...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">All Contests</h2>

//       {/* Tabs */}
//       <div className="flex flex-wrap justify-center gap-3 mb-8">
//         {contestTypes.map((type) => (
//           <button
//             key={type}
//             onClick={() => setActiveTab(type)}
//             className={`px-4 py-2 rounded font-medium ${activeTab === type
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* Contest Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {contests.length === 0 && (
//           <p className="text-center col-span-full text-gray-500">
//             No contests found.
//           </p>
//         )}
//         {contests.map((contest) => (
//           <div
//             key={contest._id}
//             className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <img
//               src={contest.image || "https://via.placeholder.com/400x200"}
//               alt={contest.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{contest.name}</h3>
//               <p className="text-gray-600 mb-2">
//                 {contest.description?.slice(0, 80) || "No description"}...
//               </p>
//               <p className="text-sm text-gray-500 mb-1">
//                 Participants: {contest.participantsCount || 0}
//               </p>
//               <p className="text-sm text-gray-500 mb-1">Prize: ${contest.prize || 0}</p>
//               <p className="text-sm text-gray-500 mb-3">Type: {contest.type || "—"}</p>

//               {/* Details Button */}
//               <button
//                 onClick={() => {
//                   navigate(`/contest/${contest._id}`)
//                 }}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Details
//               </button>
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
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaTrophy,
  FaUsers,
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const contestTypes = [
    "all",
    "Image Design",
    "Article Writing",
    "Business Ideas",
    "Gaming Reviews",
  ];

  // 🔥 FETCH ALL DATA (NO BACKEND PAGINATION)
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["allContests", activeTab],
    queryFn: async () => {
      const params = {};
      if (activeTab !== "all") params.type = activeTab;
      const res = await axiosSecure.get("/contests", { params });
      return res.data; // <-- full array
    },
  });

  // 🔢 CLIENT SIDE PAGINATION
  const totalCount = data.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const contests = data.slice(startIndex, endIndex);

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Failed to load contests
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12 min-h-screen">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase italic tracking-tight">
          Explore All Contests
        </h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {contestTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveTab(type);
              setCurrentPage(1);
            }}
            className={`px-6 py-2.5 rounded-xl font-bold border-2 transition-all
              ${activeTab === type
                ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [...Array(itemsPerPage)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border p-4 animate-pulse h-[480px] flex flex-col"
            >
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
              <div className="mt-auto h-10 bg-gray-200 rounded-xl"></div>
            </div>
          ))
        ) : contests.length === 0 ? (
          <div className="col-span-full text-center py-20 border-2 border-dashed rounded-2xl">
            <p className="text-gray-400 font-semibold">
              No contests found for "{activeTab}"
            </p>
          </div>
        ) : (
          // contests.map((contest) => (
          //   <div
          //     key={contest._id}
          //     className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-[480px]"
          //   >
          //     {/* Image */}
          //     <div className="relative h-48 overflow-hidden bg-gray-100 rounded-t-2xl">
          //       <img
          //         src={contest.image || "https://via.placeholder.com/400x200"}
          //         alt={contest.name}
          //         className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          //       />
          //       <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
          //         {contest.type}
          //       </span>
          //     </div>

          //     {/* Content */}
          //     <div className="p-5 flex flex-col flex-grow">
          //       <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          //         {contest.name}
          //       </h3>

          //       <p className="text-sm text-gray-500 line-clamp-3 mb-4">
          //         {contest.description ||
          //           "Join this contest and showcase your talent."}
          //       </p>

          //       {/* Meta */}
          //       <div className="mt-auto space-y-3">
          //         <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border">
          //           <div className="flex items-center gap-1 text-xs font-semibold text-gray-600">
          //             <FaUsers className="text-blue-500" />
          //             {contest.participantsCount || 0} Joined
          //           </div>
          //           <div className="flex items-center gap-1 text-sm font-extrabold text-blue-700">
          //             <FaTrophy className="text-yellow-500" />
          //             ${contest.prize || 0}
          //           </div>
          //         </div>

          //         <div className="flex items-center gap-2 text-xs text-gray-400">
          //           <FaCalendarAlt />
          //           Deadline: {contest.deadline || "TBA"}
          //         </div>

          //         <button
          //           onClick={() => navigate(`/contest/${contest._id}`)}
          //           className="w-full py-3 text-xs font-bold uppercase rounded-xl bg-gray-900 text-white hover:bg-blue-600 transition"
          //         >
          //           View Details
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // ))
          contests.map((contest) => (
            <div
              key={contest._id}
              className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-[520px]"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-52 shrink-0">
                <img
                  src={contest.image || "https://via.placeholder.com/400x200"}
                  alt={contest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {contest.type?.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white font-heading mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {contest.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                  {contest.description || "Join this contest and showcase your unique skills to win amazing prizes."}
                </p>

                {/* Meta Info - Styled exactly like Popular Contests */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Participants</span>
                      <span className="text-blue-600 font-bold flex items-center gap-1.5 text-sm">
                        <FaUsers /> {contest.participantsCount || 0} Joined
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Win Prize</span>
                      <span className="text-green-500 font-extrabold flex items-center justify-end gap-1 text-sm">
                        <FaTrophy className="text-yellow-500" /> ${contest.prize}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-4 px-1"> 
                    <FaCalendarAlt className="text-red-400" /> 
                    <span>Deadline: {new Date(contest.deadline).toLocaleDateString()}</span> 
                  </div>

                  {/* Details Button */}
                  <button
                    onClick={() => navigate(`/contest/${contest._id}`)}
                    className="w-full bg-gray-900 dark:bg-blue-600 text-white font-heading text-xs font-bold uppercase tracking-widest text-center py-3.5 rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-gray-100"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-30"
          >
            {/* <FaArrowLeft /> */}
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold
                ${currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-30"
          >
            Next
            {/* <FaArrowRight /> */}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllContests;



