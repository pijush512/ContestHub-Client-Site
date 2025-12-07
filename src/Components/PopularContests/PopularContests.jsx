// // src/components/PopularContests.jsx
// import { Link, useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';


// const PopularContests = ({ contests = [] }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // সবচেয়ে বেশি পার্টিসিপেন্ট ওয়ালা ৫টা নেওয়া
//   const popular = [...contests]
//     .sort((a, b) => b.participants - a.participants)
//     .slice(0, 5);

//   const handleDetailsClick = (id) => {
//     if (!user) {
//       navigate('/login');
//     } else {
//       navigate(`/contest/${id}`);
//     }
//   };

//   return (
//     <section className="py-20 bg-base-200">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
//           Most Popular Contests
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {popular.map((contest) => (
//             <div
//               key={contest._id}
//               className="card bg-base-100 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
//             >
//               <figure className="h-48">
//                 <img
//                   src={contest.image}
//                   alt={contest.name}
//                   className="w-full h-full object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h3 className="card-title">{contest.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   {contest.description.slice(0, 80)}...
//                 </p>
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="badge badge-primary badge-lg">
//                     {contest.participants} Joined
//                   </span>
//                   <button
//                     onClick={() => handleDetailsClick(contest._id)}
//                     className="btn btn-sm btn-secondary"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link to="/allContests" className="btn btn-outline btn-wide btn-lg">
//             Show All Contests
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularContests;


import React from "react";
import { Link } from "react-router-dom";

const PopularContests = ({ contests, user }) => {
  const topFive = contests
    ?.sort((a, b) => b.participants - a.participants)
    ?.slice(0, 5);

  return (
    <div className="w-11/12 mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Contests
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {topFive?.map((c) => (
          <div key={c._id} className="card bg-base-100 shadow-md hover:shadow-xl">
            <figure>
              <img src={c.image} alt={c.name} className="h-52 w-full object-cover" />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{c.name}</h3>
              <p className="text-sm text-gray-500">
                {c.description.slice(0, 80)}...
              </p>

              <p className="font-semibold mt-2">
                Participants: {c.participants}
              </p>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={user ? `/contest/${c._id}` : "/login"}
                  className="btn btn-primary btn-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/allContests" className="btn btn-outline btn-primary">
          Show All
        </Link>
      </div>
    </div>
  );
};

export default PopularContests;
