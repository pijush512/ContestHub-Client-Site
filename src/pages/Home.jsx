import React, { useState } from 'react'
import Banner from '../Components/Banner/Banner'
import PopularContests from '../Components/PopularContests/PopularContests'
import WinnersSection from '../Components/WinnersSection/WinnersSection'

const Home = () => {
const [search, setSearch] = useState("");

  return (
    <div>
      <Banner onSearch={setSearch} ></Banner>
      <PopularContests search={search}></PopularContests>
      <WinnersSection></WinnersSection>
    </div>
  )
}

export default Home
