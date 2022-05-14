import useBlogs from '../../../../api-factory/api/client/products/use-blogs'
import { DEFAULT_BLOGS_PARAMS, DEFAULT_BLUR_URL } from '../../../../constants'
import Image from 'next/image'
import Html from '../../../html'
import Link from 'next/link'
import Paginate from '../../../paginate'

const Feed: React.FC = () => {
  const { data } = useBlogs(DEFAULT_BLOGS_PARAMS)

  return (
    <div>
      {data?.map((item) => {
        const media = item.media?.[0]
        const src =
          media?.media_details?.sizes?.full?.source_url || DEFAULT_BLUR_URL
        const alt = media?.alt_text || 'Featured Blog Image'

        return (
          <div key={item.id}>
            <Link href={`/blog/${item?.slug}`} passHref>
              <a>
                <Image
                  alt={alt}
                  placeholder="blur"
                  width={500}
                  height={500}
                  objectPosition="center"
                  objectFit="cover"
                  quality={100}
                  blurDataURL={DEFAULT_BLUR_URL}
                  src={src}
                />
                <h2>
                  <Html content={item.title?.rendered} />
                </h2>
                <div>
                  <Html content={item.excerpt?.rendered} />
                </div>
              </a>
            </Link>
          </div>
        )
      })}
      <Paginate pageCount={20} onPageChange={() => {}} />
    </div>
  )
}

export default Feed
