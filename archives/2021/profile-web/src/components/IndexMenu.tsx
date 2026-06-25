import React from 'react'
import styled from 'styled-components'
import LinkMenuCard from './MenuCard'

const StyledMenuList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .menu {
    transform: translateY(-100px);
  }
  .menu:hover {
    transform: translateY(-100px) scale(1.05);
  }
`

interface IndexMenuListProps {
  className?: string
}

export const IndexMenu: React.FC<IndexMenuListProps> = ({ className }) => (
  <StyledMenuList className={className}>
    <LinkMenuCard
      href="/profile"
      className="menu"
      bannerSrc="/images/profile-main-banner.jpg"
      title="PROFILE"
    >
      View my profile.
    </LinkMenuCard>
    <LinkMenuCard
      href="/playground"
      className="menu"
      bannerSrc="/images/playground-main-banner.jpg"
      title="PLAYGROUND"
    >
      View my creations.
    </LinkMenuCard>
    <LinkMenuCard
      href="/resume.pdf"
      className="menu"
      bannerSrc="/images/resume-main-banner.jpg"
      title="RESUME"
    >
      View my resume.
    </LinkMenuCard>
  </StyledMenuList>
)

export default IndexMenu
