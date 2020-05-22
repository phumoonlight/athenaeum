/* eslint-disable react/jsx-filename-extension */
import React from 'react'

class Point {
  x: number
  y: number
  static instances = 0
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export default (): JSX.Element => <div>Hello</div>
