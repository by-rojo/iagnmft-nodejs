interface CategoryPageStaticData {
  menu: MenuData
  products: Product[]
  category: ProductCategory
  childCategories: ProductCategory[]
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
  hasMore?: boolean = true
  filters?: {
    orderBy?: string
    category?: number
    maxPrice?: number
    minPrice?: number
  }
}
