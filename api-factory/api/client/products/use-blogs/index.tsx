import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

const useBlogs = (params: WPParams): UseQueryResult<WPBlog[], Error> => {
  const query = useQuery<WPBlog[], Error>('blogs', () =>
    axios.get('/api/blogs', { params }).then((res) => res.data)
  )
  return query
}

export default useBlogs
