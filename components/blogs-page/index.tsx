import { useRouter } from 'next/router'
import React from 'react'
import useBlogs from '../../api-factory/api/client/products/use-blogs'
import { DEFAULT_BLOGS_PARAMS } from '../../constants'
import { useStaticPageContext } from '../../context/static-page-context'
import Breadcrumbs from '../breadcrumbs'
import Breadcrumb from '../breadcrumbs/breadcrumb'
import Feed from './components/feed'
import Sidebar from './components/sidebar'

const BlogsPage = () => {
  const router = useRouter()
  const categorySlug = `${router.query.category || ''}`
  const { category } = useStaticPageContext<BlogsPageStaticData>()

  return (
    <div className="container mt-4 mb-5">
      <Breadcrumbs>
        <Breadcrumb text="Home" href="/" />
        <Breadcrumb text="Blog" active={!categorySlug} href="/blog" />
        {category && (
          <Breadcrumb
            active
            text={category?.name || ''}
            href={`/category/${category?.slug}`}
          />
        )}
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
