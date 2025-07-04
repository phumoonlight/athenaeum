'use client'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useContentMetadata } from '../../stores/content'
import { apiClient } from '../../services/client'

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

  const getInputType = (name: string, type: string) => {
    if (name.toLowerCase().includes('password')) {
      return 'password'
    }
    switch (type) {
      case 'int':
      case 'integer':
        return 'number'
      case 'text':
      case 'varchar':
      case 'string':
        return 'text'
      case 'boolean':
        return 'checkbox'
      case 'date':
      case 'datetime':
        return 'date'
      default:
        return 'text'
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.currentTarget)
    console.log('Form Data:', Object.fromEntries(formData.entries()))
    const result = await apiClient.post(`${params.slug}`, Object.fromEntries(formData.entries()))
    console.log('Result:', result.data)
    setList((prev) => [...prev, result.data])
  }

  return (
    <div>
      {meta ? (
        <div>
          <form className="mb-2" onSubmit={onSubmit}>
            <h2 className='font-bold text-2xl'>{meta.name}</h2>
            <div className='grid grid-cols-1 gap-1'>
              {meta.columns.filter((col) => !col.isPrimary).map((column) => (
                <Fragment key={column.name}>
                  {column.name}
                  <input
                    type={getInputType(column.name, column.type)}
                    name={column.name}
                    className='border border-gray-300 rounded p-1'
                  />
                </Fragment>
              ))}
            </div>
            <button type='submit' className='bg-gray-300 p-1'>submit</button>
          </form>
          <div>
            {list.map((item: any, index: number) => (
              <div key={index} className='border border-gray-300 p-2 mb-2'>
                {meta?.columns.map((column) => (
                  <div key={column.name} className='mb-1'>
                    <strong>{column.name}:</strong> {item[column.name] !== null ? item[column.name]?.toString() : 'null'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='p-2'>No content found for {params.slug}</div>
      )}
    </div>
  )
}
