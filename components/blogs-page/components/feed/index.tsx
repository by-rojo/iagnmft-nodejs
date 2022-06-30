import useBlogs from '../../../../api-factory/api/client/products/use-blogs'
import { DEFAULT_BLOGS_PARAMS, DEFAULT_BLUR_URL } from '../../../../constants'
import classNames from 'classnames'
import Html from '../../../html'
import Link from 'next/link'
import Paginate from '../../../paginate'
import Card from '../../../card'
import CardImg from '../../../card/card-img'
import CardTitle from '../../../card/card-title'
import CardBody from '../../../card/card-body'
import CardText from '../../../card/card-text'
import style from './style.module.scss'
import { useRouter } from 'next/router'
const Feed: React.FC = () => {
  const { data: blogs } = useBlogs(DEFAULT_BLOGS_PARAMS)
  const router = useRouter()
  return (
    <div>
      {blogs?.data?.map((item, i) => {
        const media = item.media?.[0]
        const src =
          media?.media_details?.sizes?.full?.source_url || DEFAULT_BLUR_URL
        const alt = media?.alt_text || 'Featured Blog Image'

        return (
          <div
            key={item.id}
            className={classNames(style.feedCardContainer, 'mb-5')}
          >
            <Link href={`/blog/${item?.slug}`} passHref>
              <a className="text-decoration-none text-light">
                <Card className={style.feedCard}>
                  <CardImg
                    alt={alt}
                    placeholder="blur"
                    priority={i < 2}
                    layout="fill"
                    objectPosition="center"
                    objectFit="cover"
                    quality={100}
                    blurDataURL={DEFAULT_BLUR_URL}
                    src={src}
                  />
                  <CardBody className={style.cardBody}>
                    <CardTitle>
                      <Html content={item.title?.rendered} />
                    </CardTitle>
                    <CardText>
                      <Html content={item.excerpt?.rendered} />
                    </CardText>
                  </CardBody>
                </Card>
              </a>
            </Link>
          </div>
        )
      })}

      <Paginate
        hrefAllControls
        disableInitialCallback
        initialPage={(parseInt(router.query.page as string, 10) || 1) - 1}
        pageCount={blogs?.paging.totalPages || 10}
        onPageChange={(page) => {
          window.location = ('?page=' + (page.selected + 1)) as (
            | string
            | Location
          ) &
            Location
        }}
      />
    </div>
  )
}

export default Feed
