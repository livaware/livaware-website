import Accordion from '@/components/Accordion'
import BigTextBlock from '@/components/BigTextBlock'
import Columns from '@/components/Columns'
import Column from '@/components/Columns/Column'
import ColumnsBlock from '@/components/ColumnsBlock'
import HeroHeader from '@/components/HeroHeader'
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
          h2: ({ children }) => <Heading variant="h1">{children}</Heading>,
          h3: ({ children }) => <Heading variant="h2">{children}</Heading>,
          h4: ({ children }) => <Heading variant="h3">{children}</Heading>,
        },
        types: {
          image: ({ value }) => <SanityImage value={value} />,
          columnsBlock: ({ value }) => (
            <ColumnsBlock
              leftContent={value.leftContent}
              rightContent={value.rightContent}
              cta={value.cta}
            />
          ),
          bigTextBlock: ({ value }) => <BigTextBlock {...value} />,
          fullScreenImage: ({ value }) => (
            <SanityImage
              className="h-screen-minus-header w-screen"
              value={value.image}
            />
          ),
          heroHeader: ({ value }) => {
            const url = urlBuilder(sanityClient)
              .image(value.image)
              .width(800)
              .fit('max')
              .auto('format')
              .url()
            return (
              <HeroHeader
                mainText={value.mainText}
                subTitleText={value.subTitleText}
                topText={value.topText}
                underlineColor={value.underlineColor}
                imageUrl={url}
              />
            )
          },
          columnsContainer: ({ value }) => {
            return (
              <Columns>
                {value.columns.map((column: any) => (
                  <Column
                    key={column._key}
                    title={column.title}
                    content={<PortableTextRenderer content={column.content} />}
                    cta={column.cta}
                  />
                ))}
              </Columns>
            )
          },
          accordion: ({ value }) => {
            return (
              <Accordion
                backgroundColor={value.backgroundColor}
                title={value.title}
                items={value.items.map((item: any) => ({
                  title: item.title,
                  content: <PortableTextRenderer content={item.content} />,
                }))}
              />
            )
          },
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
