import ColumnsBlock from '@/components/ColumnsBlock'
import Heading from '@/components/Typography/Heading'
import TextLink from '@/components/Typography/Link'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import sanityClient from './sanityClient'
import SanityImage from './SanityImage'

export default function PortableTextRenderer({ content }: { content: any }) {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          h1: ({ children }) => <Heading variant="h1">{children}</Heading>,
          h2: ({ children }) => <Heading variant="h2">{children}</Heading>,
          h3: ({ children }) => <Heading variant="h3">{children}</Heading>,
          h4: ({ children }) => <Heading variant="h4">{children}</Heading>,
        },
        types: {
          image: ({ value }) => <SanityImage value={value} maintainAspect />,
          columnsBlock: ({ value }) => (
            <ColumnsBlock
              leftContent={value.leftContent}
              rightContent={value.rightContent}
            />
          ),
        },
        marks: {
          link: ({ children, value }) => (
            <TextLink url={value.href}>{children}</TextLink>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
        },
      }}
    />
  )
}
