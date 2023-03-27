import Heading from '@/components/Typography/Heading'
import TextLink from '@/components/Typography/Link'
import { PortableText } from '@portabletext/react'

export default function PortableTextRenderer({ content }: { content: any }) {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          h1: ({ children }) => <Heading variant="h1">{children}</Heading>,
          h2: ({ children }) => <Heading variant="h2">{children}</Heading>,
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
