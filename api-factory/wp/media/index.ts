import wpapi from 'wpapi'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

export const getSlimMediaDetails = (
  details?: WPMediaDetails
): WPMediaDetails | undefined => {
  if (!details || !details.sizes || !details.sizes.full) return details

  const { file, sizes, s3, image_meta, ...deats } = details

  return {
    ...deats,
    image_meta: {
      keywords: image_meta?.keywords,
      title: image_meta?.title,
    },
    sizes: {
      full: sizes.full && {
        width: sizes.full.width,
        height: sizes.full.height,
        source_url: sizes.full.source_url,
      },
      thumbnail: sizes.thumbnail && {
        width: sizes.thumbnail.width,
        height: sizes.thumbnail.height,
        source_url: sizes.thumbnail.source_url,
      },
    },
  }
}

const getMediaByIds = (ids: number[]): Promise<WPMedia[]> => {
  return wp
    .media()
    .include(ids)
    .perPage(ids.length)
    .then((data) => {
      return data
    })
    .catch((e: Error) => {
      console.error(e.message)
      return []
    })
}

export default getMediaByIds
