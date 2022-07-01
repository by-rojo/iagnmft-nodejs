import { PropsWithChildren } from 'react'
import styles from './style.module.scss'

const Breadcrumbs: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  //todo add seo json
  return <div className={styles.breadcrumbs}>{children}</div>
}

export default Breadcrumbs
