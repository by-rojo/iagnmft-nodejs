import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { DEFAULT_BLOGS_PARAMS } from '../../../../../constants'

const useBlogs = (
  initialParams: WPParams
): UseQueryResult<WPMutatedBlogPayload, Error> & {
  setParams: (params: WPParams) => void
  params: WPParams
} => {
  const routes = useRouter()
  const [params, setParams] = useState({
    ...(DEFAULT_BLOGS_PARAMS as WPParams),
    ...initialParams,
  })
  const query = useQuery<WPMutatedBlogPayload, Error>('blogs', () =>
    axios
      .get('/api/blogs', {
        params: {
          ...params,
          page:
            parseInt(routes.query.page as string, 10) ||
            initialParams.page ||
            undefined,
        },
      })
      .then((res) => res.data)
  )
  return { ...query, setParams, params }
}

export default useBlogs
