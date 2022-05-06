import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import useStaticHomePageData from '../../hooks'

const CategoryGrid = () => {
  const { productCategories } = useStaticHomePageData()
  return (
    <div className="row">
      {productCategories?.map(({ name, id, image }, i) => {
        return (
          <div
            key={id}
            className={classNames('position-relative', {
              'col-2 col-md-3': i < 4,
              'd-none d-md-block col-3': i > 3,
            })}
          >
            <Image
              objectFit="cover"
              src={image?.src}
              alt={image?.alt ?? name}
              width={150}
              height={150}
            />
            <label
              style={{ top: 0, left: 0 }}
              className="fw-bolder lh-1 position-absolute w-100 h-100 d-flex justify-content-center align-items-center p-2"
            >
              <small className="text-shadow-sm">{name}</small>
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryGrid
