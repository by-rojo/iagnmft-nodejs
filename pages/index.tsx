import type { NextPage } from 'next'
import Head from 'next/head'
import wpMenues from '../api-factory/wp/menus'
import wpProducts from '../api-factory/wp/products'
import wpProductsCategories from '../api-factory/wp/products/categories'
import AppHead from '../components/app-head'
import Footer from '../components/footer'
import HomePage from '../components/home-page'
import NavBar from '../components/nav-bar'
import {
  DEFAULT_PRODUCT_CATEGORY_PARAMS,
  DEFAULT_RECENT_PRODUCTS_PARAMS,
} from '../constants'
import { StaticPageContext } from '../context/static-page-context'

const Home: NextPage<HomePageStaticData> = ({
  menu,
  recentlyAddedProducts,
  productCategories,
}) => {
  return (
    <StaticPageContext
      data={{ menu, recentlyAddedProducts, productCategories }}
    >
      <>
        <AppHead
          title={process.env.NEXT_PUBLIC_SITE_NAME}
          description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        />
        <NavBar />
        <HomePage />
        <Footer />
      </>
    </StaticPageContext>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const menu = await wpMenues()
  const recentlyAddedProducts = await wpProducts(DEFAULT_RECENT_PRODUCTS_PARAMS)
  const productCategories = await wpProductsCategories(
    DEFAULT_PRODUCT_CATEGORY_PARAMS
  )
  return {
    props: {
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
      recentlyAddedProducts,
      productCategories,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: parseInt(`${process.env.HOME_PAGE_CACHE_SECONDS ?? 60}`, 10),
  }
}

export default Home
