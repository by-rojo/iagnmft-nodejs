import type { NextApiRequest, NextApiResponse } from 'next'
import getProducts from '../../../api-factory/wp/products'

const nextAPIProducts = (
  req: NextApiRequest,
  res: NextApiResponse<Product[] | null>
) => {
  const params = {
    page: parseInt(`${req.query.page || 0}`, 10),
    perPage: parseInt(`${req.query.perPage || 0}`, 10),
    orderBy: `${req.query.orderBy || 'date'}`,
  }
  return getProducts(params)
    .then((products: Product[]) => {
      return res.status(200).json(products)
    })
    .catch((e: Error) => {
      console.error(e)
      return res.status(400).json(null)
    })
}

export default nextAPIProducts
