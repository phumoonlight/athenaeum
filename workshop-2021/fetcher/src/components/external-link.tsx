interface Props {
  className?: string
  href: string
}

export const ExternalLink: React.FC<Props> = ({
  className = '',
  href,
  children,
}) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    children={children}
  />
)
