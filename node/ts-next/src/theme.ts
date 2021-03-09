import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    screens: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}

export const theme: DefaultTheme = {
  screens: {
    sm: '@media (min-width: 360px)',
    md: '@media (min-width: 875px)',
    lg: '@media (min-width: 1440px)',
    xl: '@media (min-width: 1920px)',
  },
}