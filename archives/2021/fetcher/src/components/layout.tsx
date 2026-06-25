interface Props {
  header?: React.ReactNode
  main?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export const PageLayout: React.FC<Props> = ({
  header,
  main,
  footer,
  className = '',
}) => {
  return (
    <div className={`flex flex-col justify-between min-h-screen ${className}`}>
      <div>
        {header}
        {main}
      </div>
      {footer}
    </div>
  )
}
