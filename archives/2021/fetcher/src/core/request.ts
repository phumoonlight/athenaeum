import { useState } from 'react'
import axios, { Method } from 'axios'

import { useRequestHistory } from './request-history'

export const useRequest = () => {
  const [isRequestError, setIsRequestError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [method, setMethod] = useState<Method>('GET')
  const requestHistory = useRequestHistory()

  const send = async (url: string) => {
    setIsLoading(true)
    try {
      const response = await axios({
        method,
        url,
      })
      setResponseData(response.data)
      setIsRequestError(false)
      requestHistory.add({
        createdDate: new Date().toLocaleString(),
        data: response.data,
        url,
      })
    } catch (error) {
      setIsRequestError(true)
      setResponseData(null)
      setError(error)
    }
    setIsLoading(false)
  }

  return {
    method,
    isLoading,
    isRequestError,
    responseData,
    error,
    send,
    setMethod,
  }
}
