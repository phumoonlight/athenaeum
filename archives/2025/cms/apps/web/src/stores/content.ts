import { apiClient } from '@/services/client'
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
  loading: boolean;
  isInitialized: boolean;
  setLoading: (loading: boolean) => void;
  setMetas: (metas: ContentMetadataItem[]) => void;
}

export const useContentMetadataStore = create<ContentMetaStore>((set) => ({
  metas: [],
  loading: false,
  isInitialized: false,
  setLoading: (loading) => set({ loading }),
  setMetas: (metas) => set({ metas }),
}))

export const useContentMetadata = (opts?: { fetchOnMounted: boolean }) => {
  const store = useContentMetadataStore()

  const fetchData = async () => {
    store.setLoading(true)
    try {
      const res = await apiClient.get<ContentMetadataItem[]>('/')
      store.setMetas(res.data)
      return res
    } catch (err) {
      console.error('useContentMetadata.fetchData:', err)
    } finally {
      useContentMetadataStore.setState({
        loading: false,
        isInitialized: true
      })
    }
  }

  useEffect(() => {
    if (opts?.fetchOnMounted) {
      fetchData()
    }
  }, [])

  return { store, metas: store.metas, fetchData }
}