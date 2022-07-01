interface WPCategory {
  id: number
  count?: number
  description?: string
  link?: string
  name: string
  slug: string
  taxonomy?: string
  parent?: number
  meta?: unknown[]
}

//its array-like and not an array
type WPCategoryArray = WPCategory[]
interface WPCategories extends WPCategoryArray {
  _paging: WPPageData
}

interface WPMutatedCategoryPayload {
  data: WPCategory[]
  paging: WPPageData
}
