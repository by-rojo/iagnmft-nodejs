import type { NextPage } from 'next'
import wpMenues from '../../api-factory/wp/menus'
import { getSlimPayloadOfBlogs } from '../../api-factory/wp/blogs'
import Footer from '../../components/footer'
import { dehydrate, QueryClient } from 'react-query'
import NavBar from '../../components/nav-bar'
import {
  DEFAULT_BLOGS_PARAMS,
  DEFAULT_TOP_PRODUCTS_PARAMS,
} from '../../constants'
import { StaticPageContext } from '../../context/static-page-context'
import AppHead from '../../components/app-head'
import BlogsPage from '../../components/blogs-page'
import { removeUndefinedDataFromPageProps } from '../../utils'
import wpProducts from '../../api-factory/wp/products'

const BlogPage: NextPage<BlogsPageStaticData> = ({ menu }) => {
  return (
    <StaticPageContext data={{ menu }}>
      <>
        <AppHead
          title={`Blog – ${process.env.NEXT_PUBLIC_SITE_NAME}`}
          description={process.env.NEXT_PUBLIC_BLOG_PAGE_DESCRIPTION}
        />
        <NavBar />
        <BlogsPage />
        <Footer />
      </>
    </StaticPageContext>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps({
  query,
}: {
  query: { page: string }
}) {
  const queryClient = new QueryClient()
  const menu = await wpMenues()
  const page = parseInt(query.page, 10) || 1

  await queryClient.prefetchQuery('blogs', () =>
    getSlimPayloadOfBlogs({ ...DEFAULT_BLOGS_PARAMS, page }).then(
      removeUndefinedDataFromPageProps
    )
  )

  await queryClient.prefetchQuery('products', () =>
    wpProducts(DEFAULT_TOP_PRODUCTS_PARAMS)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
    },
  }
}

export default BlogPage
