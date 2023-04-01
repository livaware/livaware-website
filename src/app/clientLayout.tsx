'use client'

import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Template from './template'
import IntroAnimation from '@/components/IntroAnimation'

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
