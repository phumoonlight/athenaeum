import 'antd/dist/antd.css'
import 'src/global.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { theme } from 'src/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
