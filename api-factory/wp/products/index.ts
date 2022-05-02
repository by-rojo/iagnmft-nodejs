import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

wp.products = wp.registerRoute('wc/v3', '/products/(?P<id>\\d+)', {
  params: ['sku', 'id', 'orderby', 'page', 'per_page'],
})

const getProducts = ({
  orderBy = 'date',
  page = 1,
  perPage = 10,
}: {
  perPage?: number
  page?: number
  orderBy?:
    | string
    | 'date'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating'
}): Promise<Product[]> => {
  return wp
    .products()
    .per_page(perPage)
    .page(page)
    .orderby(orderBy)
    .then((data: any) => {
      return data
    })
    .catch((e: Error) => {
      console.error(e)
      return []
    })
}

export default getProducts
