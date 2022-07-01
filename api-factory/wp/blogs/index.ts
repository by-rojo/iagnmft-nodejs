import { getSlimMediaDetails } from './../media/index'
import wpapi from 'wpapi'
import { DEFAULT_BLOGS_PARAMS } from '../../../constants'
import getMediaByIds from '../media'
const { WP_USER, WP_PASS, WP_URL } = process.env

const wp = new wpapi({
  endpoint: WP_URL || '',
  username: WP_USER,
  password: WP_PASS,
})

export const getBlogs = (params: WPParams): Promise<WPBlogs> => {
  return wp
    .posts()
    .category(params.category || '')
    .slug(params.slug || '')
    .page(params.page || DEFAULT_BLOGS_PARAMS.page)
    .perPage(params.perPage || DEFAULT_BLOGS_PARAMS.perPage)
    .orderby(params.orderBy || DEFAULT_BLOGS_PARAMS.orderBy)
    .order((params.order || DEFAULT_BLOGS_PARAMS.order) as 'asc' | 'desc')
    .then((data: WPBlogs) => {
      const featuredImages = data.map((item) => item.featured_media)

      const uniqueIds = featuredImages.filter(
        (item, i, ar) => item && ar.indexOf(item) === i
      ) as number[]

      return getMediaByIds(uniqueIds).then((media) => {
        //todo add images to data payload
        data.forEach((record) => {
          record.media = media.filter(({ id }) => {
            return id === record.featured_media
          })
        })
        return data
      })
    })
    .catch((e: Error) => {
      console.error(e.message)
      return []
    })
}

export const getSlimPayloadOfBlogs = (
  params: WPParams
): Promise<WPMutatedBlogPayload> => {
  return getBlogs(params).then((blogs) => {
    const retVal = blogs.map(
      ({
        id,
        title,
        author,
        categories,
        content,
        media,
        tags,
        comment_status,
        modified,
        excerpt,
        slug,
        type,
        meta,
      }) => {
        return {
          id,
          title,
          author,
          categories,
          content,
          media: media?.map(
            ({
              slug,
              media_type,
              status,
              tags,
              type,
              alt_text,
              caption,
              meta,
              title,
              id,
              media_details,
            }) => ({
              id,
              slug,
              media_type,
              status,
              tags,
              type,
              alt_text,
              caption,
              meta,
              title,
              media_details: getSlimMediaDetails(media_details),
            })
          ),
          tags,
          comment_status,
          meta,
          modified,
          excerpt,
          slug,
          type,
        }
      }
    )
    return {
      data: retVal,
      paging: {
        total: blogs._paging.total,
        totalPages: blogs._paging.totalPages,
      },
    }
  })
}

export default getBlogs
