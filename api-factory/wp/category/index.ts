import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

const getCategories = (params: WPParams): Promise<WPCategories> => {
  return wp
    .categories()
    .slug(params.slug || '')
    .then((data: WPCategories) => {
      return data
    })
    .catch((e: Error) => {
      console.error(e.message)
      return e
    })
}

export const getSlimPayloadOfCategories = (
  params: WPParams
): Promise<WPMutatedCategoryPayload> => {
  return getCategories(params).then((categories) => {
    const retVal = categories.map(({ id, name, slug, description }) => {
      return {
        id,
        name,
        slug,
        description,
      }
    })
    return {
      data: retVal,
      paging: {
        total: categories._paging.total,
        totalPages: categories._paging.totalPages,
      },
    }
  })
}

export default getCategories
