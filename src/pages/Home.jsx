import React from 'react'
import Banner from '../Components/Banner/Banner'
import PopularContests from '../Components/PopularContests/PopularContests'
import WinnersSection from '../Components/WinnersSection/WinnersSection'
import ExtraSection from '../Components/ExtraSection/ExtraSection'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'

const Home = () => {

   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

const { data: contests = [], isLoading } = useQuery({
  queryKey: ["popularContests"],
  queryFn: async () => {
    try {
      const res = await axiosSecure.get("/contest/popular");
      return res.data;
    } catch (err) {
      console.error("Error fetching popular contests:", err);
      return [];
    }
  },
});


  if (isLoading) {
    return <div className="text-center py-20">Loading popular contests...</div>;
  }

  return (
    <div className='w-11/12 mx-auto'>
      <Banner></Banner>
      <PopularContests contests={contests} user={user}></PopularContests>
      <WinnersSection></WinnersSection>
      <ExtraSection></ExtraSection>
    </div>
  )
}

export default Home
