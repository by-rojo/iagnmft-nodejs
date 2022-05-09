interface WPImage {
  alt: string
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  id: number
  name: string
  src: tring
}
interface WPParams {
  order?: 'desc' | 'asc' | string
  perPage?: number
  page?: number
  slug?: string
  category?: number
  maxPrice?: number
  minPrice?: number
  orderBy?:
    | string
    | 'date'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating'
}
