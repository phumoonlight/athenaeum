import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.h1`
  text-align: center;
  font-weight: bold;
  padding-bottom: 25px;
  color: ${(props) => props.color};
`

interface PlaygroundHeaderProps {
  title: string
  color?: string
}

const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({ title, color }) => (
  <StyledHeader color={color}>
    {title}
  </StyledHeader>
)

export default PlaygroundHeader
