import '@/styles/globals.css'

import { getGlobalConfiguration } from '@/lib/sanityClient'
import ClientRootLayout from './clientLayout'
import Head from 'next/head'
import { Metadata } from 'next'

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const globalConfig = await getGlobalConfiguration()
  return (
    <html lang="en">
      <body>
        <ClientRootLayout globalConfig={globalConfig}>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  icons: {
    icon: { url: '/favicon.png', type: 'image/png' },
    shortcut: { url: '/favicon.png', type: 'image/png' },
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
    url: false,
  },
}
