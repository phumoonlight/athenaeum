import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuList from '../components/PlaygroundMenu'

const PlaygroundLayout: React.FC = () => (
  <main>
    <Header title="Playground" backgroundURL="/images/playground-main-banner.jpg" />
    <MenuList />
    <Footer />
  </main>
)

export default PlaygroundLayout
