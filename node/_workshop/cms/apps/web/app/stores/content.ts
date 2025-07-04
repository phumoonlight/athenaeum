import axios from 'axios'
import { useEffect } from 'react'
import { create } from 'zustand'

export type ContentMetadataItem = {
  name: string
  tableName: string
  columns: {
    name: string
    type: string
    isPrimary: boolean
    isNullable: boolean
    isGenerated: boolean
    default?: string
  }[]
}

export type ContentMetaStore = {
  metas: ContentMetadataItem[];
  setMetas: (metas: ContentMetadataItem[]) => void;
}

export const useContentMetadataStore = create<ContentMetaStore>((set) => ({
  metas: [],
  setMetas: (metas) => set({ metas }),
}))

export const useContentMetadata = (opts?: { fetchOnMounted: boolean }) => {
  const store = useContentMetadataStore()

  const fetchData = async () => {
    axios('http://localhost:4000')
      .then((response) => store.setMetas(response.data))
      .catch((error) => console.error('Error fetching metadata:', error))
  }

  useEffect(() => {
    if (opts?.fetchOnMounted) {
      fetchData()
    }
  }, [])

  return { metas: store.metas, fetchData }
}