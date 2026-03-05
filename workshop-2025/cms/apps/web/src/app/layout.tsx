import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import './globals.css'

export const metadata: Metadata = {
  title: 'cms',
}

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          {props.children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
