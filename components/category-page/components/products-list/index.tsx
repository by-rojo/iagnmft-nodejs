import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { getProductsPublicAPI } from '../../../../api-factory/api/client/products'
import {
  DEFAULT_BLUR_URL,
  DEFAULT_CATEGORY_PARAMS,
  SCROLL_LOADER_THRESHOLD,
} from '../../../../constants'
import useStaticCategoryPageData from '../../hooks'
import style from './style.module.scss'

const RecentlyAddedSection: React.FC = () => {
  const { products, category } = useStaticCategoryPageData()
  const [rows, setRows] = useState(products || [])

  return (
    <section className="mt-5">
      <div className="container">
        <h2 className="my-5 pt-3 mb-0">{category?.name} Category</h2>
        <hr className="mb-4" />
      </div>
      <div className="container">
        <InfiniteScroll
          pageStart={1}
          threshold={SCROLL_LOADER_THRESHOLD}
          loadMore={(page) =>
            getProductsPublicAPI({
              ...DEFAULT_CATEGORY_PARAMS,
              page,
              category: category?.id,
            }).then((response) => {
              if (response && response.length > 0) {
                const newRows = [...rows]

                response.forEach((item) => {
                  newRows.push(item)
                })
                setRows(newRows)
              }
            })
          }
          hasMore
          loader={
            <div
              className="loader d-flex justify-content-center align-items-center p-5"
              key={0}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {rows?.map((product) => {
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
                          <p className="card-text line-clamp-3 lh-sm">
                            <small>{product.short_description}</small>
                          </p>
                        </a>
                      </Link>
                    </div>
                    <div className="card justify-content-between flex-row p-2 align-items-center">
                      <div>
                        <div>
                          Reg:{' '}
                          <span
                            className={classNames({
                              'text-decoration-line-through':
                                product.sale_price,
                              'fst-italic': product.sale_price,
                              'text-success': !product.sale_price,
                            })}
                          >
                            ${parseFloat(product.regular_price).toFixed(2)}
                          </span>
                        </div>
                        {product.sale_price && (
                          <div className="fw-bold">
                            Sale:{' '}
                            <span className="text-success">
                              ${parseFloat(product.sale_price).toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <Link href={product.external_url} passHref>
                          <a
                            className="btn btn-outline-primary"
                            rel="nofollow noindex"
                          >
                            Check it out
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  )
}

export default RecentlyAddedSection
