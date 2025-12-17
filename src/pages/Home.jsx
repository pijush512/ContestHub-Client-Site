import React from 'react'
import Banner from '../Components/Banner/Banner'
import PopularContests from '../Components/PopularContests/PopularContests'
import WinnersSection from '../Components/WinnersSection/WinnersSection'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <WinnersSection></WinnersSection>
    </div>
  )
}

export default Home
