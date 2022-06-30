const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  ...props
}) => {
  return (
    <div className={`card${className ? ` ${className}` : ''}`} {...props}></div>
  )
}

export default Card
