import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { FooterConfigData } from '@/lib/sanityTypes/footerConfig'
import Logo from '../../Logo'

export default function Footer({ config }: { config: FooterConfigData }) {
  return (
    <footer className="bg-bg-dark grid justify-items-center text-white p-6 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-4 max-w-site-width w-full gap-5">
        <div>
          <PortableTextRenderer content={config.column1Content} />
        </div>
        <div>
          <PortableTextRenderer content={config.column2Content} />
        </div>
        <div>
          <PortableTextRenderer content={config.column3Content} />
        </div>
        <div>
          <PortableTextRenderer content={config.column4Content} />
        </div>
        <div className="md:col-span-2">
          <Logo variant="white" />
        </div>
        <div className="md:col-start-4">
          <PortableTextRenderer content={config.bottomContent} />
        </div>
      </div>
    </footer>
  )
}
