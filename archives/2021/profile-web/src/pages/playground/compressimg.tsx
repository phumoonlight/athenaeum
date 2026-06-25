import React from 'react'
import Head from 'next/head'
import { PageRoot } from '../../components/PageRoot'
import PlaygroundCreationLayout from '../../layouts/PlaygroundDemoLayout'
import PlaygroundCompressImgLayout from '../../layouts/PlaygroundCompressImgLayout'
import { HEAD } from '../../config'

const PlaygroundCompressImg: React.FC = () => (
  <PageRoot>
    <Head>
      <title>{HEAD.title.playgroundCompressImg}</title>
    </Head>
    <PlaygroundCreationLayout title="CompressImg">
      <PlaygroundCompressImgLayout />
    </PlaygroundCreationLayout>
  </PageRoot>
)

export default PlaygroundCompressImg
