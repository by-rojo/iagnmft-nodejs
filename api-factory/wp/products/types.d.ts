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
  categories: unknown
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
/*
 id: 10503,
    name: "Amp Up Marine &amp; RV Cords 125v 30 amp x 12' Marine Shore Power Boat Extension Cord, 12 ft - 21311",
    slug: 'amp-up-marine-rv-cords-125v-30-amp-x-12-marine-shore-power-boat-extension-cord-12-ft-21311',
    permalink: 'https://rvdevil.com/product/amp-up-marine-rv-cords-125v-30-amp-x-12-marine-shore-power-boat-extension-cord-12-ft-21311/',
    date_created: '2022-04-09T20:24:21',
    date_created_gmt: '2022-04-09T20:24:21',
    date_modified: '2022-04-09T20:24:21',
    date_modified_gmt: '2022-04-09T20:24:21',
    type: 'external',
    status: 'publish',
    featured: false,
    catalog_visibility: 'visible',
    description: '<p>STOW Cable</p>\n' +
      '<p>#10 Copper Wire</p>\n' +
      '<p>3-Wire</p>\n' +
      '<p>Molded Ends</p>\n',
    short_description: '<p>STOW Cable</p>\n' +
      '<p>#10 Copper Wire</p>\n' +
      '<p>3-Wire</p>\n' +
      '<p>Molded Ends</p>\n',
    sku: 'B07FKSP1GH',
    price: '49.99',
    regular_price: '57.99',
    sale_price: '49.99',
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    on_sale: true,
    purchasable: false,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: 'https://www.amazon.com/dp/B07FKSP1GH?tag=spellcstr03-20&linkCode=osi&th=1&psc=1',
    button_text: '',
    tax_status: 'taxable',
    tax_class: '',
    manage_stock: false,
    stock_quantity: null,
    backorders: 'no',
    backorders_allowed: false,
    backordered: false,
    low_stock_amount: null,
    sold_individually: false,
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: '',
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: '0.00',
    rating_count: 0,
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: '',
    categories: [ [Object] ],
    tags: [],
    images: [ [Object], [Object], [Object], [Object], [Object] ],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    price_html: '<del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#36;</span>57.99</bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#36;</span>49.99</bdi></span></ins>',
    related_ids: [ 3060, 3194, 1806, 3321, 3392 ],
    meta_data: [ [Object] ],
    stock_status: 'instock',
    has_options: false,
    _links: { self: [Array], collection: [Array] }
  },
*/
