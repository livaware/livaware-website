import { GlobalConfiguration } from '@/lib/sanityClient'
import Head from 'next/head'
import { ReactNode } from 'react'
import ContentContainer from '../ContentContainer'
import Footer from '../Footer'
import Header from '../Header'

export interface PageLayoutProps {
  title: string
  description: string
  globalConfig: GlobalConfiguration
  children: ReactNode
}

export default function PageLayout({
  title,
  description,
  globalConfig,
  children,
}: PageLayoutProps) {
  const pageTitle = title ? `Livaware &bull; ${title}` : 'Livaware'
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ContentContainer>{children}</ContentContainer>
      <Footer config={globalConfig.footer} />
    </>
  )
}
