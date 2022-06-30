import { DEFAULT_BLOGS_PARAMS } from './../../../constants/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSlimPayloadOfBlogs } from '../../../api-factory/wp/blogs'

const nextAPIBlogs = (
  req: NextApiRequest,
  res: NextApiResponse<WPMutatedBlogPayload | null>
) => {
  const params: WPParams = {
    page: parseInt(`${req.query.page || 1}`, 10),
    perPage: parseInt(
      `${req.query.perPage || DEFAULT_BLOGS_PARAMS.perPage}`,
      10
    ),

    orderBy: `${req.query.orderBy || DEFAULT_BLOGS_PARAMS.orderBy}`,
    order: `${req.query.order || DEFAULT_BLOGS_PARAMS.order}`,
  }

  if (req.query.slug) {
    params.slug = `${req.query.slug}`
  }
  if (req.query.category) {
    params.category = parseInt(`${req.query.category || 0}`, 10)
  }
  return getSlimPayloadOfBlogs(params)
    .then((blogs: WPMutatedBlogPayload) => {
      return res.status(200).json(blogs)
    })
    .catch((e: Error) => {
      console.error(e)
      return res.status(400).json(null)
    })
}

export default nextAPIBlogs
