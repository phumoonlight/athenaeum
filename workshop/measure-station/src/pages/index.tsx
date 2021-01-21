import React from 'react'
import styled from 'styled-components'

const Red = styled.div`
  color: red;
`

const Green = styled.div`
  color: green;
`

const Blue = styled.div`
  color: blue;
`

const Index: React.FC = () => {
  return (
    <div>
      <Red>Custom</Red>
      <Green>G</Green>
      <Blue className="">B</Blue>
      <div className="text-5xl">TWST</div>
      <span className="custom-me"></span>
      hello
    </div>
  )
}

export default Index
