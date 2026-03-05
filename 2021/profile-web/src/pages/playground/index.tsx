import React from 'react'
import Head from 'next/head'
import { HEAD } from '../../config'
import PlaygroundIndexLayout from '../../layouts/PlaygroundIndexLayout'

const PlaygroundIndex = () => (
  <>
    <Head>
      <title>{HEAD.title.playground}</title>
    </Head>
    <PlaygroundIndexLayout />
  </>
)

export default PlaygroundIndex
