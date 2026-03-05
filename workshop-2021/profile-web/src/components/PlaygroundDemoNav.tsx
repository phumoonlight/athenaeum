import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px;
  border: solid #c4cfc9 1px;
  padding: 20px;
  border-radius: 15px;
  a {
    border: solid #b3cce8 .1px;
    display: inline-flex;
    justify-content: center;
    padding: 15px;
    border-radius: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #0069d4;
    transition: .15s;
  }
  a:hover {
    border: solid #0069d4 .1px;
    opacity: .85;
    background: #0069d4;
    color: white;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  }
`

const StyledLink = styled.a`
  &.active {
    color: white;
    background: #0069d4;
  }
`

interface PlaygroundNavProps {
  activatedLink?: string
}

export const PlaygroundNav: React.FC<PlaygroundNavProps> = ({ activatedLink }) => {
  const applyActivatedStyle = (key: string) => (
    activatedLink === key ? 'active' : ''
  )
  return (
    <Root>
      <Link href="/playground/lightswitch" passHref>
        <StyledLink className={applyActivatedStyle('lightswitch')}>
          LightSwitch
        </StyledLink>
      </Link>
      <Link href="/playground/compressimg" passHref>
        <StyledLink className={applyActivatedStyle('compressimg')}>
          CompressImg
        </StyledLink>
      </Link>
      <Link href="/playground/modalhook" passHref>
        <StyledLink className={applyActivatedStyle('modalhook')}>
          ModalHook
        </StyledLink>
      </Link>
    </Root>
  )
}

export default PlaygroundNav
