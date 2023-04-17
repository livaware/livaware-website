'use client'

import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { usePathname } from 'next/navigation'
import Template from './template'

export default function ClientRootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  globalConfig,
}: {
  children: React.ReactNode
  globalConfig: GlobalConfiguration
}) {
  const path = usePathname()
  return (
    <>
      <PageLayout globalConfig={globalConfig} key={`l-${path}`}>
        <Template>{children}</Template>
      </PageLayout>
    </>
  )
}
