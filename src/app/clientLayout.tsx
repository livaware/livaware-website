'use client'

import IntroAnimation from '@/components/IntroAnimation'
import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { usePathname } from 'next/navigation'
import Template from './template'
import Link from 'next/link'

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
      <IntroAnimation />
      <PageLayout globalConfig={globalConfig} key={`l-${path}`}>
        <Template>{children}</Template>
      </PageLayout>
    </>
  )
}
