'use client'
import { createElement } from 'react'


export default function Page() {
  return createElement(
    'a-scene',
    { embedded: true, arjs: 'sourceType: webcam;' },
    [
      createElement(
        'a-marker',
        { preset: 'hiro', key: 'marker' },
        createElement(
          'a-box',
          { position: '0 0.5 0', material: 'color: red;', key: 'box' }
        )
      ),
      createElement('a-entity', { camera: true, key: 'camera' })
    ]
  )
}
