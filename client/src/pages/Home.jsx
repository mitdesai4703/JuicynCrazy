import React from 'react'
import Navbar from '../components/Navbar'
import HeaderSection from '../components/HeaderSection'
import ProductBenefits from '../components/ProductBenefits'
import ScrollingBar from '../components/ScrollingBar'
import FeatureBanner from '../components/FeatureBanner'
import IcePopSection from '../components/IcePopSection'
import IcePopBenefits from '../components/IcePopBenefits '
import ReviewsSection from '../components/ReviewsSection'
import ProductHighlight from '../components/ProductHighlight'
import PeelOff from '../components/PeelOff'
import SubcriptionSection from '../components/SubcriptionSection'
import Banner from '../components/Banner'





const Home = () => {
  return (
    <div>
      <HeaderSection />
      <ProductBenefits />
      <ScrollingBar />
      <FeatureBanner />
      <IcePopSection />
      <IcePopBenefits />
      <ReviewsSection />
      <ProductHighlight />
      <PeelOff />
      <SubcriptionSection/>
      {/* <Banner/> */}
      
      
     
    </div>
  )
}

export default Home
