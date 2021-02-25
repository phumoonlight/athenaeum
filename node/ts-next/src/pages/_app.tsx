import 'antd/dist/antd.css'
import 'src/global.css'
import { FC } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    screens: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}

const theme: DefaultTheme = {
  screens: {
    sm: '(min-width: 360px)',
    md: '(min-width: 875px)',
    lg: '(min-width: 1440px)',
    xl: '(min-width: 1920px)',
  },
}

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
