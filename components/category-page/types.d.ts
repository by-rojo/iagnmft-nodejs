interface CategoryPageStaticData {
  menu: MenuData
  products: Product[]
  category: ProductCategory
}

interface ProductListContextProps {
  pageStart?: number = 1
}

interface ProductListContext {
  dispatch?: {
    loadProducts: (page: number, filters?: ProductFilterParams) => void
    onFilterChange: (filter: ProductFilterParams) => void
  }
  items?: Product[]
  pageStart?: number = 1
  filters?: {
    orderBy?: string
    maxPrice?: number
    minPrice?: number
  }
}
