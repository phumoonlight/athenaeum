import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'

interface StyledHeaderProps {
  backgroundURL?: string
}

const StyledHeader = styled.header<StyledHeaderProps>`
  background: url(${(props) => props.backgroundURL});
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  font-size: 40px;
  padding-bottom: 200px;
  text-shadow: 2px 2px rgba(0,0,0,1);
  .title {
    margin-top: 100px;
    letter-spacing: 2.5px;
  }
`

interface HeaderProps {
  className?: string
  backgroundURL?: string
  title: string
}

const Header: React.FC<HeaderProps> = ({ className, title, backgroundURL }) => (
  <StyledHeader backgroundURL={backgroundURL} className={className}>
    <Nav />
    <div className="title">{title}</div>
  </StyledHeader>
)

export default Header
