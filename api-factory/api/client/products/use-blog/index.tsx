import { useRouter } from 'next/router'
import useBlogs from '../use-blogs'

const useBlog = (): WPBlog | undefined => {
  const router = useRouter()
  const { data: blogs } = useBlogs({
    slug: `${router.query.slug}`,
  })
  return blogs?.data[0]
}

export default useBlog
