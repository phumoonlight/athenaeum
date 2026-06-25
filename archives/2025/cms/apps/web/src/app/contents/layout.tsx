'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContentMetadata } from '../../stores/content'

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  const params = useParams<{ slug: string }>()
  const store = useContentMetadata({ fetchOnMounted: true })
  const contentUserMeta = store.metas.find((meta) => meta.tableName === 'users')

  return (
    <div className='pl-[200px] h-full'>
      <nav className='absolute left-0 h-full w-[200px] p-4 bg-gray-400'>
        <div className='mb-2'>
          <h3 className='font-semibold mb-1 text-xl'>Contents</h3>
          {store.metas.filter((meta) => !['users'].includes(meta.tableName)).map((meta) => (
            <Link
              key={meta.tableName}
              href={`/contents/${meta.tableName}`}
              className="block p-0.5 rounded mb-1 pl-2"
              style={{
                backgroundColor: meta.tableName === params.slug ? '#ccc' : 'transparent'
              }}
            >
              {meta.name}
            </Link>
          ))}
        </div>
        <div>
          {contentUserMeta && (
            <>
              <h3 className='font-semibold mb-1 text-xl'>Users</h3>
              <Link
                href={`/contents/${contentUserMeta.tableName}`}
                className="block p-0.5 rounded mb-1 pl-2"
                style={{
                  backgroundColor: contentUserMeta.tableName === params.slug ? '#ccc' : 'transparent'
                }}
              >
                {contentUserMeta.name}
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className='p-6 h-full pb-20 overflow-y-auto'>
        {props.children}
      </div>
    </div>
  )
}
