import React from 'react'
import useBlog from '../../api-factory/api/client/products/use-blog'
import { cleanHtmlString } from '../../utils'
import BlogContainer from './components/blog-container'
import Sidebar from './components/sidebar'

const BlogDetailsPage = () => {
  const blog = useBlog()
  return (
    <div className="container mt-3 mb-5">
      <h1 className="mb-5 fw-bold">
        {cleanHtmlString(blog?.title?.rendered || '')}
        <hr />
      </h1>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="col-12 col-md-8">
          <BlogContainer />
        </div>
        <div className="col-12 col-md-4">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default BlogDetailsPage
