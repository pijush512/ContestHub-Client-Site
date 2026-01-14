// const Testimonials = () => {
//   const reviews = [
//     {
//       id: 1,
//       name: "Arif Rahman",
//       role: "Graphic Designer",
//       review: "Winning a contest on this platform changed my career path. The payment system is incredibly transparent!",
//       image: "https://i.ibb.co/5GzXkwV/user1.jpg"
//     },
//     {
//       id: 2,
//       name: "Sadia Islam",
//       role: "Content Writer",
//       review: "I participated in three writing contests and won two of them. It has been an amazing experience!",
//       image: "https://i.ibb.co/3Y8Nf6r/user2.jpg"
//     },
//     {
//       id: 3,
//       name: "Tanvir Ahmed",
//       role: "Gamer",
//       review: "The gaming review contests were great. Got paid on time and received excellent support from the team.",
//       image: "https://i.ibb.co/MgsL6zW/user3.jpg"
//     }
//   ];

//   return (
//     <section className="py-20 bg-gray-50 dark:bg-gray-800/40">
//       <div className="w-11/12 mx-auto">
//         <h2 className="text-4xl font-black text-center mb-12 dark:text-white">What Our Winners Say</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {reviews.map((rev) => (
//             <div key={rev.id} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
//               <div className="flex items-center gap-4 mb-6">
//                 <img src={rev.image} alt={rev.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
//                 <div>
//                   <h3 className="font-bold text-lg dark:text-white">{rev.name}</h3>
//                   <p className="text-blue-600 text-sm">{rev.role}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 dark:text-gray-400 italic">"{rev.review}"</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials


import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  // Backend theke winners data niye asa
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["home-testimonials"],
    queryFn: async () => {
      // Apnar API endpoint jeta winners return kore
      const res = await axiosPublic.get("/contest/winners");
      return res.data;
    },
  });

  // Default reviews jodi backend-e review text na thake
  const defaultReviewText = "Participating in these contests has been a game-changer for my professional growth. Highly recommended!";

  if (isLoading) {
    return (
      <div className="py-20 w-11/12 mx-auto grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="skeleton h-64 w-full rounded-3xl"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-heading text-gray-900 dark:text-white">
            What Our <span className="text-blue-600">Champions</span> Say
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Real stories from real winners of our platform.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((rev, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-blue-100 dark:text-gray-800 text-6xl group-hover:text-blue-500/20 transition-colors">
                <FaQuoteLeft />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <img 
                      src={rev.photo || "https://i.ibb.co/5GzXkwV/user1.jpg"} 
                      alt={rev.name} 
                      className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-50 dark:ring-gray-800"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      WINNER
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-gray-900 dark:text-white leading-tight">
                      {rev.name}
                    </h3>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">
                      {rev.contest?.slice(0, 20)}...
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed relative z-10">
                  "{rev.review || defaultReviewText}"
                </p>

                {/* Star Rating (Static example) */}
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;