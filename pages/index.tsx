import type { NextPage } from 'next'
import wpMenues from '../api-factory/wp/menus'
import HomePage from '../components/home-page'
import { StaticPageContext } from '../context/static-page-context'

const Home: NextPage<HomePageStaticData> = ({ menu }) => {
  return (
    <StaticPageContext data={{ menu }}>
      <HomePage />
    </StaticPageContext>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const menu = await wpMenues()

  return {
    props: {
      menu: menu.message ? [] : menu,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: process.env.HOME_PAGE_CACHE_SECONDS,
  }
}

export default Home
