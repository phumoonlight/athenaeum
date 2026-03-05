import React from 'react'
import Head from 'next/head'
import { HEAD } from '../../config'
import PlaygroundCreationLayout from '../../layouts/PlaygroundDemoLayout'
import PlaygroundCreationLightSwitch from '../../layouts/PlaygroundLightswitchLayout'

const PlaygroundLightSwitch: React.FC = () => (
  <>
    <Head>
      <title>{HEAD.title.playgroundLightSwitch}</title>
    </Head>
    <PlaygroundCreationLayout title="LightSwitch">
      <PlaygroundCreationLightSwitch />
    </PlaygroundCreationLayout>
  </>
)

export default PlaygroundLightSwitch
