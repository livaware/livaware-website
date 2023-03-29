'use client'

import PageLayout from '@/components/Layout/PageLayout'
import PageTransition from '@/components/Layout/PageTransition'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

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
    <html lang="en">
      <body>
        <PageLayout globalConfig={globalConfig}>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <PageTransition key={path}>{children}</PageTransition>
          </AnimatePresence>
        </PageLayout>
      </body>
    </html>
  )
}
