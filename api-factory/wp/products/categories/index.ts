import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env
import { cleanHtmlString } from './../../../../utils'
const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

wp.categories = wp.registerRoute('wc/v3/products', '/categories', {
  params: ['orderby', 'page', 'per_page'],
})

const getProductsCategories = ({
  orderBy = 'id',
  page = 1,
  perPage = 10,
}: WPParams): Promise<ProductCategory[]> => {
  return wp
    .categories()
    .per_page(perPage)
    .page(page)
    .orderby(orderBy)
    .order('desc')
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
