import classNames from 'classnames'
import Link from 'next/link'
import styles from './style.module.scss'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ href, text, active }) => {
  return (
    <>
      <Link passHref href={href}>
        <a
          className={classNames(styles.breadcrumb, { [styles.active]: active })}
        >
          {text}
        </a>
      </Link>
      {active ? '' : ' ▶ '}
    </>
  )
}

export default Breadcrumb
