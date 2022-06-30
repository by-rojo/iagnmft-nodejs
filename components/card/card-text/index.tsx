const CardText: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`card-text${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
}

export default CardText
