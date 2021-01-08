import { AppProps /*, AppContext */ } from 'next/app'
import 'antd/dist/antd.css'

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default CustomApp