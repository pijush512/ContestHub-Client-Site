import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const PopularContests = ({search}) => {

  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popularContests", search],
    queryFn: async () => {
      const endpoint = search ? `/contests?search=${search}` : "/contests/popular";
      const res = await axiosSecure.get(endpoint);
      // const res = await axiosSecure.get("/contests/popular");
      console.log(res.data)
      return res.data
    }
  })

  if (isLoading) {
    return (
      <div className="text-center py-12 text-blue-600 text-xl">
        Loading Popular Contests...
      </div>
    );
  }


  return (
    <div className="my-16 w-11/12 mx-auto px-4">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Popular Contests
        </h2>
        <p className="mt-2 text-gray-500">
          Participate in the most joined & trending contests!
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {contest.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {contest?.description?.slice(0, 80)}...
              </p>

              {/* Participants */}
              <p className="mt-3 text-blue-600 font-medium">
                Participants: {contest.participantsCount}
              </p>

              {/* Details Button */}
              <Link
                to={`/contest/${contest._id}`}
                className="mt-4 inline-block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-10">
        <Link
          to="/allContests"
          className="btn btn-primary rounded-lg"
        >
          Show All Contests
        </Link>
      </div>
    </div>
  )
}

export default PopularContests
