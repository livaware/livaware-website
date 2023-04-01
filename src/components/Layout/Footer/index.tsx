import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { FooterConfigData } from '@/lib/sanityTypes/footerConfig'
import Logo from '../../Logo'

export default function Footer({ config }: { config: FooterConfigData }) {
  return (
    <footer className="mt-5 grid justify-items-center bg-brand-navy p-6 text-white">
      <div className="grid w-full max-w-site-width grid-cols-1 gap-5 md:grid-cols-4">
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
