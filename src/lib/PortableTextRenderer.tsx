'use client'
import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {
  Accordion,
  BigTextBlock,
  Column,
  Columns,
  ColumnsBlock,
  ComparisonBlock,
  Heading,
  HeroHeader,
  HeroProduct,
  Link,
  TextBlock,
  ImageContentOverlay,
} from 'livaware-react-components'
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
          columnsBlock: ({ value }) => {
            const leftContentHasImage = JSON.stringify(
              value.leftContent
            ).includes('image')
            const rightContentHasImage = JSON.stringify(
              value.rightContent
            ).includes('image')

            return (
              <ColumnsBlock
                leftContent={
                  <PortableTextRenderer content={value.leftContent} />
                }
                leftContentHasImage={leftContentHasImage}
                rightContent={
                  <PortableTextRenderer content={value.rightContent} />
                }
                rightContentHasImage={rightContentHasImage}
                cta={value.cta}
              />
            )
          },
          imageContentOverlay: ({ value }) => {
            const url = urlBuilder(sanityClient)
              .image(value.image)
              .width(1920)
              .fit('max')
              .auto('format')
              .url()
            return (
              <ImageContentOverlay
                backgroundUrl={url}
                content={<PortableTextRenderer content={value.content} />}
                title={value.title}
                cta={value.cta}
                flipContent={value.flip}
                backgroundColor={value.backgroundColor}
                invertText={value.invertText}
              />
            )
          },
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
              .width(1920)
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
          heroProduct: ({ value }) => {
            const url = urlBuilder(sanityClient)
              .image(value.image)
              .width(1920)
              .fit('max')
              .auto('format')
              .url()
            return (
              <HeroProduct
                mainText={value.mainText}
                content={<PortableTextRenderer content={value.content} />}
                topText={value.topText}
                backgroundColor={value.backgroundColor}
                cta={value.cta}
                imageUrl={url}
              />
            )
          },
          columnsContainer: ({ value }) => {
            return (
              <Columns
                title={value.title}
                backgroundColor={value.backgroundColor}
                invertText={value.invertText}
              >
                {value.columns.map((column: any, index: number) => (
                  <Column
                    key={column._key}
                    title={column.title}
                    content={<PortableTextRenderer content={column.content} />}
                    cta={column.cta}
                    number={value.showNumbers ? `${index + 1}` : undefined}
                    invert={value.invertText}
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
                invert={value.invert}
                items={value.items.map((item: any) => ({
                  title: item.title,
                  titleAddition: item.titleAddition,
                  content: item.content ? (
                    <PortableTextRenderer content={item.content} />
                  ) : undefined,
                }))}
              />
            )
          },
          textBlock: ({ value }) => {
            return (
              <TextBlock
                title={value.title}
                content={<PortableTextRenderer content={value.content} />}
              />
            )
          },
          comparisonBlock: ({ value }) => {
            return (
              <ComparisonBlock
                backgroundColor={value.backgroundColor}
                invertText={value.invertText}
                mainText={value.mainText}
                bottomText={value.bottomText}
                topText={value.topText}
                columns={value.columns?.map((x: any) => ({
                  title: x.title,
                  cta: x.cta?.title ? x.cta : undefined,
                  content: <PortableTextRenderer content={x.content} />,
                }))}
              />
            )
          },
        },
        marks: {
          link: ({ children, value }) => (
            <Link url={value.href}>{children}</Link>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
        },
      }}
    />
  )
}
