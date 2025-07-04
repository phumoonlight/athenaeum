import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cms',
}

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}
