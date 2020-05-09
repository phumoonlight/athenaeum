import React from 'react'
import Axios from 'axios'

export default () => {
  const [content, setContent] = React.useState({})

  const doAsync = async () => {
    const { data } = await Axios.get('/api')
    setContent(data)
  }

  React.useEffect(() => {
    doAsync()
  }, [])

  return content
}