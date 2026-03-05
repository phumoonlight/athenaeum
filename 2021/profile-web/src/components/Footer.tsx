import React from 'react'
import styled from 'styled-components'
import { LinkedinFilled, FacebookFilled, GithubFilled } from '@ant-design/icons'
import { ExternalLink } from './ExternalLink'
import { PROFILE_URL } from '../config'

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  .flex-container {
    border-top: solid #99AAAB 1px;
    display: flex;
    justify-content: center;
    width: 550px;
  }
  .link {
    color: #414141;
    font-size: 50px;
    margin-left: 25px;
    margin-right: 25px;
    transition: .15s;
  }
  .link:hover {
    color: #0066ff;
    transform: scale(1.05);
  }
  @media (max-width: 575px) {
    .flex-container {
      width: 90%;
    }
  }
`

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => (
  <FooterContainer className={className}>
    <div className="flex-container">
      <ExternalLink className="link" href={PROFILE_URL.linkedin}>
        <LinkedinFilled />
      </ExternalLink>
      <ExternalLink className="link" href={PROFILE_URL.facebook}>
        <FacebookFilled />
      </ExternalLink>
      <ExternalLink className="link" href={PROFILE_URL.github}>
        <GithubFilled />
      </ExternalLink>
    </div>
  </FooterContainer>
)

export default Footer
