import axios from 'axios'

export const getProductsPublicAPI = async (
  params: WPParams
): Promise<Product[]> => {
  const { data } = await axios.get('/api/products', {
    params,
  })
  return data
}
