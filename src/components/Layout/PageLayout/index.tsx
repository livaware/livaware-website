import { GlobalConfiguration } from '@/lib/sanityClient'
import { ReactNode } from 'react'
import ContentContainer from '../ContentContainer'
import Footer from '../Footer'
import Header from '../Header'

export interface PageLayoutProps {
  globalConfig: GlobalConfiguration
  children: ReactNode
}

export default function PageLayout({
  globalConfig,
  children,
}: PageLayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {children}
      <Footer config={globalConfig.footer} />
    </div>
  )
}
