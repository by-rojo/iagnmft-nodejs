import type { NextPage } from 'next'
import wpMenues from '../../../api-factory/wp/menus'
import wpProducts from '../../../api-factory/wp/products'
import Footer from '../../../components/footer'
import NavBar from '../../../components/nav-bar'
import { DEFAULT_RECENT_PRODUCTS_PARAMS } from '../../../constants'
import { StaticPageContext } from '../../../context/static-page-context'
import AppHead from '../../../components/app-head'
import Page from '../../../components/product-page'

const ProductPage: NextPage<ProductPageStaticData> = ({ menu, product }) => {
  return (
    <StaticPageContext data={{ menu, product }}>
      <>
        <AppHead title={`${product.name}`} description={product.description} />
        <NavBar />
        <Page />
        <Footer />
      </>
    </StaticPageContext>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  const products = await wpProducts({
    ...DEFAULT_RECENT_PRODUCTS_PARAMS,
    perPage: DEFAULT_RECENT_PRODUCTS_PARAMS.perPage * 3,
  })

  const paths = products.map((item) => ({
    params: { slug: item.slug },
  }))

  // We'll pre-render only these paths at build time.
  return { paths, fallback: 'blocking' }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const menu = await wpMenues()

  const products = await wpProducts({
    ...DEFAULT_RECENT_PRODUCTS_PARAMS,
    slug: params.slug,
  })

  return {
    props: {
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
      product: products?.[0] || {},
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: parseInt(`${process.env.HOME_PAGE_CACHE_SECONDS ?? 60}`, 10),
  }
}

export default ProductPage
