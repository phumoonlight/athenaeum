import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PageLayout } from 'src/components/layout'
import { ErrorRequestCard } from 'src/components/error-request-card'
import { ResponseCard } from 'src/components/response-card'
import { ExternalLink } from 'src/components/external-link'
import { Footer } from 'src/components/footer'
import { useRequest } from 'src/core/request'
import { useRequestHistory } from 'src/core/request-history'

const History: React.FC = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const request = useRequest()
  const requestHistory = useRequestHistory()
  const queryUrl = router.query.url as string

  useEffect(() => {
    if (!queryUrl) return
    inputRef.current && (inputRef.current.value = queryUrl)
    request.send(queryUrl)
  }, [queryUrl])

  return (
    <>
      <Head>
        <title>History | Fetcher</title>
      </Head>
      <PageLayout
        className="bg-gradient-to-r from-green-500 to-blue-500"
        header={
          <header>
            <nav className="p-6 flex flex-col md:flex-row justify-between">
              <div className="text-4xl text-white font-bold mb-4 md:mb-0">
                <Link href="/">{'Fetcher { } | History'}</Link>
              </div>
              <div className="flex">
                <div className="font-bold text-white grid grid-cols-2 gap-4 opacity-90">
                  <Link href="/history" children="History" />
                  <ExternalLink
                    href="https://github.com/phumoonlight/fetcher"
                    children="GitHub"
                  />
                </div>
              </div>
            </nav>
          </header>
        }
        main={
          <main className="flex flex-col-reverse">
            {requestHistory.list.map((history) => (
              <ResponseCard
                method="GET"
                key={history.createdDate}
                data={history.data}
                url={history.url}
                createdDate={history.createdDate}
              />
            ))}
          </main>
        }
        footer={<Footer />}
      />
    </>
  )
}

export default History
