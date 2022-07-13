import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: `${WP_URL || ''}/wp-json`,
  username: WP_USER,
  password: WP_PASS,
})

wp.menu = wp.registerRoute('menus/v1', '/menus/(?P<slug>)')

const getMainMenu = (): Promise<MenuData & Error> => {
  return wp
    .menu()
    .then((data: MenusItem[]) => {
      return wp
        .menu()
        .setPathPart(1, data?.[0]?.slug)
        .then((data: MenusItem) => {
          return data.items
        })
        .catch((e: Error) => {
          return e
        })
    })
    .catch((e: Error) => {
      console.error(e)
      return e
    })
}

export default getMainMenu
