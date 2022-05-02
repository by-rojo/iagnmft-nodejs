import React from 'react'
import Hero from '../hero'
import useStaticHomePageData from './hooks'

const HomePage: React.FC = () => {
  const { menu } = useStaticHomePageData()

  return (
    <>
      <Hero />
    </>
  )
}

export default HomePage
