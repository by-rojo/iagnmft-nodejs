import React from 'react'
import useStaticHomePageData from './hooks'

const HomePage: React.FC = () => {
  const stuff = useStaticHomePageData()

  return <div className="test">{JSON.stringify(stuff)}</div>
}

export default HomePage
