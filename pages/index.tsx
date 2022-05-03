import type { NextPage } from 'next'
import wpMenues from '../api-factory/wp/menus'
import wpProducts from '../api-factory/wp/products'
import HomePage from '../components/home-page'
import NavBar from '../components/nav-bar'
import {
  DEFAULT_RECENT_PRODUCTS_PARAMS,
  DEFAULT_TOP_PRODUCTS_PARAMS,
} from '../constants'
import { StaticPageContext } from '../context/static-page-context'

const Home: NextPage<HomePageStaticData> = ({
  menu,
  topProducts,
  recentlyAddedProducts,
}) => {
  return (
    <StaticPageContext data={{ menu, topProducts, recentlyAddedProducts }}>
      <>
        <NavBar />
        <HomePage />
      </>
    </StaticPageContext>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const menu = await wpMenues()
  const topProducts = await wpProducts(DEFAULT_TOP_PRODUCTS_PARAMS)
  const recentlyAddedProducts = await wpProducts(DEFAULT_RECENT_PRODUCTS_PARAMS)
  return {
    props: {
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
      topProducts,
      recentlyAddedProducts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: parseInt(`${process.env.HOME_PAGE_CACHE_SECONDS ?? 60}`, 10),
  }
}

export default Home
