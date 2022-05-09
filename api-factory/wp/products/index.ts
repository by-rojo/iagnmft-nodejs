import wpapi from 'wpapi'
import {
  cleanHtmlString,
  permalinkToRelativePath,
} from './../../../utils/index'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

wp.products = wp.registerRoute('wc/v3', '/products/(?P<id>\\d+)', {
  params: [
    'sku',
    'id',
    'orderby',
    'page',
    'per_page',
    'category',
    'slug',
    'max_price',
    'min_price',
  ],
})

const getProducts = ({
  orderBy = 'date',
  page = 1,
  perPage = 10,
  category,
  maxPrice,
  minPrice,
  order = 'desc',
}: WPParams): Promise<Product[]> => {
  return wp
    .products()
    .category(category)
    .max_price(maxPrice)
    .min_price(minPrice)
    .per_page(perPage)
    .page(page)
    .orderby(orderBy)
    .order(order)
    .then((data: Product[]) => {
      return data.map((product) => {
        return {
          ...product,
          short_description: cleanHtmlString(product.short_description),
          name: cleanHtmlString(product.name),
          permalink: permalinkToRelativePath(product.permalink),
        }
      })
    })
    .catch((e: Error) => {
      console.error(e)
      return []
    })
}

export default getProducts
