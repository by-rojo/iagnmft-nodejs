import React from 'react'
import Breadcrumbs from '../breadcrumbs'
import Breadcrumb from '../breadcrumbs/breadcrumb'
import Feed from './components/feed'
import Sidebar from './components/sidebar'

const BlogsPage = () => {
  return (
    <div className="container mt-4 mb-5">
      <Breadcrumbs>
        <Breadcrumb text="Home" href="/" />
        <Breadcrumb text="Blog" active href="/blog" />
      </Breadcrumbs>
      <h1 className="mb-5 fw-bold mt-3">
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
