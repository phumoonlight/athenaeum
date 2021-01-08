import { Fragment } from 'react'
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    // server side rendering configuration
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage
    try {
      context.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      })
      const initialProps = await Document.getInitialProps(context)
      const styleElement = sheet.getStyleElement()
      return {
        ...initialProps,
        styles: (
          <Fragment>
            {initialProps.styles}
            {styleElement}
          </Fragment>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}