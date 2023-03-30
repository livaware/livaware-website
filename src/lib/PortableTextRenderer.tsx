import ColumnsBlock from '@/components/ColumnsBlock'
import Heading from '@/components/Typography/Heading'
import TextLink from '@/components/Typography/Link'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export default function PortableTextRenderer({ content }: { content: any }) {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          h1: ({ children }) => <Heading variant="h1">{children}</Heading>,
          h2: ({ children }) => <Heading variant="h2">{children}</Heading>,
        },
        types: {
          image: ({ value }) => <Image src={value.imageUrl} alt={value.alt} />,
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
        },
      }}
    />
  )
}
