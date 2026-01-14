import React, { useState } from 'react'
import Banner from '../Components/Banner/Banner'
import PopularContests from '../Components/PopularContests/PopularContests'
import StatsSection from '../Components/StatsSection/StatsSection'
import WinnersSection from '../Components/WinnersSection/WinnersSection'
import HowItWorks from '../Components/HowItWorks/HowItWorks'
import TopThreeLeaderboard from '../Components/TopThreeLeaderboard/TopThreeLeaderboard'
import Testimonials from '../Components/Testimonials/Testimonials'
import FAQSection from '../Components/FAQSection/FAQSection'
import Newsletter from '../Components/Newsletter/Newsletter'
import FeaturedCategories from '../Components/FeaturedCategories/FeaturedCategories'

const Home = () => {
const [search, setSearch] = useState("");

  return (
    <div className='bg-gray-100'>
      <Banner onSearch={setSearch} ></Banner>
      <StatsSection></StatsSection>
      <FeaturedCategories></FeaturedCategories>
      <PopularContests search={search}></PopularContests>
      <HowItWorks></HowItWorks>
      <WinnersSection></WinnersSection>
      <TopThreeLeaderboard></TopThreeLeaderboard>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
      <Newsletter></Newsletter>
    
    </div>
  )
}

export default Home
