import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { IndexMenu } from '../components/IndexMenu'

export const IndexLayout: React.FC = () => (
  <main>
    <Header title="Home" backgroundURL="/images/index-main-banner.jpg" />
    <IndexMenu />
    <Footer />
  </main>
)

export default IndexLayout
