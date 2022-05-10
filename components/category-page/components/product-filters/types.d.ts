interface ProductFilterParams {
  maxPrice?: number
  minPrice?: number
  orderBy?: string | 'price'
  order?: 'desc' | 'asc' | string
  category?: number
}

interface ProductFilterProps {}
