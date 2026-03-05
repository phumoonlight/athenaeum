import React from 'react'
import styled from 'styled-components'
import { PlaygroundNav } from '../components/PlaygroundDemoNav'

const StyledContainer = styled.div`
  text-align: center;
  border: solid #c4cfc9 1px;
  padding-top: 200px;
  padding-bottom: 200px;
  margin: 40px;
`

const PlaygroundFunctionLightSwitch: React.FC = () => (
  <div>
    <StyledContainer>
      CompressImg
    </StyledContainer>
    <PlaygroundNav activatedLink="compressimg" />
  </div>
)

export default PlaygroundFunctionLightSwitch
