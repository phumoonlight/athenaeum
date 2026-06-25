import React from 'react'

interface ExternalLinkProps {
  className?: string
  href?: string
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  className,
  href,
  children,
}) => (
  <a
    target="_blank"
    rel="noreferrer"
    className={className}
    href={href}
  >
    {children}
  </a>
)

export default ExternalLink
