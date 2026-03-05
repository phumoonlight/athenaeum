import React from 'react'
import styled from 'styled-components'

const StyledRoot = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
  min-height: 100%;
  margin-bottom: 50px;
`

export const ProfileCardBlock: React.FC = ({ children }) => (
  <StyledRoot>
    {children}
  </StyledRoot>
)

export default ProfileCardBlock
