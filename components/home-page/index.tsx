import React from 'react'
import useStaticHomePageData from './hooks'

const HomePage: React.FC = () => {
  const { menu } = useStaticHomePageData()

  return <div className="test"></div>
}

export default HomePage
