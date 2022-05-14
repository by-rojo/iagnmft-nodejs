import React from 'react'
import Feed from './components/feed'

const BlogsPage = () => {
  return (
    <div>
      <div className="container my-5 d-flex justify-content-between">
        <Feed />
        <div>
          <div>Sidebar goes here</div>
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
