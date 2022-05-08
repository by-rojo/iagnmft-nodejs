import React from 'react'
import Hero from '../hero'
import RecentlyAddedSection from './components/recently-added-section'
import FancyCategoryGrid from './components/fancy-category-grid'

const HomePage: React.FC = () => {
  return (
    <>
      <Hero>
        <FancyCategoryGrid />
      </Hero>
      <RecentlyAddedSection />
    </>
  )
}

export default HomePage
