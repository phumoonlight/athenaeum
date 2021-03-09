interface PageLayoutProps {
  className?: string
  header: React.ReactNode
  main: React.ReactNode
  footer: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  className = '',
  header,
  main,
  footer,
}) => (
  <div className={`flex flex-col justify-between min-h-screen ${className}`}>
    <div>
      {header}
      {main}
    </div>
    {footer}
  </div>
)
