import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const CardContainer = styled.a`
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  background-color: #505050;
  border-bottom: solid #2b2b2b 2.5px;
  margin: 10px;
  border-radius: 5px;
  width: 250px;
  transition: .15s;
  :hover {
    box-shadow: 0px 0px 25px 0px rgba(0, 140, 255, 0.85);
    color: #ffffff;
  }
  .banner {
    object-fit: cover;
    width: 100%;
    height: 150px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .title {
    margin-top: 10px;
    font-size: 25px;
  }
  .description {
    margin-top: 10px;
    margin-bottom: 10px;
    opacity: .75;
  }
`

interface LinkMenuCardProps {
  href: string,
  bannerSrc: string,
  title: string,
  className?: string,
}

export const MenuCard: React.FC<LinkMenuCardProps> = ({
  className,
  href,
  bannerSrc,
  title,
  children,
}) => (
  <Link href={href} passHref>
    <CardContainer className={className}>
      <img className="banner" src={bannerSrc} alt={title} />
      <div className="title">
        {title}
      </div>
      <div className="description">
        {children}
      </div>
    </CardContainer>
  </Link>
)

export default MenuCard
