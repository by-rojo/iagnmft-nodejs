import React from 'react'
import useProducts from '../../../../api-factory/api/client/products/use-products'
import {
  DEFAULT_BLUR_URL,
  DEFAULT_TOP_PRODUCTS_PARAMS,
} from '../../../../constants'
import Image from 'next/image'
import styles from './style.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
const Sidebar = () => {
  const { data: products } = useProducts(DEFAULT_TOP_PRODUCTS_PARAMS)

  return (
    <div className="ms-md-4 mt-4 mt-md-0">
      {products?.map(
        ({ images, id, name, sale_price, regular_price, slug }) => (
          <div key={id} className={classNames(styles.card, 'mb-4 card p-3')}>
            <span
              className={classNames(styles.banner, 'text-white h5 px-3 py-1')}
            >{`$${sale_price ?? regular_price}`}</span>
            <Image
              alt={images?.[0].alt ?? 'Product Image'}
              src={images?.[0].src ?? DEFAULT_BLUR_URL}
              width={300}
              height={300}
              quality={100}
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_URL}
            />
            <label className="mt-3 d-block h6">{name}</label>
            <Link href={`/product/${slug}`} passHref>
              <a className="btn btn-lg btn-primary mt-2">Purchase</a>
            </Link>
          </div>
        )
      )}
    </div>
  )
}

export default Sidebar
