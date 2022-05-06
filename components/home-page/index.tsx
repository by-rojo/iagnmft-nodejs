import React from 'react'
import Hero from '../hero'
import RecentlyAddedSection from './components/recently-added-section'
import CategoryGrid from './components/category-grid'

const HomePage: React.FC = () => {
  return (
    <>
      <Hero>
        <CategoryGrid />
      </Hero>
      <RecentlyAddedSection />
    </>
  )
}

export default HomePage
