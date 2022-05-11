import type { NextApiRequest, NextApiResponse } from 'next'
import getProducts from '../../../api-factory/wp/products'

const getArrayParam = (param?: string[] | string): string[] | undefined => {
  if (param) {
    if (typeof param === 'string') return [param]
    else return [...param]
  }
}

const nextAPIProducts = (
  req: NextApiRequest,
  res: NextApiResponse<Product[] | null>
) => {
  const params: WPParams = {
    page: parseInt(`${req.query.page || 1}`, 10),
    perPage: parseInt(`${req.query.perPage || 0}`, 10),
    orderBy: `${req.query.orderBy || 'date'}`,
    order: `${req.query.order || 'desc'}`,
    exclude: getArrayParam(req.query['exclude[]'])?.map(parseFloat),
    include: getArrayParam(req.query['include[]'])?.map(parseFloat),
  }

  if (req.query.maxPrice) {
    params.maxPrice = parseFloat(`${req.query.maxPrice}`)
  }
  if (req.query.minPrice) {
    params.minPrice = parseFloat(`${req.query.minPrice}`)
  }
  if (req.query.category) {
    params.category = parseInt(`${req.query.category || 0}`, 10)
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
