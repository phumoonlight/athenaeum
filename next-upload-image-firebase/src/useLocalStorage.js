import React from 'react'

const useLocalStorage = (key, initialValue) => {
  const [returningValue, setRet] = React.useState(initialValue)

  React.useEffect(() => {
    setRet(localStorage.getItem(key)) 
  }, [])

  const setValue = (value) => {
    localStorage.setItem(key, value)
    setRet(value)
  }

  return [returningValue, setValue]
}

export default useLocalStorage