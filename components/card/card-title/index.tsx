const CardTitle: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  ...props
}) => {
  return (
    <h5
      className={`card-title${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
}

export default CardTitle
