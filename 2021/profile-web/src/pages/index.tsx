import React from 'react'
import Head from 'next/head'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import { PageRoot } from '../components/PageRoot'
import { IndexLayout } from '../layouts/IndexLayout'
import { HEAD } from '../config'

const IndexPage: React.FC = () => (
  <PageRoot>
    <Head>
      <title>{HEAD.title.index}</title>
    </Head>
    <IndexLayout />
    <MessengerCustomerChat
      pageId="307397203233474"
      appId="170703504823036"
    />
  </PageRoot>
)

export default IndexPage
