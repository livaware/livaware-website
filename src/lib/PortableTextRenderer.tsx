import ColumnsBlock from '@/components/ColumnsBlock'
import Heading from '@/components/Typography/Heading'
import TextLink from '@/components/Typography/Link'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import sanityClient from './sanityClient'

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
          image: ({ value }) => {
            const { width, height } = getImageDimensions(value)
            const img = urlBuilder(sanityClient)
              .image(value)
              .width(800)
              .fit('max')
              .auto('format')
              .url()
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={value.alt ?? ' '}
                loading="lazy"
                className=" w-full object-cover"
                style={{
                  aspectRatio: width / height,
                }}
              />
            )
          },
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
