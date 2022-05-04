import React from 'react'
import Footer from '../footer'
import Hero from '../hero'
import RecentlyAddedSection from './components/recently-added-section'
import TopProductsSection from './components/top-products-section'

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <TopProductsSection />
      <RecentlyAddedSection />
      <Footer />
    </>
  )
}

export default HomePage
