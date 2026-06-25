import React from 'react'
import styled from 'styled-components'
import LinkMenuCard from './MenuCard'

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  .menu-card-link {
    transform: translateY(-100px);
  }
  .menu-card-link:hover {
    transform: translateY(-100px) scale(1.05);
  }
`

const MenuList: React.FC = () => (
  <StyledContainer>
    <LinkMenuCard
      className="menu-card-link"
      href="/playground/lightswitch"
      bannerSrc="/images/playground-banner-lightswitch.jpg"
      title="LIGHT SWITCH"
    />
    <LinkMenuCard
      className="menu-card-link"
      href="/playground/compressimg"
      bannerSrc="/images/playground-banner-compressimg.jpg"
      title="COMPRESS IMG"
    />
  </StyledContainer>
)

export default MenuList
