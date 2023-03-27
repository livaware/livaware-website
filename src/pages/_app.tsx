import PageLayout from '@/components/Layout/PageLayout'
import PageTransition from '@/components/Layout/PageTransition'
import { getGlobalConfiguration } from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPage'
import { PageData } from '@/lib/sanityTypes/pageData'
import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps, router }: AppProps) {
  const props = pageProps as PageData<GenericPageData>
  return (
    <PageLayout
      title={props?.data?.title}
      description={props?.data?.description}
      globalConfig={props.globalConfig}
    >
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <PageTransition key={router.asPath}>
          <Component {...pageProps} key={router.asPath} />
        </PageTransition>
      </AnimatePresence>
    </PageLayout>
  )
}

App.getInitialProps = async (ctx) => {
  const globalConfig = await getGlobalConfiguration()
  console.log(globalConfig)
  return { globalConfig }
}
