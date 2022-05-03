import cNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
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
  internalUrl,
  externalUrl,
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
          <Link href={internalUrl ?? '#'} passHref>
            <a
              className={cNames('text-decoration-none', {
                'text-dark': color === 'light',
                'text-white': color === 'dark',
              })}
            >
              <h2 className={cNames('display-5', style.title)}>{title}</h2>
            </a>
          </Link>
        )}
        {description && (
          <p className={cNames('lead', 'line-clamp-3 px-4')}>{description}</p>
        )}
      </div>
      <Link href={externalUrl ?? '#'} passHref>
        <a
          rel="noindex nofollow noreferrer"
          href={externalUrl ?? '#'}
          target="_blank"
        >
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
        </a>
      </Link>
    </div>
  )
}

export default BigGridCard
