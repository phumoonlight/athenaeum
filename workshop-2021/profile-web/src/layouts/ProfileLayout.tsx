import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfileCard from '../components/ProfileCard'
import { ProfileCardBlock } from '../components/ProfileCardBlock'

export const ProfileLayout: React.FC = () => (
  <main>
    <Header
      title="Poosarn Moolmuang"
      backgroundURL="/images/profile-main-banner.jpg"
    />
    <section>
      <ProfileCardBlock>
        <ProfileCard />
      </ProfileCardBlock>
    </section>
    <Footer />
  </main>
)

export default ProfileLayout
