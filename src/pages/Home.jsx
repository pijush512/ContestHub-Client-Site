import React from 'react'
import Banner from '../Components/Banner/Banner'
import PopularContests from '../Components/PopularContests/PopularContests'
import WinnersSection from '../Components/WinnersSection/WinnersSection'
import ExtraSection from '../Components/ExtraSection/ExtraSection'

const Home = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <WinnersSection></WinnersSection>
      <ExtraSection></ExtraSection>
    </div>
  )
}

export default Home
