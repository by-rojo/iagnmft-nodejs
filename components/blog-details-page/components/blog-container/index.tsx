import Image from 'next/image'
import useBlog from '../../../../api-factory/api/client/products/use-blog'
import { DEFAULT_BLUR_URL } from '../../../../constants'
import { cleanHtmlString } from '../../../../utils'
import AppHead from '../../../app-head'
import styles from './style.module.scss'

const BlogContainer: React.FC = () => {
  const blog = useBlog()
  const image = blog?.media?.[0]
  return (
    <div className={styles.blogContainer}>
      <AppHead
        title={cleanHtmlString(blog?.title?.rendered)}
        description={cleanHtmlString(blog?.excerpt?.rendered)}
      ></AppHead>

      {image && (
        <Image
          src={image.media_details?.sizes?.full?.source_url || ''}
          alt={image.alt_text}
          width={900}
          height={500}
          objectPosition="center"
          objectFit="scale-down"
          quality={100}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_URL}
          className="mb-3"
        />
      )}

      <article
        dangerouslySetInnerHTML={{ __html: blog?.content?.rendered || '' }}
      />
    </div>
  )
}

export default BlogContainer
