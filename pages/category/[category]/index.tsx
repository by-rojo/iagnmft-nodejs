import type { NextPage } from 'next'
import wpMenues from '../../../api-factory/wp/menus'
import { getSlimPayloadOfBlogs } from '../../../api-factory/wp/blogs'
import Footer from '../../../components/footer'
import { dehydrate, QueryClient } from 'react-query'
import NavBar from '../../../components/nav-bar'
import {
  DEFAULT_BLOGS_PARAMS,
  DEFAULT_CATEGORY_PARAMS,
  DEFAULT_TOP_PRODUCTS_PARAMS,
} from '../../../constants'
import { StaticPageContext } from '../../../context/static-page-context'
import AppHead from '../../../components/app-head'
import BlogsPage from '../../../components/blogs-page'
import { removeUndefinedDataFromPageProps } from '../../../utils'
import wpProducts from '../../../api-factory/wp/products'
import { getSlimPayloadOfCategories } from '../../../api-factory/wp/category'

const CategoryPage: NextPage<BlogsPageStaticData> = ({ menu, category }) => {
  return (
    <StaticPageContext data={{ menu, category }}>
      <>
        <AppHead
          title={`Blogs – ${category?.name}`}
          description={
            `${category?.description}` ||
            `View all our blogs under the ${category?.name} category!`
          }
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
  params,
}: {
  query: { page: string }
  params: { category: string }
}) {
  const queryClient = new QueryClient()
  const menu = await wpMenues()
  const page = parseInt(query.page, 10) || 1
  // /https://developer.wordpress.org/rest-api/reference/categories/
  //todo category must be an int so we need to query to get the category information before we move on

  const category = await getSlimPayloadOfCategories({
    ...DEFAULT_CATEGORY_PARAMS,
    slug: params.category,
  }).then(removeUndefinedDataFromPageProps)

  // await wpCategories({ slug: params.category })

  await queryClient.prefetchQuery('blogs', () =>
    getSlimPayloadOfBlogs({
      ...DEFAULT_BLOGS_PARAMS,
      page,
      category: category.data[0].id,
    }).then(removeUndefinedDataFromPageProps)
  )

  await queryClient.prefetchQuery('products', () =>
    wpProducts(DEFAULT_TOP_PRODUCTS_PARAMS)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category: category.data?.[0] || {},
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
    },
  }
}

export default CategoryPage
