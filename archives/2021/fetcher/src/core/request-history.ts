import { useEffect, useState } from 'react'

interface RequestHistory {
  url: string
  createdDate: string
  data: any
}

const HISTORY_LOCAL_STORAGE_KEY = 'request-history'

export const useRequestHistory = () => {
  const [requestHistoryList, setRequestHistoryList] = useState<
    RequestHistory[]
  >([])

  const initStorageIfNotExist = () => {
    if (localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY)) return
    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify([]))
  }

  const add = (value: RequestHistory) => {
    initStorageIfNotExist()
    const oldHistoryListJson = localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY)
    const oldHistoryList = JSON.parse(oldHistoryListJson) as RequestHistory[]
    const newHistoryList = [...oldHistoryList, value]
    localStorage.setItem(
      HISTORY_LOCAL_STORAGE_KEY,
      JSON.stringify(newHistoryList)
    )
  }

  useEffect(() => {
    const fetchRequestHistory = () => {
      const historyListJson = localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY)
      const historyList = JSON.parse(historyListJson) as RequestHistory[]
      setRequestHistoryList(historyList)
    }
    initStorageIfNotExist()
    fetchRequestHistory()
  }, [])

  return {
    add,
    list: requestHistoryList,
  }
}
