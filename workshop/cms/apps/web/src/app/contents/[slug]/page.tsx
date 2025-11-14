'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useContentMetadata } from '../../../stores/content'
import { apiClient } from '../../../services/client'
import Link from 'next/link'

export default function Page() {
  const params = useParams<{ slug: string }>()
  const store = useContentMetadata()
  const meta = store.metas.find((meta) => meta.tableName === params.slug)
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    if (params.slug) {
      fetchData()
    }
  }, [params.slug])

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/${params.slug}`)
      setList(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  if (!store.store.isInitialized || store.store.loading) {
    return <Box>Loading...</Box>
  }
  return (
    <Box>
      {meta ? (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="2rem" bgcolor="white">
            <Box component="h2" sx={{ fontWeight: 700, fontSize: 24 }}>{meta.name}</Box>
            <Link href={`/contents/${params.slug}/create`}>
              <Button variant="contained">Create</Button>
            </Link>
          </Box>
          <TableContainer component={Paper} sx={{ bgcolor: '#f5f5f5' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {meta?.columns.map((column) => (
                    <TableCell key={column.name}>{column.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <TableRow key={row.id}>
                    {meta?.columns.map((column) => (
                      <TableCell key={`${row.name}${column.name}`}>{row[column.name] !== null ? row[column.name]?.toString() : 'null'}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <div className='p-2'>No content found for {params.slug}</div>
      )}
    </Box>
  )
}
