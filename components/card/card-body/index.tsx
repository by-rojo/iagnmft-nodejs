const CardBody: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`card-body${className ? ` ${className}` : ''}`}
      {...props}
    ></div>
  )
}

export default CardBody
