import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/contest") // fetch all contests
      .then((res) => res.json())
      .then((data) => {
        // filter only approved contests
        const approved = data.filter(c => c.status === "approved");
        setContests(approved);
        setFilteredContests(approved);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // get unique contest types
  const types = ["All", ...new Set(contests.map(c => c.type))];

  const handleTabClick = (type) => {
    setActiveType(type);
    if (type === "All") {
      setFilteredContests(contests);
    } else {
      setFilteredContests(contests.filter(c => c.type === type));
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (contests.length === 0) return <p className="text-center mt-10">No contests found</p>;

  return (
    <div className="w-11/12 mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">All Contests</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        {types.map(type => (
          <button
            key={type}
            onClick={() => handleTabClick(type)}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeType === type ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Contest Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredContests.map((c) => (
          <div key={c._id} className="card bg-base-100 shadow-md hover:shadow-xl">
            <figure>
              <img
                src={c.image || "https://via.placeholder.com/400x200"}
                alt={c.title}
                className="h-52 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{c.title || "Untitled Contest"}</h3>
              <p className="text-sm text-gray-500">
                {c.description?.slice(0, 100) || "No description"}...
              </p>

              <p className="font-semibold mt-2">
                Participants: {c.participants}
              </p>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/contest/${c._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContests;
