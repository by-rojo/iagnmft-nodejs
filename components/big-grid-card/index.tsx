import cNames from 'classnames'
import he from 'he'
import React from 'react'
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
        className={cNames('shadow-sm', 'mx-auto', style.bgCardInnerCard, {
          'bg-light': color === 'dark',
          'bg-dark': color === 'light',
        })}
      ></div>
    </div>
  )
}

export default BigGridCard
