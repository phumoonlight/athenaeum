import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { PROFILE_URL } from '../config'

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  a {
    color: white;
    font-weight: bold;
    font-size: 15px;
    letter-spacing: 2.5px;
    text-shadow: 1px 1px rgba(0,0,0,1);
  }
  a:hover {
    opacity: .75;
  }
  .social-link {
    display: flex;
    justify-content: space-around;
  }
  .social-link a {
    margin-right: 25px;
  }
  @media (max-width: 575px) {
    .social-link {
      display: none;
    }
  }
`

export const Nav: React.FC = () => (
  <StyledNav>
    <Link href="/">
      PHUMOONLIGHT
    </Link>
    <div className="social-link">
      <Link href={PROFILE_URL.github}>
        GitHub
      </Link>
      <Link href={PROFILE_URL.linkedin}>
        LinkedIn
      </Link>
      <Link href={PROFILE_URL.facebook}>
        Facebook
      </Link>
      <Link href={PROFILE_URL.twitter}>
        Twitter
      </Link>
    </div>
  </StyledNav>
)

export default Nav
