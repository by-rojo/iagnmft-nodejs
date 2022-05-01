import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

type PostData = {
  message?: string
  data?: Record<string, unknown>
}

const getPosts = (): Promise<PostData & Error> => {
  return wp
    .posts()
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((e: Error) => {
      console.error(e.message)
      return e
    })
}

export default getPosts
