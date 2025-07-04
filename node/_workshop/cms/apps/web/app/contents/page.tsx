'use client'
import { useContentMetadata } from '../stores/content'

export default function Home() {
  const store = useContentMetadata()

  return (
    <div className='flex gap-2'>
      {store.metas.map((meta) => (
        <div key={meta.name} className="border border-gray-200 px-2">{meta.name}</div>
      ))}
    </div>
  )
}
