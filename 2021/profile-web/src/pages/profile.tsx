import React from 'react'
import Head from 'next/head'
import { PageRoot } from '../components/PageRoot'
import { ProfileLayout } from '../layouts/ProfileLayout'
import { HEAD } from '../config'

const ProfilePage: React.FC = () => (
  <PageRoot>
    <Head>
      <title>{HEAD.title.profile}</title>
    </Head>
    <ProfileLayout />
  </PageRoot>
)

export default ProfilePage
