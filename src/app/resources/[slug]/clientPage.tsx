'use client'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import SanityImage from '@/lib/SanityImage'
import { ResourcePageData } from '@/lib/sanityTypes/resourcePageData'
import { Chevron, ContentContainer, Heading } from 'livaware-react-components'
import Link from 'next/link'

export default function ClientPage({ data }: { data: ResourcePageData }) {
  return (
    <ContentContainer>
      <div className="mb-4">
        <Link href="/resources">
          <Chevron reverse /> Back to Resources
        </Link>
      </div>
      {data.coverImage && (
        <SanityImage value={data.coverImage} className="max-h-[50svh]" />
      )}
      <Heading variant="h1">{data.title}</Heading>
      {data.subTitle && <Heading variant="h2">{data.subTitle}</Heading>}
      <PortableTextRenderer content={data.content} />
    </ContentContainer>
  )
}
