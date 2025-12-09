
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
                {c.description?.slice(0, 80)}...
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
