import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { GlobalConfiguration } from '@/lib/sanityClient'
import { Footer, Header } from 'livaware-react-components'
import { ReactNode } from 'react'

export interface PageLayoutProps {
  globalConfig: GlobalConfiguration
  children: ReactNode
}

export default function PageLayout({
  globalConfig,
  children,
}: PageLayoutProps) {
  return (
    <div className="grid min-h-screen-minus-header grid-rows-[auto_1fr_auto]">
      <Header />
      {children}
      <Footer
        columns={[
          <PortableTextRenderer
            key={1}
            content={globalConfig.footer.column1Content}
          />,
          <PortableTextRenderer
            key={2}
            content={globalConfig.footer.column2Content}
          />,
          <PortableTextRenderer
            key={3}
            content={globalConfig.footer.column3Content}
          />,
          <PortableTextRenderer
            key={4}
            content={globalConfig.footer.column4Content}
          />,
        ]}
        bottom={
          <PortableTextRenderer content={globalConfig.footer.bottomContent} />
        }
      />
    </div>
  )
}
