import cNames from 'classnames'
import he from 'he'
import Image from 'next/image'
import React from 'react'
import { DEFAULT_BLUR_URL } from '../../constants'
import style from './style.module.scss'
const CLASS_NAMES = [
  'pt-3',
  'px-3',
  'pt-md-5',
  'px-md-5',
  'text-center',
  'overflow-hidden',
]

const BigGridCard: React.FC<BigGridCardProps> = ({
  color = 'light',
  title,
  description,
  classNames = [],
  className,
  images,
}) => {
  return (
    <div
      className={cNames(...CLASS_NAMES, ...classNames, className, {
        'text-white': color === 'dark',
        'bg-dark': color === 'dark',
      })}
    >
      <div className="my-3 py-3">
        {title && (
          <h2 className={cNames('display-5', style.title)}>
            {he.decode(title)}
          </h2>
        )}
        {description && (
          <p className={cNames('lead', 'line-clamp-3 px-4')}>
            {he.decode(description)}
          </p>
        )}
      </div>
      <div
        className={cNames(
          'shadow-sm',
          'position-relative',
          'mx-auto',
          'overflow-hidden',
          style.bgCardInnerCard,
          {
            'bg-light': color === 'dark',
            'bg-dark': color === 'light',
          }
        )}
      >
        <Image
          alt={images?.[0].alt ?? 'Product Image'}
          src={images?.[0].src ?? DEFAULT_BLUR_URL}
          layout="fill"
          objectFit="cover"
          quality={100}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_URL}
        />
      </div>
    </div>
  )
}

export default BigGridCard
