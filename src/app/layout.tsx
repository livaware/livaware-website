import '@/styles/globals.css'

import { getGlobalConfiguration } from '@/lib/sanityClient'
import ClientRootLayout from './clientLayout'

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
