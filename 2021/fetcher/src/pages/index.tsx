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

const Index: React.FC = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const request = useRequest()
  const queryUrl = router.query.url as string

  const onClickSend = () => {
    const inputValue = inputRef.current.value
    const isInputEmpty = !inputValue
    if (isInputEmpty) return
    router.push({
      pathname: '/',
      query: {
        url: inputValue,
      },
    })
  }

  useEffect(() => {
    if (!queryUrl) return
    inputRef.current && (inputRef.current.value = queryUrl)
    request.send(queryUrl)
  }, [queryUrl])

  return (
    <>
      <Head>
        <title>Fetcher</title>
      </Head>
      <PageLayout
        className="bg-gradient-to-r from-green-500 to-blue-500"
        header={
          <header>
            <nav className="p-6 flex flex-col md:flex-row justify-between">
              <div className="text-4xl text-white font-bold mb-4 md:mb-0">
                <Link href="/">{'Fetcher { }'}</Link>
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
          <main>
            <section className="grid grid-cols-12 gap-4 m-4">
              <input
                className="col-span-12 md:col-span-10 p-3 font-mono text-2xl rounded-xl w-full transition-shadow shadow-xl focus:shadow-2xl focus:outline-none"
                type="text"
                placeholder="URL"
                ref={inputRef}
              />
              <button
                className="col-span-12 md:col-span-2 p-3 uppercase rounded-xl w-full transition-all shadow-xl focus:shadow-2xl bg-green-500 hover:bg-green-400 font-bold tracking-widest focus:outline-none text-2xl text-white"
                onClick={onClickSend}
                disabled={request.isLoading}
                children={request.isLoading ? 'sending...' : 'send'}
              />
            </section>
            <section>
              {request.isRequestError && (
                <ErrorRequestCard error={request.error} />
              )}
              {request.responseData && (
                <ResponseCard
                  data={request.responseData}
                  method={request.method}
                  url={queryUrl}
                />
              )}
            </section>
          </main>
        }
        footer={<Footer />}
      />
    </>
  )
}

export default Index
