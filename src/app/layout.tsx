import '@/styles/globals.css'

import { getGlobalConfiguration } from '@/lib/sanityClient'
import ClientRootLayout from './clientLayout'
import Head from 'next/head'

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
      <Head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </Head>
      <body>
        <ClientRootLayout globalConfig={globalConfig}>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  )
}

export const metadata = {
  icons: {
    icon: { url: '/favicon.png', type: 'image/png' },
    shortcut: { url: '/favicon.png', type: 'image/png' },
  },
}
