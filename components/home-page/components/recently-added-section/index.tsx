import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { getProductsPublicAPI } from '../../../../api-factory/api/client/products'
import {
  DEFAULT_BLUR_URL,
  DEFAULT_RECENT_PRODUCTS_PARAMS,
  SCROLL_LOADER_THRESHOLD,
} from '../../../../constants'
import useStaticHomePageData from '../../hooks'
import style from './style.module.scss'

const RecentlyAddedSection: React.FC<
  WPParams & { pageStart?: number; sectionTitle?: string }
> = ({ pageStart, sectionTitle, ...wpParams }) => {
  const { recentlyAddedProducts } = useStaticHomePageData()
  const [rows, setRows] = useState(recentlyAddedProducts || [])
  const [hasMore, setHasMore] = useState(true)

  return (
    <section className="mt-5">
      <div className="container px-5">
        <h2 className="text-center my-5 pt-3">
          {sectionTitle || 'Recently Added'}
        </h2>
      </div>
      <div className="container">
        <InfiniteScroll
          pageStart={pageStart ?? 0}
          threshold={SCROLL_LOADER_THRESHOLD}
          loadMore={(page) =>
            getProductsPublicAPI({
              ...DEFAULT_RECENT_PRODUCTS_PARAMS,
              ...wpParams,
              page,
            }).then((response) => {
              if (response && response.length > 0) {
                const newRows = [...rows]

                response.forEach((item) => {
                  newRows.push(item)
                })
                if (response.length < DEFAULT_RECENT_PRODUCTS_PARAMS.perPage) {
                }
                setHasMore(
                  response.length === DEFAULT_RECENT_PRODUCTS_PARAMS.perPage
                )
                setRows(newRows)
              }
            })
          }
          hasMore={hasMore}
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
                        onClick={() => {
                          window.gtag('event', 'generate_lead', {
                            name: product.name,
                            id: product.id,
                            slug: product.slug,
                            external_url: product.external_url,
                            sale_price: product.sale_price,
                            regular_price: product.regular_price,
                          })
                        }}
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
                            alt={product.images?.[0]?.alt ?? 'Product Image'}
                            src={product.images?.[0]?.src ?? DEFAULT_BLUR_URL}
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
                      <Link passHref href={`/product/${product.slug}`}>
                        <a
                          className="text-black text-decoration-none"
                          onClick={() => {
                            window.gtag('event', 'view_item', {
                              name: product.name,
                              id: product.id,
                              slug: product.slug,
                              external_url: product.external_url,
                              sale_price: product.sale_price,
                              regular_price: product.regular_price,
                            })
                          }}
                        >
                          <h5 className="card-title line-cut two-lines">
                            {product.name}
                          </h5>
                        </a>
                      </Link>
                      <Link passHref href={product.external_url}>
                        <a
                          onClick={() => {
                            window.gtag('event', 'generate_lead', {
                              name: product.name,
                              id: product.id,
                              slug: product.slug,
                              external_url: product.external_url,
                              sale_price: product.sale_price,
                              regular_price: product.regular_price,
                            })
                          }}
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
                            target="_blank"
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
