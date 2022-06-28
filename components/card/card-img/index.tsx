import Image, { ImageProps } from 'next/image'
import styles from './style.module.scss'
const CardImg: React.FC<ImageProps> = (imageProps) => {
  return (
    <div className={styles.card}>
      <Image alt={imageProps.alt || 'Card Image'} {...imageProps} />
    </div>
  )
}

export default CardImg
