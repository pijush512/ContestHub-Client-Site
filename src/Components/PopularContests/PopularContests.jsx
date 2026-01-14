import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const PopularContests = ({ search }) => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popularContests", search],
    queryFn: async () => {
      const endpoint = search ? `/contests?search=${search}` : "/contests/popular";
      const res = await axiosSecure.get(endpoint);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="my-16 w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex flex-col gap-4 w-full">
            <div className="skeleton h-48 w-full rounded-xl"></div>
            <div className="skeleton h-6 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-20 w-11/12 mx-auto px-4 font-body">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white font-heading">
          Popular <span className="text-blue-600">Contests</span>
        </h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Participate in the most joined & trending contests from around the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden h-52">
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                  Trending
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white font-heading mb-2 line-clamp-1">
                {contest.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                {contest?.description || "Experience the thrill of competition and showcase your unique skills to win prizes."}
              </p>

              {/* Meta Info (Requirement 3) */}
              <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Participants</span>
                  <span className="text-blue-600 font-bold">{contest.participantsCount} Joined</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Entry</span>
                  <span className="text-green-500 font-bold">Free</span>
                </div>
              </div>

              {/* Details Button */}
              <Link
                to={`/contest/${contest._id}`}
                className="mt-4 w-full bg-gray-900 dark:bg-blue-600 text-white font-heading text-sm font-bold text-center py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all active:scale-95"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/allContests"
          className="inline-flex items-center gap-2 font-heading bg-transparent border-2 border-gray-900 dark:border-blue-600 dark:text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-blue-600 transition-all"
        >
          Explore All Contests
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PopularContests;