'use client'
import { GenericPageData } from '@/lib/sanityTypes/genericPageData'
import { ContentContainer, Heading } from 'livaware-react-components'
import Link from 'next/link'

export default function ClientPage({ pages }: { pages: GenericPageData[] }) {
  return (
    <ContentContainer>
      <Heading variant="h1">Resources</Heading>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {pages.map((page) => (
          <Link
            href={`/resources/${page.slug}`}
            key={page.slug}
            className="rounded-md bg-brand-warm-grey p-5"
          >
            <h1>{page.title}</h1>
          </Link>
        ))}
      </div>
    </ContentContainer>
  )
}
