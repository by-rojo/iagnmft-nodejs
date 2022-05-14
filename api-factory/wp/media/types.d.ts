interface WPMedia {
  id: number
  date?: string
  date_gmt?: string
  guid?: {
    rendered: string
  }
  modified?: string
  modified_gmt?: string
  slug?: string
  status?: 'inherit' | string
  type?: 'attachement' | string
  link?: string
  title?: {
    rendered: string
  }
  author?: number
  comment_status?: 'open' | 'closed' | string
  ping_status?: 'closed' | 'open' | string
  template?: string
  meta?: unknown[]
  tags?: string[]
  description?: {
    rendered: string
  }
  caption?: { rendered: string }
  alt_text?: string
  media_type?: string
  mime_type?: string
  media_details?: WPMediaDetails
  post?: number
  source_url?: string
  _link?: {
    self?: WPLinkObject[]
    collection?: WPLinkObject[]
    about?: WPLinkObject[]
    replies?: WPLinkObject[]
    'wp:term'?: WPLinkObject[]
    curies?: WPLinkObject[]
  }
}

interface WPMediaSize {
  width: number
  height: number
  file?: string
  s3?: WPS3Object
  mime_type?: string
  source_url: string
  image_meta?: {
    aperture?: string
    credit?: string
    camera?: string
    caption?: string
    created_timestamp?: string
    copyright?: string
    focal_length?: string
    iso?: string
    shutter_speed?: string
    title?: string
    orientation?: string
    keywords?: string[]
  }
}

interface WPS3Object {
  url: string
  bucket: string
  privacy: string
  key: string
  provider: string
  v: string
  optimized: boolean
  options?: { params: { CacheControl: string } }
  formats?: unknown[]
  'mime-type': string
}

interface WPMediaDetails {
  width: number
  height: number
  file?: string
  s3?: WPMediaSize['s3']
  image_meta?: WPMediaSize['image_meta']
  sizes?: {
    medium?: WPMediaSize
    large?: WPMediaSize
    thumbnail?: WPMediaSize
    medium_large?: WPMediaSize
    'post-thumbnail'?: WPMediaSize
    woocommerce_thumbnail?: WPMediaSize & { uncropped: boolean }
    shop_catalog?: WPMediaSize
    full?: WPMediaSize
  }
}
