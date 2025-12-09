import React, { useState, useEffect } from "react";
import Banner from "../Components/Banner/Banner";
import PopularContests from "../Components/PopularContests/PopularContests";
import WinnersSection from "../Components/WinnersSection/WinnersSection";
import ExtraSection from "../Components/ExtraSection/ExtraSection";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Contest list state
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load popular contests first time
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axiosSecure.get("/contest/popular");
        setContests(res.data);
      } catch (err) {
        console.log("Error loading popular contests:", err);
        setContests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopular();
  }, []);

  // Search function (simple)
  const handleSearch = (query) => {
    setIsLoading(true);

    axiosSecure
      .get(`/contest/search/${query}`)
      .then((res) => {
        setContests(res.data);
      })
      .catch((err) => {
        console.log("Search error:", err);
        setContests([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading contests...</div>;
  }

  return (
    <div className="w-11/12 mx-auto">
      {/* Send search handler to Banner */}
      <Banner onSearch={handleSearch} />

      <PopularContests contests={contests} user={user} />
      <WinnersSection />
      <ExtraSection />
    </div>
  );
};

export default Home;
