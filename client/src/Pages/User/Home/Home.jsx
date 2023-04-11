import React from 'react'
import Navbar from '../../../components/NavBar/NavBar'
import SliderBanner from '../../../components/Home/SliderBanner/SliderBanner'
import SecondSection from '../../../components/Home/SecondSection/SecondSection'
import ThirdSection from '../../../components/Home/ThirdSection/ThirdSection'

function Home() {

  return (
    <div>
     <Navbar/>
     <SliderBanner/>
     <SecondSection/>
     <ThirdSection/>
    </div>
  )
}

export default Home
