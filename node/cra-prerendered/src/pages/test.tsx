import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

interface ButtonProps {
  color: string;
}

const Button = styled.button<ButtonProps>`
  color: ${(props) => props.color};
`

const TestPage = () => {
  const [count, setCount] = React.useState(0)
  const [header, setHeader] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://api.github.com/users/phumoonlight/repos')
      const resultJson = await result.json()

      setHeader(resultJson)
    }
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Test</title>
      </Helmet>
      <div>
        <div>{header.map(he => he.name)}</div>
        <Button color="blue" onClick={() => setCount(prev => prev + 1)}>Click me! {count}</Button>
      </div>
    </>
  )
}

export default TestPage
