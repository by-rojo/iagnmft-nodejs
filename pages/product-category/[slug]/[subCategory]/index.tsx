import type { NextPage } from 'next'
import wpMenues from '../../../../api-factory/wp/menus'
import wpProducts from '../../../../api-factory/wp/products'
import wpProductsCategories from '../../../../api-factory/wp/products/categories'
import Footer from '../../../../components/footer'
import Page from '../../../../components/category-page'
import NavBar from '../../../../components/nav-bar'
import {
  DEFAULT_PRODUCT_CATEGORY_PARAMS,
  DEFAULT_RECENT_PRODUCTS_PARAMS,
} from '../../../../constants'
import { StaticPageContext } from '../../../../context/static-page-context'
import AppHead from '../../../../components/app-head'

const ProductSubCategoryPage: NextPage<CategoryPageStaticData> = ({
  menu,
  products,
  category,
  childCategories,
}) => {
  return (
    <StaticPageContext data={{ menu, products, category, childCategories }}>
      <>
        <AppHead
          title={`${category.name} Products`}
          description={category.description}
        />
        <NavBar />
        <Page />
        <Footer />
      </>
    </StaticPageContext>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  const productCategories = await wpProductsCategories({
    ...DEFAULT_PRODUCT_CATEGORY_PARAMS,
    perPage: 8,
  })

  const paths = productCategories.map((item) => ({
    params: { slug: item.slug, subCategory: item.slug },
  }))

  // We'll pre-render only these paths at build time.
  return { paths, fallback: 'blocking' }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({
  params,
}: {
  params: { slug: string; subCategory: string }
}) {
  const menu = await wpMenues()
  const [category] = await wpProductsCategories({
    ...DEFAULT_PRODUCT_CATEGORY_PARAMS,
    perPage: 1,
    slug: params.subCategory,
  })

  const childCategories = await wpProductsCategories({
    ...DEFAULT_PRODUCT_CATEGORY_PARAMS,
    perPage: 50,
    parent: category.id,
  })

  const products = await wpProducts({
    ...DEFAULT_RECENT_PRODUCTS_PARAMS,
    category: category.id,
  })

  return {
    props: {
      menu: menu.message ? { data: [], message: menu.message } : { data: menu },
      products,
      category,
      childCategories: childCategories.map((childCategory) => ({
        id: childCategory.id,
        slug: childCategory.slug,
        name: childCategory.name,
      })),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: parseInt(`${process.env.HOME_PAGE_CACHE_SECONDS ?? 60}`, 10),
  }
}

export default ProductSubCategoryPage
