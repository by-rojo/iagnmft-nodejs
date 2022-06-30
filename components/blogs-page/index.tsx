import React from 'react'
import Feed from './components/feed'
import Sidebar from './components/sidebar'

const BlogsPage = () => {
  return (
    <div className="container mt-3 mb-5">
      <h1 className="mb-5 fw-bold">
        Blog feed
        <hr />
      </h1>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="col-12 col-md-8">
          <Feed />
        </div>
        <div className="col-12 col-md-4">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
