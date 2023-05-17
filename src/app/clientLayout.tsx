'use client'

import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { usePathname } from 'next/navigation'
import Template from './template'
import { init } from '@socialgouv/matomo-next'
import { useEffect } from 'react'

const MATOMO_URL = 'https://livaware.matomo.cloud/'
const MATOMO_SITE_ID = '1'

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
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
  }, [])
  return (
    <>
      <PageLayout globalConfig={globalConfig} key={`l-${path}`}>
        <Template>{children}</Template>
      </PageLayout>
    </>
  )
}
