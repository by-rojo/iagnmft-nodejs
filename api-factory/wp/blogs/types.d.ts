interface WPLinkObject {
  href?: string
  embeddable?: boolean
  count?: number
  taxonomy?: string
  templated?: boolean
}

interface WPBlog {
  id: number
  date?: string
  date_gmt?: string
  modified?: string
  guid?: { rendered: string }
  modified_gmt?: string
  slug?: string
  status?: 'publish' | string
  type?: 'post' | string
  link?: string
  title?: {
    rendered: string
  }
  content?: {
    rendered: '<br/>' | string
    protected: boolean
  }
  excerpt?: {
    rendered: '<br/>' | string
    protected: boolean
  }
  author: number
  featured_media?: number
  comment_status?: 'open' | 'closed' | string
  ping_status?: 'open' | 'closed' | string
  sticky?: boolean
  template?: string
  meta: unknown[]
  categories: number[]
  tags: number[]
  _links?: {
    self?: WPLinkObject[]
    collection?: WPLinkObject[]
    about?: WPLinkObject[]
    author?: WPLinkObject[]
    replies?: WPLinkObject[]
    'version-history'?: WPLinkObject[]
    'wp:featuredmedia'?: WPLinkObject[]
    'wp:attachment'?: WPLinkObject[]
    'wp:term'?: WPLinkObject[]
    curies?: WPLinkObject[]
  }
  media?: WPMedia[]
}

//its array-like and not an array
type WPBlogArray = WPBlog[]
interface WPBlogs extends WPBlogArray {
  _paging: WPPageData
}

interface WPMutatedBlogPayload {
  data: WPBlog[]
  paging: WPPageData
}
