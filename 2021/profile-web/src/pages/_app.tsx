import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { HEAD } from '../config'
import '../global.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={HEAD.meta.description} />
      <meta name="keywords" content={HEAD.meta.keywords} />
      <meta name="author" content={HEAD.meta.author} />
      <meta name="google-site-verification" content={HEAD.meta.googleVerification} />
      <meta property="og:url" content={HEAD.meta.ogURL} />
      <meta property="og:type" content={HEAD.meta.ogType} />
      <meta property="og:title" content={HEAD.meta.ogTitle} />
      <meta property="og:description" content={HEAD.meta.description} />
      <meta property="og:image" content={HEAD.meta.ogImage} />
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
