import ContentContainer from '@/components/Layout/ContentContainer'
import Heading from '@/components/Typography/Heading'
import sanityClient from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPageData'
import Link from 'next/link'

async function getPageData() {
  try {
    const data = await sanityClient.fetch<GenericPageData[]>(
      `*[_type == "resourcePage"]`
    )
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function ResourcesPage() {
  const pages = await getPageData()
  if (!pages) return null

  return (
    <ContentContainer>
      <Heading variant="h1">Resources</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
