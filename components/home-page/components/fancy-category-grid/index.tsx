import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import useStaticHomePageData from '../../hooks'
import classNames from 'classnames'
import styles from './style.module.scss'

const FancyCategoryGrid: React.FC = () => {
  const { productCategories } = useStaticHomePageData()
  return (
    <div className="container mt-4">
      <div className="row">
        {productCategories?.map(({ name, id, image, slug }, i) => {
          return (
            <div key={id} className="col-12 col-sm-6 col-md-3 mb-4">
              <Link passHref href={`/product-category/${slug}`}>
                <a
                  onClick={() => {
                    window.gtag('event', 'category_hero_menu', {
                      name,
                      id,
                      slug,
                    })
                  }}
                  className={classNames(
                    'position-relative w-100 d-flex h-100',
                    styles.categoryButton,
                    'text-white',
                    'text-decoration-none',
                    'text-shadow-sm',
                    'fw-bold'
                  )}
                >
                  <Image
                    objectFit="cover"
                    layout="fill"
                    objectPosition="top"
                    src={image?.src}
                    alt={image?.alt ?? name}
                    width={300}
                    height={300}
                  />
                  <label className="position-relative text-center fs-4">
                    {name}
                  </label>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FancyCategoryGrid
