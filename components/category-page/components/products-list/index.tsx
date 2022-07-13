import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {
  DEFAULT_BLUR_URL,
  SCROLL_LOADER_THRESHOLD,
} from '../../../../constants'
import ProductFilters from '../product-filters'
import useStaticCategoryPageData from '../../hooks'
import style from './style.module.scss'
import context from '../../context'
import Breadcrumbs from '../../../breadcrumbs'
import Breadcrumb from '../../../breadcrumbs/breadcrumb'

const ProductsList: React.FC = () => {
  const { items, dispatch, pageStart, filters, hasMore } = useContext(context)
  const { category } = useStaticCategoryPageData()

  return dispatch && pageStart ? (
    <section className="mt-4">
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb text="Home" href="/" />
          <Breadcrumb
            text={category?.name || ''}
            active
            href={category?.slug || ''}
          />
        </Breadcrumbs>
        <h2 className="mb-5 pt-3 mb-0">{category?.name} Category</h2>
        <hr className="mb-4" />
      </div>

      <div className="container">
        <ProductFilters />
        <InfiniteScroll
          pageStart={pageStart - 1}
          threshold={SCROLL_LOADER_THRESHOLD}
          loadMore={() => dispatch.loadProducts(pageStart + 1, filters)}
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
            {items?.map((product, index) => {
              return (
                <div className="col" key={`${product.id}-${index}`}>
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
                            target="_blank"
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
  ) : null
}

export default ProductsList
