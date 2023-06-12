'use client'

import PageLayout from '@/components/Layout/PageLayout'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { init } from '@socialgouv/matomo-next'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Template from './template'

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
  const router = useRouter()
  const path = usePathname()
  const prevPath = useRef<string | null>(path)
  const [loading, setLoading] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
  }, [])

  useEffect(() => {
    // Bind react router navigation event to all a tags
    const onClick = (e: any) => {
      const target = e.target as HTMLElement

      var foundTarget = target

      if (
        target.tagName.toLowerCase() !== 'a' &&
        target.tagName.toLowerCase() !== 'button'
      ) {
        const closestAnchor = target.closest('a')
        if (closestAnchor) {
          foundTarget = closestAnchor
        }
      }
      const lcTagName = foundTarget.tagName.toLowerCase()

      if (lcTagName === 'a' || lcTagName === 'button') {
        const href = foundTarget.getAttribute('href')
        if (href && href.startsWith('/')) {
          e.preventDefault()
          if (href !== path) {
            if (href !== prevPath.current) {
              setLoading(true)
            }
          }
          router.push(href)
        }
      }
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [router, path])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (path !== prevPath.current) {
      setLoading(false)
      prevPath.current = path
    }
  }, [path])

  return (
    <>
      <PageLayout globalConfig={globalConfig}>
        <Template loading={loading}>{children}</Template>
      </PageLayout>
    </>
  )
}
