import Image, { ImageProps } from 'next/image'

const CardImg: React.FC<ImageProps> = (imageProps) => {
  return (
    <div className="card-img-top">
      <Image alt={imageProps.alt || 'Card Image'} {...imageProps} />
    </div>
  )
}

export default CardImg
