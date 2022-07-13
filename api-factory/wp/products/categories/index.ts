import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env
import { cleanHtmlString } from './../../../../utils'
const wp = new wpapi({
  endpoint: `${WP_URL || ''}/wp-json`,
  username: WP_USER,
  password: WP_PASS,
})

wp.categories = wp.registerRoute('wc/v3/products', '/categories', {
  params: ['orderby', 'page', 'per_page', 'slug', 'parent'],
})

const getProductsCategories = ({
  orderBy = 'id',
  page = 1,
  perPage = 10,
  slug = '',
  order = 'desc',
  parent,
}: WPParams): Promise<ProductCategory[]> => {
  return wp
    .categories()
    .slug(slug)
    .per_page(perPage)
    .page(page)
    .parent(parent)
    .orderby(orderBy)
    .order(order)
    .then((data: ProductCategory[]) => {
      return data.map((product) => {
        return { ...product, name: cleanHtmlString(product.name ?? '') }
      })
    })
    .catch((e: Error) => {
      console.error(e)
      return []
    })
}

export default getProductsCategories
