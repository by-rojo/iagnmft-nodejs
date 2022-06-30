import axios from 'axios'
import { useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'

const useProducts = (
  initialParams: WPParams
): UseQueryResult<Product[], Error> & {
  setParams: (params: WPParams) => void
  params: WPParams
} => {
  const [params, setParams] = useState(initialParams)
  const query = useQuery<Product[], Error>('products', () =>
    axios
      .get('/api/products', {
        params,
      })
      .then((res) => res.data)
  )
  return { ...query, setParams, params }
}

export default useProducts
