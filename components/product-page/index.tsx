import React from 'react'
import useStaticProductPageData from './hooks'
import Image from 'next/image'
import { DEFAULT_BLUR_URL } from '../../constants'
import style from './style.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import RecentlyAddedSection from '../home-page/components/recently-added-section'
import Breadcrumbs from '../breadcrumbs'
import Breadcrumb from '../breadcrumbs/breadcrumb'

const ProductPage: React.FC = () => {
  const { product } = useStaticProductPageData()

  const salePrice = (
    <div className="fs-3 fw-bolder mt-4">
      <span className="text-success ">Sale Price: </span>$
      {parseFloat(product?.sale_price || '').toFixed(2)}
    </div>
  )

  const regPrice = (
    <div className="mb-2">
      <strong>Reg. Price: </strong>
      <span className="text-decoration-line-through">
        ${parseFloat(product?.regular_price || '0').toFixed(2)}
      </span>
    </div>
  )

  const normalPrice = (
    <div className="fs-3 fw-bolder mt-4 mb-2">
      <span className="text-success">Price: </span>$
      {parseFloat(product?.price || '').toFixed(2)}
    </div>
  )

  const buyNowPanel = (
    <div className="card p-4">
      <div className={style.scrollableY}>
        <p>{product?.description}</p>
      </div>
      <div className="d-flex flex-column">
        {product?.sale_price && product.sale_price !== product.regular_price ? (
          <>
            {salePrice}
            {regPrice}
          </>
        ) : (
          normalPrice
        )}
      </div>
      <Link passHref href={product?.external_url || '#'}>
        <a
          target="_blank"
          rel="nofollow rereferer"
          className="btn btn-primary mt-4 btn-lg fw-bolder"
        >
          Check it out
        </a>
      </Link>
    </div>
  )
  return (
    <>
      <div className="container my-5 d-lg-flex justify-content-between">
        <div>
          <h1
            className={classNames(
              'fs-4 d-block d-lg-none mt-5 fw-bold',
              style.productNameMobile
            )}
          >
            {product?.name}
          </h1>
          <div
            className={classNames(
              'fw-bolder text-center mb-4 d-lg-none',
              style.triangle
            )}
          >
            ▾
          </div>
          {product?.images?.map((image, i) => {
            return (
              <div key={image.id} className="d-flex d-lg-block">
                <div
                  className={classNames(
                    style.imageContainer,
                    'card text-white bg-dark d-inline-block p-3 mb-3 mx-auto'
                  )}
                >
                  <Image
                    alt={image.alt ?? 'Product Image'}
                    placeholder="blur"
                    width={500}
                    height={500}
                    objectPosition="center"
                    objectFit="cover"
                    quality={100}
                    blurDataURL={DEFAULT_BLUR_URL}
                    src={image.src}
                  />
                  {i === 0 && (
                    <h1 className="w-auto position-absolute top-0 p-3 d-none d-lg-block">
                      {product?.name}
                    </h1>
                  )}
                </div>
              </div>
            )
          })}

          <div
            className={classNames('d-block d-lg-none', style.buyNowPanelMobile)}
          >
            {buyNowPanel}
          </div>
        </div>
        <div
          className={classNames(
            'sticky-top d-none d-lg-flex align-items-center',
            style.buyNowPanel
          )}
        >
          {buyNowPanel}
        </div>
      </div>

      <div className="container">
        <hr className="mt-5" />
        <Breadcrumbs>
          <Breadcrumb text="Home" href="/" />
          <Breadcrumb
            text={product?.categories?.[0]?.name || ''}
            href={`/product-category/${product?.categories?.[0]?.slug}`}
          />
          <Breadcrumb
            active
            text={product?.name || ''}
            href={product?.slug || ''}
          />
        </Breadcrumbs>
      </div>

      <RecentlyAddedSection
        pageStart={0}
        sectionTitle="Related products"
        category={product?.categories?.[0].id}
        exclude={[product?.id || 0]}
        include={product?.related_ids}
        orderBy="popularity"
      />

      <RecentlyAddedSection
        pageStart={0}
        sectionTitle={`Popular in ${product?.categories?.[0].name}`}
        category={product?.categories?.[0].id}
        exclude={[product?.id || 0]}
        orderBy="popularity"
      />
    </>
  )
}

export default ProductPage
