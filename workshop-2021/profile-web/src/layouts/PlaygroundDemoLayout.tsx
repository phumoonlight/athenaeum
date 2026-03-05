import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Nav = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  a {
    padding: 5px;
    font-size: 25px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #0069d4;
  }
`

interface PlaygroundCreationLayoutProps {
  title: string
}

const PlaygroundCreationLayout: React.FC<PlaygroundCreationLayoutProps> = ({
  children,
}) => (
  <main>
    <Nav>
      <Link href="/playground">GO BACK</Link>
    </Nav>
    {children}
  </main>
)

export default PlaygroundCreationLayout
