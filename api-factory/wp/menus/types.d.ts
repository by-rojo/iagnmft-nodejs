interface MenuItem {
  ID: number
  post_author: string
  post_date: string
  post_date_gmt: string
  post_content: string
  post_title: string
  post_excerpt: string
  post_status: 'publish' | string
  comment_status: 'closed' | string
  ping_status: 'closed' | string
  post_password: string
  post_name: string
  to_ping: string
  pinged: string
  post_modified: string
  post_modified_gmt: string
  post_content_filtered: string
  post_parent: number
  guid: string
  menu_order: number
  post_type: string
  post_mime_type: string
  comment_count: string
  filter: 'raw' | string
  db_id: number
  menu_item_parent: string
  object_id: string
  object: 'custom' | 'page' | string
  type: 'custom' | 'post_type' | string
  type_label: 'Custom Link' | 'Post Page' | string
  title: string
  url: string
  target: string
  attr_title: string
  description: string
  classes: string[]
  xfn: string
  child_items: MenuItem[]
}
type MenuData = {
  message?: string
  data?: MenuItem[]
}

interface MenusItem {
  term_id: number
  name: string
  slug: string
  term_group: number
  term_taxonomy_id: number
  taxonomy: string
  description: string
  parent: number
  count: number
  filter: 'raw' | string
  items?: MenuItem[]
}
