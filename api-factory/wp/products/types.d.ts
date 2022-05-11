interface Product {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modofied: string
  date_modified_gtm: string
  type: string | 'external'
  status: string | 'publish'
  featured: boolean //todo make featuredsies
  catalog_visibility: string | 'visible'
  description: string | '<br/>'
  short_description: string | '<br/>'
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string
  date_on_sale_from_gmt: string
  date_on_sale_to: string
  date_on_sale_to_gmt: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: unknown[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string | 'taxable'
  tax_class: string
  manage_stock: boolean
  stock_quantity: number
  backorders: string | 'no'
  backorders_allowed: boolean
  backordered: boolean
  low_stock_amount: number
  sold_individually: boolean
  weight: string
  dimensions: { length: string; width: string; height: string }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: ProductCategory[]
  tags: unknown[]
  images: WPImage[]
  attributes: []
  default_attributes: unknown[]
  variations: unknown[]
  grouped_products: unknown[]
  menu_order: number
  price_html: string | '<br/>'
  related_ids: number[]
  meta_data: unknown
  stock_status: string | 'instock'
  has_options: boolean
}
