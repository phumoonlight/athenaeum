'use client'
import { useParams, useRouter } from 'next/navigation'
import { Box, TextField } from '@mui/material'
import { useContentMetadata } from '@/stores/content'
import { apiClient } from '@/services/client'
import { ContentDynamicForm } from '@/components/content-dynamic-form'

export default function Page() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const store = useContentMetadata()
  const meta = store.metas.find((meta) => meta.tableName === params.slug)

  const getInputType = (name: string, type: string) => {
    if (['password', 'passwd'].includes(name)) {
      return 'password'
    }
    if (['int', 'integer'].includes(type)) {
      return 'number'
    }
    if (['text', 'varchar', 'string'].includes(type)) {
      return 'text'
    }
    return 'text'
  }

  const onSubmit = async (record: Record<string, any>) => {
    await apiClient.post(`${params.slug}`, record)
    router.push(`/contents/${params.slug}`)
  }

  if (!store.store.isInitialized || store.store.loading) {
    return <Box>Loading...</Box>
  }
  return (
    <Box>
      {meta ? (
        <>
          <Box component="h2" sx={{ fontWeight: 700, fontSize: 24, marginBottom: '2rem' }}>{meta?.name} / Create</Box>
          <ContentDynamicForm onSubmit={onSubmit}>
            {meta.columns.filter((col) => !col.isPrimary).map((column) => (
              <TextField
                key={`${params.slug}${column.name}`}
                label={column.name}
                type={getInputType(column.name, column.type)}
                name={column.name}
                variant="outlined"
              />
            ))}
          </ContentDynamicForm>
        </>
      ) : (
        <Box>No content found for {params.slug}</Box>
      )}
    </Box>
  )
}
