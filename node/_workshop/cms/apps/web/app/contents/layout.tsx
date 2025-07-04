'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContentMetadata } from '../stores/content'

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  const params = useParams<{ slug: string }>()
  const store = useContentMetadata({ fetchOnMounted: true })

  return (
    <div className='pl-[120px]'>
      <nav className='absolute left-0 h-full w-[120px] p-1 bg-gray-400'>
        <div className='font-bold'>CMS</div>
        <div className='font-semibold'>Contents</div>
        {store.metas.map((meta) => (
          <Link
            key={meta.tableName}
            href={`/contents/${meta.tableName}`}
            className="block p-0.5"
            style={{
              backgroundColor: meta.tableName === params.slug ? '#ccc' : 'transparent'
            }}
          >
            {meta.name}
          </Link>
        ))}
      </nav>
      <div className='p-2'>
        {props.children}
      </div>
    </div>
  )
}
