// import 'antd/dist/antd.css'
import '../styles/global.css'
import { AppProps /*, AppContext */ } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default App