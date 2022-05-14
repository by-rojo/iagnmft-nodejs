import type { NextPage } from 'next'
import wpMenues from '../../api-factory/wp/menus'
import { getSlimPayloadOfBlogs } from '../../api-factory/wp/blogs'
import wpProducts from '../../api-factory/wp/products'
import wpProductsCategories from '../../api-factory/wp/products/categories'
import Footer from '../../components/footer'
import { dehydrate, QueryClient } from 'react-query'
import NavBar from '../../components/nav-bar'
import { DEFAULT_BLOGS_PARAMS } from '../../constants'
import { StaticPageContext } from '../../context/static-page-context'
import AppHead from '../../components/app-head'
import BlogsPage from '../../components/blogs-page'
import { removeUndefinedDataFromPageProps } from '../../utils'

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
export async function getStaticProps() {
  const queryClient = new QueryClient()
  const menu = await wpMenues()

  await queryClient.prefetchQuery('blogs', () =>
    getSlimPayloadOfBlogs(DEFAULT_BLOGS_PARAMS).then(
      removeUndefinedDataFromPageProps
    )
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: parseInt(`${process.env.HOME_PAGE_CACHE_SECONDS ?? 60}`, 10),
  }
}

export default BlogPage
