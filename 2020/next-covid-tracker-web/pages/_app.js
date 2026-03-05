import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import '../src/styles.css'

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>CovidTrackerTH</title>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link href="https://fonts.googleapis.com/css2?family=Prompt&display=swap" rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Coronavirus tracker for Thailand" />
      <meta name="keywords" content="covid-19, covidtracker, covidtrackerth" />
      <meta name="author" content="Poosarn Moolmuang" />
      <meta property="og:url" content="https://covidtrackerth.now.sh/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="CovidTrackerTH" />
      <meta property="og:description" content="Coronavirus tracker for Thailand" />
      <meta property="og:image" content="https://raw.githubusercontent.com/phumoonlight/web-covidtrackerth/master/public/ogimg.jpg" />
    </Head>
    <Component {...pageProps} />
  </>
)

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default App
