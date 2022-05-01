// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

type Data = {
  message?: string
  data?: Record<string, unknown>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Promises
  return wp
    .posts()
    .then(function (data) {
      // do something with the returned posts
      res.status(200).json({ data: data })
    })
    .catch(function (err) {
      // handle error
      res.status(400).json({ message: err.message })
    })
}
