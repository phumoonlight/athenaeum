import React from 'react'
import { Helmet } from 'react-helmet'

const NotFoundPage = () => {
  return (
    <div>
      <Helmet>
        <title>404</title>
      </Helmet>
      This page isn't available
      The link you followed may be broken, or the page may have been removed.
    </div>
  )
}

export default NotFoundPage
