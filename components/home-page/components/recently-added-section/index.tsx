import classNames from 'classnames'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DEFAULT_BLUR_URL } from '../../../../constants'
import useStaticHomePageData from '../../hooks'
import style from './style.module.scss'

const RecentlyAddedSection: React.FC = () => {
  const { recentlyAddedProducts } = useStaticHomePageData()

  return (
    <section className="mt-5">
      <div className="container px-5">
        <h2 className="text-center my-5 pt-3">Recently Added</h2>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recentlyAddedProducts?.map((product) => {
            return (
              <div className="col" key={product.id}>
                <div className="card position-relative h-100">
                  <Link passHref href={product.external_url}>
                    <a
                      className="text-black text-decoration-none"
                      target="_blank"
                      rel="nofollow noindex"
                    >
                      <div
                        className={classNames(
                          'card-img-top',
                          style.cardImage,
                          'border-bottom'
                        )}
                      >
                        <Image
                          alt={product.images?.[0].alt ?? 'Product Image'}
                          src={product.images?.[0].src ?? DEFAULT_BLUR_URL}
                          layout="fill"
                          objectFit="contain"
                          quality={100}
                          placeholder="blur"
                          blurDataURL={DEFAULT_BLUR_URL}
                        />
                      </div>
                    </a>
                  </Link>
                  <div className="card-body">
                    <Link passHref href={product.permalink}>
                      <a className="text-black text-decoration-none">
                        <h5 className="card-title line-cut two-lines">
                          {product.name}
                        </h5>
                      </a>
                    </Link>
                    <Link passHref href={product.external_url}>
                      <a
                        className="text-black text-decoration-none"
                        target="_blank"
                        rel="noindex nofollow"
                      >
                        <p className="card-text line-clamp-3">
                          {product.short_description}
                        </p>
                      </a>
                    </Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Added:{' '}
                      {dayjs(product.date_created).format('M/D/YYYY @ h:mma')}
                    </small>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RecentlyAddedSection
