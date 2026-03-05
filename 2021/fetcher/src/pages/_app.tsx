import 'src/global.css'
import { StrictMode } from 'react'
import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <StrictMode>
    <Component {...pageProps} />
  </StrictMode>
)

export default App
