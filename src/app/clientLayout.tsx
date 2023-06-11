'use client'

import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { usePathname, useRouter } from 'next/navigation'
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
  const router = useRouter()

  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })

    // Bind react router navigation event to all a tags
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'a') {
        const href = target.getAttribute('href')
        if (href && href.startsWith('/')) {
          e.preventDefault()
          router.push(href)
        }
      }
    })
  }, [router])
  return (
    <>
      <PageLayout globalConfig={globalConfig}>
        <Template>{children}</Template>
      </PageLayout>
    </>
  )
}
